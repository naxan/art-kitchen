//import { text } from "body-parser";

// --- CACHED ELEMENTS
const profileImage = document.getElementById('profile-image');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const postContainer = document.getElementById('posts');

const deleteBtns = document.querySelectorAll('.delete-btn');

// --- Functions

// Populate page with user info and user posts

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
    let postTemplates = ``;
    for (let i = user.posts.length - 1; i > -1; i--) {
      postTemplates += postTemplate(user.posts[i]);
    }

    postContainer.insertAdjacentHTML('afterbegin', postTemplates);

    // set up event listeners on templated buttons
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', handlePostEdit);
    });
}

function postTemplate(post) {
    // if post has an image, create an art post
    if (post.imageUrl) {
        return `
      <div class="card mb-1 ml-1 art-post" id="${post._id}">
        <div class="btn-group post-menu">
        <button type="button" 
          class="btn btn-secondary dropdown-toggle" 
          data-toggle="dropdown" aria-haspopup="true" 
          aria-expanded="false">
        </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item edit-btn" type="button" for="edit">Edit</button>
            <button class="dropdown-item delete-btn" type="button" for="delete">Delete</button>
          </div>
        </div>
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
      <div class="card mb-1 ml-1 text-post" id="${post._id}">
        <div class="btn-group post-menu">
        <button type="button" 
          class="btn btn-secondary dropdown-toggle" 
          data-toggle="dropdown" aria-haspopup="true" 
          aria-expanded="false">
        </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item edit-btn" type="button" for="edit">Edit</button>
            <button class="dropdown-item delete-btn" type="button" for="delete">Delete</button>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title title">${post.title}</h5>
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

// Edit and Delete posts

// let postId = target.closest('.card').id

// when edit button is clicked,
// post content changes to form
// target.closest('.card').innerHTML = formTemplate
// make function updatePost
// formIsValid = false;
// take id's of modal inputs
// if both values are empty strings,
// formIsValid = false, parentnode insert adjacent html of an error message, return
// else,
// formIsValid = true;
// if formIsValid
// const updatedPost = {title: title.value, description: description.value}
// fetch ('/api/v1/posts/${postId}', {
  // method: 'PUT',
  // etc etc
// })
// then close modal
// then remove all posts from DOM
// then call fetchUser()

// fetch update route
// body set equal to updatedPost = {title: title.value, description: description.value}

function handlePostEdit(e) {
  const thisCard = event.target.closest('.card');
  const beforeChanges = thisCard.innerHTML;

  // Change post to form template
  const formTemplate = `
  <form>
  <div class="form-group">
    <label>Title</label>
    <input type="text" class="form-control title-edit" aria-describedby="title">
  </div>
  <div class="form-group">
    <label>Description</label>
    <input type="text" class="form-control description-edit">
  </div>
  <button type="submit" class="btn btn-primary submit-btn">Submit Changes</button>
  <button class="btn cancel-btn">Cancel</button>
</form>
  `

  thisCard.innerHTML = formTemplate;

  // Cancel Button functionality
  const cancelBtn = thisCard.querySelector('.cancel-btn');
  cancelBtn.addEventListener('click', () => {
    thisCard.innerHTML = beforeChanges;
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', handlePostEdit);
    });
  });

  // Form Submit
  const submitBtn = thisCard.querySelector('.submit-btn');
  submitBtn.addEventListener('click', handleEditSubmit);
}

function handleEditSubmit(e) {
  event.preventDefault();

  const thisCard = event.target.closest('.card');
  const postId = thisCard.id;
  const title = thisCard.querySelector('.title-edit');
  const description = thisCard.querySelector('.description-edit');

  let formIsValid = false;

  if (title.value === '' && description.value === '') {
    formIsValid = false;
    description.parentNode.insertAdjacentHTML('beforeend', 
    `
    <div class="invalid-fb">
    Please enter changes to either the title or description.
    </div>
    `);
    return;
  } else {
    formIsValid = true;
  }

  if (formIsValid) {
    console.log('Your edits are good to go!');

    const updatedPost = {};

    if (title.value !== '') {
      updatedPost.title = title.value;
    }
    if (description.value !== '') {
      updatedPost.description = description.value;
    }

    fetch(`/api/v1/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then(() => {
        postContainer.innerHTML = '';
        fetchUser();
        console.log('tada!');
      })
      .catch(err => console.log(err))
  }
} 

// --- CALLED FUNCTIONS
fetchUser();