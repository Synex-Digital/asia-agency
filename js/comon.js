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