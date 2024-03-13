import { View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import {useSelector } from 'react-redux'
import Search from '../../../assets/search-icon.png'
import styles from '../../../styles'
import { moderateScale } from '../../../styles/mixins'
import userIcon from '../../../assets/userIcon.png';
import {useNavigation, useIsFocused} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

const MessageScreen = () => {
  const navigation = useNavigation();
  const [chatMembers, setChatMembers] = useState([]);
  const isFocused = useIsFocused()
  const uid = useSelector(state => state.variables.uid);
  console.log('message screen :',uid)
  const getFirebaseChats = async() => {
   
 
  const chats = await firestore().collection("chats")
  .orderBy("latestTimeStamp", "desc").get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);
    const members = []
    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      if(documentSnapshot.data().senderID == uid)
      {
        members.push(documentSnapshot.data());
      }
    });
    console.log('memberssss',members)
    setChatMembers(members);
  });

  }

  
  useEffect(() => {

    //getUsers();
    getFirebaseChats();

    //return subscriber;
  },[isFocused]);
  
return (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={[styles.container,{paddingHorizontal:moderateScale(20),alignItems:'center',paddingTop:moderateScale(20)}]}>
      <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
        <Text style={[styles.textBlack, styles.font_700,{fontSize:moderateScale(40)}]}>Chats</Text>
      </View>

      <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter, styles.searchBar,{marginTop:moderateScale(15)}]}>
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
            />
                
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:moderateScale(15),width:'100%',paddingHorizontal:10}}>
          {chatMembers.map((item) => {

            return(
              <TouchableOpacity 
                key={item._id}
                style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:10}} 
                onPress={()=> navigation.navigate('ChatWindow',{
                    receiverName: item.receiverName,
                    // lastName : item.lastName,
                    photo_url : userIcon,
                    uid : item.receiverID
                })}
              >
                <Image source={userIcon} style={{height:moderateScale(80),width:moderateScale(80)}}/>
                
                <View style={{justifyContent:'center',marginLeft:moderateScale(22)}}>
                  <Text style={{fontSize:moderateScale(23),color:'black'}}>{item.receiverName}</Text>
                  {/* <Text>{item.lastActive}</Text> */}
                  <Text>{item.latestMessage}</Text>
                  <Text>
                    {item.latestTimeStamp.toDate().getDate()}
                  </Text>
                </View>
                
              </TouchableOpacity>
            )
          })}
        </ScrollView>
    </View>
  </TouchableWithoutFeedback>
)
}

export default MessageScreen