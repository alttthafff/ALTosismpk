//navbar

const navbarToggler = document.querySelector("#navbar-open");
const navLinkContainer = document.querySelector("#nav-link-container");

navbarToggler.addEventListener("click", () => {
  navLinkContainer.classList.toggle("active");
});

//typing
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["OSIS & MPK "];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1,
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// slider
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const slides = document.querySelectorAll(".slide");
const dots = document.querySelector(".dots-container");

let currentSlide = 1;

function toggleDotClass() {
  for (const dot of dots.children) {
    // remove all classes first
    dot.classList.remove("active");

    if (dot.dataset.slide == currentSlide) {
      dot.classList.add("active");
    }
  }
}

function moveSlide() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${currentSlide * 100 - 100}%)`;
  });

  if (currentSlide > slides.length) {
    currentSlide = 1;
  }

  toggleDotClass();
}

// listen to buttons
dots.addEventListener("click", (e) => {
  const dot = e.target;

  // only works if clicking on span
  if (dot.tagName == "SPAN") {
    currentSlide = parseInt(dot.dataset.slide);
    moveSlide();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSlide <= 1) {
    currentSlide = 4;
  } else {
    currentSlide -= 1;
  }

  moveSlide();
});

nextBtn.addEventListener("click", () => {
  if (currentSlide >= slides.length) {
    currentSlide = 1;
  } else {
    currentSlide += 1;
  }

  moveSlide();
});

// form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyryaU-KiFb08lpVh-oX93cfQUVIY0eqyBaOvOTH4bNhMmSThbh1AUxTV34DVG1GoQMNQ/exec";
const form = document.forms["contact-my-website"];
const btnKirim = document.querySelector(".btn--submit");
const btnLoading = document.querySelector(".btn--loading");

const alertModal = document.querySelector(".form-alert");
const alertCloseBtn = document.querySelector(".form-alert .btn--close");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnLoading.classList.toggle("show");
  btnKirim.classList.toggle("show");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // tampilkan tombol kirim , hilangkan tombol loading
      btnLoading.classList.toggle("show");
      btnKirim.classList.toggle("show");

      // tampilkan alert
      alertModal.showModal();

      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

alertCloseBtn.addEventListener("click", () => {
  alertModal.close();
});
