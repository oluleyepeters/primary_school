class Result{
	constructor(username){
		this.username = username
	}

    async getResult(){
    	try{
            const resultResponse = await fetch(`http://localhost:8080/allstudents/${this.username}`)
	        const profile = await resultResponse.json()
    	    this.results = profile.Result;
    	    return profile		
    	}catch(error){
    		alert(error)
    	}
        // return profile;
    }
}