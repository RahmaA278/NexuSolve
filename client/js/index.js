const regHere = document.getElementById('regHere');
const loginHere = document.getElementById('loginHere');

regHere.addEventListener('click', () => {
    window.location.assign("./html/register.html");
})

loginHere.addEventListener('click', () => {
    window.location.assign("./html/login.html");
})