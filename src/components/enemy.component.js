AFRAME.registerComponent('enemy', {
    schema: {
        fireRate: {
            default: 2000
        }
    },
    init: function () {
        this.bulletgroup = document.getElementById("bullet-group");
        this.el.setAttribute('mixin', 'enemy-mixin');
        let position = new THREE.Vector3(
            Math.sin(Math.random() * Math.PI) * 25,
            10,
            -Math.abs(Math.cos(Math.random() * Math.PI) * 25)
        );
        this.el.setAttribute("position", position);
        this.timer = setInterval(this.fire.bind(this), this.data.fireRate);
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) { },
    remove:function(){
        clearInterval(this.timer);
    },
    fire: function () {
        let bullet = document.createElement("a-entity");
        let left = document.getElementById('left-hand').object3D.position;
        let right = document.getElementById('right-hand').object3D.position;
        let target = left.add(right).multiplyScalar(.5);
        bullet.setAttribute("bullet", { target });
        bullet.setAttribute("selfdestruct", { timer: 6000 });
        bullet.setAttribute("mixin", "bullet-mixin");
        bullet.setAttribute("geometry","primitive: box; width: .35; height: .35; depth: 6")        
        bullet.setAttribute("position", this.el.object3D.position);
        this.bulletgroup.appendChild(bullet);
    }
});