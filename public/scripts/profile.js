console.log("sanity check");

// --- CACHED ELEMENTS
const profileImage = document.getElementById('profile-image');
const username = document.getElementById('username');
const bio = document.getElementById('bio');

const artPost = document.getElementById('art-post');
const textPost = document.getElementById('text-post');

// --- Functions

// fetch user data
// create template (if applicable)
// append template/info to the DOM in applicable spot

// Fetch User Info
function fetchUser() {
    console.log('fetching...');
    fetch('/api/v1/users')
        .then((buffer) => buffer.json())
        .then((data) => {
            console.log(data[0]);
            renderUser(data[0]);
        })
        .catch(err => console.log(err))
};

fetchUser();

function renderUser(user) {
    if (user.profileImage) {
        profileImage.setAttribute('src', user.profileImage);
    }
    username.innerText = user.username;
    bio.innerText = user.bio;
}