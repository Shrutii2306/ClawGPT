import { View, Text, ScrollView, TouchableOpacity,Image,  TextInput, ImageBackground,Pressable, StyleSheet, StatusBar } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import styles from '../../../styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {connect, useSelector, useDispatch} from 'react-redux';
import {moderateScale, verticalScale } from '../../../styles/mixins';
import FastImage from 'react-native-fast-image';
import AppIcon from '../../../assets/GPTBackground.png';
import SidebarIcon from '../../../assets/SidebarIcon.png';
import GPTSendIcon from '../../../assets/GPTSendIcon.png';
import { getUserProfile } from '../../../actions/userProfile';
import Robot from '../../../assets/Robot.png';
import { lawFacts } from '../../../data/lawFactList';
import LinearGradient from 'react-native-linear-gradient'
import { DotIndicator, MaterialIndicator} from 'react-native-indicators';
import Clipboard from '@react-native-clipboard/clipboard';
import Typewriter from "../../../components/TypeWriter";
import { createNewSession, RetreiveMessages,setSessionLoader } from '../../../actions/legalGPT';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { changeVariable, NEW_MESSAGE_URL } from '../../../actions';
//---------------------------for LEGAL GPT APP----------------------------------------


const LegalGPTScreen = (props) => {
  
  const navigation = useNavigation();
  const [lawFactList, setLawFactList] = useState(lawFacts);
  const [query, setQuery] = useState('');
  const [isWaiting, setWaiting] = useState(false);
  const active_chatID = useSelector( state => state.variables.active_chatID);
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const userDetailLoader = useSelector( state => state.variables.userDetailLoader);
  const phone_no = useSelector( state => state.variables.phone_no);
  const GPTChatHistory = useSelector( state => state.variables.active_chatHistory);
  const botLoader = useSelector( state => state.variables.botLoader);
  const copyToClipboard = (content) => {
    Clipboard.setString(content);
  };
console.log(userDetailLoader);
  const sendMessageRequest = async() => {

    dispatch(changeVariable('botLoader',true));
   
    if(active_chatID=='newSession'){
        props.createNewSession(query);
        // setTimeout(()=>{
        //   setWaiting(false);
          setQuery('');
         // props.RetreiveMessages(active_chatID);
        // },20000);
        
        return;
    }
    const jwtToken = await AsyncStorage.getItem('userId');
    const userProfileToken = "Bearer "+jwtToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", userProfileToken);
    myHeaders.append("Content-Type", "application/json");
    var raw =  JSON.stringify({
        "prompt": query,
        "sessionId": active_chatID
      });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body : raw
    };

    try{
        
        const response = await fetch(NEW_MESSAGE_URL,requestOptions)
        setQuery('')
        const responseJSON = await response.json();
        console.log(responseJSON)
        props.RetreiveMessages(active_chatID)
        // setWaiting(false)
        dispatch(changeVariable('botLoader',false));
    }catch(err){
        setQuery('')
        console.log('appendNewMessageHelper error',err);
        setWaiting(false);
    }
  }

  
  useEffect(() => {

    if(phone_no != '')
    props.getUserProfile()
  },[phone_no])

  useEffect(() => {
      props.RetreiveMessages(active_chatID);
  },[active_chatID,isFocused]);

  return (
    <View style={[{backgroundColor:'#1B202C',flex:1}]}>
      <StatusBar backgroundColor='#1B202C' />

      {userDetailLoader ? <View style={{flex:1,position:'absolute',zIndex:3,height:'100%',width:'100%',backgroundColor:'#00000040',alignItems:'center',justifyContent:'center'}}>
        <View style={{height:moderateScale(50),marginBottom:moderateScale(10)}}>
          <MaterialIndicator color='white'/>
        </View>
        <Text style={{color:'white',fontSize:18}}>Please wait...</Text>
      </View> : null}

      <ImageBackground source={AppIcon} resizeMode="cover" style={{
        flex: 1, justifyContent: 'center',paddingHorizontal:15,paddingTop:20,paddingBottom:moderateScale(10) }}>
    
    <View style={[styles.alignViaRow, styles.alignItemsCenter,styles.alignViewCenter, {width: '100%',justifyContent:'space-between',},]}>
      <View></View>

            <TouchableOpacity 
              style={[styles.alignItemsLeft, styles.alignViewCenter,]}
              onPress={() => navigation.openDrawer()}
            >
                <Image 
                source={SidebarIcon}
                style={{height:moderateScale(25),width:moderateScale(54)}}
                />
            </TouchableOpacity>            
        </View>
        <View style={{alignItems:'center',marginTop:moderateScale(30)}}>
          <Text style={{fontSize:25,color:'white',fontWeight:'400'}} >
            Legal GPT
          </Text>
          <Text style={{fontSize:12,color:'#A19E9E'}}>
          Legal GPT- From Legal Queries to Case Insights,</Text><Text style={{fontSize:12,color:'#A19E9E'}}> Navigate Legal Matters Effortlessly.
          </Text>
        </View>
        <ScrollView 
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}          
          showsVerticalScrollIndicator={false}
          style={{}}
          >
            <View style={{marginBottom:10,}}>
           
         {/* // {sessionLoader? <View><MaterialIndicator color='white'/></View>: <View></View>} */}

            {GPTChatHistory.length>0 ?
              GPTChatHistory.map(item => {
                return (
                  item.isUser ? 
                  
                    <Pressable onLongPress={() => copyToClipboard(item.text)} key={item.id} style={{alignSelf:'flex-end',marginVertical:moderateScale(5)}}>
                      <Text style={{maxWidth:'80%',borderRightWidth:1,borderBottomWidth:1,borderColor:'#00000030',backgroundColor:!isWaiting?'white':'grey',color:'black',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(8),borderRadius:10}}>{item.text}</Text>
                    </Pressable> 
                    
                  
                  : 
                  
                  <View key={item.id} style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5)}}>
                    
                    <View style={{backgroundColor:isWaiting?'#5920B5':'#8940FF',height:moderateScale(50),width:moderateScale(50),alignItems:'center',justifyContent:'center',borderRadius:25,marginRight:6,marginTop:9}} >
                      <Image source={Robot}/>
                    </View>
                      <LinearGradient
                      colors={!isWaiting? ['#8940FF', '#5920B5']:['#13161F90','#13161F90']}
                      style={{width:'80%',backgroundColor:'#8940FF',color:'white',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(8),borderRadius:10}}
                      
                    > 
                    <Pressable onLongPress={() => copyToClipboard(item.text)}>
                    <Text style={{color:!isWaiting?'white':'grey'}} selectable={true}>
                      {item.text}
                    </Text>
                    </Pressable>
                    </LinearGradient>
                  </View>
                  
                  )
                
              })
            :
            <View style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5),marginTop:moderateScale(20)}}>
                
            <View style={{backgroundColor:isWaiting?'#5920B5':'#8940FF',height:moderateScale(50),width:moderateScale(50),alignItems:'center',justifyContent:'center',borderRadius:25,marginRight:6,marginTop:9}} >
              <Image source={Robot}/>
            </View>
            <LinearGradient
              colors={!isWaiting? ['#8940FF', '#5920B5']:['#13161F90','#13161F90']}
              style={{width:'80%',backgroundColor:'#8940FF',color:'white',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(8),borderRadius:10}}
              
            > 
            <Text style={{color:isWaiting?'grey':'white'}}>
            Hello! I am your law assistant. How can I assist you today?
            </Text>
            </LinearGradient>
            </View> 
            }
              
        
           
            {botLoader ?  <View style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5),width:'30%'}}>
                            <View style={{backgroundColor:isWaiting?'#8940ff80':'#8940ff',height:moderateScale(50),width:moderateScale(50),alignItems:'center',justifyContent:'center',borderRadius:25,marginRight:6,marginTop:9}} >
                              <Image source={Robot}/>
                            </View>
                            <DotIndicator color={isWaiting?'#8940ff80':'#8940ff'} size={7} count={3}/>
                          </View> : null}
            </View>

        </ScrollView>

        <View>
          {botLoader ? 
            <View style={{zIndex:2,flexDirection:'row'}}>
              <FastImage source={require('../../../assets/botAnimation.gif')} style={{height:80,width:80,bottom:moderateScale(-15),position:'absolute',left:moderateScale(-15)}}/> 
              <View style={{flexDirection:'row',alignItems:'flex-end',bottom:moderateScale(40),marginLeft:moderateScale(40)}}>
                 <View style={{backgroundColor:'#8940ff95',height:6,width:6,borderRadius:10,marginLeft:moderateScale(9),bottom:moderateScale(10)}}></View>
                  <View style={{backgroundColor:'#8940ff95',height:10,width:10,borderRadius:10,
                  marginLeft:moderateScale(-1),margin:moderateScale(2),bottom:moderateScale(15)}}></View>
                  <View style={{borderWidth:1,borderColor:'#8940ff95',marginRight:moderateScale(50),paddingHorizontal:moderateScale(20),paddingVertical:moderateScale(10),borderRadius:moderateScale(20),backgroundColor:'white'}}>

                  <Text style={{color:'black',fontSize:moderateScale(18)}}>
                  <Typewriter text={Math.floor(Math.random() * 10)} delay={1} /></Text>
                </View>
              </View>
              </View>:null}
          
          <View style={{borderWidth:1,borderColor:'#8940FF60',borderRadius:10,width:'100%',flexDirection:'row',height:moderateScale(52),zIndex:1}}>
            <TextInput 
              placeholder='Message GPT...' 
              style={{width:'85%',color:'white'}} 
              value={query}
              onChangeText={(query) => setQuery(query)}
              placeholderTextColor='white'
            />
            <TouchableOpacity 
              style={{backgroundColor:'#8940FF',width:'11%',justifyContent:'center',alignItems:'center',borderRadius:10,margin:moderateScale(5)}}
              onPress={sendMessageRequest}
              disabled = { query.length>0 && botLoader==false ? false : true}
            >
              {isWaiting? <MaterialIndicator size={18} color='white' />:<Image source={GPTSendIcon} style={{width:moderateScale(15),height:moderateScale(20)}}/>}
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>
       </View>
  )
}

const localStyles = StyleSheet.create({

})

export default connect(null,{
  getUserProfile,
  createNewSession,
  RetreiveMessages,
  setSessionLoader
})(LegalGPTScreen)