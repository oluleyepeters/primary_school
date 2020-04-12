class Students{
    constructor(id){
        this.id = id
    }

    async getStudents(){
        try{
            const resultResponse = await fetch(`http://localhost:8080/class/${this.id}/allStudent`)
            const profile = await resultResponse.json()
            // this.results = profile.Result;
            console.log(profile)
            return profile      
        }catch(error){
            alert(error)
        }
        // return profile;
    }           
} 