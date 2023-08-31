window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__nav'),
        menuItem = document.querySelectorAll('.header__nav__item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header_active');
        })
    })

})


