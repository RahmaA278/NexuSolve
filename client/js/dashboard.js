const accPage = document.getElementById("navAcc")
const aboutPage = document.getElementById("navAbout")
const logout = document.getElementById("navLogout")
const reportBtn = document.getElementById("reportIssueBtn");
const postCancelBtn = document.getElementById("postCancelBtn");
const postBtn = document.getElementById("postBtn")
const formPopup = document.getElementById('postFormPopup')
const postForm = document.getElementById("postForm");
const allPostsContainer = document.getElementById("all-posts");
const anonCheckbox = document.getElementById("anonCheckbox");
const commentCancelBtn = document.getElementById("commentCancelBtn");
const commentSubmit = document.getElementById("commentSubmit")
const commentBtn = document.getElementById("commentLink")
const commentPopup = document.getElementById("postCommentPopup");
const commentForm = document.getElementById("commentForm");
const allCommentsContainer = document.getElementById("comment")
const commentInput = document.getElementById("commentInput");
const anonCheckbox2 = document.getElementById("anonCheckbox2");

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

accPage.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "account.html"
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

/* Popups */

reportBtn.addEventListener('click', function() {
    formPopup.style.display = 'block';
    mainBody.style.display = 'none';
});

postCancelBtn.addEventListener('click', function() {
    mainBody.style.display = 'block';
    formPopup.style.display = 'none';
});

commentBtn.addEventListener('click', function() {
    commentPopup.style.display = 'block';
    mainBody.style.display = 'none';
});

commentCancelBtn.addEventListener('click', function() {
    mainBody.style.display = 'block';
    formPopup.style.display = 'none';
});

/* Posts and Comments */

postBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const fullPost = document.createElement("div");
    fullPost.classList.add("fullPost");

    const profilePictureSrc = anonCheckbox.checked ? "../assets/anon.png" : "../assets/pic2.png";

    fullPost.innerHTML = `
        <div class="subPost">
            <div class="post">
                <div class="profile-picture">
                    <img src="${profilePictureSrc}" alt="Profile Picture">
                </div>
                <div class="post-content">
                    <p class="postTitle">${postTitle.value}</p>
                    <p class="postBody">${postContent.value}</p>
                </div>
            </div>
            <div class="postInfo">
                <div class="postProperties" id="category">
                    <p class="pstInfo">${dropDownCate.value}</p>
                </div>
                <div class="postProperties">
                    <p class="speech">🗨</p>
                </div>
                <div class="postProperties" id="toComment">
                    <a id="commentLink" href="#">Comment</a>
                </div>
                <div class="postProperties" id="postTimeStamp">
                    <p class="pstInfo">${getCurrentTime()}</p>
                </div>
            </div>
        </div>
        <div class="comments">
            <!-- Comments section -->
        </div>
    `;

    const firstChild = allPostsContainer.firstChild;

    allPostsContainer.insertBefore(fullPost, firstChild);

    allPostsContainer.insertBefore(document.createElement("br"), firstChild);

    postForm.reset();

    formPopup.style.display = "none";
    mainBody.style.display = 'block';
});

commentSubmit.addEventListener('click', function(event) {
    event.preventDefault();

    const fullComment = document.createElement("div");
    fullComment.classList.add("subComment");

    const profilePictureSrc = anonCheckbox2.checked ? "../assets/anon.png" : "../assets/pic2.png";

    fullComment.innerHTML = `
        <div class="subComment">
            <div class="comment">
                <div class="profile-picture">
                    <img src="${profilePictureSrc}" alt="Profile Picture">
                </div>
                <div class="comment-content">
                    <p>${commentInput1.value}</p>
                </div>
            </div>
            <div class="commentInfo">
                <div></div>
                <div class="commentProperties" id="commentTimeStamp">
                    <p class="cmntInfo">${getCurrentTime()}</p>
                </div>
            </div>
        </div>
    `;

    allCommentsContainer.appendChild(fullComment);

    allCommentsContainer.appendChild(document.createElement("br"));

    commentForm.reset();

    commentPopup.style.display = "none";
    mainBody.style.display = 'block';
});

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
}