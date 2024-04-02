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

## Frontend


## Backend
url: https://nexusolve-server.onrender.com

| Route | Method | Purpose | Parameters | Data Required |
|:------|---------|---------|------------|------------|
|/profiles|GET|to list all the profiles|none|none|
|/profiles/:id|GET|to show a specific profile|account_id|none|
|/profiles/:id|PATCH|to update the profile image of a speacific profile|account_id|image_path|
|/profiles/:id|DELETE|to delete a specific profile|account_id|none|
|/profiles/token/:token|GET|to show a specific token|token code|none|
|/profiles/token/:token|DELETE|to delete a specific token|token code|none|
|/profiles/register|POST|to create a new profile|none|first_name, last_name, display_name, email, image_path, password|
|/profiles/login|POST|to login in a profile and create an authentication token|none|email, password|
||||||

## To view the application
