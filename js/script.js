const boxes = document.querySelectorAll(".box");
const glowArea = document.createElement("div");
glowArea.classList.add("glow-area");
document.body.appendChild(glowArea);

const radius = 75; // Glow radius
const maxParticles = 20;
let activeParticles = 0;

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

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
      glowX >= -radius && glowX <= rect.width + radius &&
      glowY >= -radius && glowY <= rect.height + radius;

    if (isNearBox) {
      box.style.setProperty('--glow-x', `${glowX}px`);
      box.style.setProperty('--glow-y', `${glowY}px`);
      box.classList.add("glow");
    } else {
      box.classList.remove("glow");
    }
  });
});





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
