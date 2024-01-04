function handleClick2(link, contentClass) {
    const webtoonMenu11 = document.querySelector('.ca-link-custom.active');
    const webtoonContent11 = document.querySelector('.ca-content-custom.active, .ca-content-custom-2.active, .ca-content-custom-3.active');

    if (webtoonMenu11) {
        webtoonMenu11.classList.remove('active');
    }

    if (webtoonContent11) {
        webtoonContent11.classList.remove('active');
    }

    link.classList.add('active');
    document.querySelector(`.${contentClass}`).classList.add('active');
}