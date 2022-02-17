import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection ,setDoc ,addDoc ,doc ,getDoc ,getDocs,deleteDoc  } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { getStorage , ref as sRef , uploadBytesResumable , getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js';




// ************************************************************************************************************************


// import { initializeApp } from 'firebase/app';
// const firebaseConfig = {
//   apiKey: "AIzaSyA3TZV4wu69MjC8mtTIDhQatCmEgd-3oKE",
//     authDomain: "finalproject-31887.firebaseapp.com",
//     databaseURL: "https://finalproject-31887-default-rtdb.firebaseio.com",
//     projectId: "finalproject-31887",
//     storageBucket: "finalproject-31887.appspot.com",
//     messagingSenderId: "734215804491",
//     appId: "1:734215804491:web:310280ca455d3cadc89fce",
//     measurementId: "G-Q2Q6E5WVNJ"
// };

// var app = initializeApp(firebaseConfig);

// ************************************************************************************************************************


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

  console.log("starting with Firebase configuration..");
  
  const ref = doc(database , 'users', '3154852');
  
//   const data ={
//       firstname : "mohamad",
//       gender :"male",
//       id: 208525220 ,
//       lastname :"khateeb2 ",
//       phone : "0524408404",
//       vilaage : "uzer"}
  
  
  
//   const added= setDoc (ref,data ).then ( () => {
//     console.log("added to user successfully !")
//   }
  
//   )




// <<<<<<<<<<<<<<<<<<<<<<<<<<< users >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  export async function addUser(data){

        // console.log("data is = " + data["id"] )
        var id=data['id'];
        const ref = doc(database ,'users' , id);

        const added=  await (setDoc (ref,data)
        .then(() =>{
            console.log("added to user successfully !");

            return true;
        })
        .catch ((error) =>{
            console.log(" error durnig adding user "+ error);
            return false ;}));

}

   export async function getUserDoc(id){
    //  console.log("getting user id ",id);
    const docRef = doc(database ,'users' , id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // console.log("User Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null ; 
    }
   }




   export async function getAllUsers(){
    const querySnapshot = await getDocs(collection(database, "users"));
    const documents = {}
   
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      documents[doc.id] = doc.data();
      
    });
    //console.log(documents);
    return documents
   }
  






   export async function deleteuser(id){

    const ref = doc(database ,'users',id);
    await (deleteDoc(ref)
    .then((docRef) =>{
        console.log("delete user successfully !");
        return id;
    })
    .catch ((error) =>{
        console.log(" error durnig deleting user "+ error);
        return null ;}));
  
  }




  
export async function setuser(id , data){

  const ref = doc(database ,'courses',id);
  const added=  await (setDoc(ref,data)
  .then((docRef) =>{
      console.log("setdoc to course successfully !");
      return data;
  })
  .catch ((error) =>{
      console.log(" error durnig adding course "+ error);
      return null ;}));

}
  


// <<<<<<<<<<<<<<<<<<<<<<<<<<< courses >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export async function addCourse(data, files){
  const ref = collection(database ,'courses');

  const added=  await (addDoc(ref,data)
  .then((docRef) =>{
      console.log("added to course successfully !");
       uploadImage(data['photo'],files,docRef.id , data)
       .then(()=>{
        return data;
       });
      
  })
  .catch ((error) =>{
      console.log(" error durnig adding course "+ error);
      return null ;}));
      // console.log("the const added value is :",added);

}




export async function setCourse(id , url , data){

  const ref = doc(database ,'courses',id);
  data['photo']=url;
  const added=  await (setDoc(ref,data)
  .then((docRef) =>{
      console.log("setdoc to course successfully !");
      return data;
  })
  .catch ((error) =>{
      console.log(" error durnig adding course "+ error);
      return null ;}));

}



export async function deletecourse(id){

  const ref = doc(database ,'courses',id);
  await (deleteDoc(ref)
  .then((docRef) =>{
      console.log("delete course successfully !");
      return id;
  })
  .catch ((error) =>{
      console.log(" error durnig deleting course "+ error);
      return null ;}));

}






export async function setCoursearr(id , data){

  const ref = doc(database ,'courses',id);
  const added=  await (setDoc(ref,data)
  .then((docRef) =>{
      console.log("setdoc to course successfully !");
      return data;
  })
  .catch ((error) =>{
      console.log(" error durnig adding course "+ error);
      return null ;}));

}





export async function getCourseDoc(id){
  const docRef = doc(database ,'courses' , id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("course Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null ; 
  }
 }



 export async function getAllCourses(){
  const querySnapshot = await getDocs(collection(database, "courses"));
  const documents = {}
 
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    documents[doc.id] = doc.data();
    
  });
  //console.log(documents);
  return documents
 }

// function uploadImage(image, files,docId){

//   var name=GetFileName(image);
//   var extention=GetFileExtention(image);
//   var imageName=docId+extention;
//   const sotrage= getStorage();
//   const sotrageRef=sRef(sotrage, "images/"+imageName);
//   const uploadTask =  uploadBytesResumable(sotrageRef,files);
// //   const uploadTask=Storage.ref("images/"+name+".png").put()
// // uploadTask.snapshot.ref
//   getDownloadURL(sotrageRef).then((downloadURL)=>{
//     alert ("catch")
//     console.log(downloadURL);
//     photo = {photo : downloadURL};
//     setCourse(docId, photo);
//     return true;
//  });
//  return false ;
// }




async function uploadImage(image, files,docId , data){
  // console.log("3");
  var name=GetFileName(image);
  var extention=GetFileExtention(image);
  var imageName=docId+extention;
  const sotrage= getStorage();
  const sotrageRef=sRef(sotrage, "images/"+imageName);
  const uploadTask = uploadBytesResumable(sotrageRef,files);

  // from firbase 
   uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
    return null;
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // console.log("4");
      console.log('File available at', downloadURL);
      setCourse(docId , downloadURL , data )
      .then(function(){
        return data ;



      });

      
    });
  }






);
}







function GetFileName(file){
  // console.log("5");
var temp =file.split(".");
var fname=temp.slice(0,-1).join(".");
return fname;}


function GetFileExtention(file){
  // console.log("6");
  var temp =file.split(".");
  var fname=temp.slice(temp.length-1, temp.length );
  return "."+fname; }




  // *************************** admin *************************************


  
export async function getadmin(){

  const docRef = doc(database ,'admin' , 'admin');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("admin Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // alert("not exists");
    // doc.data() will be undefined in this case
    console.log("No such admin document!");
    return null ; 
  }
 }