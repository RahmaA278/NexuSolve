# NexuSolve

<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
</div>

<br>

#### 🌟 A Collaborative Community Engagement Platform 🌟

This innovative platform is here to empower community members to actively engage with local decision-makers and drive positive change. With this platform, they'll have a dedicated space to voice their concerns, share ideas, and collaborate with others who are passionate about making a difference. Whether it's addressing traffic congestion, improving local infrastructure, or tackling environmental issues, community members can come together to ensure their voices are heard and their issues are resolved. Plus, with active involvement from the council, effective resolution can be ensured every step of the way.

### Reason for this project?
The aim is to establish a platform where community members can openly engage in constructive dialogue to address and resolve the challenges they encounter within their communities.

Expanding on the previous project, I wanted to focus on user authentication using vanilla JavaScript. I also wanted to add more pages and complexity to enhance the overall experience.

### Future features:

A Reports page: This feature will enable council members to close issues raised by the community. Council members will have to clearly state resolutions to the issue being closed or state alternative options. Once closed, issues will be archived on a dedicated page for community reference and transparency.

## Frontend
url: https://nexusolve-client.onrender.com

I've developed responsive designs using pure CSS to cater to three distinct screen sizes: large monitors, medium-sized laptops, and large mobile devices. The application comprises the following pages:
  - Landing page
  - Registration page
  - Login page
  - Dashboard
  - Account page
  - About pages

Each page is optimised to adapt seamlessly across the designated screen sizes, ensuring an optimal viewing experience for users accessing the application from different devices.

## Backend
url: https://nexusolve-server.onrender.com

### Profile Endpoints
| Endpoints | Method | Purpose | Parameters | Data Required |
|:------|---------|---------|------------|------------|
|/profiles|GET|to list all the profiles|none|none|
|/profiles/:id|GET|to show a specific profile|account_id|none|
|/profiles/:id|PATCH|to update the profile image of a speacific profile|account_id|display_name, email, image_name, image_url, password|
|/profiles/:id|DELETE|to delete a specific profile|account_id|none|
|/profiles/token/:token|GET|to show a specific token|token code|none|
|/profiles/token/:token|DELETE|to delete a specific token|token code|none|
|/profiles/register|POST|to create a new profile|none|first_name, last_name, display_name, email, image_name, image_url, password|
|/profiles/login|POST|to login into a profile and create an authentication token|none|email, password|
### Upload Endpoints
| Endpoints | Method | Purpose | Parameters | Data Required |
|:------|---------|---------|------------|------------|
|/uploads|GET|to upload an image to the uploads.html server file|none|image file|
|/uploads|POST|to post an image uploaded by the client|none|image file, token|
### Post Endpoints
| Endpoints | Method | Purpose | Parameters | Data Required |
|:------|---------|---------|------------|------------|
|/posts|GET|to list all posts|none|none|
|/posts|POST|to create a post|none|account_id, category, title, content, date, anonymous|
|/posts/:id|GET|to show a specific post|post_id|none|
|/posts/:id|PATCH|to update the title and content of a specific post|post_id|title, content|
|/posts/:id|DELETE|to delete a specific post|post_id|none|
|/posts/user/:id|GET|to list all the posts of a specific user|account_id|none|
### Comment Endpoints
| Endpoints | Method | Purpose | Parameters | Data Required |
|:------|---------|---------|------------|------------|
|/comments|GET|to list all comments|none|none|
|/comments|POST|to create a comment|none|account_id, post_id, content, date, anonymous|
|/comments/:id|GET|to show a specific comment|comment_id|none|
|/comments/:id|PATCH|to update the content of a specific comment|comment_id|content|
|/comments/:id|DELETE|to delete a specific comment|comment_id|none|
|/comments/user/:id|GET|to list all the comments of a specific user|account_id|none|
|/comments/post/:id|GET|to list all the comments of a specific post|post_id|none|

## To view the application
1. run the command `npm i` in the server and client folders, separately.
2. run the command `npm run dev` in the server folder to get the server started.
3. right click the register.html file in the client folder and select 'Open with Live Server'
