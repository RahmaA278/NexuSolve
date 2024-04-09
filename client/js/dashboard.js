const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

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
const commentSubmit = document.getElementById("commentSubmit");
const commentPopup = document.getElementById("postCommentPopup");
const commentForm = document.getElementById("commentForm");
const allCommentsContainer = document.getElementById("comment");
const commentInput = document.getElementById("commentInput");
const anonCheckbox2 = document.getElementById("anonCheckbox2");

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

/* Display Posts and Comments */

async function displayContent() {
    const postsRes = await fetch('https://nexusolve-server.onrender.com/posts')
    const posts = await postsRes.json()
    const commentsRes = await fetch('https://nexusolve-server.onrender.com/comments')
    const comments = await commentsRes.json()

        // Function to display comments for a specific post
        function displayComments(postId, comments) {
            const commentContainer = document.getElementById(`comment${postId}`);
            const postComments = comments.filter(comment => comment.post_id === postId);
            postComments.forEach(async (comment) => {
                const id = comment.account_id
                const profileRes = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
                const profile = await profileRes.json()
                const profilePictureSrc = comment.anonymous === true ? "../assets/anon.jpg" : `${profile.image_url}`;
                const formattedDate = new Date(comment.date).toLocaleString()
                const commentElement = document.createElement('div');
                commentElement.classList.add('subComment');
                commentElement.innerHTML = `
                    <div class="comment">
                        <div class="profile-picture">
                            <img src="${profilePictureSrc}" alt="Profile Picture">
                        </div>
                        <div class="comment-content">
                            <p>${comment.content}</p>
                        </div>
                    </div>
                    <div class="commentInfo">
                        <div></div>
                        <div class="commentProperties" id="commentTimeStamp${comment.id}">
                            <p class="cmntInfo">${formattedDate}</p>
                        </div>
                    </div>
                `;
                commentContainer.appendChild(commentElement);

            });
        }
        
        // Display posts
        posts.forEach(async (post) => {
            const id = post.account_id
            const profileRes = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
            const profile = await profileRes.json()
            const profilePictureSrc = post.anonymous === true ? "../assets/anon.jpg" : `${profile.image_url}`;
            const formattedDate = new Date(post.date).toLocaleString()
            const postContainer = document.createElement('div');
            postContainer.classList.add('fullPost');
            postContainer.innerHTML = `
                <div class="subPost">
                    <div class="post">
                        <div class="profile-picture">
                            <img src="${profilePictureSrc}" alt="Profile Picture">
                        </div>
                        <div class="post-content">
                            <p class="postTitle">${post.title}</p>
                            <p class="postBody">${post.content}</p>
                        </div>
                    </div>
                    <div class="postInfo">
                        <div class="postProperties" id="category${post.post_id}">
                            <p class="pstInfo">${post.category}</p>
                        </div>
                        <div class="postProperties">
                            <p class="speech">🗨</p>
                        </div>
                        <div class="postProperties" id="toComment${post.post_id}">
                            <button class="commentLink" data-post-id="${post.post_id}">Comment</button>
                        </div>
                        <div class="postProperties" id="postTimeStamp${post.post_id}">
                            <p class="pstInfo">${formattedDate}</p>
                        </div>
                    </div>
                </div>
                <div class="comments" id="comment${post.post_id}">
                    <!-- Comments section -->
                </div>
            `;
            const firstChild = allPostsContainer.firstChild;

            allPostsContainer.insertBefore(postContainer, firstChild);
            allPostsContainer.insertBefore(document.createElement("br"), firstChild);
            
            // Display comments for this post
            displayComments(post.post_id, comments);
        });
}

displayContent()

/* Popups */

reportBtn.addEventListener('click', function() {
    formPopup.style.display = 'block';
    mainBody.style.display = 'none';
});

postCancelBtn.addEventListener('click', function() {
    mainBody.style.display = 'block';
    formPopup.style.display = 'none';
});

commentCancelBtn.addEventListener('click', function() {
    mainBody.style.display = 'block';
    formPopup.style.display = 'none';
});

/* Make Posts and Comments */

postBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const getIdRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`)
    const getId = await getIdRes.json()
    const id = getId.account_id

    const getProfileRes = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
    const getProfile = await getProfileRes.json()
    const profilePic = getProfile.image_url

    const formData = {
        account_id: id,
        category: dropDownCate.value,
        title: postTitle.value,
        content: postContent.value,
        date: getCurrentTime(),
        anonymous: anonCheckbox.checked
    };

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }

    try {
        const response = await fetch('https://nexusolve-server.onrender.com/posts', options);

        if (!response.ok) {
            throw new Error('Failed to save post to database');
        }

        const data = await response.json()
        const postId = data.post_id

        const fullPost = document.createElement("div");
        fullPost.classList.add("fullPost");

        const profilePictureSrc = anonCheckbox.checked ? "../assets/anon.jpg" : `${profilePic}`;

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
                    <button class="commentLink" id="commentLink" data-post-id=${postId}>Comment</button>
                </div>
                <div class="postProperties" id="postTimeStamp">
                    <p class="pstInfo">${getCurrentTime()}</p>
                </div>
            </div>
        </div>
        <div class="comments" comment${postId}>
            <!-- Comments section -->
        </div>
    `;

        const firstChild = allPostsContainer.firstChild;

        allPostsContainer.insertBefore(fullPost, firstChild);
        allPostsContainer.insertBefore(document.createElement("br"), firstChild);

        const newCommentLink = fullPost.querySelector('.commentLink');
        newCommentLink.addEventListener('click', function() {
            console.log('hello');
            commentPopup.style.display = 'block';
            mainBody.style.display = 'none';
        });

        postForm.reset();
        formPopup.style.display = "none";
        mainBody.style.display = 'block';
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while saving the post.');
    }
});

commentSubmit.addEventListener('submit', async (e) => {
    if (e.target.classList.contains('commentLink')) {
        e.preventDefault();
        const postId = e.target.dataset.postId;

        const getIdRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`)
        const getId = await getIdRes.json()
        const id = getId.account_id

        const getProfileRes = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
        const getProfile = await getProfileRes.json()
        const profilePic = getProfile.image_url

        const formData = {
            account_id: id,
            post_id: postId,
            content: commentInput.value,
            date: getCurrentTime(),
            anonymous: anonCheckbox2.checked
        };

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        try {
            const response = await fetch('https://nexusolve-server.onrender.com/comments', options);

            if (!response.ok) {
                throw new Error('Failed to save comment to database');
            }

            const fullComment = document.createElement("div");
            fullComment.classList.add("subComment");

            const profilePictureSrc = anonCheckbox2.checked ? "../assets/anon.jpg" : `${profilePic}`;

            fullComment.innerHTML = `
                <div class="subComment">
                    <div class="comment">
                        <div class="profile-picture">
                            <img src="${profilePictureSrc}" alt="Profile Picture">
                        </div>
                        <div class="comment-content">
                            <p>${commentInput.value}</p>
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
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred while saving the post.');
        }
    }
});

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
}