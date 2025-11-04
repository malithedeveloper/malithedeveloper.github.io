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
    const pageContainer = document.getElementById('page-container');
    pageContainer.classList.add('show-portfolio');
}

function closePortfolio() {
    const pageContainer = document.getElementById('page-container');
    pageContainer.classList.remove('show-portfolio');
}

function redirectDiscord() {
    alert("malidev")
}

document.getElementById("github").addEventListener("click", redirectGithub);
document.getElementById("info").addEventListener("click", redirectInfo);
document.getElementById("discord").addEventListener("click", redirectDiscord);
document.getElementById("portfolio-back").addEventListener("click", closePortfolio);

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

let symbols = ["!!", "᯼", "᯾", "O", "-", "+", "■", "♕", "✦", "☆", "♨", "◑", "★", "☘", "☣", "⚑", "⚡", "⛬", "☄", "<3"]
let titleRND = symbols[Math.floor(Math.random() * symbols.length)]
document.title = titleRND + " malidev " + titleRND

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