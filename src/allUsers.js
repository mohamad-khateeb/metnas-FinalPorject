import { addCourse, getAllCourses, getCourseDoc, deletecourse, getUserDoc, deleteuser, setCoursearr, getAllUsers} from './firebase.js'
import { Timestamp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';



// all users

function htmlToString(display, id, data, number) {
    console.log(data.firstname);
    //define the params 
    var firstname = data.firstname,
        lastname = data.lastname,
        phone = data.phone,
        email = data.email,
        birthday = data.birthday,
        gender = data.gender;

    // define the template 
    var str = '<tr>';
    str += '<td> ' + number + '</td>';
    str += '<td><a href="#">' + id + '</a></td>';
    str += '<div class="card-body">';
    str += '<td>' + firstname + " " + lastname + '</td>';
    str += '<td>' + gender + '</td>';
    // need to deal with label/badge issue in bootstrap version
    str += '<td>' + birthday + '</td>';
    // str +=' <td>בני הנוער</td>';
    str += '<td>' + phone + '</td>';
    str += '<td>' + email + '</td>';
    str += '<td><button id="deletebtn" href="#" class="btn btn-sm  btn-danger" value=' + id + ' >מחיקה</button></td>';
    str += '<td><a id="updatebtn" href="updateUser.html?userid='+id+'"" class="btn btn-sm btn-outline-info" value=' + id + ' >עדכון</a></td>';
    str += '</tr>';
    //var html=str.html;
    //console.log(str);
    display.append(str);

}



// jquery
$(document).ready(function () {
    $("#nav").load("nav.html");
    $("#footer").load("footer.html");
    // var url_string = window.location.href;
    // var url = new URL(url_string);
    // var courseid = url.searchParams.get("courseid");
    // var course_data;


    // tbody for add elements 
    var display = $("#tbody");
    display.empty();
    const data = getAllUsers();
    data.then((dt) => {
        var number=1;
        $.each(dt, function (index, value) {
           console.log("value is ",index);
            htmlToString(display, index, value,number);
            number++;



        });

    });






    $('body').on('click', '#deletebtn', function () {
        // var id=$("button").val();
        var result = confirm("Want to delete?");
        if(result){
        var id = $(this).attr('value');
        const course_doc = deleteuser(id);
        course_doc.then((id) => {
            $(this).closest('tr').remove()
            alert("user deleted! ");
        });
    }
    });

    

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });





    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  to delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    // display the relevant rows status 
    $(".btn-group .btn").click(function () {
        var inputValue = $(this).find("input").val();
        if (inputValue != 'all') {
            var target = $('table tr[data-status="' + inputValue + '"]');
            $("table tbody tr").not(target).hide();
            target.fadeIn();
        } else {
            $("table tbody tr").fadeIn();
        }
    });

    // Changing the class of status label to support Bootstrap 4
    var bs = $.fn.tooltip.Constructor.VERSION;
    var str = bs.split(".");
    if (str[0] == 4) {
        $(".label").each(function () {
            var classStr = $(this).attr("class");
            var newClassStr = classStr.replace(/label/g, "badge");
            $(this).removeAttr("class").addClass(newClassStr);
        });
    }


    

});