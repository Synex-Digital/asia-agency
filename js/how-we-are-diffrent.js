document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".how-we-dropdownButton");
  const dropdownContents = document.querySelectorAll(".how-we-dropdown-content");

  dropdownButtons.forEach((button, index) => {
    const content = dropdownContents[index];
    const icon = button.querySelector("img"); // Select the image inside the button

    // If it's the first item, make it active on page load
    if (index === 0) {
      content.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      button.classList.add("active"); // Add active class to rotate the icon
    } else {
      content.style.maxHeight = "0";
      content.classList.remove("active");
    }

    button.addEventListener("click", function () {
      const isOpen = content.classList.contains("active");

      content.classList.toggle("active");
      button.classList.toggle("active"); // Toggle active class for rotation

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0";
      }

      // Close other dropdowns
      dropdownContents.forEach((otherContent, otherIndex) => {
        if (
          otherContent !== content &&
          otherContent.classList.contains("active")
        ) {
          otherContent.classList.remove("active");
          otherContent.style.maxHeight = "0";
          dropdownButtons[otherIndex].classList.remove("active"); // Remove active class from other buttons
        }
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const campaignItems = document.querySelectorAll(".how-we-campaign-data-item");
  const progressFill = document.querySelector(".how-we-progress-fill");
  const campaignTables = document.querySelectorAll(
    '[class^="how-we-campaign-table-container-"]'
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
  const faqContainers = {
    "About us": document.querySelector(".nav-faq-container"),
    Services: document.querySelector(".nav-faq-container-1"),
    Consultancy: document.querySelector(".nav-faq-container-2"),
  };

  const buttons = {
    "About us": document.querySelector(".faq-button-nav-1.lato.white"),
    Services: document.querySelector(".faq-button-nav-2.lato.gray-900"),
    Consultancy: document.querySelectorAll(".faq-button-nav-1.lato.white")[1],
  };

  // Initially show the "About us" container and make its button active
  faqContainers["About us"].style.display = "block";
  buttons["About us"].classList.add("active");

  // Add event listeners to the buttons
  for (const buttonText in buttons) {
    buttons[buttonText].addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Hide all containers and deactivate ALL buttons
      for (const container in faqContainers) {
        faqContainers[container].style.display = "none";
        //Deactivate every button
        for (const button in buttons) {
          buttons[button].classList.remove("active");
        }
      }

      // Show the selected container and activate its button
      faqContainers[buttonText].style.display = "block";
      buttons[buttonText].classList.add("active");
    });
  }
});

function showSideBar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}
