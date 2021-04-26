export const wave = [
    {
        enemy: [{ // WAVE 1
            type: 1,
            time: 1000,
            path: [
                new THREE.Vector3(-50, 0, -100),
                new THREE.Vector3(0, 10, -50),
                new THREE.Vector3(0, 15, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        }]
    },
    {// WAVE 2
        enemy: [{ 
            type: 1,
            time: 1000,
            path: [
                new THREE.Vector3(-50, 35, -100),
                new THREE.Vector3(0, 10, -50),
                new THREE.Vector3(0, 15, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        }]
    }
    ,

    {
        enemy: [{ // WAVE 3
            type: 1,
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
            type: 1,
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
            type: 2,
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 2,
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 1,
            time: 22000,
            path: [
                new THREE.Vector3(-50, 35, -100),
                new THREE.Vector3(-10, 10, -50),
                new THREE.Vector3(-8, -5, 0),
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
            type: 1,
            time: 22000,
            path: [
                new THREE.Vector3(50, 35, -100),
                new THREE.Vector3(10, 10, -50),
                new THREE.Vector3(8, -5, 0),
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
        }]
    },
    //*****-{ WAVE 4 }-*****
    {
        enemy: [{
            type: 3,
            time: 2000,
            path: [
                new THREE.Vector3(-50, 25, -100),
                new THREE.Vector3(0, 0, -80),
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 3,
            time: 3000,
            path: [
                new THREE.Vector3(-50, 25, -100),
                new THREE.Vector3(0, 0, -80),
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 3,
            time: 4000,
            path: [
                new THREE.Vector3(-50, 25, -100),
                new THREE.Vector3(0, 0, -80),
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 3,
            time: 10000,
            path: [
                new THREE.Vector3(50, 25, -100),
                new THREE.Vector3(0, 0, -80),
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 3,
            time: 11000,
            path: [
                new THREE.Vector3(50, 25, -100),
                new THREE.Vector3(0, 0, -80),
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        {
            type: 3,
            time: 12000,
            path: [
                new THREE.Vector3(50, 25, -100),
                new THREE.Vector3(0, 0, -80),
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
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        }, // 4B
        { 
            type: 1,
            time: 20000,
            path: [
                new THREE.Vector3(-50, 15, -100),
                new THREE.Vector3(-5, 10, -50),
                new THREE.Vector3(-5, 15, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },
        { 
            type: 1,
            time: 21000,
            path: [
                new THREE.Vector3(50, 15, -100),
                new THREE.Vector3(5, 10, -50),
                new THREE.Vector3(5, 15, 0),
                new THREE.Vector3(40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },
        { 
            type: 2,
            time: 22000,
            path: [
                new THREE.Vector3(-50, 15, -100),
                new THREE.Vector3(-5, 10, -50),
                new THREE.Vector3(-5, -5, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },
        { 
            type: 2,
            time: 23000,
            path: [
                new THREE.Vector3(50, 15, -100),
                new THREE.Vector3(5, 10, -50),
                new THREE.Vector3(5, -5, 0),
                new THREE.Vector3(40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },{ 
            type: 1,
            time: 24000,
            path: [
                new THREE.Vector3(-50, 15, -100),
                new THREE.Vector3(-5, 10, -50),
                new THREE.Vector3(-5, 15, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },
        { 
            type: 1,
            time: 25000,
            path: [
                new THREE.Vector3(50, 15, -100),
                new THREE.Vector3(5, 10, -50),
                new THREE.Vector3(5, 15, 0),
                new THREE.Vector3(40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        },
        { 
            type: 2,
            time: 26000,
            path: [
                new THREE.Vector3(-50, 15, -100),
                new THREE.Vector3(-5, 10, -50),
                new THREE.Vector3(-5, -5, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },
        { 
            type: 2,
            time: 27000,
            path: [
                new THREE.Vector3(50, 15, -100),
                new THREE.Vector3(5, 10, -50),
                new THREE.Vector3(5, -5, 0),
                new THREE.Vector3(40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },{ 
            type: 1,
            time: 28000,
            path: [
                new THREE.Vector3(-50, 15, -100),
                new THREE.Vector3(-5, 10, -50),
                new THREE.Vector3(-5, 15, 0),
                new THREE.Vector3(-40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]

        },
        { 
            type: 1,
            time: 29000,
            path: [
                new THREE.Vector3(50, 15, -100),
                new THREE.Vector3(5, 10, -50),
                new THREE.Vector3(5, 15, 0),
                new THREE.Vector3(40, 30, 20)
            ],
            triggerPoints: [
                {
                    isTriggered: false,
                    location: .05,
                    state: 1 // firing

                },
                {
                    isTriggered: false,
                    location: .35,
                    state: 0 // stop firing                
                }
            ]
        }]
    }
];