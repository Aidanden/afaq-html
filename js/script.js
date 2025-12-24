document.addEventListener('DOMContentLoaded', function () {

    // Initialize AOS
    AOS.init({
        once: true,
        duration: 800,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const updateNavbar = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check on load

    // Marquee Infinite Loop Setup
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const contentHTML = marqueeContent.innerHTML;
        marqueeContent.innerHTML = contentHTML + contentHTML + contentHTML; // Triplicate for smoother loop
    }

    // Number Counter Animation
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000; // ms
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out quart
                        const ease = 1 - Math.pow(1 - progress, 4);

                        const currentVal = Math.floor(ease * target);
                        counter.textContent = currentVal + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    };
                    requestAnimationFrame(updateCount);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-container');
    if (statsSection) statsObserver.observe(statsSection);


    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // If mobile menu is open, close it (Bootstrap)
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
