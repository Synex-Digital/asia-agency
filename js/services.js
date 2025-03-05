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
  const respondCards = document.querySelectorAll(".respond-card");

  respondCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove 'selected' class from all cards
      respondCards.forEach((c) => c.classList.remove("selected"));

      // Select the radio button inside the clicked card
      const radioButton = card.querySelector("input[type='radio']");
      if (radioButton) {
        radioButton.checked = true;
        card.classList.add("selected"); // Add highlight effect
      }
    });
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
function showSideBar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar(){
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}