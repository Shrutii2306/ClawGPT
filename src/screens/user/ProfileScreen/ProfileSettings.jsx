import React,{useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Switch} from 'react-native';
import rightArrow from '../../../assets/rightArrow.png';
import { moderateScale } from '../../../styles/mixins';

const ProfileSettings = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{backgroundColor:'white',flex:1, paddingTop:moderateScale(44), paddingHorizontal:moderateScale(20)}}>
            <Text style={{color:'black', fontSize:moderateScale(23), fontWeight:'bold' }}>Profile Settings</Text>   

            <View style={{marginTop:moderateScale(14)}}>
                <TouchableOpacity style={styles.settingOption}>
                    <Text style={{fontSize:14,color:'white',fontWeight:'bold'}} >Delete account</Text>
                    <Image source={rightArrow}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingOption}>
                    <Text style={{fontSize:14,color:'white',fontWeight:'bold'}} >Help center</Text>
                    <Image source={rightArrow}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingOption}>
                    <Text style={{fontSize:14,color:'white',fontWeight:'bold'}} >Call us</Text>
                    <Image source={rightArrow}/>
                </TouchableOpacity>

                <View style={styles.settingOption}>
                    <Text style={{fontSize:14,color:'white',fontWeight:'bold'}} >Push notifications</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#8970FF'}}
                        thumbColor={isEnabled ? '#B283FF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />

                </View>
            </View>         
        </View>
    );
}

const styles = StyleSheet.create({

    settingOption : {
        color: 'black', 
        borderRadius:10, 
        backgroundColor:'#8940FF', 
        marginTop:5,
        justifyContent:'center',
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        justifyContent:'space-between',
        flexDirection:'row'
    }
})

export default ProfileSettings;
