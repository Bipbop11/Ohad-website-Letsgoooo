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


/* Select the input and button elements */
const nameInput = document.getElementById('name-input');
const nameButton = document.getElementById('name-button');

/* Add click event listener to the button */
nameButton.addEventListener('click', (event) => {
    /* Prevent the default form submission behavior (page refresh) */
    event.preventDefault();
    
    /* Get the value typed in the input field */
    const typedName = nameInput.value;
    
    /* Show the browser alert with the required greeting */
    alert('שלום, ' + typedName);
});