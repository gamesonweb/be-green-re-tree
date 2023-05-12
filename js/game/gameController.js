class GameController {
    constructor(gameGui, userDataModel) {
        this.gameGui = gameGui;
        this.userDataModel = userDataModel;
        this.API_ENDPOINT = ConfigModel.get_url();

        this.init();
    }

    init() {
        this.updateScore();
        // Check if user is a visitor
        if(!this.userDataModel.visitor){
            setInterval(() => {
                // Check if user have data
                if (
                    this.userDataModel.userData.hasOwnProperty('CO2') &&
                    this.userDataModel.userData.hasOwnProperty('CO2_per_sec') &&
                    this.userDataModel.userData.hasOwnProperty('trees')
                ) {
                    this.incrementScore(this.userDataModel.userData.CO2_per_sec);
                } else {
                    this.resetScore();
                }
            }, 1000);

            // Send user data to API every 10 seconds
            setInterval(() => {
                if(this.userDataModel.userData.username){
                    this.sendUserDataToAPI();
                } else {
                    console.log('User is a guest, not sending data to API');
                }
            }, 10000); // Call the API every 10 seconds    

            // Add an event listener to the reset button
            this.gameGui.resetButton.onPointerUpObservable.add(() => {
                this.resetScore();
            });
        }
    }
    
    // TODO: To move from here
    sendUserDataToAPI() {
        console.log('Sending user data to API');

        fetch(`${ConfigModel.get_url()}save_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: this.userDataModel.userData.username, // Replace this with the actual username
                trees: JSON.stringify(this.userDataModel.userData.trees),
                CO2: this.userDataModel.userData.CO2,
                CO2_per_sec: this.userDataModel.userData.CO2_per_sec,
            }),
        })
        .then(response => response.json())
        .then(console.log);
    }  

    // Increment the user's score
    incrementScore(amount) {
        this.userDataModel.userData.CO2 += amount;
        this.updateScore();
    }

    // Update the score text and save the user data
    updateScore() {
        const { CO2 } = this.userDataModel.userData;
        this.gameGui.updateScoreText(CO2);
        this.gameGui.updateScoreText2(this.userDataModel.userData.CO2_per_sec);
        this.userDataModel.saveUserData();
    }

    // Reset the user's score
    resetScore() {
        const { userToken } = this.userDataModel;
        const initialUserData = this.createInitialUserData();
        this.userDataModel.userData = initialUserData;
        this.userDataModel.saveUserData();
        // Reload the page
        window.location.reload();
        this.updateScore();
    }

    // Create the initial user data
    // TODO: To move from here
    createInitialUserData() {
        // Initialize the user data with 25 trees
        let numTrees = 25;
        let trees = [];
        for (let i = 0; i < numTrees; i++) {
            // We compute random values for the tree's position
            // TODO: To move from here the size of the ground
            const x = Math.random() * 50 - 25;
            const z = Math.random() * 50 - 25;
            trees[i] = new TreeModel(i, 0, 0, x, 0, z);
        }

        return {
            CO2: 0,
            CO2_per_sec: 1,
            CO2_spawn_rate: 10000, // Add this line
            trees: trees,
        };
    }

    // Initialize the game components
    initGameComponents(scene, userDataModel) {
        this.ground = new Ground(scene);

        const groundSize = 100;
        // Create the ground
        const groundView = new GroundView(this.ground, userDataModel);

        // Check if the user has a tree with level 9 or higher 
        // TODO: Milestone should move from here
        for (let i = 0; i < this.userDataModel.userData.trees.length; i++) {
            if (this.userDataModel.userData.trees[i].level >= 9) {
                // Create the skybox
                const skyboxView = new SkyboxView(scene);
                skyboxView.createSkybox();
                break;
            }
        }
        
        // Create the continuous ground, the bigger ground under the ground
        const continuousGroundView = new ContinuousGroundView(this.ground, groundSize);
        continuousGroundView.createContinuousGroundMesh();
        groundView.createGroundMesh();

        // Create the water
        const waterView = new WaterView(this.ground, continuousGroundView.continuousGround, groundSize);
        waterView.createWaterMesh();
    }
}