
document.getElementById('converter').addEventListener('click', ()=>{
    const originalLink = document.getElementById('input').value
    const resp = document.getElementById('response')
    if (!validURL(originalLink)) return resp.innerText = 'not valid'
    const shortLink = generateShort(4)
    axios.post('/shorten', {original:originalLink, short:shortLink})
        .then(resp.innerText=shortLink)
})

function generateShort(length) {
    let shortLink = ''
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    for (let i=0; i<length; i++) {
        shortLink += chars.charAt(Math.random()*63)
    }
    return window.location.hostname + shortLink
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