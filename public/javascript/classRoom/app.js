const state = {};
var body = {};

document.addEventListener('DOMContentLoaded', e => {
    var section_id = document.querySelector('.section_id')
    section_id = section_id.dataset.section_id;
    state.section_id = section_id;
    const classTeachers_ = new classTeacher();
    classTeachers_.getAllClassTeachers(section_id)
    .then((all) => {
        state.data = all
        console.log(state.data)
        state.goToPage = 1;
        displayClassteachers(state.data)
    }) 
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
        var classTeachers = new classTeacher()
        classTeachers.updateClassTeacherStatus(state.section_id,username, body)
        .then((data) => {
            console.log('Hello Awayu')
            document.querySelector('#all-classTeachers').innerHTML = '';
            body = {};
            var classTeachers = new classTeacher()
            return classTeachers.getAllClassTeachers(state.section_id)
        })
        .then((all) => {
            state.data = all
            state.goToPage = 1;
            displayClassteachers(state.data, state.goToPage)
        }) 
    }
})

document.querySelector('body').addEventListener('click', e => {
    if (e.target.classList.contains('btn_')) {
        console.log('Awayu')
        let goToPage = parseInt(e.target.dataset.goto);
        state.goToPage = goToPage
        document.querySelector('#all-classTeachers').innerHTML = '';
        displayClassteachers(state.data, state.goToPage);
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