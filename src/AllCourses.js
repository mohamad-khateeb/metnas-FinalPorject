import { addCourse, getAllCourses, getCourseDoc, deletecourse } from './firebase.js'
import { Timestamp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';


// functions for check dates after or before today 
function isAfterToday(date) {
    // console.log("new Date(date.toDate()).valueOf() >",new Date(date.toDate()).valueOf());
    // console.log("after :",new Date(date).valueOf() ,new Date(date).valueOf() < new Date().valueOf() , " "+new Date().valueOf());
    return new Date(date).valueOf() > new Date().valueOf();
}

function isBeforeToday(date) {
    // console.log("new Date(date.toDate()).valueOf() >",new Date(date.toDate()).valueOf());
    // console.log("before :", new Date(date).valueOf() + " ", new Date(date).valueOf() < new Date().valueOf() , " "+  new Date().valueOf());
    return new Date(date).valueOf() < new Date().valueOf();
}



function GetStatus(startdate, ennddate) {
    if (isAfterToday(startdate)) {
        return 'inactive';
    } else if (isBeforeToday(ennddate)) {
        return 'expired';

    } else { return 'active'; }
}

function GetClass(startdate, ennddate) {
    var status = GetStatus(startdate, ennddate);
    if (status == 'inactive') {
        return 'badge badge-warning';
    } else if (status == 'expired') {
        return 'badge badge-danger'

    } else {
        return 'badge badge-success';
    }
}



function GetLabel(startdate, ennddate) {
    var status = GetStatus(startdate, ennddate);
    if (status == 'inactive') {
        return 'לא פעיל';
    } else if (status == 'expired') {
        return 'לא בתוקף'

    } else {
        return 'פעיל';
    }
}


function htmlToString(display, id, data, number) {
    //define the params 
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
    var photo = data.photo;
    // console.log("the photo is :", id , " name ", coursename);

    // define the template 
    console.log(GetStatus(startdate, enddate));
    var str = '<tr data-status="' + GetStatus(startdate, enddate) + '">';
    str += '<td> ' + number + '</td>';
    str += '<td><a href="#">' + coursename + '</a></td>';
    str += '<div class="card-body">';
    str += '<td>' + startdate + '</td>';
    str += '<td>' + enddate + '</td>';
    // need to deal with label/badge issue in bootstrap version
    str += '<td><span class="' + GetClass(startdate, enddate) + '">' + GetLabel(startdate, enddate) + '</span></td>';
    // str +=' <td>בני הנוער</td>';
    str += '<td><a href="updateCourse.html?courseid=' + id + '" class="btn btn-sm manage">עריכה/עדכון</a></td>';
    // class="btn btn-sm btn-outline-info"
    var waiting = data.waiting;
    if (waiting == null || waiting == "") {
        str += '<td><a   class="btn btn-sm btn-outline-info" class="notification"  href="studentsInCourse.html?courseid=' + id + '" >נרשמים <span class="badge badge-light">0</span></a></td>';

    } else {
        // str += '<td><a   class="btn btn-sm btn-outline-info" class="notification"  href="studentsInCourse.html?courseid=' + id + '" >נרשמים <span class="badge badge-light">' + waiting.length + '</span></a></td>';
        str += '<td><a   class="btn btn-sm btn-outline-info" class="notification"  href="studentsInCourse.html?courseid=' + id + '" >נרשמים <span class="badge badge-light">' + waiting.length + '</span></a></td>';

    }

   

    str += '<td><button id="deletebtn" href="#" class="btn btn-sm  btn-danger" value=' + id + ' >מחיקה</button></td>';
    str += '</tr>';
    //var html=str.html;
    //console.log(str);
    display.append(str);

}



// jquery
$(document).ready(function () {
    $("#nav").load("nav.html");
    $("#footer").load("footer.html");

    // tbody for add elements 
    var display = $("#tbody");
    display.empty();
    const data = getAllCourses();
    data.then((dt) => {
        var number = 0
        $.each(dt, function (index, value) {
            number = number + 1
            htmlToString(display, index, value, number);

            // console.log(" ------ course name ------ " + value.photo + " and name is :" +value.coursename);
            //console.log(" keys is ???????  >> " + Object.keys(dt));
            // $.each(value, function (index2, value2) {

            //     console.log(index2 + " : " + value2);
            // });
            // console.log("******************************************************************************************");

        });
    });



    // delete -----------------------------------------------
    $('body').on('click', '#deletebtn', function () {
        // var id=$("button").val();
        var id = $(this).attr('value');
        const course_doc = deletecourse(id);
        course_doc.then((id) => {
            $(this).closest('tr').remove()
            alert("course deleted! ");
        });
    });









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