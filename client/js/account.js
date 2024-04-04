const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

const homePage = document.getElementById("navHome")
const aboutPage = document.getElementById("navAbout")
const logout = document.getElementById("navLogout")
const page = document.getElementById("accountPage")
const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup2");
const popup3 = document.getElementById("popup3");
const popup4 = document.getElementById("popup4");
const popup5 = document.getElementById("popup5");
const updatePic = document.getElementById("updatePicture")
const uploadForm = document.getElementById("displayPicture");
const fileInput = document.getElementById('imagePath');
const updateDisplayName = document.getElementById('button1');
const updateDNForm = document.getElementById('updateDisplayName')
const updateEmail = document.getElementById('button2');
const updateEmailForm = document.getElementById('updateEmail')
const removePicture = document.getElementById('button3');
const removePicBtn = document.getElementById('removePicBtn')
const changePassword = document.getElementById('button4');
const changePasswordForm = document.getElementById('updatePassword')

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

/* Update profile information */

async function getUserInfo () {
    const userInfo = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`)
    const userInfoData = await userInfo.json()
    const id = userInfoData.account_id

    const response = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
    const data = await response.json()

    const userData = {
        profileImgSrc: data.image_url,
        welcomeMsg: `Welcome, ${data.display_name}`,
        accountNumber: data.account_id,
        firstName: data.first_name,
        lastName: data.last_name,
        displayName: data.display_name,
        emailAddress: data.email
    };

function updateElementContent(elementId, data, defaultValue) {
    const element = document.getElementById(elementId);
    if (data !== undefined) {
        element.textContent = data;
    } else {
        element.textContent = defaultValue;
    }
}

if (userData.profileImgSrc !== null) {
    document.getElementById("profileImg").src = `${userData.profileImgSrc}`;
} else {

}
updateElementContent("welcomeMsg", userData.welcomeMsg, "Welcome, Anonymous User!");
updateElementContent("accountNumber", userData.accountNumber, "123456");
updateElementContent("firstName", userData.firstName, "Anonymous");
updateElementContent("lastName", userData.lastName, "User");
updateElementContent("displayName", userData.displayName, "Anonymous User");
updateElementContent("emailAddress", userData.emailAddress, "u.anon@gmail.com");
}

getUserInfo()

/* Handle popups */

function openPopup1() {
    popup1.style.display = "block";
    page.style.display = "none";
}
function closePopup1() {
    popup1.style.display = "none";
    page.style.display = "block";
}

function openPopup2() {
    popup2.style.display = "block";
    page.style.display = "none";
}
function closePopup2() {
    popup2.style.display = "none";
    page.style.display = "block";
}

function openPopup3() {
    popup3.style.display = "block";
    page.style.display = "none";
}
function closePopup3() {
    popup3.style.display = "none";
    page.style.display = "block";
}

function openPopup4() {
    popup4.style.display = "block";
    page.style.display = "none";
}
function closePopup4() {
    popup4.style.display = "none";
    page.style.display = "block";
}

function openPopup5() {
    popup5.style.display = "block";
    page.style.display = "none";
}
function closePopup5() {
    popup5.style.display = "none";
    page.style.display = "block";
}

/* Button functions */

updatePic.addEventListener("click", openPopup1);

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    closePopup1();

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('token', token);

    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    };

    const urlOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    try {
        const response = await fetch("https://nexusolve-server.onrender.com/upload", options);
        const postUrl = await fetch("https://nexusolve-server.onrender.com/upload", urlOptions)

        if (response.ok) {
            alert("Your picture has been uploaded!");
            window.location.reload();
        } else {
            alert("An error occurred while uploading the picture.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});

updateDisplayName.addEventListener("click", openPopup2);

updateDNForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    closePopup2();

    try {
        const getIdRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`);
        const getId = await getIdRes.json()
        const id = getId.account_id

        const form = new FormData(e.target);

        const options = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                display_name: form.get("displayName"),
            })
        }

        const response = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`, options);

        if (response.ok) {
            alert("Your display name has been updated!");
            window.location.reload();
        } else {
            alert("An error occurred while updating your display name.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});

updateEmail.addEventListener("click", openPopup3);

updateEmailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    closePopup3();

    try {
        const getIdRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`);
        const getId = await getIdRes.json()
        const id = getId.account_id

        const form = new FormData(e.target);

        const options = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.get("email"),
            })
        }

        const response = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`, options);

        if (response.ok) {
            alert("Your email has been updated!");
            window.location.reload();
        } else {
            alert("An error occurred while updating your email.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});

removePicture.addEventListener("click", openPopup4)

removePicBtn.addEventListener("click", async () => {

    closePopup4();

    const options = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    try {
        const response = await fetch("https://nexusolve-server.onrender.com/upload", options);

        if (response.ok) {
            alert("Your picture has been removed.");
            window.location.reload();
        } else {
            alert("An error occurred while removing the picture.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});

changePassword.addEventListener("click", openPopup5);

changePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    closePopup5();

    try {
        const getIdRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`);
        const getId = await getIdRes.json()
        const id = getId.account_id

        const form = new FormData(e.target);

        const options = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: form.get("password"),
                oldPassword: form.get("oldPassword")
            })
        }

        const response = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`, options);

        if (response.ok) {
            alert("Your passwod has been changed!");
            window.location.reload();
        } else {
            alert("Incorrect password.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});