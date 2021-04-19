AFRAME.registerComponent('game', {
   schema: {},
   init: function () { 
      this.musicGame = document.getElementById("music-game");
      this.el.sceneEl.addEventListener('enter-vr', () => {
         this.musicGame.play();
     })
     this.el.sceneEl.addEventListener('exit-vr', () => {
         this.musicGame.pause();
     })
   },
   update: function (oldData) { },
   tick: function (time, timeDelta) { },
   tock: function (time, timeDelta, camera){ },
   remove: function () { },
   pause: function () { },
   play: function () { },
   updateSchema: function(data) { }
});