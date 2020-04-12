const state = {}

document.addEventListener('DOMContentLoaded', e => {
	let id = document.querySelector('.clt')
	id = id.dataset.id
	console.log(id)
	let student_id, result_id;

	let stdSet = new Students(id)
	stdSet.getStudents()
	.then((data) => {
		student_id = data[0]._id
		result_id = data[0]._id
		state.student_id = student_id;
		state.result_id = result_id;
		state.id = id;
		state.data = data;
        state.currentStudent = state.data[0]
        state.nextStudent = state.data[0+1]
        state.currentPage = 1
        displayName(data)		
		return data
	})
	.then((data) => {
		let stdResult = new Result(id, state.student_id, state.result_id)
		console.log(stdResult)
		return stdResult.getResult();
	})
	.then((data) => {
		state._id = data._id
		displayResult(state.data, data, state.currentPage)
		return data
	})
    .then(data => {
        document.querySelector('body').addEventListener('click', e => {
      	    if(e.target.classList.contains('btn_')){
                const newpage = parseInt(e.target.dataset.goto)
                state.currentPage = newpage
                state.currentStudent = state.data[state.currentPage - 1]
                state.nextStudent = state.data[newpage]
                state.student_id = state.currentStudent._id
                state.result_id = state.currentStudent._id
                state._id = state.currentStudent._id
				let stdResult = new Result(id, state.student_id, state.result_id)
				console.log(stdResult)
				stdResult.getResult()
				.then((data) => {
					state._id = data._id
					displayResult(state.data,data,state.currentPage)
				})                            
                e.preventDefault()
            }
        })
        return data
    })	
	// .then(data => {
	// 	var button = document.querySelector('#post')
	// 	button.addEventListener('click', (e) => {
	// 		let scores = document.querySelectorAll('.score')
	// 		scores = Array.from(scores)
	// 		console.log(scores[6].name)
	// 		e.preventDefault()
	// 	})
	// 	return data
	// })
	.then(data => {
		let _data
		let body = document.querySelector('body')
		body.addEventListener('click', e => {
			if(e.target.classList.contains('student')){
				state.id = e.target.dataset.id;
				let clickedStudent = e.target.textContent;
				let clickedStudentIndex = findIndex(state.data, clickedStudent)
				state.currentPage = clickedStudentIndex + 1;
				console.log(clickedStudentIndex)
      			state.currentStudent = state.data[state.currentPage - 1]
      			state.student_id = state.currentStudent._id;
				state.result_id = state.currentStudent._id;
                state.nextStudent = state.data[state.currentPage]
				stdResult = new Result(state.id, state.student_id, state.result_id)
				stdResult.getResult()
				.then((data) => {
					state._id = data._id
					displayResult(state.data, data, state.currentPage)
					_data = data	
					return _data			
				})
				// .then(data => {
				// 	var button = document.querySelector('#post')
				// 	button.addEventListener('click', (e) => {
				// 		let scores = document.querySelectorAll('.score')
				// 		const score_ = Array.prototype.slice.call(scores)
				// 		console.log(type(scores))
				// 		console.log(type(score_))
				// 		e.preventDefault()
				// 	})
				// 	return data
				// })
    			.then(data => {
        			document.querySelector('body').addEventListener('click', e => {
      	    			if(e.target.classList.contains('btn_')){
                			const newpage = parseInt(e.target.dataset.goto)
			                state.currentPage = newpage
            			    state.currentStudent = state.data[state.currentPage - 1]
                			state.nextStudent = state.data[newpage]
                			state.student_id = state.currentStudent._id
                			state.result_id = state.currentStudent._id
							let stdResult = new Result(id, state.student_id, state.result_id)
							stdResult.getResult()
							.then((data) => {
								state._id = data._id
								displayResult(state.data,data,state.currentPage)
							})
            			}
            			e.preventDefault()
        			})
    			})
			}
		e.preventDefault()	
		return data 
		})
	})
})

let findIndex = (list, currentStudent) => {
	var index;
    for(let i = 0; i < list.length; i++){
    	if(list[i].surname === currentStudent){
			index = i
			return index;
    	}
    }
} 

document.querySelector('body').addEventListener('click', e => {
	let body = {};
	let name_;
	if(e.target.classList.contains('sbmlink')){
 		name_ = e.target.dataset.termname;
		let scores = Array.from(document.querySelectorAll('.score'))
		for(let index in scores){
			var val = scores[index].name
			body[val] = parseInt(scores[index].value)
		}
		const stdResult = new Result(state.id, state.student_id, state.result_id)
		stdResult.editResult(body, name_, state._id)
		.then((data) => alert('Successful Update'))
		.catch((error) => alert('An error occurred, Try Again Later'))
	}
	e.preventDefault()
})