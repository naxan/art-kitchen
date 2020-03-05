const postForm = document.getElementById('postForm');

// Gets id of logged in user
let userId;

function getUserId() {
    fetch(`/api/v1/verify`)
        .then(buffer => buffer.json())
        .then(userSession => {
            userId = userSession.user._id;
        })
        .catch(err => console.log(err))
}

getUserId();

// Create post on submit

function handlePostSubmit(e) {
    event.preventDefault();

    const title = document.getElementById('title');
    const imageUrl = document.getElementById('img-url');
    const body = document.getElementById('body');
    const description = document.getElementById('description');

    // tags text
    const fauna = document.getElementById('fauna').innerText;
    const flora = document.getElementById('flora').innerText;
    const mat = document.getElementById('mat').innerText;
    const mach = document.getElementById('mach').innerText;

    const titleFeedback = document.querySelector('.title-fb');
    const contentFeedback = document.querySelector('.content-fb');

    titleFeedback && titleFeedback.remove();
    contentFeedback && contentFeedback.remove();

    let formIsValid = false;

    if (title.value === '') {
        formIsValid = false;
        title.parentNode.insertAdjacentHTML('beforeend', 
        `
        <div class="invalid-fb title-fb">
        Please enter a title.
        </div>
        `)
        return;
    } else {
        formIsValid = true;
    }

    if (imageUrl.value === '' && body.value === '') {
        formIsValid = false;
        body.parentNode.insertAdjacentHTML('beforeend', 
        `
        <div class="invalid-fb content-fb">
        Please add either an image or your creative writing!
        </div>
        `)
        return;
    } else {
        formIsValid = true;
    }

    if (formIsValid) {

        const newPost = {
            title: title.value,
            imageUrl: imageUrl.value,
            body: body.value,
            description: description.value,
            tags: [
                fauna,
                flora,
                mat,
                mach
            ]
        };

        fetch(`/api/v1/users/${userId}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then(() => {
                window.location.pathname = '/profile';
            })
            .catch(err => console.log(err))
    }
}

postForm.addEventListener('submit', handlePostSubmit);