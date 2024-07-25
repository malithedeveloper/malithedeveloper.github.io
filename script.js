function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

$(document).on('touchstart', function(e) {
    if (e.target.nodeName !== 'INPUT') {
        e.preventDefault();
    }
});

$(document).on('touchmove', function(e) {
    if (e.target.nodeName == 'INPUT') {
        e.preventDefault();
    }
});

if (isMobile()) {
    document.body.classList.add('no-scroll');
    const link = document.getElementById('dynamic-stylesheet');
    if (isMobile()) {
        link.href = 'style_mobile.css';
    } else {
        link.href = 'style.css';
    }
}

async function fetchLastUpdate() {
    try {
        const response = await fetch('https://api.github.com/repos/malithedeveloper/malithedeveloper.github.io/commits?per_page=1');
        const data = await response.json();
        if (data && data.length > 0) {
            const lastUpdate = new Date(data[0].commit.committer.date);
            const formattedDate = lastUpdate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const formattedTime = lastUpdate.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
            document.getElementById('last-update-date').textContent = `${formattedDate} ${formattedTime}`;
        } else {
            console.error('No commits found in the repository');
        }
    } catch (error) {
        console.error('Error fetching last update:', error);
    }
}

fetchLastUpdate();

function redirectGithub() {
    window.open("https://github.com/malithedeveloper", "_blank").focus();
}

function redirectInfo() {
    alert("coming soon")
}

function redirectDiscord() {
    alert("malidev")
}

document.getElementById("github").addEventListener("click", redirectGithub);
document.getElementById("info").addEventListener("click", redirectInfo);
document.getElementById("discord").addEventListener("click", redirectDiscord);

const blackFade = document.getElementById('black-fade');

function fadeOutAndRemove() {
    blackFade.classList.add('fade-out');

    setTimeout(() => {
        blackFade.remove();
    }, 4000);
}

fadeOutAndRemove();

if (!isMobile()) {
    const rainContainer = document.querySelector('.rain');
    const numberOfDrops = 200;

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        drop.style.left = `${Math.random() * 125}vw`;
        drop.style.animationDuration = `${Math.random() * 2 + 2}s`;
        drop.style.animationDelay = `${Math.random() * 1.5 }s`;
        rainContainer.appendChild(drop);
    }
}

function getRandomColor(currentTime) {
    const baseHue = (currentTime % (60 * 60)) / (60 * 60) * 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = 35 + Math.random() * 10;
    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
}

const colorFilter = document.createElement('div');
colorFilter.classList.add('color-filter');

document.body.appendChild(colorFilter);

function animateColorFilter() {
    const newColor = getRandomColor(Date.now());

    const animation = colorFilter.animate([{
        backgroundColor: newColor
    }], {
        duration: 10000,
        easing: 'ease-in-out',
        fill: 'forwards'
    });

    animation.onfinish = () => {
        animateColorFilter();
    };
}
animateColorFilter();

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = playPauseBtn.querySelector('i');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const randomizeButton = document.getElementById('randomize');
const loopButton = document.getElementById('loop');
const checkmarkIcon = document.getElementById('checkmark-icon');
const loopcheckmarkIcon = document.getElementById('loop-checkmark-icon');
let songs = [];
let symbols = ["!!", "᯼", "᯾", "O", "-", "+", "■", "♕", "✦", "♫", "♪", "☆", "♨", "◑", "★", "☘", "☣", "⚑", "⚡", "⛬", "☄", "<3"]
let songIndex = 0;
let randomize = false;
let loop = false;

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

const progressContainer = document.getElementById('progress-container');
progressContainer.addEventListener('click', setProgress);

let titleRND = symbols[Math.floor(Math.random() * symbols.length)]
document.title = titleRND + " malidev " + titleRND

async function toggleLoopButton() {

    if (loop) {
        loop = false;
        loopButton.style.color = 'white';
        loopButton.style.fontWeight = 'normal';
        loopcheckmarkIcon.style.opacity = 0;
    } else {
        loop = true;
        loopButton.style.color = 'white';
        loopButton.style.fontWeight = 'bold';
        loopcheckmarkIcon.style.opacity = 1;

        loopButton.classList.add('animate-click');
        setTimeout(() => {
            loopButton.classList.remove('animate-click');
        }, 500);
    }
    localStorage.setItem('loop', loop);
}

async function toggleRandomButton() {

    if (randomize) {
        randomize = false;
        randomizeButton.style.color = 'white';
        randomizeButton.style.fontWeight = 'normal';
        checkmarkIcon.style.opacity = 0;
    } else {
        randomize = true;
        randomizeButton.style.color = 'white';
        randomizeButton.style.fontWeight = 'bold';
        checkmarkIcon.style.opacity = 1;

        randomizeButton.classList.add('animate-click');
        setTimeout(() => {
            randomizeButton.classList.remove('animate-click');
        }, 500);
    }
    localStorage.setItem('randomize', randomize);
}

async function loadSongs() {
    try {
        const response = await fetch('songs.json');
        if (response.ok) {
            songs = await response.json();
            if (songs.length > 0) {
                const songList = songs.map((song) => {
                    return {
                        name: song.name,
                        path: song.path
                    };
                });
                songIndex = Math.floor(Math.random() * songs.length);
                loadSong(songIndex, songList);
            } else {
                console.error('No songs found in the /songs directory');
            }
        } else {
            console.error('Failed to load songs from /songs directory');
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

async function loadSong(index, songList) {
    if (index >= 0 && index < songList.length) {
        const song = songList[index];
        audio.src = song.path;
        songIndex = index;
        const songName = songList[index].name;
        const fileNameElement = document.getElementById('file-name');
        let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        let limit = isMobile() ? 25 : 35
        if (songName.length + 4 > limit) {
            fileNameElement.style.setProperty('--marquee-duration', `${isMobile() ? songName.length / 5 : songName.length / 20}s`);
            fileNameElement.innerHTML = `<marquee>${randomSymbol} ${songName} ${randomSymbol}</marquee>`;
        } else {
            fileNameElement.textContent = randomSymbol + " " + songName + " " + randomSymbol;
        }
        localStorage.setItem('lastPlayedSong', songIndex);
    } else {
        console.error(`Invalid song index: ${index}`);
    }
}

function playPauseAudio() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

playPauseBtn.addEventListener('click', playPauseAudio);

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', () => {
    if (randomize) {
        songIndex = Math.floor(Math.random() * songs.length);
        loadSong(songIndex, songs);
        audio.play();
    } else if (loop) {
        loadSong(songIndex, songs);
        audio.play();
    } else {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songIndex, songs);
        audio.play();
    }
});

volumeControl.addEventListener('input', (e) => {
    const volumeValue = e.target.value / 5;
    audio.volume = volumeValue;
    localStorage.setItem('volume', volumeValue);
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex, songs);
    audio.play();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex, songs);
    audio.play();
});

randomizeButton.addEventListener('click', toggleRandomButton);
loopButton.addEventListener('click', toggleLoopButton);

function loadSettings() {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        volumeControl.value = audio.volume * 10;
    }
    const savedRandomize = localStorage.getItem('randomize');
    if (savedRandomize !== null) {
        randomize = savedRandomize === 'true';
        randomizeButton.style.color = randomize ? 'white' : '';
        randomizeButton.style.fontWeight = randomize ? 'bold' : '';
        checkmarkIcon.style.opacity = randomize ? 1 : 0;
    }
    const savedLoop = localStorage.getItem('loop');
    if (savedLoop !== null) {
        loop = savedLoop === 'true';
        loopButton.style.color = loop ? 'white' : '';
        loopButton.style.fontWeight = loop ? 'bold' : '';
        loopcheckmarkIcon.style.opacity = loop ? 1 : 0;
    }
}

loadSettings();
loadSongs();

//const blackScreen = document.createElement('div');
//blackScreen.style.position = 'fixed';
//blackScreen.style.top = '0';
//blackScreen.style.left = '0';
//blackScreen.style.width = '100%';
//blackScreen.style.height = '100%';
//blackScreen.style.background = 'black';
//blackScreen.style.zIndex = '1000'; 
//blackScreen.style.display = 'none'; 
//blackScreen.innerHTML = '<div class="h1" style="color: white; display: flex; justify-content: center; align-items: center; text-align: center; min-height: 100vh; font-size:15px; animation: none !important; opacity: 1; transform: none; gap: 10px; letter-spacing: 20px;">Invalid Resolution</div>';

//document.body.appendChild(blackScreen);

//function checkResolution() {
//    if (isMobile()) return;
//    const screenWidth = window.innerWidth;
//    const screenHeight = window.innerHeight;
//    if (screenWidth < 840 || screenHeight < 670) {
//        blackScreen.style.display = 'block';
//    } else {
//        blackScreen.style.display = 'none';
//    }
//}
//checkResolution();
//if (!isMobile()) window.addEventListener('resize', checkResolution);