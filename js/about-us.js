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
// about us section

document.addEventListener("DOMContentLoaded", function () {
  const dropdownHeaders = document.querySelectorAll(
    ".about-us-capability-dropdown-header"
  );

  dropdownHeaders.forEach((header) => {
    const button = header.querySelector(".about-us-dropdownButton");
    const dropdown = header.nextElementSibling; // This should be the .about-us-dropdown-content
    const img = button.querySelector("img"); // Get the img inside the button

    button.addEventListener("click", function () {
      if (!dropdown) {
        console.error("Dropdown content not found!");
        return;
      }

      dropdown.classList.toggle("active");

      // Toggle the image src based on active state
      if (dropdown.classList.contains("active")) {
        img.src = "/images/about-us/icon/Minus.svg"; // Change to Minus.svg when active
      } else {
        img.src = "/images/about-us/icon/Plus.svg"; // Change to Plus.svg when inactive
      }
    });
  });
});


function showSideBar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}
