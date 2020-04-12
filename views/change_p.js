var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var address = document.getElementById('address');

document.getElementById('username').addEventListener('blur', activateUsername)

document.getElementById('email').addEventListener('blur', activateEmail)

document.getElementById('password').addEventListener('blur', activatePassword)

// document.getElementById('address').addEventListener('blur', activateAddress)

function activateUsername(){
    re=/^[A-Z][a-z\.\-0-9]/
    if(!re.test(username.value)){
        // var div=document.createElement('div');
        var txtContent='Your Username should start with a Capital etter and should not contain more than eight characters'
        // div.appendChild(document.createTextNode(txtContent))
        // div.className="error"
        var p=document.getElementById('msg')
        p.textContent=txtContent
        // var Section=document.querySelector('.username')
        // Section.insertBefore(div, p)
        setTimeout(function(){
            document.getElementById('msg').textContent=''},3000)
    }
}

function activateEmail(){
    re=/^([A-Za-z\d\.\-]+)@([A-Za-z\d\.\-]+)\.([a-zA-Z]{2,5})$/
    if(!re.test(email.value)){
        txtContent='Enter a valid email'
        var p=document.getElementById('msgEm')
        p.textContent=txtContent
        setTimeout(function(){
            document.getElementById('msgEm').textContent=''},3000)
    
        }
    }

function activatePassword(){
    re=/([A-Z]([a-z0-9\.\-_]+)){,8}/
    if(!re.test(password.value)){
        txtContent='Password should contain an Uppercase letter and a Special character'
        var p=document.getElementById('msgPa')
        p.textContent=txtContent
        setTimeout(function(){
            document.getElementById('msgPa').textContent=''},3000)
        }
}