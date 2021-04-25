import { wave } from "../utils/waves";

AFRAME.registerComponent('enemy-spawner', {
    schema: {
        active: { default: false },
        spawnrate: {
            default: 30000
        },
        distance: {
            default: 25
        },
        currentWave: {
            default: 0
        }
    },
    init: function () {
        this.enemygroup = document.getElementById("enemy-group");
        this.intervals = [];
    },
    update: function (data) {
        if (this.data.active === data.active &&
            this.data.currentWave === data.currentWave) return;
        if (this.data.active == true) {
            this.intervals.length = 0;
            for (let index = 0; index < wave[this.data.currentWave].enemy.length; index++) {
                this.intervals.push(setTimeout((n) => this.spawnEnemy(n), wave[this.data.currentWave].enemy[index].time, index));
            }
        } else {
            for (let i = 0; i < this.intervals.length; i++) {
                clearInterval(this.intervals[i]);
            }
        }
    },
    nextWave() {
        this.data.currentWave++;
        if (this.data.currentWave > wave.length) {
            this.data.currentWave = 0;
        }
        return this.el.setAttribute("enemy-spawner", { "currentWave": this.data.currentWave });
    },
    spawnEnemy: function (index) {
        let enemy = document.createElement("a-entity");
        enemy.classList.add('enemy');
        const currentEnemy = wave[this.data.currentWave].enemy[index];

        enemy.setAttribute("enemy", { type: currentEnemy.type });
        enemy.components["enemy"].setup(currentEnemy.path, currentEnemy.triggerPoints);

        this.enemygroup.appendChild(enemy);
    }
});