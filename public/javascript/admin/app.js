const state = {};
var body = {};

document.addEventListener('DOMContentLoaded', e => {
    var allAdmin = new Admin()
    allAdmin.getAllAdmin()
    .then((all) => {
        state.data = all
        state.goToPage = 1;
        displayAdmins(state.data)
    }) 
})

document.querySelector('body').addEventListener('click', e => {
    if(e.target.classList.contains('username')){
        var username = e.target.dataset.username;
        console.log(username)
        var currAdmin = new Admin();
        currAdmin.delAdmin(username)
        .then((data) => {
            var index = findIndex(state.data, username);
            state.data.splice(index,1)
            document.querySelector('#all-admins').innerHTML = '';
            if(state.data.length === 5){
                state.goToPage = 1;
                displayAdmins(state.data , state.goToPage)
            }   
            displayAdmins(state.data, state.goToPage)         
        })
    }
})

document.querySelector('body').addEventListener('click', e => {
    if(e.target.classList.contains('status')){
        var currStatus = e.target.dataset.status;
        var username = e.target.dataset.username;
        if (currStatus === ''){
            body.status = 'active'
        }else if( currStatus === 'active'){
            body.status = 'inactive'
        }else if( currStatus === 'inactive'){
            body.status = 'active'
        }
        var currAdmin = new Admin();
        currAdmin.updateAdminStatus(username, body)
        .then((data) => {
            console.log('Hello Awayu')
            document.querySelector('#all-admins').innerHTML = '';
            body = {};
            var allAdmin = new Admin()
            return allAdmin.getAllAdmin()
        })
        .then((all) => {
            state.data = all
            state.goToPage = 1;
            displayAdmins(state.data, state.goToPage)
        }) 
    }
})

document.querySelector('body').addEventListener('click', e => {
    if (e.target.classList.contains('btn_')) {
        console.log('Awayu')
        let goToPage = parseInt(e.target.dataset.goto);
        state.goToPage = goToPage
        document.querySelector('#all-admins').innerHTML = '';
        displayAdmins(state.data, state.goToPage);
    }
    e.preventDefault();
});

let findIndex = (list, username) => {
    var index;
    for(let i = 0; i < list.length; i++){
        if(list[i].username === username){
            index = i
            return index;
        }
    }
}