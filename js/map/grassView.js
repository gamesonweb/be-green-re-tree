// Adapted from https://playground.babylonjs.com/#NZDFUB#1
class GrassView {
    constructor(scene) {
        this.scene = scene;
        this._createGrass();
    }

    _createGrass() {
        // Add grass-related shaders
        BABYLON.Effect.ShadersStore['grassVertexShader'] = `
        precision highp float;

        attribute vec3 position;
        attribute vec2 uv;
        attribute vec4 color;

        
        uniform mat4 viewProjection;
        uniform mat4 worldViewProjection;

        uniform vec3 spherePosition;

        uniform float time;
        attribute float frequency;
        attribute float waveLength;
        attribute float waveSize;

        uniform float radius;
        uniform float yOffset;
        uniform float maxWidth;

        varying vec4 vColor;

        #include<instancesDeclaration>

        void main(void) {
            #include<instancesVertex>
            vec3 pos = position;
            vec4 worldPos = finalWorld * vec4(pos,1.0);
            
            //https://www.reddit.com/r/Unity3D/comments/6re9e5/using_vertex_animation_shaders_to_make_grass_and/
            pos.x += sin((color.r + time * frequency) / waveLength) * waveSize;

            //https://gist.github.com/ArieLeo/df86a89eae57536c9f51620b70dec337
            float dis = distance(spherePosition, worldPos.xyz); // distance for radius
            float dradius = 1. - clamp(dis/radius, 0.0, 1.0); // in world radius based on objects interaction radius
            vec3 sphereDisp = worldPos.xyz-spherePosition; // position comparison
            sphereDisp *= dradius; // position multiplied by radius for falloff
            pos.xz += clamp(sphereDisp.xz * step(yOffset, color.r), -maxWidth,maxWidth);// vertex movement based on falloff and clamped
            gl_Position = viewProjection * finalWorld * vec4(pos.xyz,1.0);
            vColor = color;
            vColor.g = vColor.r;
            vColor.r = 0.2;
        }
    `;
    BABYLON.Effect.ShadersStore['grassFragmentShader'] = `
        precision highp float;

        varying vec4 vColor;

        void main(void) {
            gl_FragColor = vColor;
        }
    `;

        // Create grass material
        const shaderMaterial = new BABYLON.ShaderMaterial("grassMaterial", this.scene, "grass",
        {
            attributes: ["position", "normal", "uv", "color", "frequency", "waveLength", "waveSize"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "viewProjection", "radius", "yOffset", "maxWidth"]
        });

        // Load grass mesh
        var assetsManager = new BABYLON.AssetsManager(this.scene);

        var meshTask = assetsManager.addMeshTask("task", "", "https://raw.githubusercontent.com/RaggarDK/Baby/baby/", "grass.babylon");

        meshTask.onSuccess = (task) => {
            const grassMesh = task.loadedMeshes[0];
            grassMesh.material = shaderMaterial;
            // const numInstances = 14400;
            const numInstances = 1000;
            const bufferMatrices = new Float32Array(16 * numInstances);
            const bufferFrequency = new Float32Array(numInstances);
            const bufferWaveLength = new Float32Array(numInstances);
            const bufferWaveSize = new Float32Array(numInstances);
            for(let i=0;i<numInstances;++i){
                const matrix = BABYLON.Matrix.Translation(Math.random()*50-28, 0.9, Math.random()*50-22); // Change the X and Z values from 60 to 50
                matrix.copyToArray(bufferMatrices, i*16);
                bufferFrequency[i] = 0.008 + (Math.random() - 0.5) / 400;
                bufferWaveLength[i] = 0.05 + (Math.random() - 0.5) / 40;
                bufferWaveSize[i] = 0.02 + (Math.random() - 0.5) / 40;
            }
    
            grassMesh.thinInstanceSetBuffer("matrix", bufferMatrices);
            grassMesh.thinInstanceSetBuffer("frequency", bufferFrequency, 1);
            grassMesh.thinInstanceSetBuffer("waveLength", bufferWaveLength, 1);
            grassMesh.thinInstanceSetBuffer("waveSize", bufferWaveSize, 1);
    
            let frequency = 0.008;
            let waveLength = 0.05;
            let waveSize = 0.02;
    
            let radius = 1.0;
            let yOffset = 0.2;
            let maxWidth = 0.5;
    
            //shaderMaterial.setFloat("frequency", frequency);
            //shaderMaterial.setFloat("waveLength", waveLength);
            //shaderMaterial.setFloat("waveSize", waveSize);
    
            shaderMaterial.setFloat("radius", radius);
            shaderMaterial.setFloat("yOffset", yOffset);
            shaderMaterial.setFloat("maxWidth", maxWidth);
    
            let time = 0;
            this.scene.registerBeforeRender((e) => { // Change 'scene' to 'this.scene'
                time += e.deltaTime ? e.deltaTime*0.01 : 0; 
                // shaderMaterial.setVector3("spherePosition", sphere.position);
                shaderMaterial.setFloat("time", time);
                
            });

    
        }

        assetsManager.load();
    }
}
window.GrassView = GrassView;
