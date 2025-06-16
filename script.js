document.addEventListener("DOMContentLoaded", () => {
  // --- Header ---
  const header = document.getElementById("header");
  if (header) {
    const navLinks = document.querySelectorAll(".header__link");
    const burgerMenu = document.querySelector(".burger-menu");
    const menu = document.querySelector(".header__menu");
    let lastScroll = 0;
    const scrollThreshold = 100;

    // Handle active link state
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        navLinks.forEach((l) => l.classList.remove("header__link--active"));
        e.target.classList.add("header__link--active");
        // Close mobile menu when link is clicked
        if (window.innerWidth <= 768 && menu && burgerMenu) {
          menu.classList.remove("active");
          burgerMenu.classList.remove("active");
        }
      });
    });

    // Закрывать мобильное меню при скролле
    window.addEventListener("scroll", () => {
      if (
        window.innerWidth <= 768 &&
        menu &&
        burgerMenu &&
        menu.classList.contains("active")
      ) {
        menu.classList.remove("active");
        burgerMenu.classList.remove("active");
      }
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        header.classList.remove("scroll-up");
        return;
      }
      if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScroll) {
          // Scroll down
          header.classList.remove("scroll-up");
          header.classList.add("scroll-down");
        } else {
          // Scroll up
          header.classList.remove("scroll-down");
          header.classList.add("scroll-up");
        }
      } else {
        header.classList.remove("scroll-down", "scroll-up");
      }
      lastScroll = currentScroll;
    });

    // Handle burger menu
    if (burgerMenu && menu) {
      burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active");
        menu.classList.toggle("active");
      });
    }

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && menu && burgerMenu) {
        menu.classList.remove("active");
        burgerMenu.classList.remove("active");
      }
    });
  }

  // --- Hero parallax ---
  const hero = document.getElementById("hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
  }

  // --- Smart Solutions fade-in ---
  const solutionCards = document.querySelectorAll(".solution-card");
  if (solutionCards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    solutionCards.forEach((card) => {
      observer.observe(card);
    });
  }

  // --- Value Swiper ---
  if (window.Swiper && document.querySelector(".value-swiper")) {
    new Swiper(".value-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".value-swiper .swiper-button-next",
        prevEl: ".value-swiper .swiper-button-prev",
      },
      loop: false,
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }
});
