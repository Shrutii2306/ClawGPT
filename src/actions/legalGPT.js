import { baseUrl,verifyUrl } from './variables';
import { CHANGEVARIABLE } from './type';
import { storeData } from './async-storage';
import { Alert } from 'react-native';
import { changeVariable } from './variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const createNewGPTUser = async(jwtToken) => {

    const userJwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+userJwtToken;
    // console.log('legal gpt',userProfileToken);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
   // myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
      };
    // console.log(requestOptions)
      try{
        
        const response = await fetch("https://claw-backend.onrender.com/api/v1/gpt/user",requestOptions)
        //console.log(response)
        const responseJSON = await response.json();
       // console.log('legalgpt responseJson',responseJSON)
       

    }catch(err){
        console.log('createNewGPTUser error',err);
    }

    
 }

const createNewSessionHelper = async({prompt,dispatch}) => {
   
    console.log('createNewSession//////////////////////////')
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    myHeaders.append("Content-Type", "application/json");
    var raw =  JSON.stringify({
        "prompt": prompt,
        "model": "legalGPT"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body : raw
    };
   
    try{
        
        const response = await fetch("https://claw-backend.onrender.com/api/v1/gpt/session/",requestOptions)
        console.log(response)
        const responseJSON = await response.json();
        console.log('createNewSessionHelper responseJson',responseJSON)
        dispatch(changeVariable('active_chatID',responseJSON.data.id))
        const sessionid = responseJSON.data.id;
        // const jwtToken = await AsyncStorage.getItem('userId');
        // const userProfileToken = "Bearer "+jwtToken;
        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", userProfileToken);
        // myHeaders.append("Content-Type", "application/json");
        var raw =  JSON.stringify({
            "prompt": prompt,
            "sessionId": responseJSON.data.id
          });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body : raw
        };
        await fetch("https://claw-backend.onrender.com/api/v1/gpt/session/prompt",requestOptions)
        .then(response2 => response2.json())
        .then(response2 => {
            console.log('first',response2,sessionid)
            RetreiveMessagesHelper(sessionid,dispatch)
         
        })
        .catch(error => {
          console.error('appendNewMessageHelper error',error);
          // Handle errors
        });
        // try{
            
        //     const response = await fetch("https://claw-backend.onrender.com/api/v1/gpt/session/prompt",requestOptions)
        //     //console.log(response)
        //    // setQuery('')
        //     const responseJSON = await response.json();
        //     console.log('appendNewMessageHelper responseJson',responseJSON.data)
        //     //dispatch(changeVariable('GPTHistory_ID',responseJSON.data))
        //     setTimeout(() =>{
        //        
        //     },5000);
            
        //     //setWaiting(false)
        // }catch(err){
        //     //setQuery('')
        //     console.log('appendNewMessageHelper error',err);
        //     //setWaiting(false);
        // }
    }catch(err){
        console.log('createNewSessionHelper error',err);
    }

}

const RetreiveAllSessionsHelper = async({dispatch}) => {

    
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    try{
        
        const response = await fetch("https://claw-backend.onrender.com/api/v1/gpt/sessions",requestOptions)
        //console.log(response)
        const responseJSON = await response.json();
       // console.log('RetreiveAllSessionsHelper responseJson',responseJSON.data)
        dispatch(changeVariable('GPTHistory_ID',responseJSON.data))

    }catch(err){
        console.log('RetreiveAllSessionsHelper error',err);
    }
}



const RetreiveMessagesHelper = async(active_chatID,dispatch) => {

    if(active_chatID=='newSession'){
        dispatch(changeVariable('active_chatHistory',[]))
        return;
    }
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    try{
        
        const response = await fetch("https://claw-backend.onrender.com/api/v1/gpt/session/"+active_chatID,requestOptions)
      //console.log('RetreiveMessagesHelper response',response)
        const responseJSON = await response.json();
        
       const messages = responseJSON.data.messages
      // console.log('RetreiveMessagesHelper messages',messages)
       dispatch(changeVariable('active_chatHistory',messages))
       setSessionLoader(false)
    }catch(err){
        console.log('RetreiveMessagesHelper error',err);
    }
}

export const setActiveSessionID = (sessionId) => dispatch => {

    console.log('sessionId',sessionId)
    dispatch(changeVariable('active_chatID',sessionId))
}

export const RetreiveAllSessions = () => dispatch => {

    RetreiveAllSessionsHelper({dispatch})
}

export const createNewSession = (prompt) => dispatch => {

    createNewSessionHelper({prompt,dispatch})
}

export const setSessionLoader = (status) => dispatch => {

    dispatch(changeVariable('sessionLoader',status))
}

export const RetreiveMessages = (active_chatID) => dispatch => {

    RetreiveMessagesHelper(active_chatID,dispatch)
}
