//create the scene
    var scene = new THREE.Scene( );
    var ratio = window.innerWidth/window.innerHeight;
    //create the perspective camera
    //for parameters see https://threejs.org/docs/#api/cameras/PerspectiveCamera
    var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);

    //set the camera position
    camera.position.set(0,0,15);
    // and the direction
	  camera.lookAt(0,0,1);

    //create the webgl renderer
    var renderer = new THREE.WebGLRenderer( );

    //set the size of the rendering window
    renderer.setSize(window.innerWidth,window.innerHeight);

    //add the renderer to the current document
    document.body.appendChild(renderer.domElement );


    //create the material of the cube (basic material)
    var material_cube = new THREE.MeshBasicMaterial();
    material_cube.color=  new THREE.Color(0,1,0);
    material_cube.wireframe=true;
    //create the mesh of a cube
    var geometry_cube = new THREE.BoxGeometry(1,1,1);
    var n=36;

    function clearScene(){
      for(let i = scene.children.length-1; i>=0; i--){
        if (scene.children[i].type == "Mesh") {
          scene.remove(scene.children[i]);
        }
      }
    }
    var cubes=[];
    var FrameMatrix=[];
    var subframes=10;
    var current = 0;
    function CreateTransfMatrices(){
      for (var i = 0; i < (n*subframes); i++) {
        var rot2 = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var combined = new THREE.Matrix4();

        sca.makeScale(0.5,3,1.5);
        tra.makeTranslation(10,0,0);
        rot2.makeRotationZ ( i*(Math.PI/(n*subframes)) );
        rot.makeRotationY ( i*(2*Math.PI/(n*subframes)) );

        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);

        FrameMatrix[i]=combined;
      }
    }

    function CreateScene()
    {
      CreateTransfMatrices();
      for (var i = 0; i < n; i++) {

        cubes[i] = new THREE.Mesh(geometry_cube,material_cube);
        var indexx = i*subframes+current;
        cubes[i].applyMatrix(FrameMatrix[indexx]);
        scene.add(cubes[i]);
      }
    }
  CreateScene();
  //////////////
	// CONTROLS //
	//////////////

	// move mouse and: left   click to rotate,
	//                 middle click to zoom,
	//                 right  click to pan
  // add the new control and link to the current camera to transform its position

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  //final update loop
  var MyUpdateLoop = function ( )
  {
    clearScene();
    current = (current+1)%subframes;
    CreateScene();
    //call the render with the scene and the camera
    renderer.render(scene,camera);
    controls.update();
    //finally perform a recoursive call to update again
    //this must be called because the mouse change the camera position
    requestAnimationFrame(MyUpdateLoop);
  };

  requestAnimationFrame(MyUpdateLoop);

  //this fucntion is called when the window is resized
  var MyResize = function ( )
  {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
  };

  function handleKeydown(event){
    if (event.keyCode == 49) {
      n++;
    }
    if (event.keyCode == 50) {
      n--;
    }
    clearScene();
    CreateScene();
  }

  //link the resize of the window to the update of the camera
  window.addEventListener( 'resize', MyResize);
  window.addEventListener('keydown', handleKeydown, false);
