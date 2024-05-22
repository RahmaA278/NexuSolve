const regForm = document.getElementById("reg-form");
const loginHere = document.getElementById("login-here");

function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

regForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: form.get("first-name"),
            last_name: form.get("last-name"),
            display_name: form.get("display-name"),
            email: form.get("reg-email"),
            image_name: form.get("imageName"),
            image_url: form.get("imageUrl"),
            password: form.get("password")
        })
    }

    showLoading();
    const response = await fetch("https://nexusolve-server.onrender.com/profiles/register", options);
    const data = await response.json();

    if (response.status == 201) {
        e.target.reset();
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
    hideLoading();
})

loginHere.addEventListener('click', () => {
    window.location.assign("./login.html");
})