document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Functionality ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // IMPORTANT: Only add event listener if the theme toggle button exists on the page
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            // Save theme preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Mobile Navigation (Hamburger Menu) Functionality ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // IMPORTANT: Only add event listeners if mobile navigation elements exist
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileNav.classList.toggle('open');
        });

        // Close mobile nav when a link is clicked (optional, but good for UX)
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileNav.classList.remove('open');
            });
        });
    }

    // --- Active Navigation Link Highlighting ---
    const desktopNavLinks = document.querySelectorAll('.desktop-nav ul li a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav ul li a');

    function highlightActiveLink(links) {
        const path = window.location.pathname;
        const page = path.split('/').pop();

        links.forEach(link => {
            link.classList.remove('active');
            // Handle both root ('') and nested paths correctly
            const linkHref = link.getAttribute('href').split('/').pop();
            if (linkHref === page || (linkHref === '' && page === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Apply highlighting only if navigation links are found
    if (desktopNavLinks.length > 0) {
        highlightActiveLink(desktopNavLinks);
    }
    // Mobile nav links are inside mobileNav, so checking mobileNav ensures these exist
    if (mobileNav && mobileNavLinks.length > 0) {
        highlightActiveLink(mobileNavLinks);
    }


    // --- Automatic Side-Scrolling Image Carousel ---
    const scrollingImageContainer = document.getElementById('scrolling-image-container');

    // IMPORTANT: Only run carousel logic if the container exists on the page
    if (scrollingImageContainer) {
        let scrollAmount = 0;
        const scrollSpeed = 0.5; // Pixels per frame
        const scrollInterval = 20; // Milliseconds per frame (controls smoothness and speed)
        let animationFrameId;

        // Function to scroll the container
        function autoScroll() {
            scrollAmount += scrollSpeed;
            // Reset to start if end is reached or if scrollWidth is 0 (no content)
            if (scrollingImageContainer.scrollWidth > 0 && scrollAmount >= scrollingImageContainer.scrollWidth - scrollingImageContainer.clientWidth) {
                scrollAmount = 0; // Reset to start if end is reached
            } else if (scrollingImageContainer.scrollWidth === 0) {
                // If no scrollable content, stop animation
                cancelAnimationFrame(animationFrameId);
                return;
            }
            scrollingImageContainer.scrollLeft = scrollAmount;
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        let isPaused = false; // Flag to control pausing

        // Start scrolling
        function startScrolling() {
            if (!isPaused) {
                animationFrameId = requestAnimationFrame(autoScroll);
            }
        }

        // Pause scrolling
        function pauseScrolling() {
            cancelAnimationFrame(animationFrameId);
            isPaused = true;
        }

        // Resume scrolling
        function resumeScrolling() {
            isPaused = false;
            startScrolling();
        }

        // Pause on hover
        scrollingImageContainer.addEventListener('mouseenter', pauseScrolling);
        scrollingImageContainer.addEventListener('mouseleave', resumeScrolling);

        // Initialize scrolling
        startScrolling();
    }
});