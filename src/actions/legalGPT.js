import { NEW_MESSAGE_URL, NEW_SESSION_URL, NEW_USER_URL, RETREIVE_MESSAGES, RETREIVE_SESSIONS} from './variables';
import { CHANGEVARIABLE } from './type';
import { storeData } from './async-storage';
import { Alert } from 'react-native';
import { changeVariable } from './variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const createNewGPTUser = async(jwtToken) => {

    const userJwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+userJwtToken;
    console.log('legal gpt',userProfileToken);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders
      };
     console.log(requestOptions)
      try{
        
        const response = await fetch(NEW_USER_URL,requestOptions)
        const responseJSON = await response.json();
     console.log('legalgpt responseJson',responseJSON)
       

    }catch(err){
        console.log('createNewGPTUser error',err);
    }

    
 }

const createNewSessionHelper = async({prompt,dispatch}) => {
   
    console.log('createNewSession')
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
        
        const response = await fetch(NEW_SESSION_URL,requestOptions)
        console.log(response)
        const responseJSON = await response.json();
        console.log('createNewSessionHelper responseJson',responseJSON)
        dispatch(changeVariable('active_chatID',responseJSON.data.id))
        const sessionid = responseJSON.data.id;
        var raw =  JSON.stringify({
            "prompt": prompt,
            "sessionId": responseJSON.data.id
          });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body : raw
        };
        await fetch(NEW_MESSAGE_URL,requestOptions)
        .then(response2 => response2.json())
        .then(response2 => {
            RetreiveMessagesHelper(sessionid,dispatch)
            dispatch(changeVariable('botLoader',false));
        })
        .catch(error => {
          console.error('appendNewMessageHelper error',error);
        });
       
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
   // console.log(requestOptions)
    try{
        
        const response = await fetch(RETREIVE_SESSIONS,requestOptions)
        //console.log(response)
        const responseJSON = await response.json();
        //console.log('RetreiveAllSessionsHelper responseJson',responseJSON.data)
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
        
        const response = await fetch(RETREIVE_MESSAGES+active_chatID,requestOptions)
        const responseJSON = await response.json();
        
       const messages = responseJSON.data.messages
       dispatch(changeVariable('active_chatHistory',messages))
       setSessionLoader(false)
    }catch(err){
        console.log('RetreiveMessagesHelper error',err);
    }
}

export const setActiveSessionID = (sessionId) => dispatch => {

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
