document.getElementById('submit').addEventListener('click', () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    axios.post('/user/login', {
        email: email,
        password: password
    }).then((res) => {
        if (res.data.status == 'success') {
            window.location.assign(res.data.message)
        } else {
            console.log(res.data.message)
        }
    })
})