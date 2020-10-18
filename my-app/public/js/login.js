// /console.log("Script login loaded")

const elem=document.getElementById('message')
function loginSubmit(event) {
    // log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    event.preventDefault();
    elem?elem.innerHTML="Logging in ...":""
    let {password,username}=event.target
    console.log({target:event.target},username.value,password.value)

    fetch(`${window.location.origin}/login`, { headers: {
        'Content-Type': 'application/json',
    },
    method:"POST",
        body:JSON.stringify({username:username.value,password:password.value})
}
    )
    .then(async res =>{
        const data=await res.json()
        console.log({res,data})
        if(res.status===200){
elem?elem.innerHTML="":""
            // Swal.fire('Success!','Login Success','success')
            // setTimeout(() => { 
            //     // window.location.href=res.url
            // }, 1500);
        }else {
            elem?elem.innerHTML=data.message:""
        }
    })
    .catch(err=>{
        console.log({err})
        elem?elem.innerHTML=`Something Went wrong , ${err}`:""
    }
    )

  }
  
  const form = document.getElementById('loginForm');
//   const log = document.getElementById('log');
//   form.addEventListener('submit', loginSubmit);