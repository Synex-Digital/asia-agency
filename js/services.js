document.addEventListener("DOMContentLoaded", function () {
  const campaignItems = document.querySelectorAll(".campaign-data-item");
  const progressFill = document.querySelector(".progress-fill");
  const campaignTables = document.querySelectorAll(
    '[class^="campaign-table-container-"]'
  );

  // Initially show only the first campaign table and hide the others
  campaignTables.forEach((table, index) => {
    table.style.display = index === 0 ? "block" : "none";
  });

  const totalWidth = 798;
  const stepWidth = totalWidth / 3; // Dividing by 3 for 33%, 66%, 100%

  // Set initial progress to 33% and first item active
  progressFill.style.width = `${stepWidth}px`;
  if (campaignItems.length > 0) {
    campaignItems[0].classList.add("active");
  }

  campaignItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      campaignItems.forEach((i) => i.classList.remove("active"));

      // Add active class only to current clicked item
      item.classList.add("active");

      // Calculate progress - 33% for first, 66% for second, 100% for third
      const progress = stepWidth * (index + 1);
      progressFill.style.transition = "width 0.3s ease";
      progressFill.style.width = `${progress}px`;

      // Hide all campaign tables
      campaignTables.forEach((table) => {
        table.style.display = "none";
      });

      // Display the corresponding campaign table
      if (campaignTables[index]) {
        campaignTables[index].style.display = "block";
      }
    });
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

document.addEventListener("DOMContentLoaded", function () {
  const cardContainers = document.querySelectorAll(".respond-card-container");

  cardContainers.forEach((container) => {
    const checkboxes = container.querySelectorAll(".checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((cb) => {
            if (cb !== this) cb.checked = false; // Uncheck other checkboxes in the same section
          });
        }
      });
    });
  });
});
