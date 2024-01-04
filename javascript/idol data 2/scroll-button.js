function scrollToElement(elementId) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToElement1(elementId1) {
    const targetElement1 = document.getElementById(elementId1);

    if (targetElement1) {
        targetElement1.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}