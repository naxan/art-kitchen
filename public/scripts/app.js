console.log("Don't Panic!")

let loginBtn = document.getElementById("login")
let loginSubmit = document.getElementById("login-submit")
let signupSubmit = document.getElementById("signup-submit")
let ahaa = document.getElementById("ahaa")

loginBtn.addEventListener("click", () => {
    signupSubmit.textContent = "Log in!"
    signupSubmit.id = "login-submit"
    ahaa.classList = "invisible"
})