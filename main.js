async function initGame() {
    // Get the value of a URL parameter called "exampleParam"
    const params = new URLSearchParams(window.location.search);
    const exampleParam = params.get('visit');

    // Create a UserDataModel instance
    const userDataModel = new UserDataModel();
    console.log(userDataModel);

    if (exampleParam) {
        userDataModel.userData = await UserDataModel.fetchUserData(exampleParam);
        userDataModel.visitor = true;
        console.log(userDataModel.userData)
    } 

    // Get the canvas element, create the Babylon.js engine
    const renderCanvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(renderCanvas, true);

    const scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

    // Instantiate the GameGui class
    const audioModel = new AudioModel();

    // Instantiate the GameGui class
    const gameGui = new GameGui(scene, userDataModel.userData, audioModel);

    // Check for milestones
    const milestoneController = new MilestoneController(gameGui);
    milestoneController.loadMilestones(userDataModel.userData.trees);

    console.log(milestoneController.milestones);

    // Get the last reached milestone
    const lastMilestone = milestoneController.milestones.filter(milestone => milestone.reached).pop();

    // Show the milestone recap message
    if (lastMilestone) {
        gameGui.showMilestoneRecap(lastMilestone);
    }

    // Instantiate the GameController class
    const gameController = new GameController(gameGui, userDataModel);

    this.userMenuController = new UserMenuController(gameGui, userDataModel);

    gameController.initGameComponents(scene, userDataModel);

    // Instantiate the Co2View and Co2Controller classes
    const co2View = new Co2View(scene);
    const co2Controller = new Co2Controller(co2View, userDataModel, gameController);

    // Start CO2 sphere spawning
    co2Controller.startSpawning();
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, new BABYLON.Vector3(0, 0, 0), scene);

    // Set camera constraints
    // camera.lowerAlphaLimit = -Math.PI / 2;
    // camera.upperAlphaLimit = -Math.PI / 2;
    camera.lowerBetaLimit = Math.PI / 4; // Change this value to your desired lower limit for looking up (in radians)
    camera.upperBetaLimit = Math.PI / 2.2; // Change this value to your desired upper limit for looking down (in radians)
    camera.lowerRadiusLimit = 30; // Change this value to your desired minimum zoom distance
    camera.upperRadiusLimit = 100; // Change this value to your desired maximum zoom distance
    
    camera.attachControl(renderCanvas, true);    

    const previousCamera = scene.activeCamera;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 5, 0), scene);

    // Create 25 trees
    // BUG HERE ONLINE FIRST CONNEXION: caught (in promise) TypeError: Cannot read properties of undefined (reading 'length')
    // Coreectd the user data first pelase
    console.log(userDataModel.userData.trees);
    const numTrees = userDataModel.userData.trees.length;
    const treeViews = [];
    const generatedTreeModels = [];

    async function createTrees() {
        for (let i = 0; i < numTrees; i++) {
            const level = userDataModel.userData.trees[i].level;
            const id = userDataModel.userData.trees[i].id;
            const co2PerSecond = userDataModel.userData.trees[i].co2PerSecond;
            const x = userDataModel.userData.trees[i].x;
            const z = userDataModel.userData.trees[i].z;
            // const x = Math.random() * 50 - 25; // Update this line
            // const z = Math.random() * 50 - 25; // Update this line
            const treeModel = new TreeModel(id, level, co2PerSecond, x, 0, z);
            const treeView = new TreeView(treeModel, scene);
            await treeView.init(); // Wait for the init method to complete
            const treeController = new TreeController(treeView, userDataModel, gameGui);
            treeViews.push(treeView);
            generatedTreeModels.push(treeModel);
        }
    }    
    
    createTrees();
    
    // Wait for all tree models to load
    const treeMeshes = await Promise.all(treeViews.map(treeView => treeView.treeMesh));

    // Wait for all tree models to load
    await Promise.all(treeViews.map(treeView => treeView.loadTreeMesh()));

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    // If a guest is playing, show the user menu
    if (userDataModel.guest) {
        await userMenuController.showMenu();
    }
}