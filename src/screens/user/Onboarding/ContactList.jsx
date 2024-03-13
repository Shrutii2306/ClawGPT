import { View, Text, ScrollView, Touchable, TouchableOpacity,Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import Calling from '../../../assets/Calling.png';
import styles from '../../../styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CallListItem from '../../../components/CallListItem'
import { horizontalScale, moderateScale, verticalScale } from '../../../styles/mixins'
import {useSelector} from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import CallIcon from '../../../assets/CallIcon.png'
import ZegoUIKitPrebuiltCallService, {ZegoSendCallInvitationButton,} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const ContactList = () => {
  const navigation = useNavigation();   
  const [callData, setCallData] = useState([])
  const state = useSelector(state => state.variables);
  const isFocused = useIsFocused()
  const [_lawyerList, _setLawyerList] = useState([]);

  useEffect(() => {

    getCallHistory()
  },[isFocused])

  const getCallHistory = async() => {

    try{
      
    const history = await firestore()
                    .collection('callHistory')
                    .where(
                      firestore.Filter.or(firestore.Filter('callee_ID', '==', state.uid), firestore.Filter('caller_ID', '==', state.uid))
                    )
                    .get();
   
    const callHistoryResponse = [];
    history.docs.forEach(querysnapshot => {

  console.log(querysnapshot.data())
   callHistoryResponse.push(querysnapshot.data());

  })
  
  setCallData(callHistoryResponse)
  }

    catch(err){
      console.log(err)
    }
  }

  callData.sort(function(a,b){

    return b.call_start_time- a.call_start_time;
  })
  
  
  return (
    <View style={[styles.container,]}>
      <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
          <Image  
            source={require('../../../assets/app-icon.png')}
            style={[styles.logoStyle,{marginTop: verticalScale(30)}]} 
          />
      </View>
      { callData.length==0 ? 
      <View style={{marginTop:moderateScale(102),justifyContent:'center',alignItems:'center'}}>
        <Image source={Calling} style={{}} />
        <Text style={{fontSize:moderateScale(32), color:'black',marginTop:moderateScale(8)}}>No Recent Calls</Text>
      </View> :
      <View>
      <View style={[styles.alignViewCenter, styles.alignItemsLeft]}>
        <Text style={[styles.textBlack, {fontWeight:'500',fontSize:moderateScale(30)}]}> Recent calls </Text>
      </View>
     
        <ScrollView style={{paddingHorizontal:moderateScale(20)}}>
        {callData.map((data, index)=>{
             return(
              <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#0f0f0f10',}} key={data._id}>
                <View style={{flexDirection:'row'}}>
                  <CallListItem name={ state.uid == data.caller_ID ? data.callee_name : data.caller_name} duration={data.call_duration} time={data.call_start_time} status={data.call_status} callDirection={state.uid == data.caller_ID ? 'outgoing' : 'incoming'}/>
                </View>
                <ZegoSendCallInvitationButton 
                  invitees = {[state.uid == data.caller_ID ? {userID : data.callee_ID, userName : data.callee_name }: {userID : data.caller_ID, userName : data.caller_name }]} 
                  isVideoCall = {false}
                  resourceID = {'voice_call'}
                  icon = {CallIcon}
                  backgroundColor={'white'}
                />
              </View>
              )
            })}
        </ScrollView>
        </View>  }
    </View>
)
}

export default ContactList