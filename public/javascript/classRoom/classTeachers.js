class classTeacher{
    async getAllClassTeachers(section_id){
        const resultResponse=await fetch(`http://localhost:8080/sections/${section_id}/allclassteacher/`) 
        const profile=await resultResponse.json();
        return profile;
    }

    // async getClassTeacher(username){
    //     const resultResponse=await fetch(`http://localhost:8080/sections/${section_id}/${username}`)
    //     const profile=await resultResponse.json();
    //     return profile;
    // }
    async updateClassTeacherStatus(section_id,username,datum){
        const response = await fetch(`http://localhost:8080/sections/${section_id}/${username}/status`, { 
            method: 'PUT',
            headers : {
                'Content-type' : 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify(datum)
        })
        return response.json()
    }           
}  