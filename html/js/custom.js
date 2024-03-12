(function () {
  // your page initialization code here
  // the DOM will be available here

  // On Scroll Add Class
  var lastScrollTop = 80;
  window.addEventListener("scroll", function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      document.body.classList.add("change-header-bg");
    } else {
      document.body.classList.remove("change-header-bg");
    }
  });

  // AOS Initialization
  AOS.init({
    startEvent: "DOMContentLoaded",
    once: true,
  });

  // Animation
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Hero Banner Heading Animation
  let bannerHeading = document.querySelectorAll(
    ".hero-banner h1 .overflow-hidden span"
  );
  bannerHeadingLines = bannerHeading.forEach((bannerH1) => {
    let RevealInfoTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: bannerH1,
        toggleActions: "play none none none",
      },
    });
    RevealInfoTimeLine.set(bannerH1, { autoAlpha: 1 });
    RevealInfoTimeLine.from(
      bannerH1,
      1,
      {
        yPercent: 100,
        autoAlpha: 0,
        ease: Power3.out,
        duration: "2s",
      },
      "<"
    );
  });

  // Split Word Animation
  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split(/\s/)
        .map(function (word) {
          return word
            .split("-")
            .map(function (word) {
              return '<span class="word">' + word + "</span>";
            })
            .join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;
          line = [];
          lines.push(line);
        }
      }
      line.push(word);
    }
    return lines;
  };

  gsap.registerPlugin(ScrollTrigger);
  splitLines(".reveal-text");
  let revealText = document.querySelectorAll(".reveal-text");

  // Reveal Text Animation
  revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    let RevealTextTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none none",
      },
    });
    RevealTextTimeLine.set(element, { autoAlpha: 1, perspective: 400 });
    RevealTextTimeLine.from(
      lines,
      0.5,
      {
        yPercent: 101,
        ease: Power3.out,
        stagger: 0.1,
      },
      "<"
    );
  });

  // Reveal Info Text Animation
  let infoText = document.querySelectorAll(".info-text");
  revealInfoLines = infoText.forEach((infoElement) => {
    let RevealInfoTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: infoElement,
        toggleActions: "play none none none",
      },
    });
    RevealInfoTimeLine.set(infoElement, { autoAlpha: 1 });
    RevealInfoTimeLine.from(
      infoElement,
      1,
      {
        yPercent: 30,
        autoAlpha: 0,
        ease: Power3.out,
        duration: "2s",
      },
      "<"
    );
  });

  // Counter
  var users = new countUp.CountUp("users", 1000, { enableScrollSpy: true });
  users.start();
  var downloads = new countUp.CountUp("downloads", 8000, {
    enableScrollSpy: true,
  });
  downloads.start();
  var projects = new countUp.CountUp("projects", 12000, {
    enableScrollSpy: true,
  });
  projects.start();
  var reviews = new countUp.CountUp("reviews", 500, { enableScrollSpy: true });
  reviews.start();

  // Add & Remove Class Open Sidebar
  const hamburgerButton = document.getElementById("navbarToggler");
  const myOffcanvas = document.getElementById("offcanvasExample");
  hamburgerButton.addEventListener("click", () => {
    document.body.classList.add("open-sidebar");
  });
  // myOffcanvas.addEventListener("show.bs.offcanvas", (event) => {
  //   document.body.classList.add("open-sidebar");
  // });

  myOffcanvas.addEventListener("hidden.bs.offcanvas", (event) => {
    document.body.classList.remove("open-sidebar");
  });
})();
