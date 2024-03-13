import { View, Text, ScrollView, TouchableOpacity,Image, FlatList, TextInput, ImageBackground,Pressable } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import styles from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import {connect, useSelector, useDispatch} from 'react-redux';
import {moderateScale, verticalScale } from '../../../styles/mixins';
import FastImage from 'react-native-fast-image';
import AppIcon from '../../../assets/GPTBackground.png';
import SidebarIcon from '../../../assets/SidebarIcon.png';
import GPTSendIcon from '../../../assets/GPTSendIcon.png';
import { getUserProfile } from '../../../actions/userProfile';
import Robot from '../../../assets/Robot.png';
import ClipboardIcon from '../../../assets/Clipboard.png';
import { lawFactList } from '../../../data/lawFactList';
import { changeVariable } from '../../../actions/variables';
import LinearGradient from 'react-native-linear-gradient'
import { DotIndicator, MaterialIndicator} from 'react-native-indicators';
import Clipboard from '@react-native-clipboard/clipboard';
import Typewriter from "../../../components/TypeWriter";

// const LegalGPTScreen = ({isUser}) => {
//     const [apiData,setApiData] = useState([]);
//     const navigation = useNavigation();

//   return (
//     <View style={[styles.alignItemsCenter, styles.alignViewCenter,{paddingHorizontal:20,paddingTop:20,backgroundColor:'white',flex:1}]}>
//      <View style={[styles.alignViaRow, styles.alignItemsCenter,styles.alignViewCenter, {width: '100%'},]}>
//             <TouchableOpacity 
//               style={[styles.alignItemsLeft, styles.alignViewCenter, {width: '100%'}]}
//               onPress={() => navigation.navigate('OnboardingSnippet')}
//             >
//                 <Image 
//                 source={BackIcon}
//                 style={{height:moderateScale(50),width:moderateScale(50)}}
//                 />
//             </TouchableOpacity>            
//         </View>
//         <View style={{alignItems:'center'}}>
//           <Text style={{fontSize:25,color:'black',fontWeight:'400'}} >
//             Legal GPT
//           </Text>
//           <Text style={{fontSize:12}}>
//           Legal GPT- From Legal Queries to Case Insights,</Text><Text style={{fontSize:12}}> Navigate Legal Matters Effortlessly.
//           </Text>
//         </View>
//         <FlatList />
//         <View style={{borderWidth:1,borderColor:'#8940FF60',borderRadius:10,width:'100%',flexDirection:'row',height:moderateScale(52)}}>
//           <TextInput placeholder='Message GPT...' style={{width:'85%'}} />
//           <TouchableOpacity style={{backgroundColor:'#8940FF',width:'12%',justifyContent:'center',alignItems:'center',borderRadius:10,margin:moderateScale(5)}}>
//             <Image source={GPTSendIcon} style={{width:moderateScale(15),height:moderateScale(20)}}/>
//           </TouchableOpacity>
//         </View>
//       </View>
//   )
// }

//---------------------------for LEGAL GPT APP----------------------------------------
const LegalGPTScreen = (props) => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [GPTResponse, setGPTResponse] = useState([]);
  const [isWaiting, setWaiting] = useState(false);
  const GPTHistory_ID = useSelector( state => state.variables.GPTHistory_ID);
  const [active_chatID, setActiveChatID] = useState(useSelector( state => state.variables.active_chatID));
  const [session_id, set_session_id] = useState();
  const scrollViewRef = useRef();
  const userID = useSelector( state => state.variables.phone_no);
  //const session_id = 26658;
  //const user_id = 123456;
  const [GPTChatHistory, setGPTHistory] = useState([]);
  console.log(userID, session_id, GPTHistory_ID )

  const copyToClipboard = (content) => {
    console.log(content)
    Clipboard.setString(content);
  };

  const getGPTResponse = async() => {

    setWaiting(true);
    const userQuery = {
      message : query,
      sender : 'user',
      
    }

    const newChat_user = [...GPTChatHistory,{
      message : query,
      sender : 'user',
      
    }];
    setGPTHistory(GPTChatHistory => [...GPTChatHistory,{
      message : query,
      sender : 'user',
      
    }]);
    console.log('GPTChatHistoryGPTChatHistory',GPTChatHistory)
    var formdata = new FormData();
    formdata.append('user_input',query);
    // if(active_chatID!=0)
    // {
    //   formdata.append('session_id', active_chatID);
    //   set_session_id(active_chatID);
    // }
    
    formdata.append('session_id', null);
    formdata.append('user_id',userID);
    console.log(formdata)
    var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect : 'follow'
          };
   
    try{
      const res = await fetch('https://gpt.clawlaw.in/api/v1/gpt/chat', requestOptions);
        const response = await res.json();
        console.log('res',response);
        setQuery('');
        if(response.gptResponse){

          // responseString = response.gptResponse;
          // console.log(responseString);
          set_session_id(response.session_id);
          const newSessionArray = [...GPTHistory_ID, response.session_id];
          console.log('newSessionArray',newSessionArray)
          dispatch(changeVariable('GPTHistory_ID',newSessionArray))
           const newResponse = [...GPTResponse,response.gptResponse ];
          setGPTResponse(newResponse)
          
          const newChat_gpt = [...GPTChatHistory,response.gptResponse];
          
          //setGPTHistory(GPTChatHistory => [...GPTChatHistory,response.gptResponse]);
          
        }
        }catch(err){
          console.log('err',err);
        }
        //console.log('GPTResponse',GPTResponse)
        //console.log('gptchathistory',GPTChatHistory);
        setWaiting(false);
       
  }

  //console.log('GPTResponse',GPTResponse)

  const getChatHistory = async() => {

    console.log('session_id',session_id)
    const url = 'https://gpt.clawlaw.in/api/v1/gpt/session_history/'+userID+'/'+session_id;
    console.log(url);


    try{
      const res = await fetch(url);
        const response = await res.json();
        console.log('res',response);
        setGPTHistory(response.conversation_history)
       
        }catch(err){
          console.log('err',err);
        }

  }

  useEffect(() => {
    props.getUserProfile()
   
  },[])

  useEffect(() => {
   // if(userID != '')
    getChatHistory()
  },[userID,GPTResponse]);

  return (
    <View style={[{backgroundColor:'#1B202C',flex:1}]}>
      <ImageBackground source={AppIcon} resizeMode="cover" style={{
        flex: 1,
        justifyContent: 'center',paddingHorizontal:15,paddingTop:20,paddingBottom:moderateScale(10)
      }}>
        
    <View style={[styles.alignViaRow, styles.alignItemsCenter,styles.alignViewCenter, {width: '100%',justifyContent:'space-between',},]}>
      <View></View>
            {/* <TouchableOpacity 
              style={[styles.alignItemsLeft, styles.alignViewCenter,]}
              onPress={() => navigation.navigate('OnboardingSnippet')}
            >
                <Image 
                source={BackIcon}
                style={{height:moderateScale(50),width:moderateScale(50)}}
                />
            </TouchableOpacity>   */}

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
          
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}          
          showsVerticalScrollIndicator={false}
          style={{}}
          >
            <View style={{marginBottom:10,}}>
           
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
            {GPTChatHistory.map(item => {
            return (
              item.sender!='Chatbot' ? 
              
                <View style={{alignSelf:'flex-end',marginVertical:moderateScale(5)}}>
                  <Text style={{width:'80%',borderRightWidth:1,borderBottomWidth:1,borderColor:'#00000030',backgroundColor:!isWaiting?'white':'grey',color:'black',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(8),borderRadius:10}}>{item.message}</Text>
                </View> 
                
              
              : 
              
              <View style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5)}}>
                
                <View style={{backgroundColor:isWaiting?'#5920B5':'#8940FF',height:moderateScale(50),width:moderateScale(50),alignItems:'center',justifyContent:'center',borderRadius:25,marginRight:6,marginTop:9}} >
                  <Image source={Robot}/>
                </View>
                  <LinearGradient
                  colors={!isWaiting? ['#8940FF', '#5920B5']:['#13161F90','#13161F90']}
                  style={{width:'80%',backgroundColor:'#8940FF',color:'white',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(8),borderRadius:10}}
                  
                > 
                <Pressable onLongPress={() => copyToClipboard(item.message)}>
                <Text style={{color:!isWaiting?'white':'grey'}} selectable={true}>
                  {item.message}
                </Text>
                {/* <View style={{marginVertical:moderateScale(5)}}>
                  
                    <Image source={ClipboardIcon} style={{height:18,width:18,alignSelf:'flex-end'}}/>
                  
                </View> */}
                </Pressable>
                </LinearGradient>
              </View>
              
              )
            
          })}
            {isWaiting ?  <View style={{alignSelf:'flex-start',flexDirection:'row',marginVertical:moderateScale(5),width:'30%'}}>
                            <View style={{backgroundColor:isWaiting?'#8940ff80':'#8940ff',height:moderateScale(50),width:moderateScale(50),alignItems:'center',justifyContent:'center',borderRadius:25,marginRight:6,marginTop:9}} >
                              <Image source={Robot}/>
                            </View>
                            <DotIndicator color={isWaiting?'#8940ff80':'#8940ff'} size={7} count={3}/>
                          </View> : null}
            </View>

        </ScrollView>

        <View>
          {isWaiting ? 
            <View style={{zIndex:2,flexDirection:'row'}}>
              <FastImage source={require('../../../assets/botAnimation.gif')} style={{height:80,width:80,bottom:moderateScale(-15),position:'absolute',left:moderateScale(-15)}}/> 
              <View style={{flexDirection:'row',alignItems:'flex-end',bottom:moderateScale(40),marginLeft:moderateScale(40)}}>
                 <View style={{backgroundColor:'#8940ff95',height:6,width:6,borderRadius:10,marginLeft:moderateScale(9),bottom:moderateScale(10)}}></View>
                  <View style={{backgroundColor:'#8940ff95',height:10,width:10,borderRadius:10,
                  marginLeft:moderateScale(-1),margin:moderateScale(2),bottom:moderateScale(15)}}></View>
                  <View style={{borderWidth:1,borderColor:'#8940ff95',marginRight:moderateScale(50),paddingHorizontal:moderateScale(20),paddingVertical:moderateScale(10),borderRadius:moderateScale(20),backgroundColor:'white'}}>

                  <Text style={{color:'black',fontSize:moderateScale(18)}}>
                  <Typewriter text={'While we gather your information,'+lawFactList[Math.floor(Math.random() * 10)]} delay={0} infinite /></Text>
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
              onPress={getGPTResponse}
              disabled = { query.length>0 ? false : true}
            >
              {isWaiting? <MaterialIndicator size={18} color='white' />:<Image source={GPTSendIcon} style={{width:moderateScale(15),height:moderateScale(20)}}/>}
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>
       </View>
  )
}

export default connect(null,{
  getUserProfile
})(LegalGPTScreen)