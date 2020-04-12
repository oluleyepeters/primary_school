var username=document.querySelector('#username');
var fill=document.querySelector('#fill');
var user=document.querySelector('#user');

username.addEventListener('click', finduser)


//function findusers(){
//    XHR=new XMLHttpRequest();
//    XHR.onreadystatechange=function(){
//        if(XHR.readyState==4){
//           if(XHR.status==200){
//            var data=JSON.parse(XHR.responseText);
//            fill.innerHTML=`<div>
//                <p>${data[0].firstname}</p>
//                <p>${data[0]._id}</p>
//                <p>${data[0].surname}</p>
//                <p>${data[0].username}</p>
//                </div>`
//            }       
//        }
//    }
//    XHR.open("GET", "http://localhost:8080/allstudents")
//    XHR.send()
//}


function finduser(){
    XHR=new XMLHttpRequest();
    XHR.onreadystatechange=function(){
         if(XHR.readyState==4){
           if(XHR.status==200){
            var data=JSON.parse(XHR.responseText);
            fill.innerHTML=`<div>
                <p>${data.firstname}</p>
                <p>${data._id}</p>
                <p>${data.surname}</p>
                <p>${data.username}</p>
                <p>${data.firsttermResult}</p>
                </div>`
            }       
        }
    }
    XHR.open("GET", `http://localhost:8080/allstudents/${user.value}`)
    XHR.send()
}