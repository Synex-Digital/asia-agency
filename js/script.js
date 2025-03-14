const boxes = document.querySelectorAll(".box");
const glowArea = document.createElement("div");
glowArea.classList.add("glow-area");
document.body.appendChild(glowArea);

const radius = 75; // Glow radius
const maxParticles = 5; // Maximum number of particles (though current createParticles creates max 3 per call)
let activeParticles = 0; // Not currently used, but could be used to limit total particles

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");

  if (header) {
    // Ensure the header element exists
    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scroll down, hide the header
        header.style.top = "-10rem"; // Adjust this value based on the header height
      } else {
        // Scroll up, show the header
        header.style.top = "-1rem";
        nav.style.backgroundColor = "black";
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
    });
  }
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
    const progress =
      totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;
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
  const dropdownContents = document.querySelectorAll(
    ".how-we-dropdown-content"
  );

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

  if (campaignTables && campaignTables.length > 0) {
    // Initially show only the first campaign table and hide the others
    campaignTables.forEach((table, index) => {
      if (table) {
        table.style.display = index === 0 ? "block" : "none";
      }
    });
  }

  const totalWidth = 798;
  const stepWidth = totalWidth / 3; // Dividing by 3 for 33%, 66%, 100%

  if (progressFill) {
    // Set initial progress to 33% and first item active
    progressFill.style.width = `${stepWidth}px`;
  }

  if (campaignItems && campaignItems.length > 0) {
    campaignItems[0].classList.add("active");
  }

  if (campaignItems) {
    campaignItems.forEach((item, index) => {
      if (item) {
        item.addEventListener("click", () => {
          // Remove active class from all items
          if (campaignItems) {
            campaignItems.forEach((i) => i.classList.remove("active"));
          }

          // Add active class only to current clicked item
          item.classList.add("active");

          if (progressFill) {
            // Calculate progress - 33% for first, 66% for second, 100% for third
            const progress = stepWidth * (index + 1);
            progressFill.style.transition = "width 0.3s ease";
            progressFill.style.width = `${progress}px`;
          }

          // Hide all campaign tables
          if (campaignTables) {
            campaignTables.forEach((table) => {
              if (table) {
                table.style.display = "none";
              }
            });

            // Display the corresponding campaign table
            if (campaignTables[index]) {
              campaignTables[index].style.display = "block";
            }
          }
        });
      }
    });
  }
});
// paid media

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(
    ".paid-media-services-dropdownButton"
  );
  const dropdownContents = document.querySelectorAll(
    ".paid-media-services-dropdown-content"
  );

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
        if (
          otherContent !== content &&
          otherContent.classList.contains("active")
        ) {
          otherContent.classList.remove("active");
          otherContent.style.maxHeight = "0";
          dropdownButtons[otherIndex].querySelector("img").src =
            "/images/blog-details/icons/right.png"; // Reset image
        }
      });
    });
  });
});

// services radio

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
    ".services-item-4",
  ];

  // Hide all steps except the first one
  for (let i = 1; i < steps.length; i++) {
    const stepElement = document.querySelector(steps[i]);
    if (stepElement) {
      stepElement.style.display = "none";
    }
  }

  steps.forEach((stepSelector, index) => {
    const respondCards = document.querySelectorAll(
      `${stepSelector} .services-respond-card`
    );

    if (respondCards) {
      respondCards.forEach((card) => {
        if (card) {
          card.addEventListener("click", function () {
            // Remove 'selected' class from all cards in the current step
            respondCards.forEach((c) => {
              if (c) {
                c.classList.remove("selected");
              }
            });

            // Select the radio button inside the clicked card
            const radioButton = card.querySelector("input[type='radio']");
            if (radioButton) {
              radioButton.checked = true;
              card.classList.add("selected"); // Add highlight effect

              // Show the next step if available
              if (index + 1 < steps.length) {
                const nextStepElement = document.querySelector(
                  steps[index + 1]
                );
                if (nextStepElement) {
                  nextStepElement.style.display = "block";
                }
              }
            }
          });
        }
      });
    }
  });
});

// homeAnimation
// hero section
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", function () {
    gsap.from(".home-hero .main-heading", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(".home-hero .description", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(".home-hero .cta-btn-nav", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.6,
    });

    gsap.from(".home-hero .tag", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations
    function initAnimations() {
      // Animate logos from left to right
      gsap.from(".logo", {
        scrollTrigger: {
          trigger: "#logoContainer",
          start: "top 80%",
          toggleActions: "play none none reset",
          // markers: true // Uncomment for debugging
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Optional: Add hover effect for logos
      const logos = document.querySelectorAll(".logo");
      logos.forEach((logo) => {
        logo.addEventListener("mouseenter", () => {
          gsap.to(logo, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }

    setTimeout(() => {
      initAnimations();
      ScrollTrigger.refresh();
    }, 100);

    // Ensure proper recalculation after full load (e.g., images)
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  });
  // about-us
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.Lenis === "undefined") {
      console.error("Lenis is not loaded. Check the script source or network.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Select all words
    const words = document.querySelectorAll("#about-us h3");

    // Split each word into characters and animate them
    words.forEach((word, i) => {
      const text = new SplitType(word, { types: "char" });

      gsap.fromTo(
        text.chars,
        {
          color: "rgba(255, 255, 255, 0.1)",
        },
        {
          color: "rgba(255, 255, 255, 1)",
          scrollTrigger: {
            trigger: word,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            markers: false,
          },
          opacity: 1,
          duration: 0.2,
          stagger: 0.05,
        }
      );
    });

    // Lenis smooth scrolling
    const lenis = new window.Lenis();
    lenis.on("scroll", (e) => {});
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animation function
  const animateOnScroll = (
    selector,
    triggerSelector,
    animationType,
    options = {}
  ) => {
    const animationPresets = {
      fadeTextUp: {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          markers: false,
        },
      },
      bageButton: {
        x: -100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      },
      brandLogo: {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          markers: false,
        },
      },
      btnDown: {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          start: "top 95%",
          end: "top 65%",
          scrub: 1,
        },
      },
      typewriter: {
        function: (element, trigger, options) => {
          // Store original content and clear element
          const originalHTML = element.innerHTML;
          element.innerHTML = "";

          // Create a temporary container to parse the content
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = originalHTML;

          // Process text nodes and spans separately
          const characters = [];
          Array.from(tempDiv.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              // Split text into characters
              Array.from(node.textContent).forEach((char) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.style.opacity = 0;
                element.appendChild(span);
                characters.push(span);
              });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Preserve the span (or other elements) as-is
              const clonedNode = node.cloneNode(true);
              clonedNode.style.opacity = 0;
              element.appendChild(clonedNode);
              characters.push(clonedNode);
            }
          });

          // Animate all characters and spans
          gsap.to(characters, {
            opacity: 1,
            stagger: options.stagger || 0.1,
            scrollTrigger: {
              trigger: trigger,
              start: options.scrollTrigger?.start || "top 80%",
              toggleActions: "play none none none",
              markers: options.scrollTrigger?.markers || false,
            },
          });
        },
      },
    };

    // Get the preset, fallback to fadeTextUp if invalid
    const preset =
      animationPresets[animationType] || animationPresets.fadeTextUp;

    // Convert selector to array and filter out non-existent elements
    const elements = gsap.utils
      .toArray(selector)
      .filter((el) => el instanceof Element);

    if (!elements.length) {
      // console.warn(`No elements found for selector no problem: ${selector}`);
      return;
    }

    elements.forEach((element) => {
      // Determine the trigger dynamically
      let trigger = triggerSelector
        ? document.querySelector(triggerSelector)
        : element.closest("section") || element;

      if (!trigger) {
        console.warn(
          `Trigger not found for ${triggerSelector}, using element as fallback`
        );
        trigger = element;
      }

      // Handle the preset based on whether it’s a function or properties
      if (typeof preset.function === "function") {
        preset.function(element, trigger, options); // Call the custom function
      } else {
        // Only apply gsap.from for property-based presets
        gsap.from(element, {
          ...preset,
          ...options,
          scrollTrigger: {
            trigger: trigger,
            ...preset.scrollTrigger, // Safe now, only used for fadeTextUp-like presets
            ...options.scrollTrigger,
          },
        });
      }
    });
  };

  // Usage
  document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll(".animate-text", null, "fadeTextUp");
    animateOnScroll(".animate-bageButton", null, "bageButton");

    animateOnScroll(".typewriter", null, "typewriter", {
      stagger: 0.05,
      delay: 0.5,
      scrollTrigger: {
        start: "top 80%",
      },
    });
  });

  // home-animations.js
  // Only run on homepage
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    // trust-us
    document.addEventListener("DOMContentLoaded", () => {
      // Animate each feature with a staggered effect
      gsap.from("#trust-us .feature", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#trust-us",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate icons separately for extra emphasis
      gsap.from("#trust-us .feature img", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.2,
        scrollTrigger: {
          trigger: "#trust-us",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate text with a slight delay after icons
      gsap.from("#trust-us .feature h3", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: "#trust-us",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // campaign data section
    document.addEventListener("DOMContentLoaded", () => {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Reset inline styles on accordion details to prevent initial hiding
      const detailsElements = document.querySelectorAll(".accordion details");
      detailsElements.forEach((detail) => {
        detail.style.opacity = "1";
        detail.style.transform = "none";
      });

      // Initialize animations
      function initAnimations() {
        // Animate accordion items (left side)
        gsap.from(".accordion details", {
          scrollTrigger: {
            trigger: ".campaign-data-content",
            start: "top 80%",
            toggleActions: "play none none reset",
            // markers: true // Uncomment for debugging
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });

        // Enhance accordion content animation when opened
        detailsElements.forEach((detail) => {
          detail.addEventListener("toggle", () => {
            if (detail.open) {
              gsap.from(detail.querySelector(".white-bg-btn"), {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }
          });
        });

        // Animate table header (right side)
        gsap.from(".table-container thead tr", {
          scrollTrigger: {
            trigger: ".campaign-data-content",
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          y: -20, // Slide down from above
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // Animate table rows (right side)
        gsap.from(".table-container tbody tr", {
          scrollTrigger: {
            trigger: ".campaign-data-content",
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          x: 30, // Slide in from the right (changed from y to x for horizontal effect)
          opacity: 0,
          duration: 0.8,
          stagger: 0.1, // Stagger rows for a wave effect
          ease: "power2.out",
        });

        // Hover animation for "More info" buttons
        const moreInfoButtons = document.querySelectorAll(".white-bg-btn");
        moreInfoButtons.forEach((btn) => {
          btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "power2.out" });
            gsap.to(btn.querySelector(".white-bg-btn-arrow"), {
              x: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(btn.querySelector(".white-bg-btn-arrow"), {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Run animations after a short delay and refresh ScrollTrigger
      setTimeout(() => {
        initAnimations();
        ScrollTrigger.refresh();
      }, 100);

      // Ensure visibility on full load
      window.addEventListener("load", () => {
        detailsElements.forEach((detail) => {
          detail.style.opacity = "1";
          detail.style.transform = "none";
        });
        ScrollTrigger.refresh();
      });
    });
    // services-section
    // Check if service-section-wrap exists
    if (document.querySelector(".service-section-wrap")) {
      document.addEventListener("DOMContentLoaded", () => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate the entire section
        gsap.from(".service-section-wrap", {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-section-wrap",
            start: "top 90%", // Start when top of section hits 90% of viewport
            end: "bottom 20%", // End when bottom of section is 20% from top
            scrub: 1,
          },
        });

        // Animate heading and paragraph
        gsap.from(".service-section > *", {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-section",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });

        // Animate all service cards individually
        gsap.from(".service-card", {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".service-section-wrap", // Use the full section as trigger
            start: "top 80%", // Start earlier to catch all cards
            end: "bottom 80%", // Extend end to ensure bottom cards animate
            scrub: 1,
            // pin: false, // No pinning, just scroll-based
          },
        });

        // Animate card contents
        gsap.from(".service-card > *", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-section-wrap", // Same trigger for consistency
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      });
    }
    // blog secction
    document.addEventListener("DOMContentLoaded", () => {
      gsap.utils.toArray(".blog-card").forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Start animation when top of card is 80% from top of viewport
            end: "bottom 20%", // End when bottom of card is 20% from top of viewport
            scrub: 1, // Smooth scrubbing effect
            toggleActions: "play none none reverse", // Play on enter, reverse on leave
          },
          opacity: 0,
          y: 50, // Move up from 50px below
          duration: 1,
          ease: "power2.out",
          delay: index * 0.2, // Stagger animation for each card
        });
      });

      // Animate heading
      gsap.from(".blog-heading", {
        scrollTrigger: {
          trigger: ".blog-heading",
          start: "top 90%",
          end: "bottom 60%",
          scrub: 1,
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });
    });
    // contact-us section
    document.addEventListener("DOMContentLoaded", () => {
      gsap.from(".form-text h3", {
        scrollTrigger: {
          trigger: ".form-text",
          start: "top 80%", // When top of element hits 80% from top of viewport
          toggleActions: "play none none reset", // On enter, on leave, on enter back, on leave back
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate list items
      gsap.from(".form-list li", {
        scrollTrigger: {
          trigger: ".form-list",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Animate CTA
      gsap.from(".form-cta", {
        scrollTrigger: {
          trigger: ".form-cta",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate service and budget sections
      gsap.from(".form-form > div", {
        scrollTrigger: {
          trigger: ".form-form",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      });

      // Animate form inputs
      gsap.from(".form-input", {
        scrollTrigger: {
          trigger: ".form-input-group",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Animate submit button
      gsap.from(".submit-btn button", {
        scrollTrigger: {
          trigger: ".submit-btn",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Hover animation for submit button (remains same as it’s not scroll-dependent)
      const submitBtn = document.querySelector(".submit-btn button");
      submitBtn.addEventListener("mouseenter", () => {
        gsap.to(submitBtn, {
          duration: 0.3,
          scale: 1.05,
          ease: "power2.out",
        });
      });
      submitBtn.addEventListener("mouseleave", () => {
        gsap.to(submitBtn, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        });
      });
    });
    // faq section
    document.addEventListener("DOMContentLoaded", () => {
      gsap.from(".faq-section-content .main-heading", {
        scrollTrigger: {
          trigger: ".faq-section-content",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate the subtitle
      gsap.from(".faq-section-content p", {
        scrollTrigger: {
          trigger: ".faq-section-content",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate navigation buttons
      gsap.from(".faq-nav-buttons a", {
        scrollTrigger: {
          trigger: ".faq-nav-buttons",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Animate FAQ items
      gsap.from(".nav-faq-item", {
        scrollTrigger: {
          trigger: ".nav-faq-container",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    });
    // footer section
    document.addEventListener("DOMContentLoaded", () => {
      gsap.from(".footer-content h3", {
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate the trial section paragraph
      gsap.from(".footer-content p", {
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate the trial button
      gsap.from(".footer-content-button a", {
        scrollTrigger: {
          trigger: ".footer-content-button",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.4,
      });

      // Animate the logo section
      gsap.from(".footer-logo", {
        scrollTrigger: {
          trigger: ".footer-content-nav-1",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate subscribe section
      gsap.from(".footer-content-nav-1 h4, .footer-content-nav-1 p", {
        scrollTrigger: {
          trigger: ".footer-content-nav-1",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      });

      // Animate email subscription form
      gsap.from(".footer-content-nav-1-input-email", {
        scrollTrigger: {
          trigger: ".footer-content-nav-1-input",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      });

      // Animate navigation columns
      gsap.from(".footer-content-nav-list", {
        scrollTrigger: {
          trigger: ".footer-content-nav-2",
          start: "top 80%",
          toggleActions: "play none none reset",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate bottom copyright and social icons
      gsap.from(".footer-content-nav-bottom > *", {
        scrollTrigger: {
          trigger: ".footer-content-nav-bottom",
          start: "top 90%",
          toggleActions: "play none none reset",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Hover animation for trial button
      const trialBtn = document.querySelector(".footer-content-button a");
      trialBtn.addEventListener("mouseenter", () => {
        gsap.to(trialBtn, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      trialBtn.addEventListener("mouseleave", () => {
        gsap.to(trialBtn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Hover animation for social icons
      const socialIcons = document.querySelectorAll(
        ".footer-content-nav-social a"
      );
      socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    });
  }
}

// testimonial-animations.js

// Check if testimonial section with testimonial-card exists
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /*** Testimonial Animation ***/
  if (document.querySelector(".testimonial-animate")) {
    gsap.from(".testimonial-tittle h3", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-tittle",
        start: "top 90%",
        end: "top 60%",
        scrub: 1,
      },
    });

    gsap.from(".testimonial-card", {
      opacity: 0,
      y: 60,
      duration: 1, // Adjust the duration for all elements to animate at once
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-animate .slider-container",
        start: "top 85%",
        end: "bottom 20%",
        scrub: 1,
      },
    });

    gsap.from(".testimonial-card .testimonial-wrapper > *", {
      opacity: 0,
      y: 30,
      duration: 1, // Same duration as the previous animation
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-animate .slider-container",
        start: "top 85%",
        end: "bottom 20%",
        scrub: 1,
      },
    });

    gsap.from(".testimonial-animate .slider-controls", {
      opacity: 0,
      y: 40,
      duration: 1, // Same duration as the previous animation
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-animate .slider-controls",
        start: "top 90%",
        end: "top 60%",
        scrub: 1,
      },
    });
  }

  /*** Projects Animation ***/
  if (document.querySelector(".projects")) {
    gsap.from("#projects .main-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from("#projects .projects-button", {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from("#projects .project-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slider",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from("#projects .card-container > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".slider",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from("#projects .slider-controls", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slider-controls",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }
});

// home-cta-animations.js
// Check if home-cta exists and target only the first instance
if (document.querySelector("#home-cta")) {
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Select all elements with the #home-cta ID (which should be unique)
    // Instead, use a class like `.home-cta` for multiple sections
    document.querySelectorAll(".home-cta").forEach((ctaSection) => {
      gsap.from(ctaSection, {
        y: 100, // Slide up from 100px below
        opacity: 0,
        duration: 1.2,
        ease: "power4.out", // Smooth, strong easing
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Stagger internal elements
      gsap.from(ctaSection.querySelectorAll(".cta-contant > *"), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      });

      // Animate buttons inside each section
      gsap.to(ctaSection.querySelectorAll(".cta-button"), {
        x: 10, // Slight shift right
        duration: 0.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });
  });
}
