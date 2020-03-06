// --- CACHED ELEMENTS
const postContainer = document.getElementById('posts');

// --- FUNCTIONS

// Fetch ALL posts
function fetchPosts() {
    fetch('/api/v1/posts')
        .then((buffer) => buffer.json())
        .then((data) => {
            render(data);
        })
        .catch(err => console.log(err))
}

function render(posts) {
  let postTemplates = ``;
  for (let i = posts.length - 1; i > -1; i--) {
    postTemplates += postTemplate(posts[i]);
  }

    postContainer.insertAdjacentHTML('afterbegin', postTemplates);
}

function postTemplate(post) {
  // Art posts
    if (post.imageUrl) {
        return `
        <div class="card mb-1 ml-1 art-post">
        <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
        <div class="card-body">
        <h6 class="text-left author">${post.author.username}</h6>
          <h5 class="card-title title">${post.title}</h5>
          <p class="card-text description">${post.description}</p>
          <div class="row mb-0 tags"> 
            <button class="tag btn fauna-tag">${post.tags[0]}</button>
            <button class="tag btn flora-tag">${post.tags[1]}</button>
            <button class="tag btn mat-tag">${post.tags[2]}</button>
            <button class="tag btn mach-tag">${post.tags[3]}</button>
          </div>
        </div>
      </div>
        `;
    } 
    // Text posts
    else {
        return `
        <div class="card mb-1 ml-1 text-post">
        <div class="card-body">
        <h6 class="text-left author">${post.author.username}</h6>
          <h5 class="card-title title" >${post.title}</h5>
          <p class="card-text body">${post.body}</p>
          <p class="text-muted description">${post.description}</p>
          <div class="row mb-0 tags"> 
              <button class="tag btn fauna-tag">${post.tags[0]}</button>
              <button class="tag btn flora-tag">${post.tags[1]}</button>
              <button class="tag btn mat-tag">${post.tags[2]}</button>
              <button class="tag btn mach-tag">${post.tags[3]}</button>
          </div>
        </div>
      </div>
        `;
    }
}

// --- CALLED FUNCTIONS
fetchPosts();