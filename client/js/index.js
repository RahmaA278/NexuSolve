const regHere = document.getElementById('reg-here');
const loginHere = document.getElementById('login-here');
const toDashboard = document.getElementById('to-dashboard');

regHere.addEventListener('click', () => {
    window.location.assign("./html/register.html");
})

loginHere.addEventListener('click', () => {
    window.location.assign("./html/login.html");
})

toDashboard.addEventListener('click', () => {
    window.location.assign("./html/dashboard.html");
})