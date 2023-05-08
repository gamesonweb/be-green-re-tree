class Co2View {
    constructor(scene) {
        this.scene = scene;
    }

    createTransparentSphere(co2Model, onSphereClick) {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, this.scene);
        sphere.position = new BABYLON.Vector3(Math.random() * 50 - 25, 1, Math.random() * 50 - 25);
        sphere.visibility = 0.3; // Set transparency to 30%
        sphere.co2Model = co2Model;

        // Create an action manager for the sphere
        sphere.actionManager = new BABYLON.ActionManager(this.scene);

        // Add action when the sphere is clicked
        sphere.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                () => {
                    sphere.dispose(); // Remove the sphere from the scene
                    onSphereClick(sphere); // Notify the controller that the sphere has been clicked
                }
            )
        );

        return sphere;
    }
}