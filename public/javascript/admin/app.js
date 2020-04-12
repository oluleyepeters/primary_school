const state = {}

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
            displayAdmins(state.data , state.goToPage)
        })
    }
})

document.querySelector('body').addEventListener('click', e => {
    if(e.target.classList.contains('status')){
        var currStatus = e.target.dataset.status;
        console.log(currStatus)
        var username = e.target.dataset.username;
        let body = {};
        if (currStatus === ''){
            body.status = 'active'
        }else if( currStatus === 'active'){
            body.status === 'inactive';
            console.log(body)
        }else if( currStatus === 'inactive'){
            body.status = 'active'
            console.log(body)
        }
        var currAdmin = new Admin();
        // currAdmin.updateAdmin(username, datum)
        // .then((data) => {
            // console.log('Hello Awayu')
            // state.data.splice(index,1)
            // displayAdmins(state.data , state.goToPage)
        // })
    }
})

document.querySelector('body').addEventListener('click', e => {
    if (e.target.classList.contains('btn_')) {
        console.log('Awayu')
        let goToPage = parseInt(e.target.dataset.goto, 10);
        state.goToPage = goToPage
        document.querySelector('.settings').innerHTML = '';
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