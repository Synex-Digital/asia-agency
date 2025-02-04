// JavaScript for Slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const cards = document.querySelectorAll(".card");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const progressBar = document.querySelector(".progress");
  const totalCards = cards.length;
  let currentIndex = 0;

  // Set slider width dynamically based on card count
  slider.style.width = `${totalCards * 50}%`; // Each card takes 50% width

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

    // Calculate transform value for smooth transition
    const transformValue = `translateX(-${currentIndex * 50}%)`;
    slider.style.transform = transformValue;
    updateProgress();
  };

  // Event Listeners
  prevButton.addEventListener("click", () => {
    slideTo(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    slideTo(currentIndex + 1);
  });

  // Initialize
  updateProgress();
});
