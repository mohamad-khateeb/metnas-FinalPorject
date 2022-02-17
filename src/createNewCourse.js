import {addCourse ,getAllCourses } from './firebase.js'


// function preview_image(event) {
//   var reader = new FileReader();
//   reader.onload = function () {
//       var output = document.getElementById('output_image');
//       output.src = reader.result;
//   }
//   document.getElementById('hidden_forImage').value = event.target.files[0];
//   reader.readAsDataURL(event.target.files[0]);
// }






$(document).ready(function () { 
  $("#nav").load("nav.html");
  $("#footer").load("footer.html");
  
  var files=[];
  $("#photo").change((event)=> {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output_image');
        output.src = reader.result;
    }
    document.getElementById('hidden_forImage').value = event.target.files[0].name;
    files= event.target.files;
    reader.readAsDataURL(event.target.files[0]);
  });




    $("#createcourse").click(function(){
  
        var coursename=  $("#coursename").val();
        var category=  $("#category").val();
        var location=  $("#location").val();
        var startdate=  $("#startdate").val();
        var enddate=  $("#enddate").val();
        var price=  $("#price").val();
        var sessions = $("#sessions").val();
        var hourpersession = $("#hourpersession").val();
        var participantnum = $("#participantnum").val();
        var gender = $("input[name='gender']:checked").val();
        var fromage = $("#fromage").val();
        var untilage = $("#untilage").val();
        var photo = $("#hidden_forImage").val();
        console.log("the photo is ",photo);
        var description = $("#description").val();
        var dict = {
            coursename : coursename,
            category : category ,
            location : location,
            startdate : startdate,
            enddate: enddate,
            price :price ,
            sessions :sessions ,
            hourpersession :hourpersession ,
            participantnum :participantnum ,
            gender :gender ,
            fromage :fromage ,
            untilage :untilage ,
            photo :photo ,
            description :description
          };

          // alert("3");
          // console.log(dict)
        
          // if (!validateForm(dict)){
          //   return false
          // }
        //  alert("4");
        var status_course;
          var status_course =addCourse(dict,files[0])
          .then((dt)=>{

            console.log("add coursre! yoofeee");
            $("#addcourse").click();
            return ;


          });
   
          // var status_course =addCourse(dict,files[0]);
          // status_course.then((res)=>{
          //   console.log("the result is ",res);
          //   console.log("7");
          //   if (res){
          //   $("#addcourse").click();
          //   console.log("the result is ",res);
          //   return ;
          //   }
          //   console.log("failed to add user ");
          //   console.log("8");
          //   return ;
          // });
          // if(status_course){
          //   console.log("add coursre! yoofeee");
          //   $("#addcourse").click();
          //   return ;
          // }
          // console.log("awaits mama "); return true;
        
        
          // console.log("failed to add course1 ");
          // alert("failed to add course1");
          // console.log("9");
        
        

    });



    
    $('#GoToHomePage').click(function(){
      window.location.href = "home.html";
  });


});