const wave = [{
    enemy: [{
        type:1,
        time: 4000,
        path: [
            new THREE.Vector3(-50, 35, -100),
            new THREE.Vector3(0, 30, -80),
            new THREE.Vector3(0, 15, 0),
            new THREE.Vector3(-40, 30, 20)
        ],
        triggerPoints: [
            {
                isTriggered: false,
                location: .1,
                state: 1 // firing

            },
            {
                isTriggered: false,
                location: .3,
                state: 0 // stop firing                
            }
        ]
    },
    {
        type:1,
        time: 5000,        
        path: [
            new THREE.Vector3(50, 35, -100),
            new THREE.Vector3(0, 30, -80),
            new THREE.Vector3(0, 15, 0),
            new THREE.Vector3(40, 30, 20)
        ],
        triggerPoints: [
            {
                isTriggered: false,
                location: .1,
                state: 1 // firing

            },
            {
                isTriggered: false,
                location: .3,
                state: 0 // stop firing                
            }
        ]
    },
    {
        type:2,
        time: 10000,
        path: [
            new THREE.Vector3(50, 35, -100),
            new THREE.Vector3(-20, -30, -80),
            new THREE.Vector3(0, 15, 0),
            new THREE.Vector3(40, 30, 20)
        ],
        triggerPoints: [
            {
                isTriggered: false,
                location: .1,
                state: 1 // firing

            },
            {
                isTriggered: false,
                location: .3,
                state: 0 // stop firing                
            }
        ]
    },
    {
        type:2,
        time: 12000,
        path: [
            new THREE.Vector3(-50, 35, -100),
            new THREE.Vector3(20, -30, -80),
            new THREE.Vector3(0, 15, 0),
            new THREE.Vector3(-40, 30, 20)
        ],
        triggerPoints: [
            {
                isTriggered: false,
                location: .1,
                state: 1 // firing

            },
            {
                isTriggered: false,
                location: .3,
                state: 0 // stop firing                
            }
        ]
    }]
}];

AFRAME.registerComponent('enemy-spawner', {
    schema: {
        active: { default: false },
        spawnrate: {
            default: 30000
        },
        distance: {
            default: 25
        },
        currentWave:{
            default:0
        }
    },
    init: function () {
        this.enemygroup = document.getElementById("enemy-group");
    },
    update: function (data) {
        if (this.data.active === data.active) return;
        this.data.intervals = [];
        if (this.data.active == true) {
            for (let index = 0; index < wave[this.data.currentWave].enemy.length; index++) {
                this.data.intervals.push(setTimeout((n) => this.spawnEnemy(n), wave[this.data.currentWave].enemy[index].time, index));
            }
        } else {
            for (let i = 0; i < this.data.intervals.length; i++) {
                clearInterval(this.intervals[i]);                    
            }            
        }

    },
    spawnEnemy: function (index) {
        let enemy = document.createElement("a-entity");
        enemy.classList.add('enemy');
        enemy.setAttribute("enemy", {type:2});

        enemy.components["enemy"].setup(wave[this.data.currentWave].enemy[index].path, wave[this.data.currentWave].enemy[index].triggerPoints);

        this.enemygroup.appendChild(enemy);
    }
});