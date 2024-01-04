document.addEventListener('DOMContentLoaded', function() {
    const daysSinceElement = document.getElementById('daysSinceText');

    if (daysSinceElement) {
      const referenceDate = new Date('2021-08-26');
      
      const currentDate = new Date();

      const timeDifference = currentDate - referenceDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      const textToShow = `ISEGYE IDOL 결성 +${daysDifference}일`;
//  days since ${referenceDate.toLocaleDateString()}.
      function animateText() {
        let index = 0;
        const animationInterval = setInterval(() => {
          daysSinceElement.textContent = textToShow.slice(0, index);
          index++;

          if (index > textToShow.length) {
            clearInterval(animationInterval);
          }
        }, 100);
      }

      animateText();
    } else {

    }
  });