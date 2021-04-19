AFRAME.registerComponent('enemy', {
    schema: {
        fireRate: {
            default: 500
        },
        duration: {
            default: 15000
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
        this.t = 0;
        this.lookAt = new THREE.Vector3();
    },
    setup: function (points, triggerPoints) {
        this.curve = new THREE.CatmullRomCurve3(points, true);

        this.triggerPoints = triggerPoints;
    },
    update: function (oldData) { },

    tick: function (time, timeDelta) {

        if (!this.curve) return;

        this.t += timeDelta;
        if (this.t > this.data.duration) {
            this.t = 0;
            this.triggerPoints.forEach(t => t.isTriggered = false);
        }
        let point = this.t / this.data.duration;
        let tp = this.triggerPoints.filter(t => !t.isTriggered
            && point >= t.location)[0];
        if (tp) {
            tp.isTriggered = true;
            switch (tp.state) {
                case 0: this.stopFiring(); break;
                case 1: this.startFiring(); break;
            }
        }
        this.curve.getPointAt(point, this.el.object3D.position)
        this.curve.getPointAt(Math.min(point + .001, 1), this.lookAt);
        this.el.object3D.lookAt(this.lookAt);
    },
    remove: function () {
        clearInterval(this.timer);
    },
    fire: function () {
        let bullet = document.createElement("a-entity");
        let target = document.getElementById('camera').object3D.position.clone();
        target.y -= .5;
        bullet.setAttribute("bullet", { target });
        bullet.setAttribute("selfdestruct", { timer: 6000 });
        bullet.setAttribute("mixin", "bullet-mixin");
        bullet.setAttribute("geometry", "primitive: box; width: .35; height: .35; depth: 6")
        bullet.setAttribute("position", this.el.object3D.position);
        this.bulletgroup.appendChild(bullet);
    },
    startFiring: function () {
        this.timer = setInterval(
            this.fire.bind(this),
            this.data.fireRate);
    },
    stopFiring: function () {
        clearInterval(this.timer);
    }

});