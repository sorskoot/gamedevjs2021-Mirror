import vertShader from './../shaders/particle.vert.glsl';
import fragShader from './../shaders/particle.frag.glsl';

const PARTICLE_COUNT = 75;

export default class Particles {   

    CreateParticles(rootEl, texture, decay=.1, burst=false, particleRate=30, scale=400, loop=true, particleSize=64) {
        
        this.decay = decay;
        this.burst = burst;
        this.scale = scale;
        this.bursted = 0;
        this.loop = loop;

        const textureLoader = new THREE.TextureLoader();
        const sprites = textureLoader.load(texture);
        sprites.minFilter = sprites.magFilter = 1003;

        this.particles = new THREE.BufferGeometry();

        this.particleVertices = new Float32Array(PARTICLE_COUNT * 3);
        this.particleLife = new Float32Array(PARTICLE_COUNT);
        this.particleVelocity = [];

        this.particles.setAttribute('position', new THREE.Float32BufferAttribute(this.particleVertices, 3));
        this.particles.setAttribute('life', new THREE.Float32BufferAttribute(this.particleLife, 1));
        this.particles.setAttribute('cameraeye', new THREE.Float32BufferAttribute([0, 0, 0], 3));

        this.particleMaterial = new THREE.ShaderMaterial(
            {
                extensions: {
                    derivatives: true
                },
                side:THREE.DoubleSide,
                transparent: true,
                //wireframe: false,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                depthTest: false,
                uniforms: {
                    cameraeye: { value: { x: 0.0, y: 0.0, z: 0.0 } },
                    pointsize: { value: particleSize },
                    spriteIndex: { value: 1.0 },
                    spriteDimensions: { value: { x: 8.0, y: 1.0 } },
                    DiffuseTexture: { value: sprites },
                },
                vertexShader: vertShader,
                fragmentShader: fragShader
            }
        );
        this.particleSystem = new THREE.Points(
            this.particles,
            this.particleMaterial);
            this.particleSystem.frustumCulled = false;

        this.particleEntity = document.createElement('a-entity');
        this.particleEntity.setObject3D('particle-system', this.particleSystem);
        rootEl.parentEl.appendChild(this.particleEntity);
        this.particleRate = particleRate;
        this.particleTimer = 0;
        for (var p = 0; p < PARTICLE_COUNT; p++) {
            var index = p * 3;
            this.particleVertices[index] =
                this.particleVertices[index + 1] =
                this.particleVertices[index + 2] = 0;
            this.particleLife[p] = 6.0;
            this.particleVelocity.push(new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1));
            // this._deadParticles.push(p);
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.life.needsUpdate = true;

        return this.particleEntity;
    }
    UpdateParticles(timeDelta, pos) {
        const positions = this.particleSystem.geometry.attributes.position.array;
        const life = this.particleSystem.geometry.attributes.life.array;

        if(this.burst){ 
            this.burst = false;
            for (let p = 0; p < PARTICLE_COUNT; p++) {
                var index = p * 3;
                positions[index] = pos.x;
                positions[index + 1] = pos.y;
                positions[index + 2] = pos.z;
                life[p] = 6.0;                
            }          
        }
    
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            if (life[i] > 0) {
                const v = this.particleVelocity[i];
                positions[i * 3] += v.x / this.scale;
                positions[i * 3 + 1] += v.y / this.scale;
                positions[i * 3 + 2] += v.z / this.scale;
                life[i] -= this.decay;
            }
            else {
                positions[i * 3] =
                    positions[i * 3 + 1] =
                    positions[i * 3 + 2] = 0;
                life[i] = 0.0;
            }
        }

        this.particleTimer += timeDelta;
        if (this.particleTimer > this.particleRate && this.loop) {
            this.particleTimer = 0;
            
            let p = life.findIndex(d => d <= 0);
            if (p != -1) {
                var index = p * 3;
                positions[index] = pos.x;
                positions[index + 1] = pos.y;
                positions[index + 2] = pos.z;
                life[p] = 6.0;
            }
        }

        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.life.needsUpdate = true;
    }

    remove(){
        this.particleEntity.remove();
    }
}