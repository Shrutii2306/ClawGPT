import { baseUrl,verifyUrl } from './variables';
import { CHANGEVARIABLE } from './type';
import { storeData } from './async-storage';
import { Alert } from 'react-native';
import { changeVariable } from './variables';

//  const registerUserHelper = async ({ data, navigation, dispatch }) => {

//   console.log('inside register');
//     console.log('helper data',data);
//     var formdata = new FormData();
//     formdata.append("firstName", data.firstName); 
//     formdata.append("lastName", data.lastName); 
//     formdata.append("gender", data.gender); 
//     formdata.append("email", data.email); 
//     formdata.append("barCouncilState", data.barCouncilState);
//     formdata.append("barCouncilNo", Number(data.barCouncilNo)); 
//     formdata.append("barCouncilYear", data.barCouncilYear); 
//     formdata.append("state", data.state); 
//     formdata.append("city", data.city); 
//     formdata.append("pincode", data.pincode); 
//     formdata.append("uploaded_id", data.photo); 
//     formdata.append("phoneNumber", data.phoneNumber);
//     console.log('form data', formdata);
//     var requestOptions = {
//       method: 'POST',
//       body: formdata,
//       redirect : 'follow'
     
//     };
    
//     try{const res = await fetch("https://claw-backend.onrender.com/api/v1/user/signup", requestOptions);
//     const response = await res.json();
//     console.log('res',response);
//     if(response.success){

//       navigation.navigate('ClientFlow');
//     }else{
//       Alert.alert('error');
//     }
//     }catch(err){
//       console.log('err',err);
//     }
     
//   };
  
  const phoneVerificationHelper = async({data, navigation, dispatch}) =>{

    console.log('inside phoneverifcation')
    const body =  {
     phoneNumber: data.phoneNumber,
      verified: data.verified
    };
    console.log(body)

    const headers = { 'Content-Type': 'application/json'};

    const config = { method: 'POST', body: JSON.stringify(body), headers };
    const url = `https://claw-backend.onrender.com/api/v1/client/verify`;

    try {
      fetch(url, config)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.success) {
            
            storeData('userId',responseJson.data.jwt);
            dispatch(changeVariable('jwtToken', responseJson.data.jwt))
            dispatch(changeVariable('phone_no',body.phoneNumber))
              navigation.replace('UserFlow')
            
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

    const session_id = Math.floor(Math.random() * 90000) + 10000;
    console.log(session_id)
    dispatch(changeVariable('jwtToken',userId));
    dispatch(changeVariable('session_id',session_id));
    navigation.replace('UserFlow');
  }else{
    navigation.replace('SignupFlow');
  }

}

  // export const registerUser = (data, navigation) => dispatch => {
  //   registerUserHelper({ data,navigation, dispatch });
  // };

  export const validatePhoneNumber = (data, navigation) => dispatch=> {

    phoneVerificationHelper({data,navigation,dispatch});

  }

  export const LocalSignIn = (data,navigation) => dispatch => {

    localSigninHelper({data, navigation, dispatch});
  }