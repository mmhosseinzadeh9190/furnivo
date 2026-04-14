"use strict";

const headerEl = document.querySelector("header");
const navbarEl = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar__link");
const mobileNavbarButton = document.querySelector(".actions__button--mobile-nav");
const heroSectionEl = document.querySelector(".hero");

const headerHeight = headerEl.offsetHeight;

mobileNavbarButton.addEventListener("click", function () {
  navbarEl.classList.toggle("mobile-navbar");

  if (navbarEl.classList.contains("mobile-navbar")) {
    document.body.classList.add("overflow-y-hidden");
  } else {
    document.body.classList.remove("overflow-y-hidden");
  }
});

links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const section = document.querySelector(href);
      const offsetTop = section.offsetTop - headerHeight;

      if (href === "#contact-us") {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }

    if (navbarEl.classList.contains("mobile-navbar")) {
      navbarEl.classList.remove("mobile-navbar");
      document.body.classList.remove("overflow-y-hidden");
    }
  });
});

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      headerEl.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      headerEl.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  },
);
obs.observe(heroSectionEl);
