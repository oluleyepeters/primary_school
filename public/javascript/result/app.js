var userSearch=document.querySelector('#userSearch');
var fill=document.querySelector('#fill');

userSearch.addEventListener('click',e =>{
    e.preventDefault();
    findStudent();
})

const state = {}

var findStudent = () => {
    const query = getInput();
    console.log(query)

    if (query) {
        const result = new Result(query)
        console.log(result)
        state.search = result;
        clearInput()

        result.getResult()
        .then(data=>{
            if(!data){
                console.log('Not Data')
                // showAlert('User Not Found','error')
                // clearResult()
            }else{
                console.log(data)
                state.search.userName = data.username;
                state.search.firstName = data.firstname;
                state.search.lastName = data.lastname;
                state.search.surName = data.surname;
                state.search.result = data.Result
                state.search.currentResult = state.search.result[0]
                state.search.nextResult = state.search.result[0+1]
                state.search.currentPage = 1
                console.log(state.search.currentResult)                
                displayOwner(data)
                return data  
            }
        })
        .then((data) => {
            console.log(state.search.currentPage)
            renderResults(state.search.result, state.search.currentResult, state.search.currentPage)
            return data
        })
        .then(data => {
            document.querySelector('body').addEventListener('click', e => {
            if(e.target.classList.contains('btn_')){
                const newpage = parseInt(e.target.dataset.goto)
                console.log(newpage)
                state.search.currentResult = state.search.result[newpage - 1]
                state.search.nextResult = state.search.result[newpage]
                state.search.currentPage = newpage
                renderResults(state.search.result, state.search.currentResult, state.search.currentPage)
            }
            e.preventDefault()
            })
        })
    }else if(!query){
        // showAlert('Add a Username', 'error')
    }
    // e.preventDefault();
}