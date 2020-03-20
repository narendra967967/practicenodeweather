const wform = document.querySelector('form')
wform.addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById('msg').innerHTML = 'Finding weather...'
    const location = document.querySelector('input').value
    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                document.getElementById('msg').innerHTML = data.error
            } else {
                document.getElementById('msg').innerHTML = data.msg
                document.getElementById('loc').innerHTML = "Your location is " + data.location
                document.getElementById('expfor').innerHTML = data.forecast
            }
        })
    })
})