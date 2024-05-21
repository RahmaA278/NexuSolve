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

const accPage = document.getElementById("nav-account")
const aboutPage = document.getElementById("nav-about")
const logout = document.getElementById("nav-logout")
const page = document.getElementById("main")
const postPopup = document.getElementById('post-popup')
const postForm = document.getElementById("post-form");
const dropdown = document.getElementById("dropdown");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const postCheckbox = document.getElementById("post-checkbox");
const postBtn = document.getElementById("post-btn")
const postCancelBtn = document.getElementById("post-cancel-btn");
const commentPopup = document.getElementById("comment-popup");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentCheckbox = document.getElementById("comment-checkbox");
const commentSubmit = document.getElementById("comment-submit");
const commentCancelBtn = document.getElementById("comment-cancel-btn");
const reportBtn = document.getElementById("report-btn");
const allPostsContainer = document.getElementById("all-posts");
const allCommentsContainer = document.getElementById("comment");

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
                const profilePicId = `profilePic${comment.id}` 
                // const profileImg = document.getElementById(profilePicId);
                // let profileImageError = false;

                // profileImg.addEventListener("error", function() {
                //     profileImageError = true;
                // });

                // // Add an event listener to handle errors when loading the image
                // profileImg.addEventListener("error", function() {
                //     // Display the default image when there's an error loading the profile image
                //     profileImg.src = "../assets/anon.jpg";
                // });

                // // Set the source of the image
                // if (profile.image_url !== null) {
                //     profileImg.src = profile.image_url;
                // } else {
                //     // Display the default image if userData.profileImgSrc is null
                //     profileImg.src = "../assets/anon.jpg";
                // }
                const profilePictureSrc = !profile.image_url ? "../assets/error.png" : comment.anonymous ? "../assets/anon.jpg" : profile.image_url;
                
                /* formatting date and time */
                const commentDate = new Date(comment.date);
                const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
                const timeString = commentDate.toLocaleTimeString('en-GB', timeOptions);
                const day = commentDate.getDate();
                const monthOptions = { month: 'long' };
                const monthString = commentDate.toLocaleDateString('en-GB', monthOptions);
                const year = commentDate.getFullYear();
                const formattedDate = `${timeString} on ${day}${getOrdinalSuffix(day)} ${monthString} ${year}`;

                const commentElement = document.createElement('div');
                commentElement.classList.add('sub-comment');
                commentElement.innerHTML = `
                    <div class="comment" id="comment${comment.id}">
                        <img class="comment-pic" id="${profilePicId}" src="${profilePictureSrc}" alt="Profile Picture">
                        <div class="comment-content">
                            <div class="comment-script">
                                <p>${comment.content}</p>
                            </div>
                            <div class="comment-info">
                            <div class="comment-properties" id="comment-timestamp${comment.id}">
                                <p class="comment-details">${formattedDate}</p>
                            </div>
                        </div>
                    </div>
                `;
                commentContainer.appendChild(commentElement);

                document.querySelectorAll('.comment-details').forEach(element => {
                    truncateText(element, 5); // Adjust maxLength as needed
                });
            });
        }
        
        // Display posts
        posts.forEach(async (post) => {
            const id = post.account_id
            const profileRes = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
            const profile = await profileRes.json()
            const profilePictureSrc = !profile.image_url ? "../assets/error.png" : post.anonymous ? "../assets/anon.jpg" : profile.image_url;

            /* formatting date and time */
            const postDate = new Date(post.date);
            const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
            const timeString = postDate.toLocaleTimeString('en-GB', timeOptions);
            const day = postDate.getDate();
            const monthOptions = { month: 'long' };
            const monthString = postDate.toLocaleDateString('en-GB', monthOptions);
            const year = postDate.getFullYear();
            const formattedDate = `${timeString} on ${day}${getOrdinalSuffix(day)} ${monthString} ${year}`;

            const postContainer = document.createElement('div');
            postContainer.classList.add('full-post');
            postContainer.innerHTML = `
                <div class="sub-post" id="sub-post${post.post_id}">
                    <div class="post" id="post${post.post_id}">
                        <img class="post-pic" src="${profilePictureSrc}" alt="Profile Picture">
                        <div class="post-content">
                            <div class="post-script">
                                <p class="post-title">${post.title}</p>
                                <p class="post-text">${post.content}</p>
                            </div>
                            <div class="post-info">
                                <div class="post-properties | category" id="category${post.post_id}">
                                    <p class="post-details">${post.category}</p>
                                </div>
                                <div class="post-properties | comment-btn" id="comment-btn${post.post_id}">
                                    <p class="speech">🗨</p>
                                    <button class="comment-link" id="comment-link${post.post_id}" data-post-id=${post.post_id}>Comment</button>
                                </div>
                                <div class="post-properties | post-timestamp" id="post-timestamp${post.post_id}">
                                    <p class="post-details">${formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comments" id="comment${post.post_id}">
                    <!-- Comments section -->
                </div>
            `;
            const firstChild = allPostsContainer.firstChild;

            allPostsContainer.insertBefore(postContainer, firstChild);
            // allPostsContainer.insertBefore(document.createElement("br"), firstChild);
            
           displayComments(post.post_id, comments);

           document.querySelectorAll('.post-details').forEach(element => {
            truncateText(element, 5); // Adjust maxLength as needed
           });
        });
}

displayContent()

/* Popups */

reportBtn.addEventListener('click', function() {
    postPopup.style.display = 'block';
    page.style.opacity = "0";
    page.style.pointerEvents = "none"
});

postCancelBtn.addEventListener('click', function() {
    page.style.opacity = "1";
    page.style.pointerEvents = "auto"
    postPopup.style.display = 'none';
});

commentCancelBtn.addEventListener('click', function() {
    page.style.opacity = "1";
    page.style.pointerEvents = "auto"
    postPopup.style.display = 'none';
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
        category: dropdown.value,
        title: postTitle.value,
        content: postContent.value,
        date: getCurrentTime(),
        anonymous: postCheckbox.checked
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
        fullPost.classList.add("full-post");

        const profilePictureSrc = postCheckbox.checked ? "../assets/anon.jpg" : `${profilePic}`;

        fullPost.innerHTML = `
        <div class="sub-post" id="sub-post${postId}">
            <div class="post" id="post${postId}">
                <img class="post-pic src="${profilePictureSrc}" alt="Profile Picture">
                <div class="post-content">
                    <p class="post-title">${postTitle.value}</p>
                    <p class="post-text">${postContent.value}</p>
                </div>
            </div>
            <div class="post-info">
                <div class="post-properties" id="category${postId}">
                    <p class="post-details">${dropdown.value}</p>
                </div>
                <div class="post-properties">
                    <p class="speech">🗨</p>
                </div>
                <div class="post-properties" id="comment-btn${postId}">
                    <button class="comment-link" id="comment-link${postId}" data-post-id=${postId}>Comment</button>
                </div>
                <div class="post-properties" id="post-timestamp${postId}">
                    <p class="post-details">${getCurrentTime()}</p>
                </div>
            </div>
        </div>
        <div class="comments" id="comment${postId}">
            <!-- Comments section -->
        </div>
    `;

        const firstChild = allPostsContainer.firstChild;

        allPostsContainer.insertBefore(fullPost, firstChild);
        // allPostsContainer.insertBefore(document.createElement("br"), firstChild);

        const newCommentLink = document.getElementById(`comment-link${postId}`);
        newCommentLink.addEventListener('click', function() {
            console.log('hello');
            commentPopup.style.display = 'block';
            page.style.opacity = "0";
            page.style.pointerEvents = "none"
        });

        postForm.reset();
        postPopup.style.display = "none";
        page.style.opacity = "1";
        page.style.pointerEvents = "auto"
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while saving the post.');
    }
});

allPostsContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('comment-link')) {
        e.preventDefault();
        const postId = e.target.dataset.postId;

        const getIdRes = await fetch(`https://nexusolve-server.onrender.com/profiles/token/${token}`)
        const getId = await getIdRes.json()
        const id = getId.account_id

        const getProfileRes = await fetch(`https://nexusolve-server.onrender.com/profiles/${id}`)
        const getProfile = await getProfileRes.json()
        const profilePic = getProfile.image_url

        commentPopup.style.display = 'block';
        page.style.opacity = "0";
        page.style.pointerEvents = "none"

        commentSubmit.removeEventListener('click', handleSubmit);
        commentSubmit.addEventListener('click', handleSubmit);

        async function handleSubmit(e) {
            console.log('submitted!')
            e.preventDefault();

            const formData = {
                account_id: id,
                post_id: postId,
                content: commentInput.value,
                date: getCurrentTime(),
                anonymous: commentCheckbox.checked
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

                const data = await response.json()
                const commentId = data.comment_id
            
                console.log("New comment ID:", commentId);

                
                const fullComment = document.createElement("div");
                fullComment.classList.add("sub-comment");

                const profilePictureSrc = commentCheckbox.checked ? "../assets/anon.jpg" : `${profilePic}`;

                fullComment.innerHTML = `
                    <div class="sub-comment" id="sub-comment${commentId}">
                        <div class="comment" id="comment${commentId}">
                            <img class="comment-pic" id="profilePic${commentId}" src="${profilePictureSrc}" alt="Profile Picture">
                            <div class="comment-content">
                                <p>${commentInput.value}</p>
                            </div>
                        </div>
                        <div class="comment-info">
                            <div></div>
                            <div class="comment-properties" id="comment-timestamp${commentId}">
                                <p class="comment-details">${getCurrentTime()}</p>
                            </div>
                        </div>
                    </div>
                `;

                allCommentsContainer.appendChild(fullComment);
                // allCommentsContainer.appendChild(document.createElement("br"));

                commentForm.reset();
                commentPopup.style.display = 'none';
                page.style.opacity = "1";
                page.style.pointerEvents = "auto"
                window.location.reload()
            } catch (error) {
                console.error('Error:', error.message);
                alert('An error occurred while saving the comment.');
            }
        };
    }
});

function getCurrentTime() {
    const now = new Date();
    return now.toISOString();
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function truncateText(element, maxLength) {
    if (element.textContent.length > maxLength) {
        element.textContent = element.textContent.substring(0, maxLength) + '...';
    }
}

// function applyTruncation() {
//     const maxContainerWidth = 100; // Set the max width where truncation should apply
//     const container = document.querySelector('.post-info');
//     const elements = document.querySelectorAll('.post-details');

//     elements.forEach(element => {
//         if (container.offsetWidth < maxContainerWidth) {
//             document.querySelectorAll('.post-details').forEach(element => {
//                 truncateText(element, 5); // Adjust maxLength as needed
//             });
//         }
//     });
// }