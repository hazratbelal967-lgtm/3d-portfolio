const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const message = document.getElementById("visitorMessage").value.trim();

    const subject = encodeURIComponent("Portfolio message from " + name);

    const body = encodeURIComponent(
      "Hi Hazrat,\n\n" +
      message +
      "\n\nFrom: " + name +
      "\nReply email: " + email
    );

    window.location.href =
      "mailto:hazratbelal967@gmail.com?subject=" +
      subject +
      "&body=" +
      body;
  });
}


/* ==========================================
   ADDED: LET'S LIVE CHAT
   Existing website functionality stays intact
========================================== */

(() => {
  const toggle = document.getElementById("liveChatToggle");
  const panel = document.getElementById("liveChatPanel");
  const close = document.getElementById("liveChatClose");
  const form = document.getElementById("liveChatForm");

  if (!toggle || !panel || !close || !form) return;

  const nameInput = document.getElementById("chatVisitorName");
  const messageInput = document.getElementById("chatVisitorMessage");
  const whatsappButton = document.getElementById("chatWhatsApp");
  const emailButton = document.getElementById("chatEmail");

  const whatsappNumber = "916200907602";
  const emailAddress = "hazratbelal967@gmail.com";

  // Open and close the chat panel
  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  close.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });

  // Validate visitor details
  function getChatDetails() {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      form.reportValidity();

      if (!name) {
        nameInput.focus();
      } else {
        messageInput.focus();
      }

      return null;
    }

    return { name, message };
  }

  // Send the visitor to WhatsApp with a pre-filled message
  whatsappButton.addEventListener("click", () => {
    const details = getChatDetails();

    if (!details) return;

    const text =
      "Hi Hazrat Belal!\n\n" +
      "Name: " + details.name + "\n" +
      "Message: " + details.message +
      "\n\nSent from HAZRAT BELAL portfolio.";

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(text);

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  });

  // Open the visitor's email application with a pre-filled draft
  emailButton.addEventListener("click", () => {
    const details = getChatDetails();

    if (!details) return;

    const subject = encodeURIComponent(
      "Website message from " + details.name
    );

    const body = encodeURIComponent(
      "Hi Hazrat Belal,\n\n" +
      details.message +
      "\n\nFrom: " + details.name +
      "\n\nSent from HAZRAT BELAL portfolio."
    );

    window.location.href =
      "mailto:" +
      emailAddress +
      "?subject=" +
      subject +
      "&body=" +
      body;
  });
})();
