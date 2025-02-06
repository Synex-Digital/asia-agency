// JavaScript for Slider
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider-container").forEach((container) => {
    const slider = container.querySelector(".slider");
    const cards = container.querySelectorAll(".card");
    const prevButton = container.querySelector(".prev-button");
    const nextButton = container.querySelector(".next-button");
    const progressBar = container.querySelector(".progress");
    const totalCards = cards.length;
    let currentIndex = 0;

    // Set slider width dynamically based on card count
    slider.style.width = `${totalCards * 50}%`;

    // Function to update progress bar
    const updateProgress = () => {
      const progress = ((currentIndex + 1) / totalCards) * 100;
      progressBar.style.width = `${progress}%`;
      progressBar.style.backgroundColor = `rgba(255, 255, 255, 1)`;
    };

    // Function to slide
    const slideTo = (index) => {
      if (index < 0) {
        currentIndex = totalCards - 1;
      } else if (index >= totalCards) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      const transformValue = `translateX(-${currentIndex * 50}%)`;
      slider.style.transform = transformValue;
      updateProgress();
    };

    // Event Listeners
    prevButton.addEventListener("click", () => slideTo(currentIndex - 1));
    nextButton.addEventListener("click", () => slideTo(currentIndex + 1));

    // Initialize
    updateProgress();
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
