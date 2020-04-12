var nav=document.querySelector('nav')
var toggle=document.querySelector('.navbar-toggle')


toggle.addEventListener('click', ToggleView);

function ToggleView(e){
    nav.classList.toggle('views')
    e.preventDefault()
}
