const wave = {
    enemy: [{

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
}

AFRAME.registerComponent('enemy-spawner', {
    schema: {
        active: { default: false },
        spawnrate: {
            default: 30000
        },
        distance: {
            default: 25
        }
    },
    init: function () {
        this.enemygroup = document.getElementById("enemy-group");
    },
    update: function (data) {
        if (this.data.active === data.active) return;
        if (this.data.active == true) {
            for (let index = 0; index < wave.enemy.length; index++) {
                setTimeout((n) => this.spawnEnemy(n), wave.enemy[index].time, index);
            }
        } else {
            clearInterval(this.interval);
        }

    },
    spawnEnemy: function (index) {
        let enemy = document.createElement("a-entity");
        enemy.classList.add('enemy');
        enemy.setAttribute("enemy", {type:2});

        enemy.components["enemy"].setup(wave.enemy[index].path, wave.enemy[index].triggerPoints);

        this.enemygroup.appendChild(enemy);
    }
});