// ====== Data ======
const trainers = [
  {
    name: "Ronnie Coleman",
    image: "images/OIP.webp",
    description: "Legendary strength and discipline, inspiring clients to push their limits.",
    bio: "8x Mr. Olympia with world-class expertise in strength and endurance training."
  },
  {
    name: "Saam Sulek",
    image: "images/saam (1).jpeg",
    description: "Visionary leader with a passion for innovation and coaching excellence.",
    bio: "A modern fitness influencer focused on innovation, form, and mental discipline."
  },
  {
    name: "Jhon Rhino",
    image: "images/unknown.jpeg",
    description: "Bold, fearless, high-energy motivator for unstoppable results.",
    bio: "High-energy motivator specializing in rapid transformation programs."
  }
];

const equipment = [
  { name: "Dumbbells", price: "R4500", image: "images/dumbeels.jpeg" },
  { name: "Treadmill", price: "R7500", image: "images/tredmill.jpeg" },
  { name: "Yoga Mats", price: "R220", image: "images/yoga mat.jpeg" }
];

const supplements = [
  { name: "Hyperbolic Mass Gainer", price: "R500", image: "images/hyperbolic mass gainer.jpg" },
  { name: "Creatine", price: "R600", image: "images/creatine.avif" },
  { name: "Pre Workout", price: "R450", image: "images/pre workout.jfif" }
];

// ====== Modal Function ======
function bindTrainerModal() {
  const trainerInfo = {
    "Ronnie Coleman": trainers[0].bio,
    "Saam Sulek": trainers[1].bio,
    "Jhon Rhino": trainers[2].bio
  };

  document.querySelectorAll(".more-details-btn").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.previousElementSibling.previousElementSibling.textContent;
      document.getElementById("trainerName").textContent = name;
      document.getElementById("trainerBio").textContent = trainerInfo[name];
      document.getElementById("trainerModal").style.display = "flex";
    });
  });

  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("trainerModal").style.display = "none";
    });
  }

  const trainerModal = document.getElementById("trainerModal");
  if (trainerModal) {
    trainerModal.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.style.display = "none";
      }
    });
  }
}

// ====== Visibility Animation ======
function checkVisibility(elements) {
  elements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 150);
    }
  });
}

// ====== Scroll Listener ======
window.addEventListener('scroll', () => {
  const elementsToReveal = document.querySelectorAll('.trainer-card, .product-item');
  checkVisibility(elementsToReveal);
});

window.addEventListener('load', () => {
  const elementsToReveal = document.querySelectorAll('.trainer-card, .product-item');
  checkVisibility(elementsToReveal);
});

// ====== Dark Mode Toggle ======
const toggleButton = document.getElementById('toggle-dark-mode');
if (toggleButton) {
  toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    toggleButton.textContent = document.body.classList.contains('dark-mode')
      ? 'Light Mode'
      : 'Dark Mode';
  });
}

// ====== DOM Ready ======
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling
  const links = document.querySelectorAll("a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  
  

  // Load trainers
  const trainersContainer = document.getElementById("trainers-container");
  if (trainersContainer) {
    trainers.forEach(trainer => {
      const card = document.createElement("div");
      card.className = "trainer-card";
      card.innerHTML = `
        <img src="${trainer.image}" alt="${trainer.name}">
        <h3>${trainer.name}</h3>
        <p class="trainer-description">${trainer.description}</p>
        <button class="more-details-btn">More Details</button>
      `;
      trainersContainer.appendChild(card);
    });
    bindTrainerModal();
  }

  // ====== Product Rendering ======
  function renderProducts(listId, products) {
    const list = document.getElementById(listId);
    if (!list) return;
    list.innerHTML = "";
    products.forEach(item => {
      const li = document.createElement("li");
      li.className = "product-item fade-in";
      li.dataset.category = listId.includes("equipment") ? "equipment" : "supplements";
      li.dataset.name = item.name.toLowerCase();
      li.dataset.price = parseFloat(item.price.replace("R", ""));
      li.innerHTML = `
        <div>
          ${item.name} : ${item.price}<br>
          <img src="${item.image}" alt="${item.name}">
        </div>
      `;
      list.appendChild(li);
    });
  }

  // Initial load
  if (document.getElementById("equipment-list")) renderProducts("equipment-list", equipment);
  if (document.getElementById("supplements-list")) renderProducts("supplements-list", supplements);

  // ====== Search, Filter & Sort ======
  function applyFilters() {
    const searchBar = document.getElementById("search-bar");
    const filterCategory = document.getElementById("filter-category");
    const sortOptions = document.getElementById("sort-options");
    if (!searchBar || !filterCategory || !sortOptions) return;

    const searchTerm = searchBar.value.toLowerCase();
    const category = filterCategory.value;
    const sortOption = sortOptions.value;

    let allProducts = [...equipment, ...supplements];

    if (category !== "all") {
      allProducts = allProducts.filter(p =>
        category === "equipment" ? equipment.includes(p) : supplements.includes(p)
      );
    }

    allProducts = allProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm)
    );

    if (sortOption === "name-asc") {
      allProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      allProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "price-asc") {
      allProducts.sort((a, b) =>
        parseFloat(a.price.replace("R", "")) - parseFloat(b.price.replace("R", ""))
      );
    } else if (sortOption === "price-desc") {
      allProducts.sort((a, b) =>
        parseFloat(b.price.replace("R", "")) - parseFloat(a.price.replace("R", ""))
      );
    }

    const equipmentList = document.getElementById("equipment-list");
    const supplementsList = document.getElementById("supplements-list");
    if (equipmentList) equipmentList.innerHTML = "";
    if (supplementsList) supplementsList.innerHTML = "";
    allProducts.forEach(p => {
      if (equipment.includes(p)) {
        renderProducts("equipment-list", [p]);
      } else {
        renderProducts("supplements-list", [p]);
      }
    });
  }

  const searchBarEl = document.getElementById("search-bar");
  const filterCategoryEl = document.getElementById("filter-category");
  const sortOptionsEl = document.getElementById("sort-options");
  if (searchBarEl) searchBarEl.addEventListener("input", applyFilters);
  if (filterCategoryEl) filterCategoryEl.addEventListener("change", applyFilters);
  if (sortOptionsEl) sortOptionsEl.addEventListener("change", applyFilters);

  
  // Lightbox slideshow (works for all images)
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeLightbox = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Include ALL images on the page
const images = Array.from(document.querySelectorAll("img"));
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.style.display = "flex";
  });
});

function showImage(index) {
  lightboxImage.src = images[index].src;
  lightboxImage.alt = images[index].alt;
}

// Navigation (only works if buttons exist)
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });
}

// Close
if (closeLightbox) {
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}



  // Trigger visibility animation
  const elementsToReveal = document.querySelectorAll('.trainer-card, .product-item');
  checkVisibility(elementsToReveal);
});


// ====== CONTACT FORM HANDLER ======
if (window.location.pathname.includes("contact.html")) {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();
      const messageType = form.querySelector("select[name='messageType']").value; 
      const message = form.querySelector("textarea[name='message']").value.trim();

      let errors = [];
      if (name === "") errors.push("Name is required.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
      if (messageType === "") errors.push("Please select a message type."); 
      if (message.length < 10) errors.push("Message must be at least 10 characters long.");

      let errorBox = form.querySelector(".error-messages");
      if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.className = "error-messages";
        form.insertBefore(errorBox, form.firstChild);
      }
      errorBox.innerHTML = "";

      if (errors.length > 0) {
        errors.forEach(err => {
          const p = document.createElement("p");
          p.textContent = err;
          p.style.color = "red";
          errorBox.appendChild(p);
        });
        return;
      }

      //  Success message includes message type
      setTimeout(() => {
        const success = document.createElement("p");
        success.textContent = "Your ${messageType} message has been sent to info@liftkings.com!";
        success.style.color = "green";
        errorBox.appendChild(success);
        form.reset();
      }, 800);
    });
  }
}


// ====== ENQUIRY FORM HANDLER ======
if (window.location.pathname.includes("enquiry.html")) {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();
      const messageType = form.querySelector("select[name='messageType']").value;
      const message = form.querySelector("textarea[name='message']").value.trim();

      let errors = []; //  Declare before using

      if (name === "") errors.push("Name is required.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
      if (messageType === "") errors.push("Please select a message type."); //  Now works
      if (message.length < 10) errors.push("Message must be at least 10 characters long.");

      let errorBox = form.querySelector(".error-messages");
      if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.className = "error-messages";
        form.insertBefore(errorBox, form.firstChild);
      }
      errorBox.innerHTML = "";

      if (errors.length > 0) {
        errors.forEach(err => {
          const p = document.createElement("p");
          p.textContent = err;
          p.style.color = "red";
          errorBox.appendChild(p);
        });
        return;
      }

      //  Dynamic response based on enquiry content
      let response = "Thank you for your enquiry!";
      const lower = message.toLowerCase();
      if (lower.includes("volunteer")) {
        response += " We appreciate your interest in volunteering. Our coordinator will reach out soon.";
      } else if (lower.includes("sponsor")) {
        response += " Sponsorship opportunities are available. We'll send you our sponsorship package.";
      } else if (lower.includes("price") || lower.includes("cost")) {
        response += " Our personal training starts at R500/session. We'll send you a full pricing guide.";
      } else if (lower.includes("availability") || lower.includes("schedule")) {
        response += " We have slots open next week. We'll share available times shortly.";
      } else {
        response += " We'll get back to you with more details shortly.";
      }

      const success = document.createElement("p");
      success.textContent = "✅ " + response;
      success.style.color = "green";
      errorBox.appendChild(success);
      form.reset();
    });
  }
}
