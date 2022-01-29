
// console.log('client side javascript has been loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=orlando').then((response)=>{
//     response.json().then((data) => {
//         if (data.error){
//             console.error(data.error);
//         }else {
//             console.log(data.location);
//             console.log(data.forcast);
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = search.value;
    

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data) => {
            if (data.error){
                // console.error(data.error);
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
                // console.log(data.location);
                // console.log(data.forcast);
            }
        })
    })
    // if (!location){
    //     console.log('Enter Location to get weather information');
    // }
    // else{
        
    // }
})