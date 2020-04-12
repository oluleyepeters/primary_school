class Result{
    constructor(id, student_id, result_id){
        this.id = id
        this.student_id = student_id
        this.result_id = result_id
    }

    async getResult(){
        try{
            const resultResponse = await fetch(`http://localhost:8080/class/${this.id}/${this.student_id}/result/${this.result_id}/`)
            const profile = await resultResponse.json()
            // this.results = profile.Result;
            return profile      
        }catch(error){
            alert(error)
        }
        // return profile;
    }

    async editResult(datum, termname, result__id){
        const response =  await fetch(`http://localhost:8080/class/${this.id}/${this.student_id}/result/${result__id}/${termname}/`, {
            method: 'PUT',
            headers : {
                'Content-type' : 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify(datum)
        })
        return response.json();
    }         
} 