import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import userIcon from '../../../assets/userIcon.png';
import { useSelector} from 'react-redux';
import { moderateScale } from '../../../styles/mixins';
import BackIcon from '../../../assets/back-button.png'
import {useNavigation} from '@react-navigation/native'
import logoutIcon from '../../../assets/logout.png';
import { fetchData,removeData } from '../../../actions/async-storage';
import auth from '@react-native-firebase/auth';
const GPTProfileScreen = () => {


    const pno = useSelector(state => state.variables.phone_no);
    const navigation = useNavigation();
    const logout = () => {
    
        console.log(fetchData('userId'));
        removeData('userId');
        auth().signOut();
        navigation.replace('InitialLandingScreen');
        console.log('logged out');
        console.log(fetchData('userId'));
      }
    return (
        <View style={{paddingTop:moderateScale(20),paddingHorizontal:moderateScale(15),backgroundColor:'white',flex:1}}>
            <View style={[styles.alignViaRow, styles.alignItemsCenter,styles.alignViewCenter, {flexDirection:'row'},]}>
            <TouchableOpacity 
              style={[styles.alignItemsLeft, styles.alignViewCenter,]}
              onPress={() => navigation.navigate('Legal GPT')}
            >
                <Image 
                source={BackIcon}
                style={{height:moderateScale(40),width:moderateScale(40)}}
                />
            </TouchableOpacity>  
            <Text style={{color:'black',fontSize:moderateScale(27),marginLeft:moderateScale(10),fontWeight:'500'}}>Profile</Text>        
        </View>
            <View style={{flexDirection:'column',marginTop:moderateScale(25),marginHorizontal:moderateScale(20)}}>

                <View style={{flexDirection:'row',marginBottom:moderateScale(20)}}>
                    {/* <Image source={userIcon} /> */}
                    <View style={{height:moderateScale(70),width:moderateScale(70),backgroundColor:'purple',borderRadius:40,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:moderateScale(40)}}>U</Text></View>
                    <View style={{justifyContent:'center',marginLeft:moderateScale(20)}}>
                        <Text style={{color:'black',fontSize:moderateScale(25)}}>User</Text>
                        
                    </View>
                </View>
                
                <Text style={{color:'black',fontSize:moderateScale(20)}}><Text style={{fontWeight:'500'}}>Phone Number :</Text> +91 {pno}</Text>

                <TouchableOpacity 
                style={{flexDirection:'row', backgroundColor:'#8940FF60',paddingVertical:moderateScale(16),paddingLeft:moderateScale(20),paddingRight:moderateScale(50),borderRadius:10,marginTop:moderateScale(30),}}
                onPress={logout}
                >
                    <Image source={logoutIcon} style={{height:moderateScale(23),width:moderateScale(20)}}/>
                    <Text style={{marginLeft:moderateScale(12), color:'black',fontSize:16}}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default GPTProfileScreen;
