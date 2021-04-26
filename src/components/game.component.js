import { sound } from "../utils/sound";
import { VecUtils } from "../utils/vecUtils";
import { wave } from "../utils/waves";

const STATE = {
   NOTXR: 0,
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
      this.bulletGroup = document.getElementById("bullet-group");
      this.screenNotXR = document.getElementById("EnterXR");
      this.screenTitle = document.getElementById("TitleScreen");
      this.screenGameOver = document.getElementById("GameOverScreen");
      this.lefthand = document.getElementById("left-hand");
      this.righthand = document.getElementById("right-hand");
      this.spawner = this.el.sceneEl.components["enemy-spawner"];
      sound.init();
      this.updateState(STATE.NOTXR);

      this.el.sceneEl.addEventListener('enter-vr', () => {
         this.updateState(STATE.TITLE);

      })
      this.el.sceneEl.addEventListener('exit-vr', () => {
         this.updateState(STATE.NOTXR);
      })

      //0 0.145 0.044 - DEATH
      //0 0.076 0.062 - BIRTH

      //THREE.MathUtils.lerp()
   },
   updateState: function (newState) {
      if (this.state === newState) return;
      this.state = newState;
      switch (this.state) {
         case STATE.NOTXR:
            this.screenNotXR.setAttribute("visible", "true")
            this.screenTitle.setAttribute("visible", "false")
            this.screenGameOver.setAttribute("visible", "false")
            this.lefthand.setAttribute("visible", "false");
            this.righthand.setAttribute("visible", "false");
            this.el.sceneEl.setAttribute("enemy-spawner", { active: false });
            this.enemyGroup.innerHTML = '';
            this.bulletGroup.innerHTML = '';
            this.musicGame.pause();
            this.musicTitle.pause();
            break;
         case STATE.TITLE:
            this.screenNotXR.setAttribute("visible", "false")
            this.screenTitle.setAttribute("visible", "true")
            this.screenGameOver.setAttribute("visible", "false")
            this.lefthand.setAttribute("visible", "true");
            this.righthand.setAttribute("visible", "true");
            this.musicGame.pause();
            this.musicTitle.volume = .6;
            this.musicTitle.loop = true
            this.musicTitle.currentTime = 4; // just skipping the loop point
            this.musicTitle.play();
            this.el.sceneEl.setAttribute("enemy-spawner", { active: false });
            break;
         case STATE.PLAYING:
            this.enemyGroup.innerHTML = '';
            this.screenNotXR.setAttribute("visible", "false");
            this.screenTitle.setAttribute("visible", "false");
            this.screenGameOver.setAttribute("visible", "false");
            this.lefthand.setAttribute("visible", "true");
            this.righthand.setAttribute("visible", "true");
            this.musicTitle.pause();
            this.health = this.data.MaxHealth;
            this.score = 0;
            this.updateHealthBar();
            this.updateScore();
            this.musicGame.volume = 1;
            this.musicGame.loop = true
            this.musicGame.currentTime = 3.35; // just skipping the loop point
            this.musicGame.play();
            this.el.sceneEl.setAttribute("enemy-spawner", { 
               active: true,
               currentWave:0
            });
            this.leftInWave = wave[0].enemy.length;
            break;
         case STATE.GAMEOVER:
            this.screenNotXR.setAttribute("visible", "false");
            this.screenTitle.setAttribute("visible", "false");
            this.screenGameOver.setAttribute("visible", "true");
            this.lefthand.setAttribute("visible", "true");
            this.righthand.setAttribute("visible", "true");
            this.musicGame.pause();
            this.musicTitle.currentTime = 4; // just skipping the loop point
            this.musicTitle.play();
            document.querySelectorAll('.enemy').forEach(
               e => e.setAttribute('selfdestruct', { timer: 100 })
            )
            this.bulletGroup.innerHTML = '';
            this.el.sceneEl.setAttribute("enemy-spawner", { active: false });
            break;
      }
   },
   killEnemy: function () {
      this.score++;
      this.updateScore();
      this.leftInWave--;
      if(this.leftInWave===0){         
         this.leftInWave = wave[this.el.sceneEl.components["enemy-spawner"].nextWave()].enemy.length
      }
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
   updateScore() {
      this.scoreText.setAttribute("text", { value: this.score });
   },
   trigger: function () {
      if (this.state === STATE.TITLE || this.state === STATE.GAMEOVER) {
         this.updateState(STATE.PLAYING);
      }
   }
});