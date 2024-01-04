document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll("#thro-list li");
    const contentDivs = document.querySelectorAll(".thro-content");
  
    listItems.forEach(function(item) {
      item.addEventListener("click", function() {
        const targetId = item.getAttribute("data-target");
  
        contentDivs.forEach(function(div) {
          div.classList.remove("active");
        });

        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
          targetDiv.classList.add("active");
        }
      });
    });
  });