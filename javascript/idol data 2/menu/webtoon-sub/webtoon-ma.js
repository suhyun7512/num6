function handleClick1(link, contentClass) {
    const webtoonMenu10 = document.querySelector('.ma-link-custom.active');
    const webtoonContent10 = document.querySelector('.ma-content-custom.active, .ma-content-custom-2.active, .ma-content-custom-3.active');

    if (webtoonMenu10) {
        webtoonMenu10.classList.remove('active');
    }

    if (webtoonContent10) {
        webtoonContent10.classList.remove('active');
    }

    link.classList.add('active');
    document.querySelector(`.${contentClass}`).classList.add('active');
}