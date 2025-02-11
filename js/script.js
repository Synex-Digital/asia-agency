const boxes = document.querySelectorAll(".box");
const glowArea = document.createElement("div");
glowArea.classList.add("glow-area");
document.body.appendChild(glowArea); // Append glow-area to body, it will float over boxes

const radius = 100; // 100px radius for the glowing hover effect
const maxParticles = 20; // Max number of particles allowed to show

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Move the glow area based on the mouse position
  glowArea.style.left = `${mouseX - 100}px`;  // Center the glow area around the cursor
  glowArea.style.top = `${mouseY - 100}px`;   // Center the glow area around the cursor

  let foundGlow = false;

  boxes.forEach((box) => {
    const rect = box.getBoundingClientRect();
    const boxCenterX = rect.left + rect.width / 2;
    const boxCenterY = rect.top + rect.height / 2;

    // Calculate distance from mouse to the center of each box
    const dx = mouseX - boxCenterX;
    const dy = mouseY - boxCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the mouse is within the glow range, trigger glow and particles
    if (distance <= radius) {
      box.classList.add("glow");
      foundGlow = true;
      createParticles(box, mouseX, mouseY);
    } else {
      box.classList.remove("glow");
    }
  });

  glowArea.style.opacity = foundGlow ? "1" : "0";
});

// Function to create particles within the glowing region
function createParticles(box, mouseX, mouseY) {
  let particleCount = 0;

  for (let i = 0; i < 3; i++) {
    if (particleCount >= maxParticles) return;

    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Randomize particle size between 2-5px
    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Randomize particle movement
    const angle = Math.random() * Math.PI * 2;
    const moveDistance = Math.random() * 50 + 50;

    particle.style.setProperty("--tx", `${Math.cos(angle) * moveDistance}px`);
    particle.style.setProperty("--ty", `${Math.sin(angle) * moveDistance}px`);

    // Position relative to the box
    const rect = box.getBoundingClientRect();
    particle.style.left = `${mouseX - rect.left}px`;
    particle.style.top = `${mouseY - rect.top}px`;

    box.appendChild(particle);
    particleCount++;

    // Remove particles after animation
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

      // Add 'active' class to the current card
      cards[currentIndex].classList.add("active");

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
