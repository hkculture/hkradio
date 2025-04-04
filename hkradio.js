// Radio station streams (replace with actual streams)
const stations = {
    rthk1: {
        name: "香港電台第一台",
        logo: "https://cdn.webrad.io/images/logos/radios-hk/rthk-1.png",
        stream: "https://rthkaudio1-lh.akamaihd.net/i/radio1_1@355864/index_56_a-p.m3u8"
    },
    rthk2: {
        name: "香港電台第二台",
        logo: "https://www.rthk.hk/img/apple-icon-114x114.png",
        stream: "https://rthkaudio2-lh.akamaihd.net/i/radio2_1@355865/index_56_a-p.m3u8"
    },
    metro1: {
        name: "新城知訊台",
        logo: "https://cdn.instant.audio/images/logos/radios-hk/metro-showbiz-fm.png",
        stream: "https://1849807346.rsc.cdn77.org/1849807346/tracks-a1/mono.ts.m3u8"
    },
    metro2: {
        name: "新城財經台",
        logo: "https://cdn.instant.audio/images/logos/radios-hk/metro-finance-fm.png",
        stream: "https://1864288729.rsc.cdn77.org/1864288729/tracks-a1/mono.m3u8"
    },
    cr1: {
        name: "雷霆881",
        logo: "https://www.881903.com/share.png",
        stream: "https://playlist.881903.com/web/v4/881hd/playlist.js?t=1743572587&n1=37beb1d13332bcd5ee28&n2=UiDf8%2F91DivRkgCXqSfvbWlgJuc%3D"
    },
    cr2: {
        name: "叱咤903",
        logo: "https://upload.wikimedia.org/wikipedia/zh/6/62/Commercial_Radio_Hong_Kong_Logo.png",
        stream: "https://stream.radio.co/s9e5e7d7f9/listen"
    },
    rthk3: {
        name: "香港電台第三台",
        logo: "https://www.rthk.hk/img/apple-icon-114x114.png",
        stream: "https://rthkaudio3-lh.akamaihd.net/i/radio3_1@355866/index_56_a-p.m3u8"
    },
    rthk4: {
        name: "香港電台第四台",
        logo: "https://www.rthk.hk/img/apple-icon-114x114.png",
        stream: "https://rthkradio4-live.akamaized.net/hls/live/2040080/radio4/master.m3u8"
    },
    rthk5: {
        name: "香港電台第五台",
        logo: "https://www.rthk.hk/img/apple-icon-114x114.png",
        stream: "https://rthkaudio5-lh.akamaihd.net/i/radio5_1@355868/index_56_a-p.m3u8"
    },
    rthk_pth: {
        name: "香港電台普通話台",
        logo: "https://webstatic.rthk.hk/img/radio_icon/ChannelPage_Logo/radio_PTH_logo.svg",
        stream: "https://rthkradiopth-live.akamaized.net/hls/live/2040082/radiopth/master.m3u8"
    },
    metro1044: {
        name: "Metro Plus AM1044",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMHNUQklLiwV95JbCYaxW22hy5mMqCqxm1w&usqp=CAU",
        stream: "http://162.220.162.10:8011/stream"
    },
    ufm1007: {
        name: "澳門電台 FM100.7",
        logo: "https://cdn.sao.fm/wp-content/uploads/20240115003259241.jpg",
        stream: "https://mo.ufofm.com/live/rch2.live/chunklist_w905210118.m3u8?audio"
    },
    vfm995: {
        name: "澳門綠邨電台",
        logo: "https://www.vfm995.com/webpage/pcplay.png",
        stream: "https://fm995.ddns.net/hls1/fm995.m3u8"
    },
};

// DOM elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeControl = document.getElementById('volumeControl');
const currentStationLogo = document.getElementById('currentStationLogo');
const currentStationName = document.getElementById('currentStationName');
const playerBar = document.getElementById('playerBar');
const stationElements = document.querySelectorAll('.station');

// Current station
let currentStation = null;
let isPlaying = false;

// Set initial volume
audioPlayer.volume = volumeControl.value;

// Volume control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

// Play/pause button
playPauseBtn.addEventListener('click', togglePlayPause);

// Station click handlers
stationElements.forEach(station => {
    station.addEventListener('click', () => {
        const stationId = station.getAttribute('data-station');
        playStation(stationId);
    });
});

// Play a station
function playStation(stationId) {
    const station = stations[stationId];
    if (!station) return;
    
    currentStation = station;
    audioPlayer.src = station.stream;
    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            updatePlayerUI();
        })
        .catch(error => {
            console.error('播放失敗:', error);
            alert('無法播放電台，請檢查網絡連接或嘗試其他電台');
        });
    
    // Update UI
    currentStationLogo.src = station.logo;
    currentStationName.textContent = station.name;
    
    // Show player bar if hidden
    playerBar.style.display = 'flex';
}

// Toggle play/pause
function togglePlayPause() {
    if (!currentStation) return;
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
            })
            .catch(error => {
                console.error('播放失敗:', error);
            });
    }
    
    updatePlayerUI();
}

// Update player UI
function updatePlayerUI() {
    playPauseBtn.textContent = isPlaying ? '⏸️' : '▶️';
}

// Initialize - hide player bar if no station is playing
playerBar.style.display = 'none';