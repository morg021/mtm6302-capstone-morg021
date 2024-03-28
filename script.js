const $thumbnails=document.querySelectorAll('.thumbnail')
const $overlay = document.getElementById('overlay')
const $overlayCloseBtn = document.getElementById('ovrlayCloseBtn')
const $dateSelectForm = document.getElementById('dateSelectForm')
const $saveBtn = document.getElementById('saveBtn')
const API_KEY = 'u1fXvoAx2Ss2DZ5U3jTToaA50xntNzVAZnFR8m0l'
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
        $overlay.classList.remove('hidden')
        document.getElementById('testimg').src = data.url
    })
})

$saveBtn.addEventListener('click',function(){
    const url = document.getElementById('testimg').src
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const date = document.getElementById('date').value
    localStorage.setItem('url',url)

})
    



async function getAPOD(date){
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
    const data = await res.json()
    return data
}