const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

async function handleTokenExpiration(token) {
    try {
        const tokenDataRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`);
        const tokenData = await tokenDataRes.json();
        const currentTime = new Date().getTime();

        if (currentTime > tokenData.expiration_timestamp) {
            localStorage.clear()
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

handleTokenExpiration(token);

const homePage = document.getElementById("nav-home")
const accPage = document.getElementById("nav-account")
const logout = document.getElementById("nav-logout")
const homePageMob = document.getElementById("mob-nav-home")
const accPageMob = document.getElementById("mob-nav-account")
const logoutMob = document.getElementById("mob-nav-logout")

function toggleMenu() {
    const nav = document.getElementById("popup-nav");
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
    }
}

function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

homePage.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "dashboard.html"
});

homePageMob.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "dashboard.html"
});

accPage.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "account.html"
});

accPageMob.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "account.html"
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

    showLoading();
    const response = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`, options);

    if (response.ok) {
        localStorage.clear()
        window.location.href = "login.html"
    } else {
        const data = await response.json();
        alert(data.error);
    }
    hideLoading();
});

logoutMob.addEventListener('click', async (e) => {

    const token = localStorage.getItem('token');

    const options = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    showLoading();
    const response = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`, options);

    if (response.ok) {
        localStorage.clear()
        window.location.href = "login.html"
    } else {
        const data = await response.json();
        alert(data.error);
    }
    hideLoading();
});

window.onload = function() {
    const sectionId = window.location.hash.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};