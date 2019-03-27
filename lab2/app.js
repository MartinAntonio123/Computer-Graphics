//create the scene
//Raycaster use his library
    var scene = new THREE.Scene( );

    //create the webgl renderer
    var renderer = new THREE.WebGLRenderer( );

    renderer.setSize(window.innerWidth,window.innerHeight);

    //add the renderer to the current document
    document.body.appendChild(renderer.domElement );

    var ratio = window.innerWidth/window.innerHeight;

    //create the perspective camera
    //for parameters see https://threejs.org/docs/#api/cameras/PerspectiveCamera
    var camera = new THREE.PerspectiveCamera(45,ratio,0.00001,1000);
    var Pos = new THREE.Vector3(0,0,0);
    camera.position.set(Pos.x,Pos.y,Pos.z);
    var Dir = new THREE.Vector3(0,0,1);
    camera.lookAt(Dir.x,Dir.y,Dir.z);

    var material_box = new THREE.MeshBasicMaterial();
    material_box.color=  new THREE.Color(100,100,100);
    material_box.wireframe=true;
    var geometry_box = new THREE.BoxGeometry(10,0.1,10,32,1,32);

    var BoxMesh = new THREE.Mesh(geometry_box,material_box);
    BoxMesh.position.y=-1;
    scene.add(BoxMesh);

    var moveForward=false;
    var moveLeft=false;
    var moveBackward=false;
    var moveRight=false;

    // Create a Cube Mesh with basic material
    var geometry_cube = new THREE.BoxGeometry( 1, 1, 1 );
    var material_cube = new THREE.MeshBasicMaterial();
    material_cube.color= new THREE.Color(0,255,0);
    var cube = new THREE.Mesh( geometry_cube, material_cube );
    material_cube.wireframe=true;
    // Add cube to Scene
    scene.add( cube );

    var geometry_tetra = new THREE.TetrahedronGeometry( 1, 1 );
    var material_tetra = new THREE.MeshBasicMaterial();
    material_tetra.color= new THREE.Color(255,0,0);
    var tetra = new THREE.Mesh( geometry_tetra, material_tetra );
    material_tetra.wireframe=true;
    // Add cube to Scene
    scene.add( tetra);

    var geometry_torus = new THREE.TorusGeometry( 1, .3, 16, 100 );
    var material_torus = new THREE.MeshBasicMaterial();
    material_torus.color= new THREE.Color(0,0,255);
    var torus = new THREE.Mesh( geometry_torus, material_torus );
    material_torus.wireframe=true;
    // Add cube to Scene
    scene.add(torus);

    var geometry_cone = new THREE.ConeGeometry( 1, 2, 32 );
    var material_cone = new THREE.MeshBasicMaterial();
    material_cone.color= new THREE.Color(0,100,105);
    var cone = new THREE.Mesh( geometry_cone, material_cone );
    material_cone.wireframe=true;
    // Add cube to Scene
    scene.add(cone);
    tetra.position.x-=2;
    cube.position.x+=2;
    torus.position.z+=2;
    cone.position.z-=2;
    //final update loop

    const clock = new THREE.Clock();

    var speed=2;
    var angle=0;
    var MyUpdateLoop = function ( )
    {
      var delta = clock.getDelta();
      if (moveLeft==true)
      {
        angle+=speed*delta;
        Dir.x=Math.sin(angle);
        Dir.z=Math.cos(angle);
        Dir.normalize();
      }
      if (moveRight==true)
      {
        angle-=speed*delta;
        Dir.x=Math.sin(angle);
        Dir.z=Math.cos(angle);
        Dir.normalize();
      }
      if (moveForward==true)
      {
        Pos.x+=Dir.x*speed*delta;
        //Pos.y+=Dir.y*speed*delta;
        Pos.z+=Dir.z*speed*delta;
      }
      if (moveBackward==true)
      {
        Pos.x-=Dir.x*speed*delta;
        //Pos.y-=Dir.y*speed*delta;
        Pos.z-=Dir.z*speed*delta;
      }
      //recompute direction

      //call the render with the scene and the camera
      renderer.render(scene,camera);
      //finally perform a recoursive call to update again
      //this must be called because the mouse change the camera position
      //camera.rotation.x=0;
      //update the projection matrix given the new values
      //camera.updateProjectionMatrix();
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      tetra.rotation.x += 0.01;
      tetra.rotation.y += 0.01;
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      cone.rotation.x += 0.01;
      cone.rotation.y += 0.01;
      camera.position.set(Pos.x,Pos.y,Pos.z);
      camera.lookAt(Pos.x+Dir.x,Pos.y+Dir.y,Pos.z+Dir.z);
      camera.updateProjectionMatrix();
      requestAnimationFrame(MyUpdateLoop);

    };

    requestAnimationFrame(MyUpdateLoop);

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


    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

      }

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;

      }
    };

    //link the resize of the window to the update of the camera
    window.addEventListener( 'resize', MyResize);

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
