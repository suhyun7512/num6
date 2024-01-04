function ul(index) {
    var underlines = document.querySelectorAll(".underline");
    var contents = document.querySelectorAll(".main-site");

    var totalWidth = 0;
    underlines.forEach(function (underline) {
        totalWidth += underline.offsetWidth;
    });

    var widthPercentage = (totalWidth / 75);
    var translateValue = (index * widthPercentage);

    for (var i = 0; i < underlines.length; i++) {
        underlines[i].style.transform = 'translate3d(' + translateValue *38 + 'px,0,0)';
    }

    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    contents[index].classList.add('active');
}