import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
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
const GPTProfileScreen = () => {


    const pno = useSelector(state => state.variables.phone_no);
    const navigation = useNavigation();
    const [isContactVisible, setVisible] = useState('none');

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
    return (
        <View style={{paddingTop:moderateScale(20),paddingHorizontal:moderateScale(15),backgroundColor:'#1B202C',flex:1}}>
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
            <Text style={{color:'white',fontSize:moderateScale(27),marginLeft:moderateScale(15),fontWeight:'500'}}>Profile</Text>        
        </View>
            <View style={{flexDirection:'column',marginTop:moderateScale(25),marginHorizontal:moderateScale(20)}}>

                <View style={{flexDirection:'column',marginBottom:moderateScale(20),justifyContent:'center',alignItems:'center'}}>
                    {/* <Image source={userIcon} /> */}
                    <View style={{height:moderateScale(100),width:moderateScale(100),backgroundColor:'#2B7716',borderRadius:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:moderateScale(40)}}>U</Text></View>
                    <View style={{justifyContent:'center',marginTop:moderateScale(10),marginBottom:moderateScale(5)}}>
                        <Text style={{color:'white',fontSize:moderateScale(28)}}>User</Text>
                        
                    </View>
                    
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:moderateScale(-20)}}>
                        <Image source={ProfileCallIcon} style={{height:moderateScale(22),width:moderateScale(22),marginRight:8}}/>
                        <Text style={{color:'#A19E9E',fontSize:moderateScale(18)}}>+91 {pno}</Text>
                    </View>
                   
                </View>
                
                <TouchableOpacity  
                    style={{borderRadius:10,marginTop:moderateScale(30),alignItems:'center',borderColor:'#8940ff',borderWidth:1,paddingHorizontal:moderateScale(20),paddingVertical:moderateScale(16)}}
                    onPress={setContactVisibility}
                >
                    <View style={{justifyContent:'space-between',flexDirection:'row',width:'100%'}}>                    
                        <View style={{alignItems:'center',flexDirection:'row'}}>
                            <Image source={contactUs} style={{height:moderateScale(23),width:moderateScale(23)}}/>
                            <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Contact us</Text>
                        </View>
                        <Image source={isContactVisible=='none' ?chevron:chevronUp} style={{height:moderateScale(15),width:moderateScale(15),alignSelf:'flex-end'}}/>
                    </View>
                    <View style={{marginTop:moderateScale(10),height:moderateScale(100),width:'100%',display:isContactVisible,paddingHorizontal:moderateScale(10)}} >
                        <View style={{alignItems:'center',flexDirection:'row',marginVertical:moderateScale(10)}}>
                            <Image source={Call} style={{height:moderateScale(23),width:moderateScale(23)}}/>
                            <Text style={{marginLeft:moderateScale(12), color:'grey',fontSize:14}}>+91 9950866260</Text>
                        </View>
                        <View style={{alignItems:'center',flexDirection:'row',marginVertical:moderateScale(10)}}>
                            <Image source={Email} style={{height:moderateScale(23),width:moderateScale(23)}}/>
                            <Text style={{marginLeft:moderateScale(12), color:'grey',fontSize:14}}>claw.lawyers@gmail.com</Text>
                        </View>
                    </View>
                </TouchableOpacity>
               

                <TouchableOpacity 
                style={{flexDirection:'row', backgroundColor:'#8940FF60',paddingVertical:moderateScale(16),paddingLeft:moderateScale(20),paddingRight:moderateScale(50),borderRadius:10,marginTop:moderateScale(30),alignItems:'center'}}
                onPress={logout}
                >
                    <Image source={logoutIcon} style={{height:moderateScale(20),width:moderateScale(20)}}/>
                    <Text style={{marginLeft:moderateScale(12), color:'white',fontSize:16}}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({})

export default GPTProfileScreen;
