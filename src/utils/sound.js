let audiopool = [];
let pannerNodes = [];

// change this so the audio context gets (loaded if not already) 
// when the game actually starts.
let audioContext;
let soundfx = [];

async function loadBuffer(context, filepath) {
    // /* use `fs` to consume the path and read our asset */
    // const reader = fs.readFileSync(pathToAsset, 'utf8')
    // let buffer = new ArrayBuffer(reader.length);
    // for (var i=0, strLen=reader.length; i < strLen; i++) {
    //     buffer[i] = reader.charCodeAt(i);
    //   }
    let response = await fetch(filepath);
    let buffer = await response.arrayBuffer();
    return new Promise((res, rej) => {
        context.decodeAudioData(buffer, function (theBuffer) {
            res(theBuffer);
        }, function (err) {
            rej(err);
        });
    })
}

function InitAudio() {
    //     if (audioContext) return;
    audioContext = new AudioContext();
    soundfx = [
        new SoundEffect("57uBnWWtFsZwr1GJYtKMtep4ZttcBaMsM2aEW2fWL784TXxuCYZXXiXrcehRugWhnSnHt4KK69Q6QEBNFMXjyuktFe5poNBM7yYnMxVTRKCshvAkUvqddQ44F").generate().buffer,
        new SoundEffect("8hHRQjxayu8gTDQwSNPEewuEjf4vkVq6jLv9BYuNUYh8swqUbVARL5Rqif7EsT62KB1ePgHLRAsUan8Y3KZA4LGjUp67om75zbFbWjzHSGmzHkFseQETWJ4Ej").generate().buffer,
    ];

    loadBuffer(audioContext, './sfx/hurt.mp3').then(x => {
        soundfx.push(x.getChannelData(0));
    });

    //   audioContext.listener.upX.value = 0;
    audioContext.listener.upY.value = 1;
    //  audioContext.listener.upZ.value = 0;

    let gain = audioContext.createGain();
    gain.connect(audioContext.destination);

    for (let i = 0; i < 25; i++) {
        //  const audio = new AudioBuffer();

        //   audiopool.push(audio);
        // const element = audioContext.createMediaElementSource(audio);
        const pn = new PannerNode(audioContext, {
            panningModel: 'HRTF',
            distanceModel: 'exponential',
        });

        //   element.connect(pn);
        pn.connect(gain);
        pannerNodes.push(pn);
    }
}
let currentSfxIndex = 0;



export const sound = {
    init: InitAudio,
    play: function (params, p, random) {
        let pos = p.getWorldPosition(zeroVector);
        pannerNodes[currentSfxIndex].positionX.value = pos.x;
        pannerNodes[currentSfxIndex].positionY.value = pos.y;
        pannerNodes[currentSfxIndex].positionZ.value = pos.z;

        var n = new AudioBufferSourceNode(audioContext);
        n.buffer = new AudioBuffer({ length: soundfx[params].length, sampleRate: 44100, numberOfChannels: 1 })
        n.buffer.copyToChannel(soundfx[params], 0);
        n.connect(pannerNodes[currentSfxIndex]);
        if (random) {
            n.detune.value = (Math.random() * 500) - 250;
        }
        n.start();
        // audiopool[currentSfxIndex].buffer = soundfx[params];
        // audiopool[currentSfxIndex].play();
        currentSfxIndex = (currentSfxIndex + 1) % 25;
        // switch (params) {
        //     case 1:
        //         s.getAudio().play();
        //         break;
        //     case 2:
        //         explosion_sfx.getAudio().play();
        //         break;
        // }
    },
    fire: 0,
    explosion: 1,
    hurt: 2,
}
