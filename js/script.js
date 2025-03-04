const boxes = document.querySelectorAll(".box");
const glowArea = document.createElement("div");
glowArea.classList.add("glow-area");
document.body.appendChild(glowArea);

const radius = 75; // Glow radius
const maxParticles = 5; // Maximum number of particles (though current createParticles creates max 3 per call)
let activeParticles = 0; // Not currently used, but could be used to limit total particles

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Get grid boundaries (assuming your grid container has class "grid")
  const grid = document.querySelector(".grid");
  if (!grid) {
    // Check if grid exists - important!
    console.error("Grid container with class 'grid' not found in HTML.");
    return; // Exit if no grid found to avoid errors
  }
  const gridRect = grid.getBoundingClientRect();

  // Check if mouse is within grid boundaries
  const isInGrid =
    mouseX >= gridRect.left &&
    mouseX <= gridRect.right &&
    mouseY >= gridRect.top &&
    mouseY <= gridRect.bottom;

  // Only show glow area when mouse is in grid
  glowArea.style.opacity = isInGrid ? "1" : "0";
  glowArea.style.left = `${mouseX - radius}px`;
  glowArea.style.top = `${mouseY - radius}px`;
  glowArea.style.width = `${radius * 2}px`;
  glowArea.style.height = `${radius * 2}px`;

  boxes.forEach((box) => {
    const rect = box.getBoundingClientRect();

    // Calculate the glow position relative to the box
    const glowX = mouseX - rect.left;
    const glowY = mouseY - rect.top;
    // Check if mouse is within glow radius of the box
    const isNearBox =
      glowX >= -radius &&
      glowX <= rect.width + radius &&
      glowY >= -radius &&
      glowY <= rect.height + radius;

    if (isNearBox) {
      box.style.setProperty("--glow-x", `${glowX}px`);
      box.style.setProperty("--glow-y", `${glowY}px`);
      box.classList.add("glow");

      // **Call createParticles function when mouse is near a box**
      createParticles(box, glowX, glowY); // Pass box, and relative mouse position
    } else {
      box.classList.remove("glow");
    }
  });
});

function createParticles(box, mouseX, mouseY) {
  // Modified to accept mouseX, mouseY relative to box
  let particleCount = 0;

  for (let i = 0; i < 3; i++) {
    if (particleCount >= maxParticles) return;

    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const angle = Math.random() * Math.PI * 2;
    const moveDistance = Math.random() * 50 + 50;

    particle.style.setProperty("--tx", `${Math.cos(angle) * moveDistance}px`);
    particle.style.setProperty("--ty", `${Math.sin(angle) * moveDistance}px`);

    particle.style.left = `${mouseX}px`; // Use relative mouseX
    particle.style.top = `${mouseY}px`; // Use relative mouseY

    box.appendChild(particle);
    particleCount++;

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// JavaScript for Slider
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider-container").forEach((container) => {
    const slider = container.querySelector(".slider");
    const cards = container.querySelectorAll(".card");
    const prevButton = container.querySelector(".prev-button");
    const nextButton = container.querySelector(".next-button");
    const progressBar = container.querySelector(".progress");

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSlider() {
      // Reset all cards
      cards.forEach((card) => card.classList.remove("active"));
      cards.forEach((card) => card.classList.remove("active-testimonial"));

      // Add 'active' class to the current card
      cards[currentIndex].classList.add("active");
      cards[currentIndex].classList.add("active-testimonial");

      // Calculate the width of each card
      const cardWidth = cards[currentIndex].offsetWidth; // This will give the actual width including padding, etc.
      const gap = 20; // Define the gap value as per your CSS

      // Calculate translateX based on the card widths and current index
      let translateValue = -(currentIndex * (cardWidth + gap)); // Account for the width and gap

      // Update the transform property
      slider.style.transform = `translateX(${translateValue}px)`;

      // Update the progress bar
      let progressWidth = ((currentIndex + 1) / totalCards) * 100;
      progressBar.style.width = progressWidth + "%";
    }

    nextButton.addEventListener("click", () => {
      if (currentIndex < totalCards - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to the start
      }
      updateSlider();
    });

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalCards - 1; // Loop back to the end
      }
      updateSlider();
    });

    updateSlider();
  });
});

// JavaScript for Accordion
document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", function () {
    if (this.open) {
      document.querySelectorAll("details").forEach((otherItem) => {
        if (otherItem !== this) {
          otherItem.removeAttribute("open");
        }
      });
    }
  });
});

// Testimonial slider functionality
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const progressBar = document.querySelector(".progress");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth;
const totalCards = cards.length;

// Update progress bar
function updateProgress() {
  const progress = ((currentIndex + 1) / totalCards) * 100;
  progressBar.style.width = `${progress}%`;
}

// Next slide
nextButton.addEventListener("click", () => {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateProgress();
  }
});

// Previous slide
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateProgress();
  }
});

// Initialize progress bar
updateProgress();

// word counter
document.addEventListener("DOMContentLoaded", function () {
  const words = document.querySelectorAll(".word");
  const changeTextSection = document.querySelector(".change-text");
  let lastScrollY = window.scrollY;
  let animating = false;

  // Function to animate words to white one-by-one (for scrolling down)
  function animateWordsToWhite() {
    words.forEach((word, index) => {
      setTimeout(() => {
        word.classList.add("lightup");
      }, index * 100); // 100ms delay between each word
    });
  }

  // Function to animate words to gray one-by-one (for scrolling up)
  function animateWordsToGray() {
    // Reverse the order for scroll up (start from the last word)
    const wordsArray = Array.from(words);
    wordsArray.reverse().forEach((word, index) => {
      setTimeout(() => {
        word.classList.remove("lightup");
      }, index * 100); // 100ms delay between each word
    });
  }

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  // Event listener for scroll
  window.addEventListener("scroll", function () {
    // Return if animation is already in progress
    if (animating) return;

    // Check if section is in viewport
    if (!changeTextSection || !isInViewport(changeTextSection)) return;

    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    animating = true;

    if (scrollingDown) {
      // Scrolling DOWN - animate to WHITE one by one
      animateWordsToWhite();
    } else {
      // Scrolling UP - animate to GRAY one by one
      animateWordsToGray();
    }

    // Reset animation flag after all words are animated
    setTimeout(() => {
      animating = false;
    }, words.length * 100 + 300); // Allow time for all words to animate

    // Update last scroll position
    lastScrollY = currentScrollY;
  });

  // Initialize words to gray
  words.forEach((word) => {
    word.classList.remove("lightup");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".nav-faq-item");

  faqItems.forEach((item) => {
    const summaryContainer = item.querySelector(".summary-container");
    const contentContainer = item.querySelector(".content-container");

    // Set the initial max-height to 0 for all items
    contentContainer.style.maxHeight = "0";

    summaryContainer.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Toggle open class on the clicked FAQ item
      item.classList.toggle("open");

      // If opening, set max-height to the content's scrollHeight
      if (!isOpen) {
        contentContainer.style.maxHeight = contentContainer.scrollHeight + "px";
      } else {
        contentContainer.style.maxHeight = "0"; // Close it by setting max-height to 0
      }

      // Close other open items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          otherItem.classList.remove("open");
          otherItem.querySelector(".content-container").style.maxHeight = "0";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all other items before opening a new one
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("open");
        }
      });

      // Toggle current item
      item.classList.toggle("open");
    });
  });
});


