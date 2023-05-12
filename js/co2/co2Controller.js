class Co2Controller {
    constructor(co2View, userDataModel, gameController) {
        this.co2View = co2View;
        this.userDataModel = userDataModel;
        this.gameController = gameController;
        this.spawnInterval = null;
        this.spheres = []; // Keep track of the spawned spheres

        // Load the bubble sound effect
        this.bubbleSound = new BABYLON.Sound("bubbleSound", "/assets/music/effects/bubble.wav", co2View.scene);
        this.bubbleSound.setVolume(0.3); // Set the volume to 30% (adjust as desired)
    }

    startSpawning() {
        // Default to 10 seconds if not set
        // TODO: Make this a user variable
        const spawnRate = this.userDataModel.userData.CO2_spawn_rate || 10000; 
        this.spawnInterval = setInterval(() => {
            if (this.spheres.length < 5) { // Check if there are fewer than 5 spheres on the map
                // Generate the CO2 value for the sphere based on the user data
                const co2Value = this.userDataModel.userData.CO2_per_sec * 10;
                const co2Model = new Co2Model(co2Value);

                const newSphere = this.co2View.createTransparentSphere(co2Model, (sphere) => {
                    this.onSphereClicked(sphere);
                });
                this.spheres.push(newSphere);
                this.bubbleSound.play(); // Play the bubble sound effect
            }
        }, spawnRate);
    }

    stopSpawning() {
        // Stop spawning spheres
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
    }

    updateSpawnRate(newSpawnRate) {
        this.stopSpawning();
        this.userDataModel.userData.CO2_spawn_rate = newSpawnRate;
        this.startSpawning();
    }

    onSphereClicked(sphere) {
        // Remove the sphere from the array
        const index = this.spheres.indexOf(sphere);
        if (index !== -1) {
            this.spheres.splice(index, 1);
        }
        // Update the user's CO2
        this.gameController.incrementScore(sphere.co2Model.co2Value);
    }
}
