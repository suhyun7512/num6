let selectedSnsIcon = null;

      function toggleSnsSubDiv(snsType) {
        const snsSubDiv = document.getElementById(`sns-sub-div-${snsType}`);
        const allSnsSubDivs = document.querySelectorAll('.sns-sub-div');

        allSnsSubDivs.forEach(div => {
          div.style.display = 'none';
        });

        if (selectedSnsIcon) {
          selectedSnsIcon.classList.remove('active');
        }

        selectedSnsIcon = document.querySelector(`.sns-icon.${snsType}`);
        selectedSnsIcon.classList.add('active');

        snsSubDiv.style.display = 'block';
      }