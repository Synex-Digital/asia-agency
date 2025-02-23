document.addEventListener("DOMContentLoaded", function () {
    const campaignItems = document.querySelectorAll('.campaign-data-item');
    const progressFill = document.querySelector('.progress-fill');
    // Select all campaign table containers. Assuming their classes share a common prefix.
    const campaignTables = document.querySelectorAll('[class^="campaign-table-container-"]');

    // Initially show only the first campaign table and hide the others.
    campaignTables.forEach((table, index) => {
      table.style.display = index === 0 ? 'block' : 'none';
    });

    // Set the first campaign item as active by default.
    if (campaignItems.length > 0) {
        campaignItems[0].classList.add('active');
    }

    const totalWidth = 798; // Total width of the progress bar container
    const stepWidth = totalWidth / campaignItems.length; // Each step width based on number of items

    campaignItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            campaignItems.forEach(i => i.classList.remove('active'));

            // Add active class to the clicked item
            item.classList.add('active');

            // Calculate and update progress bar width
            const progress = (index + 1) * stepWidth;
            progressFill.style.transition = 'width 0.3s ease';
            progressFill.style.width = `${progress}px`;

            // Hide all campaign tables
            campaignTables.forEach(table => {
              table.style.display = 'none';
            });
            // Display the corresponding campaign table (assuming order matches)
            if (campaignTables[index]) {
              campaignTables[index].style.display = 'block';
            }
        });
    });
});
