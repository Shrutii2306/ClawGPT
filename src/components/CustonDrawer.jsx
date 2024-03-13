import React from 'react';
import { useNavigation } from '@react-navigation/native'
import Robot from '../assets/Robot.png';
import MenuArrowWhite from '../assets/MenuArrowWhite.png';
import MenuNewsIcon from '../assets/news-icon-unselected.png';
import MenuCallIcon from '../assets/CallUnselected.png';
import MenuProfileIcon from '../assets/profile-icon-unselected.png';
import MenuLogoutIcon from '../assets/MenuLogoutIcon-white.png';
import LinearGradient from 'react-native-linear-gradient'
import DrawerItem from './DrawerItem';
import userIcon from '../assets/userIcon.png'
import {useSelector} from 'react-redux';
import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { Image,View,Text,Dimensions, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { fetchData, removeData } from '../actions/async-storage';
import auth from '@react-native-firebase/auth';
import { moderateScale } from '../styles/mixins';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
  function CustomDrawer(props) {

    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();
    const fname = useSelector(state => state.variables.firstName);
    const lname = useSelector(state => state.variables.lastName)

    const onUserLogout = async () => {
      return ZegoUIKitPrebuiltCallService.uninit()
    }

    const logout = () => {
    
      console.log(fetchData('userId'));
      onUserLogout();
      removeData('userId');
      auth().signOut();
      navigation.navigate('InitialLandingScreen');
      console.log('logged out');
      console.log(fetchData('userId'));
    }

    return (
      <DrawerContentScrollView {...props} 
        style={{}}
      >
         <LinearGradient
        colors={['#8940FF', '#3C0D89']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1,height:windowHeight,marginTop:moderateScale(-5)}}
      > 
        <View style={{marginTop:-4,paddingVertical:20,paddingHorizontal:30}}>
            <Image source={userIcon} style={{height:moderateScale(70),width:moderateScale(70),zIndex:1,position:'absolute',marginTop:moderateScale(50),marginLeft:moderateScale(30)}}/>
            {/* <Image source={{uri : imageUrl}} style={{height:moderateScale(70),width:moderateScale(70),zIndex:2,position:'absolute',marginTop:moderateScale(50),marginLeft:moderateScale(30)}}/> */}
            <Text style={{color:'white', fontWeight:'bold',fontSize:19,marginTop:moderateScale(100)}}>{fname == '' || fname==undefined ? 'user' :`${fname} ${lname}`}</Text>
        </View>
        
        <DrawerItem title='Legal GPT' icon={Robot} screen='Legal GPT'/>

        <DrawerItem title='News' icon={MenuNewsIcon} screen='News'/>

        <DrawerItem title='Calls' icon={MenuCallIcon} screen='ContactList'/>

        <DrawerItem title='Account' icon={MenuProfileIcon} screen='EditProfile'/>

        <TouchableOpacity 
        style={styles.drawerItemStyle}
        onPress={logout}
        >
          <Image source={MenuLogoutIcon} style={styles.drawerIcon}/>
          <Text style={styles.labelStyle}>Log out</Text>
          <Image source={MenuArrowWhite} style={styles.rightMenuIcon}/>
        </TouchableOpacity>
        </LinearGradient>
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