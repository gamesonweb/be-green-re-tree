class Ground {
    constructor(scene) {
            this.scene = scene;
        }
    }
    
// GroundView.js
class GroundView {
    constructor(ground, userDataModel) {
        this.groundModel = ground;
        this.scene = ground.scene;
        this.userDataModel = userDataModel;
        console.log(this.userDataModel)

        this.createGroundMesh();
        this.createIslandMesh();
    }
    
    createGroundMesh() {
        const groundMesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            "ground",
            "./assets/textures/heightMap.png",
            {
                width: 80,
                height: 80,
                subdivisions: 100,
                minHeight: -2.4,
                maxHeight: 0,
                onReady: () => {
                    this.createGroundPhysics(groundMesh);
                },
            },
            this.scene
        );
    
        this.createGrassMaterial(groundMesh);
        this.groundModel.ground = groundMesh;
    
        // If one at least one tree in userDataModel.userData.trees is lvl 5
        for (let i = 0; i < this.userDataModel.userData.trees.length; i++) {
            if (this.userDataModel.userData.trees[i].level >= 17) {
                // Create an instance of the GrassView class
                this.grassView = new GrassView(this.scene, "high");
                break;
            }
            else if (this.userDataModel.userData.trees[i].level >= 12) {
                // Create an instance of the GrassView class
                this.grassView = new GrassView(this.scene);
                break;
            }
        }
    }    

    createIslandMesh() {
        const islandMesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            "island",
            "./assets/textures/heightMapIsland.png",
            {
                width: 100,
                height: 100,
                subdivisions: 100,
                minHeight: 2, // Inverted from maxHeight
                maxHeight: -50, // Inverted from minHeight
                onReady: () => {
                    this.createGroundPhysics(islandMesh);
                },
            },
            this.scene
        );
    
        // Flip the normals of the island mesh to make it visible from below
        islandMesh.forceSharedVertices();
        islandMesh.flipFaces();
    
        // Position the island below the main ground
        islandMesh.position.y = -4; // Adjust this value based on your desired distance between the main ground and the island
    
        this.createMaterial(islandMesh, "./assets/textures/dirt.jpeg");
        this.groundModel.island = islandMesh;
    }    
    
    createGroundPhysics(groundMesh) {
        groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(
            groundMesh,
            BABYLON.PhysicsImpostor.HeightmapImpostor,
            { mass: 0, restitution: 0.1, friction: 0.01, isKinematic: true },
            this.scene
        );
    }

    createMaterial(mesh, texturePath) {
        const material = new BABYLON.StandardMaterial("material", this.scene);
        const texture = new BABYLON.Texture(texturePath, this.scene);
        texture.uScale = 15;
        texture.vScale = 15;
        material.diffuseTexture = texture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        
        // Make the material double-sided
        material.backFaceCulling = false;
    
        mesh.material = material;
    }    
    
    createGrassMaterial(groundMesh) {
        const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", this.scene);

        let grassTexture = new BABYLON.Texture("./assets/textures/dirt.jpeg", this.scene);
        // If one at least one tree in userDataModel.userData.trees is lvl 5
        for (let i = 0; i < this.userDataModel.userData.trees.length; i++) {
            if (this.userDataModel.userData.trees[i].level >= 5) {
                grassTexture = new BABYLON.Texture("./assets/textures/grass.jpeg", this.scene);
                break;
            }
        }

        grassTexture.uScale = 15;
        grassTexture.vScale = 15;
        grassMaterial.diffuseTexture = grassTexture;
        grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        groundMesh.material = grassMaterial;
    }
}