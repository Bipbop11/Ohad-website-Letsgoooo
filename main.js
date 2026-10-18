/* Select elements by their ID */
const openButton = document.getElementById('openMenuBtn');
const closeButton = document.getElementById('closeMenuBtn');
const menu = document.getElementById('navMenu');

/* Add the open class to show the menu */
openButton.addEventListener('click', () => {
    menu.classList.add('open');
});

/* Remove the open class to hide the menu */
closeButton.addEventListener('click', () => {
    menu.classList.remove('open');
});
