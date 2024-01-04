document.addEventListener('DOMContentLoaded', function() {
    const textElement1 = document.getElementById('textAnimation');

    if (textElement1) {
      const textToDisplay1 = 'ISEGYE IDOL 2';

      function animateText() {
        let index1 = 0;
        const animationInterval = setInterval(() => {
          textElement1.textContent = textToDisplay1.slice(0, index1);
          index1++;

          if (index1 > textToDisplay1.length) {
            clearInterval(animationInterval);
          }
        }, 100);
      }

      animateText();
    } else {
    }
  });