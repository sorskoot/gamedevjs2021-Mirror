import Particles from "../utils/particles";
import { sound } from "../utils/sound";

const forwardVector = new THREE.Vector3(0, 0, 1);
const upVector = new THREE.Vector3(0, 1, 0);
const zeroVector = new THREE.Vector3(0, 0, 0);

AFRAME.registerComponent('bullet', {
    schema: {
        speed: {
            default: 30
        },
        target: {
            type: "vec3"
        },
        armed: {
            default: false
        }
    },
    init: function () {
        this.explosionGroup = document.getElementById('explosion-group');
        this.direction = new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z)
        this.direction = this.direction.sub(this.el.object3D.position)
            .normalize()
            .multiplyScalar(this.data.speed);
        this.isMoving = true;

        this.el.object3D.lookAt(new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z),);
        this.el.setAttribute("raycaster", "far:.8;showLine:false;objects:.player-hitbox,.mirror,.enemy;direction:0 0 1");
        this.el.addEventListener('raycaster-intersection', (e) => {
            let elm = e.detail.els[0];
            if (elm.classList.contains("mirror")) {
                var originalNormal = new THREE.Vector3(0, 0, 1);
                var objRotation = elm.parentEl.object3D.rotation;
                this.direction.reflect(originalNormal.applyEuler(objRotation));
                let newTarget = this.el.object3D.position.clone().add(this.direction);
                this.el.object3D.lookAt(newTarget);
                this.data.armed = true;
                sound.play(sound.fire, this.el.object3D);
                elm.parentEl.components.haptics.pulse(0.5, 100);
            }
            if (elm.classList.contains("enemy") && this.data.armed) {
                let explosion = document.createElement('a-entity');
                explosion.setAttribute('position', elm.object3D.position);
                explosion.setAttribute('explosion', { decay: .1, scale: 20 });
                this.explosionGroup.appendChild(explosion);
                
                sound.play(sound.explosion, this.el.object3D);
                elm.setAttribute("selfdestruct", { timer: 1 });
                this.el.setAttribute("selfdestruct", { timer: 1 });
                this.el.sceneEl.components["game"].killEnemy();
            }
            if(elm.classList.contains("player-hitbox")){
                this.el.sceneEl.components["game"].hit();
            }
        });
    },
    update: function (oldData) {

    },
    tick: function (time, timeDelta) {
        if (!this.isMoving) return;
        let deltaV = this.direction.clone().multiplyScalar(timeDelta / 1000);

        this.el.object3D.position.add(deltaV);
    },
});