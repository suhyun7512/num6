function handleClick(link, contentClass) {
    const activeLink = document.querySelector('.webtoon-link-1.active');
    const activeContent = document.querySelector('.webtoon-site-1.active, .webtoon-site-2.active');

    if (activeLink) {
        activeLink.classList.remove('active');
    }

    if (activeContent) {
        activeContent.classList.remove('active');
    }

    link.classList.add('active');
    document.querySelector(`.${contentClass}`).classList.add('active');
}