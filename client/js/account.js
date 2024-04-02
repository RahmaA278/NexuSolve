const homePage = document.getElementById("navHome")
const aboutPage = document.getElementById("navAbout")
const logout = document.getElementById("navLogout")

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

homePage.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "dashboard.html"
});

aboutPage.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "about.html"
});

logout.addEventListener('click', async (e) => {

    const token = localStorage.getItem('token');

    const options = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`, options);

    if (response.ok) {
        window.location.href = "login.html"
        localStorage.clear()
    } else {
        const data = await response.json();
        alert(data.error);
    }
});