import { getadmin } from './firebase.js'



$(document).ready(function () {
    $("#nav").load("nav.html");
    $("#footer").load("footer.html");

    
    $('#connectbtn').click(() => {
        var username = $('#username').val();
        var pass=$('#password').val();
        //  if the two fields is empty
        if (username==null || pass==null || username=="" || pass==""){alert("חובה למלא שתי השדות");return;}
        const admin_details=getadmin();
        admin_details.then((data)=>{
            if (username!=data.username){
                alert("שם משתמש לא קיים");
                return;
            }
            if(pass!=data.password){
                alert("סיסמה לא נכונה");
                return ;
            }
            // $.session.set("name", "admin");
            sessionStorage.setItem("username", "admin");
            location.href='home.html';
        });

    });



});
