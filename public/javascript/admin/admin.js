class Admin{
    async getAllAdmin(){
        const resultResponse=await fetch(`http://localhost:8080/admin/alladmin/`) 
        const profile=await resultResponse.json();
        return profile;
    }

    async getAdmin(username){
        const resultResponse=await fetch(`http://localhost:8080/admin/alladmin/${username}`)
        const profile=await resultResponse.json();
        return profile;
    }

    async updateAdminStatus(username,datum){
        const response = await fetch(`http://localhost:8080/admin/${username}/status`, { 
            method: 'PUT',
            headers : {
                'Content-type' : 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify(datum)
        })
        return response.json()
    }           

    async delAdmin(username){
    	const response = await fetch(`http://localhost:8080/admin/${username}/delete`, { 
    		method: 'DELETE',
            headers : {
                'Content-type' : 'application/json; charset=UTF-8' 
            },
            // body: JSON.stringify(response)
        })
        return response.json()
    }   
}  