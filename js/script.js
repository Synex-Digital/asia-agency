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
console.log(cardWidth);

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




