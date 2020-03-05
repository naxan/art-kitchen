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
        console.log('Please add either an image or your creative writing!')
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