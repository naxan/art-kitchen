// --- CACHED ELEMENTS
const profileImage = document.getElementById('profile-image');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const postContainer = document.getElementById('posts');

// --- Functions

// Fetch User Info
function fetchUser() {
    fetch('/api/v1/users')
        .then((buffer) => buffer.json())
        .then((data) => {
            render(data[0]);
        })
        .catch(err => console.log(err))
};

function render(user) {
    // render user's pro img and details
    if (user.profileImage) {
        profileImage.setAttribute('src', user.profileImage);
    }
    username.innerText = user.username;
    bio.innerText = user.bio;

    // render user's posts
    const postTemplates = user.posts.map((post) => {
        return postTemplate(post);
    }).join('');

    postContainer.insertAdjacentHTML('beforeend', postTemplates);
}

function postTemplate(post) {
    // if post has an image, create an art post
    if (post.imageUrl) {
        return `
      <div class="card mb-1 ml-1 art-post">
              <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
              <div class="card-body">
                <h5 class="card-title title">${post.title}</h5>
                <p class="card-text description">${post.description}</p>
                <div class="row mb-0 tags"> 
                  <button class="tag btn flora-tag">${post.tags[0]}</button>
                  <button class="tag btn fauna-tag">${post.tags[1]}</button>
                  <button class="tag btn mat-tag">${post.tags[2]}</button>
                  <button class="tag btn mach-tag">${post.tags[3]}</button>
                </div>
              </div>
            </div>
        `;
    } 
    // if post does NOT have image, create a text post
    else {
        return `
      <div class="card mb-1 ml-1 text-post">
      <div class="card-body">
        <h5 class="card-title title" >${post.title}</h5>
        <p class="card-text body">${post.body}</p>
          <p class="text-muted">About this piece:</p>
        <p class="text-muted description">${post.description}</p>
        <div class="row mb-0 tags"> 
            <button class="tag btn flora-tag">${post.tags[0]}</button>
            <button class="tag btn fauna-tag">${post.tags[1]}</button>
            <button class="tag btn mat-tag">${post.tags[2]}</button>
            <button class="tag btn mach-tag">${post.tags[3]}</button>
        </div>
      </div>
    </div>
        `;
    }
}

// --- CALLED FUNCTIONS
fetchUser();