import { getAllCourses, getCourseDoc } from './firebase.js'
// import { doc, getDoc } from "firebase/firestore";





function creatElementCourse(id, data) {
    var div1 = $('<div class="col-12 col-md-6 col-lg-4"></div>');
    var div2 = $('<div class="card"</div>');
    var image = $('<img class="card-img-top" src="./images/baseball.PNG" alt="Card image cap">');
    var div3 = $('<div class="card-body"></div>');
    var h4 = $('<h4 class="card-title">קורס כדול סל</h4>');
    var p = $('<p class="card-text">הקורס מיועד לבני נוער מגיל 8-14</p>');

    var div4 = $('<div class="row"</div>');

    var div5 = $('<div class="col"></div>');
    var p2 = $('<p class="btn btn-danger btn-block" style="background-color: rgba(0,107,107,255);border-color: rgba(0,107,107,255);"> קרא עוד...</p>');

    var div6 = $('<div class="col"></div>');
    var a = $('<a href="registerCourse.html" class="btn btn-success btn-block">הרשם</a>');
    a.attr({
        href: 'registrytrytry.html',
        id: 'a'
    });

}

// functions for check dates after or before today 
function isAfterToday(date) {
    // console.log("new Date(date.toDate()).valueOf() >",new Date(date.toDate()).valueOf());
    // console.log("after :", new Date(date).valueOf(), new Date(date).valueOf() < new Date().valueOf(), " " + new Date().valueOf());
    return new Date(date).valueOf() > new Date().valueOf();
}

function isBeforeToday(date) {
    // console.log("new Date(date.toDate()).valueOf() >",new Date(date.toDate()).valueOf());
    // console.log("before :", new Date(date).valueOf() + " ", new Date(date).valueOf() < new Date().valueOf(), " " + new Date().valueOf());
    return new Date(date).valueOf() < new Date().valueOf();
}


function GetStatus(startdate, ennddate) {
    if (isAfterToday(startdate)) {
        return 'inactive';
    } else if (isBeforeToday(ennddate)) {
        return 'expired';

    } else { return 'active'; }
}


function htmlToString(display, id, data) {
    //define the params 
    const enddate = data.enddate;
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
    const startdate = data.startdate;
    const waiting=data.waiting;
    if(waiting!=null ){
      // if the capacity is full 
      if( waiting.length>=participantnum){
        return;
    }
    }



    // console.log("the photo is :", photo);
    const status_course = GetStatus(startdate, enddate);
    if (status_course != 'inactive') {        
        return;
    }
    
  

    // define the template 
    var str = '<div class="col-12 col-md-6 col-lg-4">';
    str += '<div class="card">';
    str += '<img class="card-img-top" src="' + photo + '" alt="Card image cap" height="250">';
    str += '<div class="card-body">';
    str += '<h4 class="card-title">' + coursename + '</h4>';
    str += ' <p class="card-text">' + description + '</p>'
    str += '<div class="row">';
    str += '<div class="col">';
    // str +='<p class="btn btn-danger btn-block"style="background-color: rgba(0,107,107,255);border-color: rgba(0,107,107,255);"> קרא עוד...</p>';
    str += ' <button id="readmore" value="' + id + '" class="btn btn-danger btn-block" data-toggle="modal" data-target="#readMoreModal"style="background-color: rgba(0,107,107,255);border-color: rgba(0,107,107,255);"> קרא עוד...</button>'
    str += '</div>';
    str += '<div class="col">';
    str += '<a href="registerCourse.html?courseid=' + id + '" class="btn btn-success btn-block">הרשם</a>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    //var html=str.html;
    //console.log(str);
    display.append(str);

}

function htmlToString_new(display, id, data) {
    //define the params 
    const enddate = data.enddate;
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
    const startdate = data.startdate;
    const waiting=data.waiting;
    if(waiting!=null )
      // if the capacity is full 
      if( waiting.length>=participantnum){
        return;}
    // console.log("the photo is :", photo);
    const status_course = GetStatus(startdate, enddate);
    if (status_course == 'inactive') {        
    // define the template 
    var str = '<div class="card bg-light mb-3">';
    str+='<div class="card-header bg-success text-white text-uppercase">קורסים חדשים</div>';
    str += '<div class="card-body">';
    str += '<img class="card-img-top" src="' + photo + '" alt="Card image cap" height="250">';
    str += '<h4 class="card-title">' + coursename + '</h4>';
    str += ' <p class="card-text">' + description + '</p>'
    str += '<div class="row">';
    str += '<div class="col">';
    // str +='<p class="btn btn-danger btn-block"style="background-color: rgba(0,107,107,255);border-color: rgba(0,107,107,255);"> קרא עוד...</p>';
    str += ' <button id="readmore" value="' + id + '" class="btn btn-danger btn-block" data-toggle="modal" data-target="#readMoreModal"style="background-color: rgba(0,107,107,255);border-color: rgba(0,107,107,255);"> קרא עוד...</button>'
    str += '</div>';
    str += '<div class="col">';
    str += '<a href="registerCourse.html?courseid=' + id + '" class="btn btn-success btn-block">הרשם</a>';
    // str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    //var html=str.html;
    //console.log(str);
    display.append(str);
    return true ;
}
    return false;

}








function FillModel(data, id) {
    const enddate = data.enddate;
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
    const startdate = data.startdate;
    // $(":checkbox").removeAttr("checked");
    // $('input:checkbox').attr('checked',false);

    $("#title_modal").text(coursename);
    $("#price_modal").text(price + "₪");
    $("#description_modal").text(description);
    $("#location_modal").val(location);
    $("#startdate_modal").val(startdate);
    $("#enddate_modal").val(enddate);
    $("#price_modal2").text(price + "₪");
    $("#sessions_modal").val(sessions);
    $("#hourpersession_modal").val(hourpersession);
    // $("input[type=checkbox][value="+gender+"]").prop("checked",true);
    $(":radio[value=" + gender + "]").prop("checked", "true");
    $("#fromage_modal").val(fromage);
    $("#toage_modal").val(untilage);
    $("#image_modal").attr("src", photo);
    $("#image_modal1").attr("src", photo);

    $("#reg_modal").prop("href", "registerCourse.html?courseid=" + id);
    $("#reg_modal1").prop("href", "registerCourse.html?courseid=" + id);
}



// JQuery
$(document).ready(function () {
    $("#nav").load("nav.html"); 
    $("#footer").load("footer.html");
    
    
    var flag=false;
    var display = $("#result");
    var display_new = $("#new_course");
    display_new.empty();
    display.empty();
    // for (let i = 0; i < 100; i++){
    //      htmlToString(display,id ,obj);
    //     }

    // get all courses from the database
    const data = getAllCourses();
    data.then((dt) => {
        $.each(dt, function (index, value) {
            htmlToString(display, index, value);
            if(!flag){
                flag=htmlToString_new(display_new, index, value);
            }

            


        });
    });




    $('body').on('click', '#readmore', function () {
        // var id=$("button").val();
        var id = $(this).attr('value');
        const course_doc = getCourseDoc(id);
        course_doc.then((dt) => {
            console.log(dt);
            FillModel(dt, id);

        });
    });












    // const course_doc = "8kVBcm9EPmnLpuaUV1bk";
    // const course = getCourseDoc(course_doc);
    // course.then((dt) => {
    //     console.log("course doc", dt);
    //     console.log(dt.arr_try);
    // });



}); // end of readu document






