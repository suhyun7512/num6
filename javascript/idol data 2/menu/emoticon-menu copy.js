function handleClick1(link, contentClass) {
    const activeLink1 = document.querySelector('.emoticon-link-1.active');
    const activeContent1 = document.querySelector('.emoticon-site-1.active, .emoticon-site-2.active, .emoticon-site-3.active');

    if (activeLink1) {
        activeLink1.classList.remove('active');
    }

    if (activeContent1) {
        activeContent1.classList.remove('active');
    }

    link.classList.add('active');
    document.querySelector(`.${contentClass}`).classList.add('active');
}