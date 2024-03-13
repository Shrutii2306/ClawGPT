import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native'
import add from '../assets/add.png';
import chatBubble from '../assets/chatBubble.png';
import Ripple from 'react-native-material-ripple';
import MenuProfileIcon from '../assets/MenuProfileIcon.png'
import MenuArrow from '../assets/MenuArrow.png'
import Delete from '../assets/delete.png';
import GavelIconDark from '../assets/GavelIcon.png';
import MoneyIconDark from '../assets/MoneyIcon.png';
import LinearGradient from 'react-native-linear-gradient'
import {useSelector, useDispatch} from 'react-redux';
import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { Image,View,Text,Dimensions,  Pressable, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { moderateScale } from '../styles/mixins';
import { changeVariable} from '../actions';
  function CustomDrawer(props) {

    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const fname = useSelector(state => state.variables.firstName);
    const lname = useSelector(state => state.variables.lastName)
    const GPTHistory_ID = useSelector(state => state.variables.GPTHistory_ID);
    console.log(GPTHistory_ID)
   

    const createNewChat = () => {
     dispatch(changeVariable('active_chatID',0));
     navigation.dispatch(DrawerActions.closeDrawer());
    }

    const setActiveChat = (item) => {

      dispatch(changeVariable('active_chatID',item))
      navigation.dispatch(DrawerActions.closeDrawer());

    }
    return (
      <DrawerContentScrollView {...props} 
        style={{backgroundColor:'#1B202C'}}
      >
        <View style={{flex:1,height:windowHeight,flexDirection:'column',justifyContent:'space-between',paddingTop:moderateScale(20)}}>
        <View>
        {GPTHistory_ID.map(item => {
        return(
          < Pressable 
            style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(12),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16)}}
            onPress={setActiveChat}
            disabled
          >
            <Image source={chatBubble}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Active chat</Text>
        </ Pressable>
        )

        })}
        {/* < Pressable style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(12),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16)}}>
            <Image source={chatBubble}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>A good lawyer</Text>
        </ Pressable> */}

       
          <LinearGradient
            colors={['#8940FF', '#5920B5']}
            style={{flexDirection:'row', backgroundColor:'#8940FF60',marginHorizontal:moderateScale(16),borderRadius:10,marginTop:moderateScale(16),overflow:'hidden'}}
            
          >  
            {/* < Pressable 
              style={{flex:1,flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(12),paddingRight:moderateScale(50)}}
              onPress={(item) => createNewChat(item)}
              // android_ripple={{color: '#13161F', borderless: false,foreground:false}}
            > */}
              <Ripple 
                style={{flex:1,flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(12),paddingRight:moderateScale(50)}}
                onPress={(item) => createNewChat(item)} 
                rippleColor='white'
                rippleDuration={1000}
                rippleSize={1000}
              >
              <Image source={add} style={{height:moderateScale(25),width:moderateScale(25)}}/>
              <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Start a new chat</Text>
              </Ripple>
            {/* </ Pressable> */}
          </LinearGradient>
      
        <View style={{height:1,width:'100%',backgroundColor:'#00000020',marginVertical:moderateScale(15)}}></View>
        <View style={{paddingHorizontal:moderateScale(20)}}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:moderateScale(23)}}>News</Text>
        </View>
        < Ripple 
          style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(0),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16),borderRadius:10,marginTop:moderateScale(16)}}
          onPress={() => navigation.navigate('NewsScreen',{newsType : 0})}
          rippleColor='#8940ff'
        >
          <View style={{width:2,height:'100%',backgroundColor:'#8940FF', marginRight:moderateScale(10)}}></View>
            <Image source={MoneyIconDark} style={{width:28,height:26}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Financial News</Text>
        </ Ripple>

        < Ripple 
          style={{flexDirection:'row',paddingVertical:moderateScale(12),paddingLeft:moderateScale(0),paddingRight:moderateScale(50),marginHorizontal:moderateScale(16),borderRadius:10,}}
          onPress={() => navigation.navigate('NewsScreen',{newsType : 1})}
          rippleColor='#8940ff'
        >
          <View style={{width:2,height:'100%',backgroundColor:'#8940FF', marginRight:moderateScale(10)}}></View>
            <Image source={GavelIconDark} style={{width:25,height:26}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Legal News</Text>
        </ Ripple>
        </View>

        <View>
        < Ripple 
          style={{flexDirection:'row', borderTopWidth:1,paddingLeft:moderateScale(12),marginHorizontal:moderateScale(16),borderRadius:10, borderColor:'#ffffff20', paddingVertical:moderateScale(17),}}
          rippleColor='red'
          rippleOpacity={0.10}
        >
            <Image source={Delete} style={{width:25,height:26}} />
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Clear all Conversations</Text>
        </Ripple>

        <LinearGradient
        colors={['#8940FF', '#5920B5']}  
        >
          <Ripple 
            onPress={() => navigation.navigate('GPTProfileScreen')} 
            style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:moderateScale(22),paddingLeft:moderateScale(12),paddingRight:moderateScale(10) }} 
            rippleColor='white'
          >
          <View style={{flexDirection:'row'}}>
            <Image source={MenuProfileIcon} style={{width:25,height:25}}/>
            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>User</Text>
          </View>
           
            <Image source={MenuArrow} style={{marginTop:moderateScale(4)}} />
            </Ripple>
        </LinearGradient>
        </View>
        </View>
        
      </DrawerContentScrollView>
    );
  }

  export default CustomDrawer;

  const styles = StyleSheet.create({

    labelStyle :{
      fontWeight:'500',
      color:'white',
      fontSize:15
  },
  drawerItemStyle:{
      borderBottomWidth:1,
      marginHorizontal:25,
      borderColor:'#00000045',
      flexDirection:'row',
      paddingVertical:moderateScale(13),
      alignItems:'center',
      justifyContent:'space-between'
     
  },

  drawerIcon:{
    height:moderateScale(30),
    width:moderateScale(30),
    marginTop:moderateScale(5)
  },

  rightMenuIcon :{
    height:moderateScale(18),
  }



  })