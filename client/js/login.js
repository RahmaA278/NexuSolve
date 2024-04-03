const loginForm = document.getElementById("loginForm");
const regHere = document.getElementById("regHere");

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
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("https://nexusolve-server.onrender.com/profiles/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        e.target.reset();
        window.location.assign("dashboard.html");
    } else {
        alert(data.error);
    }
})

regHere.addEventListener('click', () => {
    window.location.assign("index.html");
})