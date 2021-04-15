export default AFRAME.registerComponent('selfdestruct', {
    schema: {
        timer: { default: 5000 }
    },
    init: function () {
        setTimeout(() => {
            this.el.remove();
        }, this.data.timer);
    }
});