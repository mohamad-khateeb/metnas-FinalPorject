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


  var url_string = window.location.href;
  var url = new URL(url_string);
  var userid = url.searchParams.get("userid");
  const doc = getUserDoc(userid);
  doc.then((data) => {
    var firstname=  $("#firstname").val(data.firstname);
    var lastname=  $("#lastname").val(data.lastname);
    var phone=  $("#phone").val(data.phone);
    var email=  $("#email").val(data.email);
    var id=  $("#id").val(data.id);
    var birthday=  $("#birthday").val(data.birthday);
    // var gender = $("input[type='radio']:checked").val();
    $(":radio[value=" + data.gender + "]").prop("checked", "true");
  });


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
  $("#buttonsStyle").click();
    return ; 
});
}); // end of submit button

$('#GoToHomePage').click(function(){
    window.location.href = "home.html";

});




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



