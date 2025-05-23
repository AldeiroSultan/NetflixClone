// Place this file in a js folder in your project root

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('memory-video');
    const play = document.querySelector('.play-pause .play');
    const pause = document.querySelector('.play-pause .pause');
    const fullScreen = document.querySelector('.screen-size .full');
    const minimizedScreen = document.querySelector('.screen-size .minimized');
    const watchedTime = document.querySelector('.progress-bar .watched-time');
    const circle = document.querySelector('.progress-bar .circle');
    const progressBar = document.querySelector('.progress-bar');
    const volumeUp = document.querySelector('.volume .up');
    const volumeMuted = document.querySelector('.volume .muted');
    const controlsBar = document.querySelector('.bottom__video-control');
    const backToHome = document.getElementById('back-to-home');
    const goToCarousel = document.getElementById('go-to-carousel');
    const heartButton = document.getElementById('heart-button');
    const memoryTitle = document.getElementById('memory-title');
    const heartAnimationContainer = document.querySelector('.heart-animation-container');

    // Set video source from localStorage (or use default placeholder)
    const defaultVideo = "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4";
    const videoSrc = localStorage.getItem('currentVideo') || defaultVideo;
    const videoTitle = localStorage.getItem('currentVideoTitle') || "Our Special Memory";
    
    video.src = videoSrc;
    memoryTitle.textContent = videoTitle;

    // Navigate back to home page
    backToHome.addEventListener('click', function() {
        window.location.href = 'home.html';
    });

    // Navigate to carousel page - FIXED
    goToCarousel.addEventListener('click', function() {
        window.location.href = 'carousel.html';
    });

    // Heart animation
    heartButton.addEventListener('click', function() {
        // Create 12 hearts 
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart floating-heart';
            
            // Random position, scale, and delay
            const leftPos = Math.random() * 100;
            const scale = 0.5 + Math.random() * 1.5;
            const delay = Math.random() * 2;
            
            heart.style.left = leftPos + 'vw';
            heart.style.bottom = '5vh';
            heart.style.transform = `scale(${scale})`;
            heart.style.animationDelay = delay + 's';
            heart.style.color = '#e50914';
            heart.style.position = 'fixed';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'floatUp 4s ease-out forwards';
            
            heartAnimationContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 4000 + delay * 1000);
        }
    });

    // Play & Pause 
    window.playPause = function() {
        if(video.paused) {
            video.play();
            play.style.display = "none";
            pause.style.display = "block";
        } else {
            video.pause();
            play.style.display = "block";
            pause.style.display = "none";            
        }
    };

    // Change screen size fullscreen/minimized
    window.changeScreenSize = function() {
        if(document.fullscreenElement) {     
            document.exitFullscreen();
            fullScreen.style.display = "block";
            minimizedScreen.style.display = "none";  
        } else {        
            document.documentElement.requestFullscreen();
            fullScreen.style.display = "none";
            minimizedScreen.style.display = "block";
        }
    };

    // Forward 10 seconds
    window.forward = function() {
        video.currentTime += 10;
    };

    // Back 10 seconds
    window.back = function() {
        video.currentTime -= 10;
    };

    // Toggle mute
    window.volume = function() {
        if(video.muted) {
            video.muted = false;
            volumeUp.style.display = "block";
            volumeMuted.style.display = "none"; 
        } else {
            video.muted = true;
            volumeUp.style.display = "none";
            volumeMuted.style.display = "block"; 
        }
    };

    // Calculate watched time
    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const percentage = (video.currentTime / video.duration) * 100;
            watchedTime.style.width = percentage + "%";
            circle.style.left = percentage + "%";
        }
    });

    // Click on progress bar to seek
    progressBar.addEventListener('click', (e) => {
        if (video.duration) {
            const rect = progressBar.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            video.currentTime = position * video.duration;
        }
    });

    // Ended event - when video finishes, return to carousel
    video.addEventListener('ended', () => {
        // Wait 3 seconds and then redirect to carousel
        setTimeout(() => {
            window.location.href = 'carousel.html';
        }, 3000);
    });

    // Hide controls bar after 5 seconds
    let controlsTimeout;
    function showControls() {        
        clearTimeout(controlsTimeout);
        controlsBar.style.opacity = "1";
        hideControls();
    }

    function hideControls() {
        if(!video.paused) {
            controlsTimeout = setTimeout(() => {
                controlsBar.style.opacity = "0";
            }, 5000);
        }  
    }

    // Auto-play video when page loads
    window.addEventListener('load', function() {
        // Small delay to ensure everything is loaded
        setTimeout(function() {
            if (typeof playPause === 'function') {
                playPause();
            }
        }, 500);
    });

    // Show controls on mouse move
    document.addEventListener('mousemove', () => {
        showControls();
    });

    // Shortcuts
    document.addEventListener('keyup', (e) => {
        if(e.keyCode === 32) // Space
            playPause();

        if(e.keyCode === 37) // Left arrow
            back();

        if(e.keyCode === 39) // Right arrow
            forward();

        if(e.keyCode === 70) // F
            changeScreenSize();

        if(e.keyCode === 77) // M
            volume();

        if(e.keyCode === 27) // Esc
            window.location.href = 'home.html';

        if(e.keyCode === 72) // H (Heart)
            heartButton.click();

        showControls();
    });
});