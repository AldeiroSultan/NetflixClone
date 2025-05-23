// Place this file in a js folder in your project root

// Add navigation shadow on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Add functionality for video preview controls
const previewVideo = document.querySelector('.preview-video');
const toggleMuteButton = document.getElementById('toggle-mute');

if (toggleMuteButton && previewVideo) {
    // Update icon based on current mute state
    function updateMuteIcon() {
        if (previewVideo.muted) {
            toggleMuteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            toggleMuteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    // Toggle mute when button is clicked
    toggleMuteButton.addEventListener('click', function() {
        previewVideo.muted = !previewVideo.muted;
        updateMuteIcon();
    });
    
    // Initialize icon
    updateMuteIcon();
}

document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carouselContainers = document.querySelectorAll('.category--carousel');

    // Apply function to each container
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel--list');
        const prevButton = container.querySelector('.carousel-button.prev');
        const nextButton = container.querySelector('.carousel-button.next');
        const carouselItems = carousel.querySelectorAll('.carousel--item');

        // Calculate scroll amount based on the first item's width and margin
        const firstItem = carouselItems[0];
        const scrollAmount = firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginRight);

        // Event listeners for each carousel
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });

    // Modal functionality for "Couldn't find what you're looking for?"
    const findMoreButton = document.getElementById('find-more-button');
    const findMoreModal = document.getElementById('findMoreModal');
    const closeButton = document.querySelector('.close');
    const goToCarouselBtn = document.getElementById('go-to-carousel-btn');

    // Open the modal when the button is clicked
    if (findMoreButton) {
        findMoreButton.addEventListener('click', function() {
            findMoreModal.style.display = 'block';
        });
    }

    // Close the modal when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            findMoreModal.style.display = 'none';
        });
    }

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == findMoreModal) {
            findMoreModal.style.display = 'none';
        }
    });

    // Navigate to carousel page - FIXED
    if (goToCarouselBtn) {
        goToCarouselBtn.addEventListener('click', function() {
            window.location.href = 'carousel.html';
        });
    }

    // Add click event to watch button to play the main feature video
    const watchButton = document.getElementById('watch-button');
    if (watchButton) {
        watchButton.addEventListener('click', function() {
            // Store "main feature" as the video source
            localStorage.setItem('currentVideo', 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4');
            localStorage.setItem('currentVideoTitle', 'Our Love Story - Main Feature');
            window.location.href = 'player.html';
        });
    }

    // Add click events to memory items
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get video source from data attribute
            const videoSrc = this.getAttribute('data-video') || 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4';
            
            // Get title from alt text or create one
            const imgElement = this.querySelector('img');
            const title = imgElement ? imgElement.getAttribute('alt') : 'Our Memory';
            
            // Store the video source and title in localStorage
            localStorage.setItem('currentVideo', videoSrc);
            localStorage.setItem('currentVideoTitle', title);
            
            // Navigate to player page
            window.location.href = 'player.html';
        });
    });

    // Navigation menu items - make "Memories" link go to carousel
    const navItems = document.querySelectorAll('.primary-menu--item a');
    navItems.forEach(item => {
        if (item.textContent.trim() === 'Memories') {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'carousel.html';
            });
        }
    });
});