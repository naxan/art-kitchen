const logoutBtn = document.getElementById('logout');

// add on click function to logoutBtn
// function should make a call to /api/v1/logout

function logOutSession() {
    fetch(`api/v1/logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include',
        }
    })
    .then(() => window.location.pathname = '/')
    .catch(err => console.log(err))
}

logoutBtn.addEventListener('click', logOutSession);