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
    // Define different video sources for each memory type
    const videoSources = {
        'First Date': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'Road Trip': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'Beach Day': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'Anniversary': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        'Concert Night': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'Dinner Date': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        'Holiday': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        'Hiking Trip': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        'City Exploration': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        'Theme Park': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'Beach Adventure': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        'Camping': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        'Winter Getaway': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        'Birthday Party': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'Holiday Celebration': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        "Friend's Wedding": 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'Family Gathering': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        'Concert': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        "New Year's Eve": 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        "Valentine's Day": 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        'First Kiss': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        'Proposal': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        'Moving In': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'First Trip': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        'Meeting Parents': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        'Surprise Gift': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
    };

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

    // Add click events to memory items with different video sources
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get title from the title div or alt text
            const titleElement = this.querySelector('.item-title');
            const imgElement = this.querySelector('img');
            const title = titleElement ? titleElement.textContent : (imgElement ? imgElement.getAttribute('alt') : 'Our Memory');
            
            // Get video source from predefined sources or use data attribute
            const videoSrc = videoSources[title] || this.getAttribute('data-video') || 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4';
            
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