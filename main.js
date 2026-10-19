const openButton = document.getElementById('openMenuBtn');
const closeButton = document.getElementById('closeMenuBtn');
const menu = document.getElementById('navMenu');

openButton.addEventListener('click', () => {
    menu.classList.add('open');
});

closeButton.addEventListener('click', () => {
    menu.classList.remove('open');
});

const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');

nameButton.addEventListener('click', (event) => {
    event.preventDefault();
    const typedName = nameInput.value;
    alert('שלום, ' + typedName);
});