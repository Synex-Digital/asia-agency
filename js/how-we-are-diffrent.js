document.querySelectorAll(".dropdownButton").forEach((button) => {
    button.addEventListener("click", function () {
      // Find the closest dropdown content (next sibling div)
      const dropdownContent = this.parentElement.nextElementSibling;
      const icon = this.querySelector("img"); // Select the icon inside the button
  
      if (
        dropdownContent.style.display === "none" ||
        dropdownContent.style.display === ""
      ) {
        dropdownContent.style.display = "block";
        dropdownContent.style.animation = "fadeIn 0.5s forwards";
        icon.style.transform = "rotate(90deg)"; // Rotate icon when expanded
      } else {
        dropdownContent.style.display = "none";
        icon.style.transform = "rotate(0deg)"; // Reset icon rotation
      }
    });
  });
  