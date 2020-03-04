console.log('sanity check!!');

const postForm = document.getElementById('postForm');

// SAMPLE USER DATA FOR POSTS
let userId;

function getUserID() {
    fetch('/api/v1/users')
    .then(buffer => buffer.json())
    .then(data => {
        userId = data[0]._id;
    })
    .catch(err => console.log(err))
}

getUserID();
// END SAMPLE

//postForm.addEventListener('post', handlePostSubmit)

function handlePostSubmit(e) {
    event.preventDefault();

    const title = document.getElementById('title');
    const imageUrl = document.getElementById('img-url');
    const body = document.getElementById('body');
    const description = document.getElementById('description');

    let formIsValid = false;

    if (title.value === '') {
        formIsValid = false;
        console.log('please enter a title');
        return;
    } else {
        formIsValid = true;
    }

    if (imageUrl.value === '' && body.value === '') {
        formIsValid = false;
        console.log('Please add either an image or your creative writing!')
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
        };
        console.log(newPost);

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