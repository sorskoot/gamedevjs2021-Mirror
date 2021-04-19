AFRAME.registerComponent('enemy-spawner', {
    schema: {
        spawnrate: {
            default: 30000
        },
        distance:{
            default: 25
        }
    },
    init: function () {
        this.enemygroup = document.getElementById("enemy-group");        
       // this.active = true;
       this.spawnEnemy();
        this.el.sceneEl.addEventListener('enter-vr', () => {
            this.active = true;
            this.spawnEnemy();
            this.interval = setInterval(this.spawnEnemy.bind(this), this.data.spawnrate);
        })
        this.el.sceneEl.addEventListener('exit-vr', () => {
            this.active = false;
            clearInterval(this.interval);            
        })
    },
    spawnEnemy:function(){
        let enemy = document.createElement("a-entity");
        enemy.classList.add('enemy');       
        enemy.setAttribute("enemy", '');       
        this.enemygroup.appendChild(enemy);
    }
});