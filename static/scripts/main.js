document.getElementById('button-convert-basic').addEventListener('click', ()=>{
    let originalLink = document.getElementById('input-original-link-basic')
    axios.post('/shorten/basic', {url:originalLink.value})
        .then((res)=>{
            if (res.data.status == 'fail') {
                originalLink.value = res.data.message
            }
            else {
                copyToClipboard(res.data.url)
                originalLink.value = res.data.url
            }
        })
})

document.getElementById('button-convert-custom').addEventListener('click', ()=>{
    const originalLink = document.getElementById('input-original-link-custom').value
    const shortLink = document.getElementById('input-custom-link').value
    axios.post('/shorten/custom', {url:originalLink, short:shortLink})
        .then((res)=>{
            if (res.data.status == 'fail') {
                originalLink.textContent = res.data.message
            }
            else {
                copyToClipboard(res.data.url)
                originalLink.textContent = res.data.url
            }
        })
})

document.getElementById('button-convert-secure').addEventListener('click', ()=>{
    const originalLink = document.getElementById('input-original-link-secure').value
    const question = document.getElementById('security-question').value
    const answer = document.getElementById('security-answer').value
    axios.post('/shorten/secure', {url:originalLink, question:question, answer:answer})
        .then((res)=>{
            if (res.data.status == 'fail') {
                originalLink.textContent = res.data.message
            }
            else {
                navigator.clipboard.writeText(res.data.url)
                originalLink.textContent = res.data.url
            }
        })
})

function displayShortener(whatToDisplay) {
    let basic = document.getElementById("basic-shortener")
    let custom = document.getElementById("custom-shortener")
    let secure = document.getElementById("secure-shortener")

    if (whatToDisplay == "basic") {
        basic.style.display = "block"
        custom.style.display = "none"
        secure.style.display = "none"
    }
    else if (whatToDisplay == "custom") {
        custom.style.display = "block"
        basic.style.display = "none"
        secure.style.display = "none"
    }
    else if (whatToDisplay == "secure") {
        secure.style.display = "block"
        basic.style.display = "none"
        custom.style.display = "none"
    }
}

function alertMessage(message, style) {
    document.getElementById("message-copied").style.display = "flex"
    
    setTimeout( ()=>{
        document.getElementById("message-copied").style.display = "none"
    }, 2000)
}

document.getElementById("show-basic").addEventListener('click', ()=>{displayShortener('basic')})
document.getElementById("show-custom").addEventListener('click', ()=>{displayShortener('custom')})
document.getElementById("show-secure").addEventListener('click', ()=>{displayShortener('secure')})