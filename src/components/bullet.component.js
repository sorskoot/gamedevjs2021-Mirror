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
        armed:{
            default:false            
        }
    },
    init: function () {
        this.direction = new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z)
        this.direction = this.direction.sub(this.el.object3D.position)
            .normalize()
            .multiplyScalar(this.data.speed);
        this.isMoving = true;

        this.el.object3D.lookAt(new THREE.Vector3(this.data.target.x, this.data.target.y, this.data.target.z),);
        this.el.setAttribute("raycaster", "far:.4;showLine:false;objects:.mirror,.enemy;direction:0 0 1");
        this.el.addEventListener('raycaster-intersection', (e) => {
            let elm = e.detail.els[0];
            if(elm.classList.contains("mirror")){
                var originalNormal = new THREE.Vector3(0, 0, 1);
                var objRotation = elm.parentEl.object3D.rotation;            
                this.direction.reflect(originalNormal.applyEuler(objRotation));
                let newTarget = this.el.object3D.position.clone().add(this.direction);
                this.el.object3D.lookAt(newTarget);
                this.data.armed = true;
            }
            if(elm.classList.contains("enemy") && this.data.armed ){
                elm.setAttribute("selfdestruct",{timer:500});
                this.el.setAttribute("selfdestruct",{timer:500});
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