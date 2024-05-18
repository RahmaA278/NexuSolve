const regForm = document.getElementById("registerForm");
const loginHere = document.getElementById("loginHere");

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
            first_name: form.get("firstName"),
            last_name: form.get("lastName"),
            display_name: form.get("displayName"),
            email: form.get("regEmail"),
            image_name: form.get("imageName"),
            image_url: form.get("imageUrl"),
            password: form.get("password")
        })
    }

    const response = await fetch("https://nexusolve-server.onrender.com/profiles/register", options);
    const data = await response.json();

    if (response.status == 201) {
        e.target.reset();
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
})

loginHere.addEventListener('click', () => {
    window.location.assign("./login.html");
})