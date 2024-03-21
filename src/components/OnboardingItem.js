import React from 'react';
import {View, StyleSheet,Image, Dimensions, Text} from 'react-native';
import { moderateScale } from '../styles/mixins';

const OnboardingItem = ({item}) => {
    const {width} = Dimensions.get('window');
    return (
        <View style={[localStyles.container,{width:width-5}]}>
            <View style={[localStyles.imageContainerOuter,]}>
            <View style={localStyles.imageContainerInner}>
            <Image source={item.img} style={[localStyles.image]}/>
            </View>
            </View>
            
            <View style={{alignItems:'center',marginTop:48,justifyContent:'center',paddingHorizontal:moderateScale(15)}}>
                <Text style={{fontSize:moderateScale(23),color:'#D9D9D9',fontWeight:'500',marginBottom:3,textAlign:'center',maxWidth:moderateScale(330)}}>{item.title}</Text>
                <Text style={{fontSize:moderateScale(18),textAlign:'center',color:'#C8C0C0',maxWidth:moderateScale(320)}}>{item.details}</Text>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({

    container : {
        // justifyContent:'center',
        alignItems:'center',
        paddingBottom:0,
        
    },
    image :{
       
        justifyContent:'center',
        height:moderateScale(272),
        width:moderateScale(272),
        
    },
    imageContainerOuter:{

        width: moderateScale(320),
        height:moderateScale(320),
        backgroundColor:'#8940ff20',
        borderRadius:160,
        justifyContent:'center',
        alignItems:'center',
        marginTop:moderateScale(25),
    },
    imageContainerInner:{

        width: moderateScale(250),
        height:moderateScale(250),
        backgroundColor:'#8940ff40',
        borderRadius:160,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default OnboardingItem;
