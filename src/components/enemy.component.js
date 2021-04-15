AFRAME.registerComponent('enemy', {
    schema: {},
    init: function () {
        this.el.setAttribute('mixin', 'enemy-mixin');
        let position = new THREE.Vector3(
            Math.sin(Math.random() * Math.PI * 2) * 25,
            10,
            Math.cos(Math.random() * Math.PI * 2) * 25
        );
        this.el.setAttribute("position", position);
    },
    update: function (oldData) { },
    tick: function (time, timeDelta) { },
});