import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import IncomingCall from '../assets/incoming-call.png';
import OutgoingCall from '../assets/outgoing-call.png';
import IncomingCallMissed from '../assets/incoming-call-missed.png';
import { moderateScale, verticalScale } from '../styles/mixins'

import userIcon from '../assets/userIcon.png'
const CallListItem = ({index,name, duration, time, status, callDirection}) => {

    const [call_day, setCallDay] = useState('');
    const [call_time, setCallTime] = useState('');
    const [isNoon, set_isNoon] = useState(false);
  
    const calculateDay = () => {

        let date =time?time.toDate().toDateString():null;
        let ts =new Date(date).getTime()
        let currentDay = new Date().getTime()
        var millisecondsInDay = 1000 * 60 * 60 * 24;
        if(( currentDay-ts)/millisecondsInDay <=1 )
        {

            setCallDay('Today');
        }
        else if(( currentDay-ts)/millisecondsInDay >1 && ( currentDay-ts)/millisecondsInDay <=2 ){
            
            setCallDay('Yesterday');
        }else{

            setCallDay(date);
        }
     }


     const calculateTime = () => {

        let hours =time? time.toDate().getHours() : null;
        if(hours > 12){
            hours =hours-12;
            set_isNoon(true);
        }
        console.log('time of call : ',hours);
        if(hours<10){
            hours = '0'+hours
        }
        console.log('time of call : ',hours);

        let minutes =time? time.toDate().getMinutes() : null;
        if(minutes <10){
            minutes = '0'+minutes;
        }
        let calltime = hours.toString()+':'+minutes.toString();
        setCallTime(calltime);
     }
     useEffect(()=>{
        calculateDay()
        calculateTime()
     },[])

  return (
    <View style={[ {marginVertical: verticalScale(10),justifyContent:'space-between',flexDirection:'row',alignItems:'center'}]}>
      <View style={[styles.alignViaRow, styles.alignViewCenter, styles.alignItemsCenter]}>
        
        <Image
            source={userIcon}
            style={styles.callImage}
        />
        <View>
            <View>
               { callDirection=='outgoing'?<Text style={ {color:'black',fontSize:moderateScale(18)}}>{name}</Text> :
               <Text style={status=='missed' ? {color:'#FF3B30',fontSize:moderateScale(18)} : {color:'black',fontSize:moderateScale(18)}}>{name}</Text> 
               }
            </View>
            <View style={{flexDirection:'row'}}>
                <View>
                    {callDirection=='outgoing' ? (<Image source={OutgoingCall}  style={styles.miniCallIcon}/>): 
                        (status=='missed' ? <Image source={IncomingCallMissed}  style={styles.miniCallIcon}/> : <Image source={IncomingCall}  style={styles.miniCallIcon}/>)
                        }
                </View>
                <View>
                    <Text>{call_day}, {call_time} {isNoon ? 'pm' : 'am'}</Text>
                </View>
            </View>
            
        </View>
        
      </View>
    </View>
  )
}

export default CallListItem