// Place this file in a js folder in your project root

document.addEventListener('DOMContentLoaded', function() {
    // Make tiles clickable and redirect to player
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            // Get video source and title
            const videoSrc = this.getAttribute('data-video') || 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4';
            const title = this.querySelector('.tile__title').textContent || 'Our Memory';
            
            // Store in localStorage
            localStorage.setItem('currentVideo', videoSrc);
            localStorage.setItem('currentVideoTitle', title);
            
            // Navigate to player
            window.location.href = 'player.html';
        });
    });

    // Back to home button functionality
    const backToHomeBtn = document.getElementById('back-to-home');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }

    // Return to user page when there's extended inactivity (60 seconds)
    let inactivityTimer;
    
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
            window.location.href = 'user.html';
        }, 60000); // 60 seconds
    }
    
    // Reset timer on mouse movement, clicks, or key presses
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    
    // Start the initial timer
    resetInactivityTimer();
});