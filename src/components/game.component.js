import { sound } from "../utils/sound";
import { VecUtils } from "../utils/vecUtils";

const STATE = {
   TITLE: 1,
   PLAYING: 2,
   GAMEOVER: 3
}

AFRAME.registerComponent('game', {
   schema: {
      MaxHealth: { default: 10 },
      StartHealth: { type: "vec3", default: { x: 0, y: 0.145, z: 0.044 } },
      EndHealth: { type: "vec3", default: { x: 0, y: 0.076, z: 0.062 } }
   },
   init: function () {
      this.healthbar = document.getElementById("healthbar").object3D;
      this.scoreText = document.getElementById("score");
      this.musicGame = document.getElementById("music-game");
      this.musicTitle = document.getElementById("music-title");
      this.enemyGroup = document.getElementById("enemy-group");

      sound.init();
      this.updateState(STATE.TITLE);
      
      this.el.sceneEl.addEventListener('enter-vr', () => {
         this.updateState(STATE.PLAYING);

      })
      this.el.sceneEl.addEventListener('exit-vr', () => {
         this.updateState(STATE.TITLE);
      })

      //0 0.145 0.044 - DEATH
      //0 0.076 0.062 - BIRTH

      //THREE.MathUtils.lerp()
   },
   updateState: function (newState) {
      this.state = newState;
      switch (this.state) {
         case STATE.TITLE:
            this.musicGame.pause();
            this.musicTitle.volume = .6;
            this.musicTitle.loop = true
            this.musicTitle.currentTime = 4; // just skipping the loop point
            this.musicTitle.play();
            break;
         case STATE.PLAYING:
            this.musicTitle.pause();
            this.health = this.data.MaxHealth;
            this.score = 0;
            this.updateHealthBar();
            this.updateScore();
            this.musicGame.volume = 1;
            this.musicGame.loop = true
            this.musicGame.currentTime = 3.35; // just skipping the loop point
            this.musicGame.play();
            break;
         case STATE.GAMEOVER:
            this.musicGame.pause();
            this.musicTitle.currentTime = 4; // just skipping the loop point
            this.musicTitle.play();
            this.enemyGroup.innerHTML = '';           
            break;
      }
   },
   killEnemy:function(){
      this.score ++;
      this.updateScore();
   },
   hit: function () {
      sound.play(sound.hurt, this.el.object3D, true);
      this.health -= 1;
      this.updateHealthBar();

      if (this.health <= 0) {
         this.updateState(STATE.GAMEOVER);
      }
   },
   updateHealthBar: function () {
      const newPos = VecUtils.lerpVec(this.data.StartHealth, this.data.EndHealth, this.health / this.data.MaxHealth);
      this.healthbar.position.set(newPos.x, newPos.y, newPos.z);
   },
   updateScore(){
      this.scoreText.setAttribute("text",{value:this.score});
   }


});