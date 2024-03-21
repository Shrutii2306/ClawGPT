import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeVariable } from "./variables";
import { USER_PROFILE_URL } from "./variables";
const getUserProfileHelper = async({dispatch}) =>{


    dispatch(changeVariable('userDetailLoader',true))
    const userToken = await AsyncStorage.getItem('userId');
   
    const userProfileToken = "Bearer "+userToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try{
        
        const response = await fetch( USER_PROFILE_URL, requestOptions)
        const responseJSON = await response.json();
        const userData = responseJSON.data;
        dispatch(changeVariable('firstName',userData.firstName));
        dispatch(changeVariable('lastName',userData.lastName));
        dispatch(changeVariable('email',userData.email));
        dispatch(changeVariable('state',userData.state));
        dispatch(changeVariable('city',userData.city));
        dispatch(changeVariable('phone_no',userData.phoneNumber));
        dispatch(changeVariable('uid',userData._id));
        dispatch(changeVariable('userDetailLoader',false))
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