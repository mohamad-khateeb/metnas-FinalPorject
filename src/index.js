// import { initialApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection ,setDoc ,addDoc ,doc} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import {addUser,getUserDoc, getCourseDoc,setCoursearr, setCourse} from './firebase.js'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3TZV4wu69MjC8mtTIDhQatCmEgd-3oKE",
  authDomain: "finalproject-31887.firebaseapp.com",
  databaseURL: "https://finalproject-31887-default-rtdb.firebaseio.com",
  projectId: "finalproject-31887",
  storageBucket: "finalproject-31887.appspot.com",
  messagingSenderId: "734215804491",
  appId: "1:734215804491:web:310280ca455d3cadc89fce",
  measurementId: "G-Q2Q6E5WVNJ"
};

const init= initializeApp(firebaseConfig)

const database =getFirestore();

// console.log("hello firestore");

const ref = doc(database , 'users', '3154852');

// const data ={
//     firstname : "mohamad",
//     gender :"male",
//     id: 208525220 ,
//     lastname :"khateeb2 ",
//     phone : "0524408404",
//     vilaage : "uzer"}



// const added= setDoc (ref,data ).then ( () => {
//   console.log("added to user successfully !")
// }

// )



// Jquery 
$(document).ready(function () { 
  $("#nav").load("nav.html");
  $("#footer").load("footer.html");


$("#registerbtn").click(function(){
  var firstname=  $("#firstname").val();
  var lastname=  $("#lastname").val();
  var phone=  $("#phone").val();
  var email=  $("#email").val();
  var id=  $("#id").val();
  var birthday=  $("#birthday").val();
  var gender = $("input[type='radio']:checked").val();

  var dict = {
    firstname : firstname,
    lastname : lastname ,
    phone : phone,
    email : email,
    id: id,
    birthday :birthday ,
    gender :gender
  }

  if (!validateForm(dict)){
    return false
  }

const user_doc = addUser(dict);
// console.log("user_doc ", user_doc);
user_doc.then((dd)=>{
// if(dd == null){ // user not exists
//   const status_user = addUser(dict);

// }

 var url_string =window.location.href;
var url = new URL(url_string);
var courseid = url.searchParams.get("courseid");
const course_doc= getCourseDoc(courseid);
course_doc.then((cd)=>{
  const arr=[];
  if(cd.waiting==null){
    arr.push(id)
  }else{
    arr.push(...cd.waiting);
    if (arr.indexOf(id)>=0){alert("כבר נרשמת לקורס");return;}
    arr.push(id);
  }

  cd['waiting']=arr;
const course_set=setCoursearr(courseid,cd);
course_set.then((sc)=>{
// console.log("sc at line 100, index.js is =",sc);
  $("#buttonsStyle").click();
    // return ; 
});


});

 
});


}); // end of submit button


}); //end of jquery 


 //            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    functions     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function validateForm (dict) {
  var phone=  $("#phone").val();
  var id=  $("#id").val();
 

  if (!validateID(id)){
    alert("מספר תעודת זהות לא תקין ");
    return false;
  }
  if (!validatephone(phone)){
    alert("מספר טלפון לא תקין ");
    return false;
  }
return true

}

function validateID(str) {
// we only process strings!  
  if (typeof str != "string") return false 

  return !isNaN(str) && !isNaN(parseFloat(str)) && str.length==9
}


function validatephone(str) {
  // we only process strings!  
    if (typeof str != "string") return false 
  
    return !isNaN(str) && !isNaN(parseFloat(str)) && str.length==10 
  }



