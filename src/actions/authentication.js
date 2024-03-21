import {  REGISTER_URL, PHONE_VERIFY_URL } from './variables';
import { CHANGEVARIABLE } from './type';
import { storeData } from './async-storage';
import { Alert } from 'react-native';
import { changeVariable } from './variables';
import { createNewGPTUser } from './legalGPT';

 const registerUserHelper = async ({ data, navigation, dispatch }) => {

  console.log('inside register');
    console.log('helper data',data);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "phoneNumber": data.phoneNumber,
      "state": data.state,
      "city": data.city,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "email": data.email
    });

    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    try{const res = await fetch( REGISTER_URL, requestOptions);
    const response = await res.json();
    console.log('res',response);
    if(response.success){
      storeData('userId',data.jwtToken);
      createNewGPTUser(data.jwtToken);
      navigation.navigate('UserFlow');
    }else{
      Alert.alert('error');
    }
    }catch(err){
      console.log('err',err);
    }
     
  };
  
  const phoneVerificationHelper = async({data, navigation, dispatch}) =>{

    console.log('inside phoneverifcation')
    const body =  {
     phoneNumber: data.phoneNumber,
      verified: data.verified
    };
    console.log(body)

    const headers = { 'Content-Type': 'application/json'};

    const config = { method: 'POST', body: JSON.stringify(body), headers };
    

    try {
      fetch(PHONE_VERIFY_URL, config)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          if (responseJson.data.registered) {
            
            storeData('userId',responseJson.data.jwt);
            dispatch(changeVariable('jwtToken', responseJson.data.jwt))
            dispatch(changeVariable('phone_no',body.phoneNumber))
            dispatch(changeVariable('loginLoader',false))
            navigation.replace('UserFlow')
            
          }else{
            
            dispatch(changeVariable('jwtToken', responseJson.data.jwt))
            dispatch(changeVariable('phone_no',body.phoneNumber))
            navigation.replace('RegisterUser',{phoneNumber : body.phoneNumber, userId : responseJson.data.jwt})
            
          }
          
        })
        .catch(err => {
          console.log('ee', err);
        });
    } catch (err) {
      console.log('err', err);
    }
    
}



const localSigninHelper = async({data,navigation,dispatch}) =>{

  console.log('first')
  const userId = data;
  console.log('LocalSignin',userId);

  if(userId){

    dispatch(changeVariable('jwtToken',userId));
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    //createNewGPTUser(userId);
    navigation.replace('UserFlow');
  }else{
    navigation.replace('SignupFlow');
  }

}

  export const registerUser = (data, navigation) => dispatch => {
    registerUserHelper({ data,navigation, dispatch });
  };

  export const validatePhoneNumber = (data, navigation) => dispatch=> {

    phoneVerificationHelper({data,navigation,dispatch});

  }

  export const LocalSignIn = (data,navigation) => dispatch => {

    localSigninHelper({data, navigation, dispatch});
  }