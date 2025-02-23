document.addEventListener("DOMContentLoaded", function () {
    const campaignItems = document.querySelectorAll('.campaign-data-item');
    const progressFill = document.querySelector('.progress-fill');
    const campaignTables = document.querySelectorAll('[class^="campaign-table-container-"]');

    // Initially show only the first campaign table and hide the others
    campaignTables.forEach((table, index) => {
      table.style.display = index === 0 ? 'block' : 'none';
    });

    const totalWidth = 798;
    const stepWidth = totalWidth / 3; // Dividing by 3 for 33%, 66%, 100%

    // Set initial progress to 33% and first item active
    progressFill.style.width = `${stepWidth}px`;
    if (campaignItems.length > 0) {
        campaignItems[0].classList.add('active');
    }

    campaignItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            campaignItems.forEach(i => i.classList.remove('active'));

            // Add active class only to current clicked item
            item.classList.add('active');

            // Calculate progress - 33% for first, 66% for second, 100% for third
            const progress = stepWidth * (index + 1);
            progressFill.style.transition = 'width 0.3s ease';
            progressFill.style.width = `${progress}px`;

            // Hide all campaign tables
            campaignTables.forEach(table => {
              table.style.display = 'none';
            });
            
            // Display the corresponding campaign table
            if (campaignTables[index]) {
              campaignTables[index].style.display = 'block';
            }
        });
    });
});
