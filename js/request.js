// API
const API_URL = 'https://randomuser.me/api/?results=9'

// for loader
const overlay = document.getElementById('overlay')

const loaderToggle = (toggle) => {
    if (toggle) {
        overlay.classList.remove('hidden')
    } else {
        overlay.classList.add('hidden')
    }
}

// get data
const getData = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()

        request.addEventListener('readystatechange', () => {
            // console.log(request)
            if (request.readyState < 4) {
                // console.log('Loading...')
                loaderToggle(true)
            } else if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText)
                resolve(data.results)
                loaderToggle(false) 
            } else if (request.readyState === 4) {
                reject('Error!!!')
                loaderToggle(false)
            }
        })

        request.open('GET', resource)
        request.send()
    })
}

// load
const reload = () => {
    getData(API_URL)
        .then((data) => {
            console.log('DATA', data)
        }).catch((err) => {
            console.log(err)
        })
}

document.addEventListener('DOMContentLoaded', reload)