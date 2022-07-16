const signinForm = document.querySelector(".signin-form");

document.addEventListener("submit", async e => {
    e.preventDefault()
    if(e.target.matches(".signin-form")) {
        await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        })
        window.location.href = "/"
    }
})