$thumbnails=document.querySelectorAll('.thumbnail')
$overlay = document.getElementById('overlay')
$overlayCloseBtn = document.getElementById('ovrlayCloseBtn')
console.log($overlay)

$thumbnails.forEach(element => {
    element.addEventListener('click', function(){
        console.log('hi')
        
        $overlay.classList.remove('hidden')
        console.log($overlay)
    })
});

$overlayCloseBtn.addEventListener('click',function(){
    $overlay.classList.add('hidden')

})
