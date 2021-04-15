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
                .multiplyScalar(this.data.speed)                
    },
    update: function (oldData) { 

    },
    tick: function (time, timeDelta) {
        let deltaV = this.direction.clone().multiplyScalar(timeDelta/1000);
        this.el.object3D.position.add(deltaV);
    },
});