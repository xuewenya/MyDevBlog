/* index page typing ainimate */
const typingTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["I am Xue Wen Ya.", "Here's my Web Dev."];
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 1000;

let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
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
    typingTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, newTextDelay);
});

/* Hamburger menu */
var menu = document.getElementById("menu");
var hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  const mVisibility = menu.getAttribute("data-visible");

  if (mVisibility === "false") {
    menu.setAttribute("data-visible", true);
  } else if (mVisibility === "true") {
    menu.setAttribute("data-visible", false);
  }
});

/* filter */

const portfolioBtns = document.querySelectorAll(".portfolio-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

let activeBtn = "all";

showMenu(activeBtn);

portfolioBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetActiveBtn();
    showMenu(btn.id);
    btn.classList.add("active-btn");
  });
});

function resetActiveBtn() {
  portfolioBtns.forEach((btn) => {
    btn.classList.remove("active-btn");
  });
}

function showMenu(newMenuBtn) {
  activeBtn = newMenuBtn;
  portfolioItems.forEach((item) => {
    if (item.classList.contains(activeBtn)) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
}

/* contact form */
document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65c221a140097ad343c8b65f";
  document.getElementById("contact-submit").addEventListener("click", function (e) {
    e.preventDefault();

    let contactName = document.getElementById("contact-name").value;
    let contactEmail = document.getElementById("contact-email").value;
    let contactSubject = document.getElementById("contact-subject").value;
    let contactMessage = document.getElementById("contact-msg").value;

    let jsondata = {
      "name": contactName,
      "email": contactEmail,
      "subject": contactSubject,
      "message": contactMessage
    };

    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        document.getElementById("contact-submit").disabled = true;
        document.getElementById("add-contact-form").reset();
      }
    }

    fetch("https://greenrecycling-1c59.restdb.io/rest/contact", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;
        document.getElementById("add-update-contact").style.display = "block";
        setTimeout(function () {
          document.getElementById("add-update-contact").style.display = "none";
          document.getElementById("add-contact-form").reset();
        }, 3000);
      });
  });
});