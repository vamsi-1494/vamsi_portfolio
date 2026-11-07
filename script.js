/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT - MANDALAPU VAMSI (MERN STACK DEVELOPER)
 * Vanilla JavaScript (No dependencies, no build steps, pure browser-native)
 * ==========================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. THEME CONTROLLER (Dark / Light Mode Toggle with Persistence)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'vamsi_portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootElement = document.documentElement;

  /**
   * Determine preferred initial theme:
   * 1. Stored user choice in localStorage
   * 2. Operating system prefers-color-scheme
   * 3. Default to 'dark'
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  /**
   * Apply theme to root <html> tag
   * @param {string} theme - 'dark' | 'light'
   */
  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // Initialize theme immediately on script execution
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  }

  // Listen to OS theme changes if user has not explicitly locked a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ==========================================================================
     2. NAVBAR STICKY & MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Add shadow and blur styling on scroll
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // Toggle mobile drawer
  function openMobileMenu() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    if (menuBackdrop) menuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (menuBackdrop) menuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close when clicking the backdrop overlay
  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close when clicking any nav link
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     3. ACTIVE LINK HIGHLIGHTING (Scrollspy with IntersectionObserver)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120; // Offset for navbar

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ==========================================================================
     4. HERO TYPING EFFECT
     ========================================================================== */
  const typingElement = document.getElementById('typingText');
  // You can customize or add more titles here!
  const titles = [
    'MERN Stack Developer',
    'React.js Specialist',
    'Node.js & Express Engineer',
    'REST API & MongoDB Builder'
  ];

  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;      // Milliseconds per character typed
  const deletingSpeed = 45;    // Milliseconds per character deleted
  const pauseEnd = 1800;       // Pause when full word is typed
  const pauseStart = 400;      // Pause before typing next word

  function typeWriter() {
    if (!typingElement) return;

    const fullText = titles[currentTitleIndex];

    if (!isDeleting) {
      // Typing forward
      typingElement.textContent = fullText.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex === fullText.length) {
        // Finished typing word, wait then start deleting
        isDeleting = true;
        setTimeout(typeWriter, pauseEnd);
        return;
      }
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Backspacing
      typingElement.textContent = fullText.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex === 0) {
        // Finished deleting, switch to next word
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        setTimeout(typeWriter, pauseStart);
        return;
      }
      setTimeout(typeWriter, deletingSpeed);
    }
  }

  // Start typing once DOM content is ready
  if (typingElement) {
    setTimeout(typeWriter, 500);
  }

  /* ==========================================================================
     5. SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after element is revealed for performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers without IntersectionObserver
    revealElements.forEach(function (el) {
      el.classList.add('active');
    });
  }

  /* ==========================================================================
     6. CONTACT FORM VALIDATION & ASYNC FORMSPREE SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const errorMessageText = document.getElementById('errorMessageText');
  const mailtoFallbackLink = document.getElementById('mailtoFallbackLink');
  const submitBtn = document.getElementById('submitBtn');

  // Email regex validation pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Helper to set input error state
   */
  function showError(input, errorElement, message) {
    input.classList.add('is-invalid');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /**
   * Helper to clear input error state
   */
  function clearError(input, errorElement) {
    input.classList.remove('is-invalid');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  // Real-time input clearing on user typing
  if (nameInput) {
    nameInput.addEventListener('input', function () {
      clearError(nameInput, nameError);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', function () {
      clearError(emailInput, emailError);
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', function () {
      clearError(messageInput, messageError);
    });
  }

  /**
   * Client-side validation function
   */
  function validateForm() {
    let isValid = true;

    // Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      showError(nameInput, nameError, 'Please enter your full name.');
      isValid = false;
    } else if (nameVal.length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      showError(emailInput, emailError, 'Please enter your email address.');
      isValid = false;
    } else if (!emailPattern.test(emailVal)) {
      showError(emailInput, emailError, 'Please enter a valid email address (e.g., name@domain.com).');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate Message
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      showError(messageInput, messageError, 'Please write your message.');
      isValid = false;
    } else if (messageVal.length < 10) {
      showError(messageInput, messageError, 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    return isValid;
  }

  /**
   * Construct mailto URL with current form values as a backup
   */
  function updateMailtoFallback() {
    const name = encodeURIComponent(nameInput ? nameInput.value.trim() : '');
    const email = encodeURIComponent(emailInput ? emailInput.value.trim() : '');
    const message = encodeURIComponent(messageInput ? messageInput.value.trim() : '');
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Visitor'}`);
    const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);

    if (mailtoFallbackLink) {
      mailtoFallbackLink.href = `mailto:mandalapuvamsi143@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  // Form submit event handler
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Reset alert banners
      if (formSuccess) formSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';

      // Perform client-side validation
      if (!validateForm()) {
        return;
      }

      updateMailtoFallback();

      const actionUrl = contactForm.getAttribute('action');

      // Check if Formspree placeholder is still present
      const isPlaceholder = actionUrl.includes('YOUR_FORMSPREE_ID');

      if (isPlaceholder) {
        // Helpful alert informing the user that Formspree ID needs to be configured
        if (formError) {
          formError.style.display = 'flex';
          errorMessageText.innerHTML = `
            <strong>Formspree ID not yet configured:</strong><br/>
            Please replace <code>YOUR_FORMSPREE_ID</code> in <code>index.html</code> with your free Formspree Form ID.<br/>
            In the meantime, you can send your message directly via email below:
          `;
        }
        return;
      }

      // If Formspree ID is set, submit via fetch
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success
          if (formSuccess) formSuccess.style.display = 'flex';
          contactForm.reset();
        } else {
          const data = await response.json();
          let msg = 'Failed to submit the form. Please try again or use direct email.';
          if (data && data.errors && data.errors.length) {
            msg = data.errors.map(err => err.message).join(', ');
          }
          if (formError) {
            errorMessageText.textContent = msg;
            formError.style.display = 'flex';
          }
        }
      } catch (err) {
        // Network or CORS error fallback
        if (formError) {
          errorMessageText.textContent = 'Network error occurred. Please click below to send via your email client:';
          formError.style.display = 'flex';
        }
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  /* ==========================================================================
     7. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     8. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear >= 2026 ? currentYear : '2026';
  }

})();

