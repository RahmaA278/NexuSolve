const loginForm = document.getElementById("login-form");
const regHere = document.getElementById("reg-here");

function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("login-email"),
            password: form.get("password")
        })
    }

    showLoading();
    const response = await fetch("https://nexusolve-server.onrender.com/profiles/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        e.target.reset();
        window.location.assign("dashboard.html");
    } else {
        alert(data.error);
    }
    hideLoading();
})

regHere.addEventListener('click', () => {
    window.location.assign("register.html");
})