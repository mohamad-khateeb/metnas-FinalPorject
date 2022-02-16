import { addCourse, getAllCourses, getCourseDoc,setCoursearr } from './firebase.js'


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
    var image;
    var arr;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var courseid = url.searchParams.get("courseid");
    const course_doc = getCourseDoc(courseid);
    course_doc.then((data) => {
        const enddate = data.enddate;
        const startdate = data.startdate;
        const sessions = data.sessions;
        const description = data.description;
        const hourpersession = data.hourpersession;
        const untilage = data.untilage;
        const price = data.price;
        const coursename = data.coursename;
        const location = data.location;
        const category = data.category;
        const gender = data.gender;
        const fromage = data.fromage;
        const participantnum = data.participantnum;
        arr=data.waiting;
        image=data.photo;
        $("#coursename").val(coursename);
        $("#category").val(category);
        $("#location").val(location);
        $("#startdate").val(startdate);
        $("#enddate").val(enddate);
        $("#price").val(price);
        $("#sessions").val(sessions);
        $("#hourpersession").val(hourpersession);
        $("#participantnum").val(participantnum);
        $("#fromage").val(fromage);
        $("#untilage").val(untilage);
        $("#description").val(description);
        $(":radio[value=" + gender + "]").prop("checked", "true");



    });




    $("#createcourse").click(function () {
        var coursename = $("#coursename").val();
        var category = $("#category").val();
        var location = $("#location").val();
        var startdate = $("#startdate").val();
        var enddate = $("#enddate").val();
        var price = $("#price").val();
        var sessions = $("#sessions").val();
        var hourpersession = $("#hourpersession").val();
        var participantnum = $("#participantnum").val();
        var gender = $("input[name='gender']:checked").val();
        var fromage = $("#fromage").val();
        var untilage = $("#untilage").val();
        
        var description = $("#description").val();
        var dict = {
            coursename: coursename,
            category: category,
            location: location,
            startdate: startdate,
            enddate: enddate,
            price: price,
            sessions: sessions,
            hourpersession: hourpersession,
            participantnum: participantnum,
            gender: gender,
            fromage: fromage,
            untilage: untilage,
            photo: image,
            description: description
        };

        if(arr != null){
            dict['waiting']=arr;
        }

        const status_course=setCoursearr(courseid,dict)
        .then((dt)=> {
            $("#addcourse").click();
            return;
        });



    });





    $('#GoToHomePage').click(function(){
        window.location.href = "home.html";
    });
    
});