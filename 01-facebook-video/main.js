// --- ASYNCHRONOUS YOUTUBE API LOAD ---
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/** * Pool of YouTube Video IDs for random rotation 
 */
const videoPool = ['U8d08njnRY8', 'ujNoJ69GTbo', 'MR5WhvqVaNA', 'Yy6fByUmPuE', 'Fo46CIFw5Fo', 'URT_pX74_qA'];

/** Global storage for Player instances and Interaction counters indexed by ID */
const players = {};
const counters = {};

/** * Selects a random video ID from the videoPool array.
 * @returns {string} A random YouTube Video ID.
 */
const getRandomVideo = () => videoPool[Math.floor(Math.random() * videoPool.length)];

/**
 * Required function by the YouTube API. It executes automatically once the API is fully loaded.
 * Initializes a player for every div whose ID starts with "main-video-"
 */
function onYouTubeIframeAPIReady() {
    const videoElements = document.querySelectorAll('[id^="main-video-"]');

    if (videoElements.length === 0) {
        console.error("No video containers found. Check the IDs in your HTML.");
        return;
    }

    videoElements.forEach((element) => {
        const cid = element.id; // Container ID (e.g., main-video-1)
        const randomVid = getRandomVideo();
        
        counters[cid] = 0; // Initialize interaction counter for this specific banner

        // YouTube Player instance configuration
        players[cid] = new YT.Player(cid, {
            width: '100%',
            height: '100%',
            videoId: randomVid,
            playerVars: {
                'autoplay': 1,
                'mute': 1,
                'controls': 0,
                'loop': 1,
                'playlist': randomVid,
                'playsinline': 1,
                'rel': 0,
                'modestbranding': 1
            },
            events: {
                'onReady': (event) => {
                    event.target.playVideo();
                },
                'onStateChange': (event) => onPlayerStateChange(event, cid)
            }
        });

        const banner = element.closest('[id^="banner-container"]');
        if (banner) {
            banner.dataset.targetUrl = `https://www.youtube.com/watch?v=${randomVid}`;
        }
    });
}

/**
 * Increments the interaction counter and updates the UI.
 * @param {string} cid - The ID of the video container.
 */
function updateCounter(cid) {
    if (!counters.hasOwnProperty(cid)) counters[cid] = 0;
    counters[cid]++;
    
    const banner = document.getElementById(cid).closest('[id^="banner-container"]');
    const counterEl = banner.querySelector('[id^="interaction-counter-"]');
    
    if (counterEl) {
        counterEl.innerText = `Interactions: ${counters[cid]}`;
    }
}

/**
 * EVENT LISTENERS SETUP
 */
document.addEventListener('DOMContentLoaded', () => {
    const clickLayers = document.querySelectorAll('.click-layer');
    clickLayers.forEach(layer => {
        layer.addEventListener('click', (event) => {
            goToURL(event);
        });
    });

    const controlButtons = document.querySelectorAll('.controls-overlay button');
    controlButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const action = button.getAttribute('data-action');
            videoAction(event, action);
        });
    });
});

/**
 * Monitors YouTube Player state changes (Play, Pause, etc.).
 * @param {Object} event - The event object from YouTube API.
 * @param {string} cid - The ID of the container.
 */
function onPlayerStateChange(event, cid) {
    if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.PAUSED) {
        console.log(`State change detected in ${cid}`);
    }
}

/**
 * Global Handler for manual UI controls (Play/Pause/Mute buttons).
 * @param {Event} event - The click event object.
 * @param {string} action - The action to perform: 'play', 'pause', or 'mute'.
 */
window.videoAction = (event, action) => {
    event.stopPropagation(); // Prevents click from bubbling up to the redirection layer
    
    const banner = event.currentTarget.closest('[id^="banner-container"]');
    const videoDiv = banner.querySelector('[id^="main-video-"]');
    const cid = videoDiv.id;
    const player = players[cid];

    if (player && typeof player.playVideo === 'function') {
        if (action === 'play') player.playVideo();
        if (action === 'pause') player.pauseVideo();
        if (action === 'mute') player.isMuted() ? player.unMute() : player.mute();
        updateCounter(cid);
    } else {
        console.warn("YouTube Player is not ready yet.");
    }
};

/**
 * Handles external redirection when the user clicks the banner area.
 * @param {Event} event - The click event object.
 */
window.goToURL = (event) => {
    event.stopPropagation();
    
    const banner = event.currentTarget.closest('[id^="banner-container"]');
    const videoDiv = banner.querySelector('[id^="main-video-"]');
    const url = banner.dataset.targetUrl || "https://www.youtube.com";
    
    updateCounter(videoDiv.id);
    window.open(url, '_blank');
};