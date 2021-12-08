
document.getElementById('button-convert').addEventListener('click', ()=>{
    const originalLink = document.getElementById('input-original-link').value
    const resp = document.getElementById('response')
    if (!validURL(originalLink)) return resp.innerText = 'Invalid Link'
    const shortLink = generateShort(4)
    const newUrl = resp.innerText=window.location.protocol+'//'+window.location.host+'/l/'+shortLink
    axios.post('/shorten', {original:originalLink, short:shortLink})
        .then(newUrl)
    copyToClipboard(newUrl)
})

document.getElementById('button-copy').addEventListener('click', ()=>{
    let shortLink = document.getElementById('response').innerHTML
    copyToClipboard(shortLink)
})

function generateShort(length) {
    let shortLink = ''
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    for (let i=0; i<length; i++) {
        shortLink += chars.charAt(Math.random()*63)
    }
    return shortLink
}

function validURL(str) {
    var pattern = new RegExp(
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i') // fragment locator
    return !!pattern.test(str)
}

function copyToClipboard(textCopy) {
    navigator.clipboard.writeText(textCopy)
    document.getElementById("message-copied").style.display = "flex"
    
    setTimeout( ()=>{
        document.getElementById("message-copied").style.display = "none"
    }, 2000)
}