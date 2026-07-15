// Main JavaScript file for ALTREXIS landing page

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initializeComponents();

  // Add event listeners
  setupEventListeners();

  // Overlay menu logic
  setupOverlayMenu();

  // Staggered fade-in for hero elements
  const heroEls = document.querySelectorAll('.fade-in');
  heroEls.forEach((el, idx) => {
    setTimeout(() => {
      el.classList.add('show');
    }, 200 + idx * 200);
  });

  // --- Team Card Horizontal Scroll Animation ---
  const teamSection = document.querySelector('.team-scroll-section');
  const teamOuter = document.querySelector('.team-scroll-outer');
  const teamContainer = document.querySelector('.team-scroll-container');
  const teamCards = document.querySelectorAll('.team-card');
  if (teamSection && teamCards.length > 0 && teamOuter && teamContainer) {
    // Hide scrollbars
    teamOuter.classList.add('no-scrollbar');
    // Set up observer for each card
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      root: teamOuter,
      threshold: 0.5,
      rootMargin: '0px'
    });
    teamCards.forEach(card => observer.observe(card));

    // --- Sticky vertical-to-horizontal scroll ---
    function setTeamSectionHeight() {
      const cardCount = teamCards.length;
      const cardWidth = teamCards[0].offsetWidth + 32;
      const visibleCards = 3;
      const scrollLength = cardWidth * (cardCount - visibleCards);
      // Height = heading + sticky horizontal scroll
      const heading = teamSection.querySelector('.team-scroll-title');
      const headingHeight = heading ? heading.offsetHeight + 48 : 80;
      teamSection.style.height = (scrollLength + window.innerHeight * 0.7 + headingHeight) + 'px';
      return scrollLength;
    }
    let scrollLength = setTeamSectionHeight();
    function updateHorizontalScroll() {
      const outerRect = teamOuter.getBoundingClientRect();
      const stickyTop = outerRect.top + window.scrollY;
      const stickyBottom = stickyTop + teamOuter.offsetHeight - window.innerHeight;
      const scrollY = window.scrollY;
      let progress = (scrollY - stickyTop) / (stickyBottom - stickyTop);
      progress = Math.max(0, Math.min(1, progress));
      const translateX = -scrollLength * progress;
      teamContainer.style.transform = `translateX(${translateX}px)`;
    }
    function onScroll() {
      requestAnimationFrame(updateHorizontalScroll);
    }
    function onResize() {
      scrollLength = setTeamSectionHeight();
      updateHorizontalScroll();
    }
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onResize();
    // Enable horizontal scroll with mouse wheel (carousel-like)
    // --- Lazy Load Background Images ---
    const lazyBackgrounds = document.querySelectorAll('.vision-mission-section, .fullscreen-footer');
    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('bg-loaded');
          bgObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '200px' // Start loading slightly before they enter viewport
    });
    lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
  }
});

// Component initialization function
function initializeComponents() {
  // Only setup overlay menu since we have static header
  setupOverlayMenu();

  // Only load footer component if needed
  fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
      const footer = document.querySelector('#footer');
      if (footer) footer.innerHTML = html;
    });
  // Setup theme toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    // Determine the current page to appropriately set the visual toggle state
    const isDark = window.location.pathname.includes('dark.html');

    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('altrexis-theme', 'dark-young');
    } else {
      document.documentElement.setAttribute('data-theme', 'light-corporate');
      localStorage.setItem('altrexis-theme', 'light-corporate');
    }

    // Toggle click redirects to the other page
    themeToggleBtn.addEventListener('click', () => {
      if (isDark) {
        // Switch to Light Corporate (index)
        window.location.href = 'index.html';
      } else {
        // Switch to Dark Young
        window.location.href = 'dark.html';
      }
    });
  }
}

// Event listener setup
function setupEventListeners() {
  // Add your event listeners here
}

// Header component HTML (legacy fallback)
function getHeaderHTML() {
  return `
        <header class="site-header">
            <nav class="main-nav">
                <div class="logo">ALTREXIS</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                     <li><a href="#team">Team</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    `;
}

function setupOverlayMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('close-overlay');
  const overlay = document.getElementById('overlay-menu');
  const navLinks = document.querySelectorAll('.overlay-links a');

  const closeMenu = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close menu when clicking on navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });
}

// Footer component HTML (legacy fallback)
function getFooterHTML() {
  return `
        <footer class="site-footer">
            <div class="footer-content">
                <div class="footer-logo">ALTREXIS</div>
                <div class="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
                <div class="copyright"> ${new Date().getFullYear()} ALTREXIS. All rights reserved.</div>
            </div>
        </footer>
    `;
}
