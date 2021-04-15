const forwardVector = new THREE.Vector3(0, 0, 1);
const upVector = new THREE.Vector3(0, 1, 0);
const zeroVector = new THREE.Vector3(0, 0, 0);

AFRAME.registerComponent('bullet', {
    schema: {
        speed: {
            default: 10
        },
        target: {
            type: "vec3"
        }
    },
    init: function () {
        this.direction = new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z)
        this.direction = this.direction.sub(this.el.object3D.position)
            .normalize()
            .multiplyScalar(this.data.speed);
        this.isMoving = true;

        this.el.object3D.lookAt(new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z),);
        this.el.setAttribute("raycaster", "far:.4;showLine:false;objects:.mirror;direction:0 0 1");
        this.el.addEventListener('raycaster-intersection', (e) => {
            let elm = e.detail.els[0];
            console.log(elm.id);
            //var vec = forwardVector.clone().ransformDirection) ;//.applyQuaternion(this.el.parentEl.object3D.quaternion);            
            var originalNormal = new THREE.Vector3(0, 0, 1);
            var objRotation = elm.parentEl.object3D.rotation;
            ;
            this.direction.reflect(originalNormal.applyEuler(objRotation));
            let newTarget = this.el.object3D.position.clone().add(this.direction);
            this.el.object3D.lookAt(newTarget);
            // let explosion = document.createElement('a-entity');
            // explosion.setAttribute('position', elm.object3D.position);
            // explosion.setAttribute('explosion', '');
            // this.missilegroup.appendChild(explosion);
            //this.isMoving = false;
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