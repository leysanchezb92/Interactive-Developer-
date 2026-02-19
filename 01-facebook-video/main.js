// Configuración de Videos
const videoPool = ['U8d08njnRY8', 'ujNoJ69GTbo', 'MR5WhvqVaNA', 'Yy6fByUmPuE', 'Fo46CIFw5Fo', 'URT_pX74_qA'];
const players = {};
const counters = {};

// Función para obtener un video aleatorio del array
const getRandomVideo = () => videoPool[Math.floor(Math.random() * videoPool.length)];

// API de YouTube
function onYouTubeIframeAPIReady() {
    const videoElements = document.querySelectorAll('.youtube-player');

    videoElements.forEach((element) => {
        const cid = element.id;
        const randomVid = getRandomVideo();
        
        counters[cid] = 0;

        players[cid] = new YT.Player(cid, {
            width: '100%',
            height: '100%',
            videoId: randomVid,
            playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                loop: 1,
                playlist: randomVid,
                playsinline: 1
            },
            events: {
                onStateChange: (event) => onPlayerStateChange(event, cid)
            }
        });

        // Guardamos la URL de destino dinámica en el contenedor padre
        const banner = element.closest('[id^="banner-container"]');
        if (banner) {
            banner.dataset.targetUrl = `https://www.youtube.com/watch?v=${randomVid}`;
        }
    });
}

// Lógica de Interacciones
function updateCounter(cid) {
    counters[cid]++;
    const counterId = cid.replace('main-video', 'interaction-counter');
    const counter = document.getElementById(counterId);
    if (counter) counter.innerText = `Interacciones: ${counters[cid]}`;
}

function onPlayerStateChange(event, cid) {
    if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.PAUSED) {
        updateCounter(cid);
    }
}

// Acciones de Usuario
window.videoAction = (event, action) => {
    event.stopPropagation();
    const banner = event.target.closest('[id^="banner-container"]');
    const videoId = banner.querySelector('.youtube-player').id;
    const player = players[videoId];

    if (player) {
        if (action === 'play') player.playVideo();
        if (action === 'pause') player.pauseVideo();
        if (action === 'mute') player.isMuted() ? player.unMute() : player.mute();
        updateCounter(videoId);
    }
};

window.goToURL = (event) => {
    event.stopPropagation();
    const banner = event.target.closest('[id^="banner-container"]');
    const videoId = banner.querySelector('.youtube-player').id;
    const url = banner.dataset.targetUrl;
    
    updateCounter(videoId);
    window.open(url, '_blank');
};