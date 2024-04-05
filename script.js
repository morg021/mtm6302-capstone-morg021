const $thumbnails=document.querySelectorAll('.thumbnail')
const $overlay = document.getElementById('overlay')
const $overlayCloseBtn = document.getElementById('ovrlayCloseBtn')
const $dateSelectForm = document.getElementById('dateSelectForm')
const $deleteBtn = document.getElementById('deleteBtn')
const $content = document.getElementById('content')
const $gallery = document.getElementById('gallery')
const API_KEY = 'u1fXvoAx2Ss2DZ5U3jTToaA50xntNzVAZnFR8m0l'
let savedImages = localStorage.getItem('savedImages') ? JSON.parse(localStorage.getItem('savedImages')) : []
let activeImageData;



$thumbnails.forEach(element => {
    element.addEventListener('click', function(){     
        $overlay.classList.remove('hidden')
    })
});


$overlayCloseBtn.addEventListener('click',function(){
    $overlay.classList.add('hidden')
    
})

$dateSelectForm.addEventListener('submit',function(e){
    e.preventDefault()
    date = document.getElementById('date').value
    getAPOD(date).then(data=>{
        activeImageData = {
            title: data.title,
            description: data.explanation,
            url: data.url,
            date: data.date
        }
        $content.innerHTML = `
        
        <div class="two-cells-container">
        <div class="cell">
            <img src="${activeImageData.url}" id="testimg" alt="APOD Image">
        </div>
        <div class="cell">
            <h2 id="imageTitle">${activeImageData.title}</h2>
            <p id="imageDescription">${activeImageData.description}</p>
        </div>
        </div>
        <div class="action-btns-container">
            <button class="btn-save" id="saveBtn">Save</button>
            <button class="btn-save" id="fullBtn">Full</button>
            <button class="btn-save" id="deleteBtn">Remove</button>
        </div>
        `
        $overlay.classList.remove('hidden')

        const $saveBtn = document.getElementById('saveBtn')
        const $fullBtn = document.getElementById('fullBtn')
        const $deleteBtn = document.getElementById('deleteBtn')
        $saveBtn.addEventListener('click',function(){
           savedImages.push(activeImageData)
           localStorage.setItem('savedImages',JSON.stringify(savedImages))
           renderGallery()

        })
        $deleteBtn.addEventListener('click',function(){
            savedImages = savedImages.filter(image=>image.url !== activeImageData.url)
            localStorage.setItem('savedImages',JSON.stringify(savedImages))
            renderGallery()

        })
    })
})


    




async function getAPOD(date){
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
    const data = await res.json()
    return data
}

// Save Image to Local Storage
// $saveBtn.addEventListener('click',function(){
//     const url = document.getElementById('testimg').src
//     const title = document.getElementById('title').value
//     const description = document.getElementById('description').value
//     const date = document.getElementById('date').value
//     localStorage.setItem('url',url)
// })

// Remove Image from Local Storage

// $deleteBtn.addEventListener('click',function(){})

function renderGallery(){
    // <div class="col g-1 thumbnail"><img src="/images/nasaimage-320_x_240.jpeg" alt="logo" class="img-3"></div>
    $gallery.innerHTML = ''
    const imagesToDisplay=[]
    savedImages = localStorage.getItem('savedImages') ? JSON.parse(localStorage.getItem('savedImages')) : []

    savedImages.forEach(image=>{
        imagesToDisplay.push(`
        <div class="col g-1 thumbnail">
            <img src="${image.url}" alt="logo" class="img-3">
        </div>
        `)}
    )
    $gallery.innerHTML = imagesToDisplay.join('')
}
renderGallery()




