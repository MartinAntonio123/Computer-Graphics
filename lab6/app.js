  var scene = new THREE.Scene( );
  var renderer = new THREE.WebGLRenderer( );
  //to start server - php -S 127.0.0.1:8080 - in terminal and enter local host
  renderer.setSize(window.innerWidth,window.innerHeight);

  document.body.appendChild(renderer.domElement );

  var ratio = window.innerWidth/window.innerHeight;
  var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
  camera.position.set(0,0,20);
  camera.lookAt(0,0,1);

  var material_floor = new THREE.MeshLambertMaterial();
  material_floor.color= new THREE.Color(0.8,0.8,1.0);
  material_floor.side=THREE.DoubleSide;

  var geometry_plane = new THREE.PlaneGeometry(10,10,10,10);
  var floorMesh= new THREE.Mesh(geometry_plane,material_floor);
  scene.add(floorMesh);

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 0.5 );
  camera.add( cameralight );
  scene.add(camera);

  var ambientlight = new THREE.AmbientLight(new THREE.Color(1,1,1),0.2);
  scene.add(ambientlight);

  //MESH LOADING
  var loader = new THREE.PLYLoader();
  var mesh = null;
  loader.load('models/bunny.ply', function ( geometry )
  {
       geometry.computeVertexNormals();
       geometry.computeBoundingBox();

       var center = geometry.boundingBox.getCenter();
       var size = geometry.boundingBox.getSize();
       var min = geometry.boundingBox.min;

       var sca = new THREE.Matrix4();
       var tra = new THREE.Matrix4();

       var ScaleFact=5/size.length();
       sca.makeScale(ScaleFact,ScaleFact,ScaleFact);
       //tra.makeTranslation (-center.x,-center.y,-min.z);
       tra.makeTranslation (-center.x,-center.y,-min.z);

       var material = new THREE.MeshPhongMaterial();
       material.color= new THREE.Color(0.9,0.9,0.9);
       material.shininess=100;
       mesh = new THREE.Mesh( geometry, material );

       mesh.applyMatrix(tra);
       mesh.applyMatrix(sca);
       mesh.name = "bunny";
       scene.add( mesh );
     } );

  var MyUpdateLoop = function ( )
  {
    renderer.render(scene,camera);
    requestAnimationFrame(MyUpdateLoop);
  };

  requestAnimationFrame(MyUpdateLoop);

  var raycaster = new THREE.Raycaster();
  var selected = false;
  function onDocumentMouseDown(event){
    var mouse = new THREE.Vector2;
    mouse.x = event.clientX / renderer.domElement.clientWidth * 2 - 1;
    mouse.y = -event.clientY / renderer.domElement.clientHeight * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersect = raycaster.intersectObjects(scene.children, false);
    if (intersect.length > 0) {
      console.log("selected mesh");
      if ((intersect[0].object.name == "bunny")&&(!selected)) {
        intersect[0].object.material.color = new THREE.Color(1,0.5,0.5);
        selected = true;
      }
      else if ((intersect[0].object.name != "bunny") && (selected)) {
        mesh.material.color = new THREE.Color(0.9,0.9,0.9);
        selected = false;
        var pos = intersect[0].point;
        mesh.position.x = pos.x;
        mesh.position.y = pos.y;
      }
    }
  }
  document.addEventListener('mousedown', onDocumentMouseDown, false)
  //this function is called when the window is resized
  var MyResize = function ( )
  {
    //get the new sizes
    var width = window.innerWidth;
    var height = window.innerHeight;
    //then update the renderer
    renderer.setSize(width,height);
    //and update the aspect ratio of the camera
    camera.aspect = width/height;
    //update the projection matrix given the new values
    camera.updateProjectionMatrix();

    //and finally render the scene again
    renderer.render(scene,camera);
  };
  //link the resize of the window to the update of the camera
  window.addEventListener( 'resize', MyResize);
