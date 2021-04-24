export default AFRAME.registerComponent('selfdestruct', {
    schema: {
        timer: { default: 5000 }
    },
    init: function () {
        this.timer = setTimeout(() => {
            this.el.remove();
        }, this.data.timer);
    },
    remove: function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
});