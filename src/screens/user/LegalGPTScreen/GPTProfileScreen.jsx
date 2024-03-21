import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import userIcon from '../../../assets/userIcon.png';
import { useSelector} from 'react-redux';
import { moderateScale } from '../../../styles/mixins';
import BackIcon from '../../../assets/back-button.png'
import {useNavigation} from '@react-navigation/native'
import logoutIcon from '../../../assets/logout.png';
import { fetchData,removeData } from '../../../actions/async-storage';
import auth from '@react-native-firebase/auth';
import styles from '../../../styles';
import ProfileCallIcon from '../../../assets/Call.png';
import contactUs from '../../../assets/contactUs.png';
import chevron from '../../../assets/chevron.png';
import chevronUp from '../../../assets/chevronUp.png';
import Call from '../../../assets/ProfileCallIcon.png';
import Email from '../../../assets/Email.png';
import { changeVariable } from '../../../actions';

const GPTProfileScreen = () => {


    const user = useSelector(state => state.variables);
    //console.log(user)
    const navigation = useNavigation();
    const [isContactVisible, setVisible] = useState('none');
    const [randomColor,setRandomColor] = useState('') ;
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
       setRandomColor(color)
       console.log(randomColor)
      };
    
     

    const setContactVisibility =() => {

        if(isContactVisible=='none')
       { setVisible('flex')}
        else
        { setVisible('none')}
       console.log(isContactVisible)
    }
    const logout = () => {
    
        console.log(fetchData('userId'));
        removeData('userId');
        auth().signOut();
        navigation.replace('InitialLandingScreen');
        console.log('logged out');
        console.log(fetchData('userId'));
      }

      useEffect(() => {
         getRandomColor();
      },[])
        
   
    return (
        <View style={localStyles.container}>
            
            <View style={[styles.alignViaRow,  {flexDirection:'row',alignItems:'center'},]}>
                <TouchableOpacity 
                style={[]}
                onPress={() => navigation.navigate('Legal GPT')}
                >
                    <Image 
                    source={BackIcon}
                    style={styles.backButtonIcon}
                    />
                </TouchableOpacity>  
                <Text style={localStyles.screenTitle}>Profile</Text>        
            </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* USER DETAILS */}
                    <View style={localStyles.profileContainer}>

                    <View style={localStyles.userIconContainer}>
                        
                        {/* user icon */}
                        <View style={{borderRadius:moderateScale(50),overflow:'hidden'}}>
                            <View style={[localStyles.letterContainer,{backgroundColor:randomColor}]}>
                                <Text style={{color:'white',fontSize:moderateScale(40)}}>{user.firstName[0]}</Text>
                            </View>
                        </View>
                       
                        {/* user name */}
                        <View style={{justifyContent:'center',marginTop:moderateScale(10),marginBottom:moderateScale(5)}}>
                            <Text style={{color:'white',fontSize:moderateScale(28)}}>{user.firstName} {user.lastName}</Text>
                            
                        </View>
                        {/* user number */}
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:moderateScale(-20)}}>
                            <Image source={ProfileCallIcon} style={{height:moderateScale(22),width:moderateScale(22),marginRight:8}}/>
                            <Text style={{color:'#A19E9E',fontSize:moderateScale(18)}}>+91 {user.phone_no}</Text>
                        </View>
                        
                        {/* user email */}
                        <View style={localStyles.userDetailContainer}>
                            <Text style={{color:'white',fontSize:moderateScale(14)}}>Email</Text>
                            <View style={localStyles.userDetail}>
                                <Text style={{color:'white'}}>{user.email}</Text>
                            </View>
                        </View>
                        
                        {/*user city */}
                        <View style={localStyles.userDetailContainer}>
                            <Text style={{color:'white',fontSize:moderateScale(14)}}>City</Text>
                            <View style={localStyles.userDetail}>
                                <Text style={{color:'white'}}>{user.city}</Text>
                            </View>
                        </View>

                        {/* user state */}
                        <View style={localStyles.userDetailContainer}>
                            <Text style={{color:'white',fontSize:moderateScale(14)}}>State</Text>
                            <View style={localStyles.userDetail}>
                                <Text style={{color:'white'}}>{user.state}</Text>
                            </View>
                        </View>                        
                    </View>

                    {/* CONTACT  */}
                    <TouchableOpacity  
                        style={localStyles.contactButton}
                        onPress={setContactVisibility}
                    >
                        <View style={{justifyContent:'space-between',flexDirection:'row',width:'100%'}}>                    
                            <View style={{alignItems:'center',flexDirection:'row'}}>
                                <Image source={contactUs} style={{height:moderateScale(23),width:moderateScale(23)}}/>
                                <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Contact us</Text>
                            </View>
                            <Image source={isContactVisible=='none' ?chevron:chevronUp} style={localStyles.chevron}/>
                        </View>
                        <View style={[localStyles.contactInfo,{ display:isContactVisible,}]} >
                            <View style={localStyles.contactRow}>
                                <Image source={Call} style={localStyles.contactIcon}/>
                                <Text style={localStyles.contactText}>+91 9950866260</Text>
                            </View>
                            <View style={localStyles.contactRow}>
                                <Image source={Email} style={localStyles.contactIcon}/>
                                <Text style={localStyles.contactText}>claw.lawyers@gmail.com</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* LOGOUT */}
                    <TouchableOpacity 
                    style={localStyles.logoutButton}
                    onPress={logout}
                    >
                        <Image source={logoutIcon} style={{height:moderateScale(20),width:moderateScale(20)}}/>
                        <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
        </View>
    );
}

const localStyles = StyleSheet.create({
    
    container : {
        paddingTop:moderateScale(20),
        paddingHorizontal:moderateScale(15),
        backgroundColor:'#1B202C',
        flex:1
    },
    screenTitle: {
        color:'white',
        fontSize:moderateScale(27),
        marginLeft:moderateScale(15),
        fontWeight:'500'
    },
    profileContainer: {
        flexDirection:'column',
        marginTop:moderateScale(25),
        marginHorizontal:moderateScale(20),
        marginVertical:moderateScale(25)
    },

    contactButton : {
        borderRadius:10,
        marginTop:moderateScale(19),
        alignItems:'center',
        borderColor:'#8940ff',
        borderWidth:1,
        paddingHorizontal:moderateScale(20),
        paddingVertical:moderateScale(16)
    },
    logoutButton: {
        flexDirection:'row', 
        backgroundColor:'#8940FF60',
        paddingVertical:moderateScale(16),
        paddingLeft:moderateScale(20),
        paddingRight:moderateScale(50),
        borderRadius:10,
        marginTop:moderateScale(30),
        alignItems:'center'
    },

    userIconContainer:{ 
        flexDirection:'column',
        marginBottom:moderateScale(20),
        justifyContent:'center',
        alignItems:'center'
    },

    letterContainer :{
        height:moderateScale(100),
        width:moderateScale(100),
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
       backgroundColor:'grey'
    },
    
    contactInfo : {
        marginTop:moderateScale(10),
        height:moderateScale(100),
        width:'100%',
       
        paddingHorizontal:moderateScale(10)
    },
    
    contactRow :{
        alignItems:'center',
        flexDirection:'row',
        marginVertical:moderateScale(10)
    },

    contactText :{
        marginLeft:moderateScale(12), 
        color:'grey',
        fontSize:14
    },

    contactIcon : {
        height:moderateScale(23),
        width:moderateScale(23)
    },

    chevron : {
        height:moderateScale(15),
        width:moderateScale(15),
        alignSelf:'flex-end'
    },

    userDetail:{
        borderRadius:10,
        marginTop:moderateScale(3),
        
        borderColor:'#C4C4C4',
        borderWidth:1,
        paddingHorizontal:moderateScale(20),
        paddingVertical:moderateScale(16),
        width:'100%'

    },

    userDetailContainer : {
        width:'100%',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:moderateScale(19)
    }

})

export default GPTProfileScreen;
