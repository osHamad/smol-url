document.getElementById('submit').addEventListener('click', () => {
    let firstName = document.getElementById('first-name').value
    let lastName = document.getElementById('last-name').value
    let email = document.getElementById('email').value
    let firstPass = document.getElementById('password-1').value
    let secondPass = document.getElementById('password-2').value

    axios.post('/user/new', {
        firstname: firstName,
        lastname: lastName,
        email: email,
        firstpass: firstPass,
        secondpass: secondPass
    }).then((res) => {
        if (res.data.status == 'success') {
            window.location.assign('/')
        } else {
            console.log('fail')
        }
    })
})