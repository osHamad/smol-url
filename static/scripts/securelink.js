document.getElementById('submit').addEventListener('click', () => {
    const answer = document.getElementById('answer')
    axios.post(window.location.pathname+'/securepass', {answer:answer.value})
        .then((res)=>{
            if (res.data.status == 'fail') {
                answer.value = res.data.message
            }
            else {
                window.location.assign(res.data.url)
            }
        })
})