const boxes = document.querySelectorAll(".box");
const glowArea = document.createElement("div");
glowArea.classList.add("glow-area");
document.body.appendChild(glowArea);

const radius = 75; // Glow radius
const maxParticles = 5; // Maximum number of particles (though current createParticles creates max 3 per call)
let activeParticles = 0; // Not currently used, but could be used to limit total particles

document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');

  if (header) { // Ensure the header element exists
    window.addEventListener('scroll', function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scroll down, hide the header
        header.style.top = '-10rem'; // Adjust this value based on the header height
      } else {
        // Scroll up, show the header
        header.style.top = '-1rem';
        nav.style.backgroundColor = 'black';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
    });
  } else {
    console.error("Header element not found");
  }
});

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Get grid boundaries (assuming your grid container has class "grid")
  const grid = document.querySelector(".grid");
  if (grid) {
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
  })}
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
// Testimonial slider functionality
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const progressBar = document.querySelector(".progress");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;
const totalCards = cards.length;

// Ensure there are cards before accessing offsetWidth
const cardWidth = totalCards > 0 ? cards[0].offsetWidth : 0;

// Update progress bar
function updateProgress() {
  if (progressBar) {
    const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
}

// Next slide
if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      if (slider) {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
      updateProgress();
    }
  });
}

// Previous slide
if (prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      if (slider) {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
      updateProgress();
    }
  });
}

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
document.addEventListener("DOMContentLoaded", function () {
  const faqContainers = {
    "About us": document.querySelector(".nav-faq-container"),
    Services: document.querySelector(".nav-faq-container-1"),
    Consultancy: document.querySelector(".nav-faq-container-2"),
  };

  const buttons = {
    "About us": document.querySelector(".faq-button-nav-1.lato.white"),
    Services: document.querySelector(".faq-button-nav-2.lato.gray-900"),
    Consultancy: document.querySelectorAll(".faq-button-nav-1.lato.white")[1], // Might be undefined
  };

  // Check if "About us" container exists before modifying it
  if (faqContainers["About us"] && buttons["About us"]) {
    faqContainers["About us"].style.display = "block";
    buttons["About us"].classList.add("active");
  }

  // Add event listeners to the buttons
  for (const buttonText in buttons) {
    const button = buttons[buttonText];
    if (!button) continue; // Skip if the button does not exist

    button.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Hide all containers and deactivate ALL buttons
      for (const container in faqContainers) {
        if (faqContainers[container]) {
          faqContainers[container].style.display = "none";
        }
      }

      for (const btn in buttons) {
        if (buttons[btn]) {
          buttons[btn].classList.remove("active");
        }
      }

      // Show the selected container and activate its button
      if (faqContainers[buttonText] && buttons[buttonText]) {
        faqContainers[buttonText].style.display = "block";
        buttons[buttonText].classList.add("active");
      }
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

// about-us js
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

// how we are 

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

// paid media

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".paid-media-services-dropdownButton");
  const dropdownContents = document.querySelectorAll(".paid-media-services-dropdown-content");

  dropdownButtons.forEach((button, index) => {
    const content = dropdownContents[index];
    const img = button.querySelector("img"); // Select the image inside the button

    // Set initial max-height to 0 for all dropdown contents
    content.style.maxHeight = "0";
    content.classList.remove("active");

    // Add click event listener to toggle the active class and handle the animation
    button.addEventListener("click", function () {
      const isOpen = content.classList.contains("active");

      // Toggle active class on the clicked dropdown content
      content.classList.toggle("active");

      // If opening, set max-height to the content's scrollHeight and change image to down arrow
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        img.src = "/images/blog-details/icons/down.png"; // Change to down arrow
      } else {
        content.style.maxHeight = "0"; // Close it by setting max-height to 0
        img.src = "/images/blog-details/icons/right.png"; // Change back to right arrow
      }

      // Close other dropdowns and reset their images
      dropdownContents.forEach((otherContent, otherIndex) => {
        if (otherContent !== content && otherContent.classList.contains("active")) {
          otherContent.classList.remove("active");
          otherContent.style.maxHeight = "0";
          dropdownButtons[otherIndex].querySelector("img").src = "/images/blog-details/icons/right.png"; // Reset image
        }
      });
    });
  });
});

// sercices radio 

document.addEventListener("DOMContentLoaded", function () {
  const respondCards = document.querySelectorAll(".services-respond-card");

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
  const steps = [
    ".services-item-1",
    ".services-item-2",
    ".services-item-3",
    ".services-item-4"
  ];

  // Hide all steps except the first one
  for (let i = 1; i < steps.length; i++) {
    document.querySelector(steps[i]).style.display = "none";
  }

  steps.forEach((stepSelector, index) => {
    const respondCards = document.querySelectorAll(`${stepSelector} .services-respond-card`);
    
    respondCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Remove 'selected' class from all cards in the current step
        respondCards.forEach((c) => c.classList.remove("selected"));

        // Select the radio button inside the clicked card
        const radioButton = card.querySelector("input[type='radio']");
        if (radioButton) {
          radioButton.checked = true;
          card.classList.add("selected"); // Add highlight effect

          // Show the next step if available
          if (index + 1 < steps.length) {
            document.querySelector(steps[index + 1]).style.display = "block";
          }
        }
      });
    });
  });
});



