import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeVariable } from "./variables";
const getUserProfileHelper = async({dispatch}) =>{

    // console.log('get user profile')
    const userToken = await AsyncStorage.getItem('userId');
   
    const userProfileToken = "Bearer "+userToken;
   // console.log('vfirst',userProfileToken)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try{
        
        const response = await fetch("https://claw-backend.onrender.com/api/v1/client/auth/me", requestOptions)
        const responseJSON = await response.json();

        //console.log('responseJson',responseJSON)
        const lawyerData = responseJSON.data;
        dispatch(changeVariable('firstName',lawyerData.firstName));
        dispatch(changeVariable('lastName',lawyerData.lastName));
        dispatch(changeVariable('email',lawyerData.email));
        // fetch(lawyerData.profilePicture)
        // .then(response => response.blob())
        // .then(blob => {
        //     // Convert the blob to a data URL
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //     // console.log(reader.result);
        //     dispatch(changeVariable('photo_url',reader.result));
        //     };
        //     reader.readAsDataURL(blob);
        // })
        // .catch(error => {
        //     console.error('Error fetching image:', error);
        // });
       
        dispatch(changeVariable('state',lawyerData.state));
        dispatch(changeVariable('gender',lawyerData.gender));
        dispatch(changeVariable('phone_no',lawyerData.phoneNumber));
        dispatch(changeVariable('uid',lawyerData._id));
        dispatch(changeVariable('gender',lawyerData.gender));

    }catch(err){
        console.log('error',err);
    }
     

}

const updateUserProfileHelper = async({data, navigation, dispatch}) => {

    console.log(data)

    let formdata = new FormData();
    if(data.firstName ==''){
        formdata.append('')
    }else{
        formdata.append('firstName',data.firstName);
    }

    if(data.lastName ==''){
        formdata.append('')
    }else{
        formdata.append('lastName',data.lastName);
    }

    if(data.email ==''){
        formdata.append('email','')
    }else{
        formdata.append('email',data.email);
    }

    if(data.photo == {}){

        const photo = {
            name :'',
            type: '',
            uri : ''
        }
        formdata.append('profilePicture',photo)
    }else{
        formdata.append('profilePicture',data.photo);
    }

    const userToken = 'Bearer ' + data.jwtToken;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", userToken );


    const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
    };
    console.log(formdata)

    await fetch("https://claw-backend.onrender.com/api/v1/client/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log('result',result)
        ToastAndroid.show('Profile updated successfully!',ToastAndroid.SHORT);
        navigation.navigate('ProfileScreen');
    })
    .catch((error) => {
        console.error('error',error)
        ToastAndroid.show('Something went wrong.',ToastAndroid.SHORT);
    });
}

export const updateUserProfile = (data, navigation) => dispatch => {

    updateUserProfileHelper({data, navigation,dispatch});
}

export const getUserProfile = () => dispatch => {

    getUserProfileHelper({dispatch});
}