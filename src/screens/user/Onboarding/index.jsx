import { View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ClawLogoWhite from '../../../assets/ClawLogoWhite.png';
import React,{useEffect, useState} from 'react'
import styles from '../../../styles'
import legalGptGraphic from '../../../assets/legalGptGraphic.png';
import NewsItem from '../../../components/NewsItem'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Search from '../../../assets/search-icon.png'
import MenuIcon from '../../../assets/MenuIcon.png'
import MessageIcon from '../../../assets/MessageIcon.png'
import {useSelector, connect} from 'react-redux'
import { BarIndicator } from 'react-native-indicators';
import { moderateScale } from '../../../styles/mixins';
import { getUserProfile } from '../../../actions/userProfile';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import firestore from '@react-native-firebase/firestore';
import { onOutgoingCallCancelButtonPressedHelper,onOutgoingCallAcceptedHelper, onOutgoingCallTimeoutHelper, onOutgoingCallDeclinedHelper,setCalleeNameHelper } from '../../../actions/callHistory';

const Onboarding = (props) => {

  const state = useSelector(state => state.variables)
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [_searchString, _setSearchString] = useState('');

  const getNews = async() => {

      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "type": 0
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch("https://claw-backend.onrender.com/api/v1/news", requestOptions);

    const response = await res.json();
    const response2 = response.data;

    let newsData = [];

      response2.map((item) =>{
        newsData.push(item);
      })

      setNews(newsData[0]);

      setIsLoading(false);
    
  }

  const [callerID, setCallerID] = useState('');
  const [callerName, setCallerName] = useState('');
  const [calleeID, setCalleeID] = useState('');
  const [calleeName, setCalleeName] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [callStartTime, setCallStartTime] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  let callData = {

    caller_name : callerName,
    caller_ID: callerID,
    callee_name: calleeName,
    callee_ID: calleeID,
    call_status: callStatus,
    call_start_time: callStartTime,
    call_duration: callDuration

}

  const onUserLogin = (userID,fname) => {
      
    console.log('first',userID,fname)

    setCallerID(userID)
    setCallerName(fname)
    if(userID!='')
    {
     props.setCalleeNameHelper(userID,fname);
    }

    return ZegoUIKitPrebuiltCallService.init(
      170557473, // You can get it from ZEGOCLOUD's console
      'd7a3523f4b160a91a35cc6c8064f689880face4cc34c1270a3812ba1046f5825', // You can get it from ZEGOCLOUD's console
      userID, // It can be any valid characters, but we recommend using a phone number.
      fname,
      [ZIM, ZPNs],
      {
          ringtoneConfig: {
              incomingCallFileName: 'ringtone.mp3',
              outgoingCallFileName: 'outgoing_ringtone.mp3',
          },
          notifyWhenAppRunningInBackgroundOrQuit : true,
        
          androidNotificationConfig: {
              channelID: "voice_call",
              channelName: "voice_call",
          },

          
          //caller : missed call
          onOutgoingCallCancelButtonPressed :  (navigation, callID, invitees, type) => {

            navigation.navigate('ContactList');
            callData['callee_ID'] = invitees[0].userID
            callData['callee_name'] = invitees[0].userName

            callData['call_status'] = 'missed';
            callData['call_start_time'] = firestore.FieldValue.serverTimestamp(new Date());
            console.log(callData);
            props.onOutgoingCallCancelButtonPressedHelper(callData);
          },

          //caller : accepted(when the call starts)
          onOutgoingCallAccepted : (callID, invitee) => {

            callData['callee_ID'] = invitee.userID
            callData['callee_name'] = invitee.userName

            callData['call_status'] = 'accepted';
            callData['call_start_time'] = firestore.FieldValue.serverTimestamp(new Date());
          },

          //caller : when the callee is busy 
          onOutgoingCallRejectedCauseBusy: (callID, invitee) => {

          },

          //caller : rejected
          onOutgoingCallDeclined: (callID, invitee) => {

            callData['callee_ID'] = invitee.userID
            callData['callee_name'] = invitee.userName
            callData['call_status'] = 'rejected';
            callData['call_start_time'] = firestore.FieldValue.serverTimestamp(new Date());
            console.log(callData);
            props.onOutgoingCallDeclinedHelper(callData)

          },

          //caller : missed call(timed out )
          onOutgoingCallTimeout: (callID, invitees) => {
            
            callData['callee_ID'] = invitees[0].userID
            callData['callee_name'] = invitees[0].userName

            callData['call_status'] = 'missed';
            callData['call_start_time'] = firestore.FieldValue.serverTimestamp(new Date());
            console.log(callData);
            props.onOutgoingCallTimeoutHelper(callData)
          },
          requireConfig : (data) => {
            return {
  
              onHangUp : duration =>{
                
                callData['call_duration'] = duration;
                props.onOutgoingCallAcceptedHelper(callData);
                navigation.navigate('ContactList')
              },

              
            }
          }
          
      });
  }

  useEffect(() => {

   const subscriber = onUserLogin(state.uid,state.firstName)
    
   return () => subscriber
  },[state])

  useEffect(() => {

    props.getUserProfile()
    _setSearchString('')
    getNews();
    
  },[isFocused]);
  
  return (
 
    
      <TouchableWithoutFeedback onPress={e=> Keyboard.dismiss()}>
        <View>
        <LinearGradient
              colors={['#8940FF', '#5920B5']}
              style={{borderBottomLeftRadius:moderateScale(20),borderBottomRightRadius:moderateScale(20),paddingTop:moderateScale(25),paddingHorizontal:moderateScale(20)}}
              
            > 
          {/* connect with bar */}
          <View style={[{marginTop:20,flexDirection:'row',paddingBottom:0,justifyContent:'space-between',width:'100%',marginTop:20}]}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image 
                source={MenuIcon}
                style={{height:moderateScale(35),width:moderateScale(35)}}
                
              />
            </TouchableOpacity>
         
            <Image  
              source={ClawLogoWhite}
              style={[{height:moderateScale(35),width:moderateScale(110)}]} 
            />
            <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}
            style={{marginTop:4}}>
              <Image 
                source={MessageIcon}
                style={{height:moderateScale(28),width:moderateScale(28)}}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter,styles.searchBar,{width:'100%',backgroundColor:'white',marginTop:moderateScale(38),marginBottom:moderateScale(18)}]}>
            <TouchableOpacity >
              <Image 
                  source={Search}
                  style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TextInput
                  placeholder='Search'
                  placeholderTextColor='#999999'
                  style={[ styles.font_20,styles.marginL_10, styles.textBlack, { width: '90%',marginBottom:moderateScale(-6)}]}
                  value={_searchString}
              onChangeText={(search) => _setSearchString(search)}
              onEndEditing={() => navigation.navigate('SearchResultScreen',{ searchString : _searchString})}
            />
                
          </View>
          </LinearGradient>


          <View style={[{justifyContent:'flex-start',paddingVertical:5,paddingHorizontal:moderateScale(20),marginTop:moderateScale(14)}]}>
          {/* get advice box */}

          <LinearGradient
              colors={['#8940FF', '#5B10D6']}
              style={{borderRadius:moderateScale(15)}}
              
            >
          <TouchableOpacity 
            style={[styles.alignViewCenter, styles.alignViewSplit, styles.adviceBox,{width:'100%',}]}
            onPress={()=>navigation.navigate('LawyerListing')}
          >
            <View style={[styles.alignItemsCenter, styles,{flexDirection:'row',justifyContent:'space-between',flex:1,paddingHorizontal:10,}]}>
              <View>
                <Text style={[styles.font_25, styles.font_med,styles.textWhite]}>Connect with a</Text>
                <Text style={[styles.font_25, styles.font_med,styles.textWhite]}>Lawyer</Text>

              </View>
                
            
              <Image 
                source={require('../../../assets/businessMan.png')}
                style={[styles.caOnboardingImage,{height:moderateScale(120),width:moderateScale(120),bottom:moderateScale(-6)}]}
              />
            </View>
          </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
              colors={['#8940FF', '#5B10D6']}
              style={{borderRadius:moderateScale(15),marginTop:moderateScale(20)}}
              
            > 
          <TouchableOpacity 
            style={[styles.alignViewCenter, styles.alignViewSplit, styles.adviceBox,{width:'100%',}]}
            onPress={()=>navigation.navigate('Legal GPT')}
          >
            
              <View style={[styles.alignItemsCenter, styles,{flexDirection:'row',justifyContent:'space-between',flex:1,paddingHorizontal:5,}]}>
                  <Text style={[styles.font_25, styles.font_med,styles.textWhite]}>LegalGPT</Text>
                  <View style={[styles.alignViewCenter,styles.alignItemsCenter]}>
                      
                  </View>
                <Image 
                  source={legalGptGraphic}
                  style={styles.caOnboardingImage}
                />
              </View>
              <View>
              </View>
      
          </TouchableOpacity>
          </LinearGradient>
                    
          <View style={[styles.alignViewCenter, styles.alignItemsLeft,{justifyContent:'flex-start',alignSelf:'flex-start',width:'100%',}]}>
          <View style={{height:10}}></View>
            <Text style={[styles.textBlack, styles.font_700, styles.font_25,]}> Latest News </Text>
          </View>

       
          {/* News Button */}
          <TouchableOpacity
            onPress={(e)=> navigation.navigate('News')}
            style={[{width:'100%',justifyContent:'center'}]} 
          >
                {isLoading?<View style={{marginTop:moderateScale(80)}}><BarIndicator color='#D9D9D9' size={40}/></View>:<NewsItem news={news} isOnboarding={true} />}
          </TouchableOpacity>

            </View>
        </View>
      </TouchableWithoutFeedback>
  )
}

export default connect(null,{
  getUserProfile,
  onOutgoingCallCancelButtonPressedHelper,
  onOutgoingCallAcceptedHelper,
  onOutgoingCallTimeoutHelper,
  onOutgoingCallDeclinedHelper,
  setCalleeNameHelper
})(Onboarding)