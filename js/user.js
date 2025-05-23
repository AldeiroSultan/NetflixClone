// Place this file in a js folder in your project root

// Add click event listeners to all user profiles
document.addEventListener('DOMContentLoaded', function() {
    // Select all user profiles
    const userProfiles = document.querySelectorAll('.userIt-hv');
    
    // Add click event listener to each profile
    userProfiles.forEach(profile => {
        profile.addEventListener('click', function() {
            // Navigate to home page when a user profile is clicked
            window.location.href = 'home.html';
        });
    });
    
    // Set inactivity timer to show carousel after 60 seconds of inactivity
    let inactivityTimer;
    
    // Function to reset the timer
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
            // Show carousel after inactivity
            window.location.href = 'carousel.html';
        }, 60000); // 60 seconds
    }
    
    // Reset timer on mouse movement, clicks, or key presses
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    
    // Start the initial timer
    resetInactivityTimer();
});