const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

const homePage = document.getElementById("navHome")
const aboutPage = document.getElementById("navAbout")
const logout = document.getElementById("navLogout")
const updatePic = document.getElementById("updatePicture")
const popup = document.getElementById("popup");
const uploadForm = document.getElementById("displayPicture");
const fileInput = document.getElementById('imagePath');
const updateDisplayName = document.getElementById('button1');
const updateEmail = document.getElementById('button2');
const removePicture = document.getElementById('button3');
const updatePassword = document.getElementById('button4');


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
    welcomeMsg: `Welcome, ${data.first_name} ${data.last_name}`,
    accountNumber: data.account_id,
    accountName: `${data.first_name} ${data.last_name}`,
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
updateElementContent("accountName", userData.accountName, "Anonymous User");
updateElementContent("emailAddress", userData.emailAddress, "u.anon@gmail.com");
}

getUserInfo()

function openPopup() {
    popup.style.display = "block";
}
function closePopup() {
    popup.style.display = "none";
}

updatePic.addEventListener("click", openPopup);

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    closePopup();

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

    try {
        const response = await fetch("https://nexusolve-server.onrender.com/upload", options);

        if (response.ok) {
            alert("Your picture has been uploaded!");
        } else {
            alert("An error occurred while uploading the picture.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});
