import { TouchableOpacity,Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import { moderateScale } from '../styles/mixins'
import {useNavigation} from '@react-navigation/native'
import MenuArrowWhite from '../assets/MenuArrowWhite.png';
export default function DrawerItem({title, icon, screen}) {

    const navigation = useNavigation();
  return (
    <TouchableOpacity 
        style={styles.drawerItemStyle} 
        onPress={() => navigation.navigate(screen)}
        >
          <Image source={icon} style={styles.drawerIcon}/>
          <Text style={styles.labelStyle}>{title}</Text>
          <Image source={MenuArrowWhite} style={styles.rightMenuIcon}/>
        </TouchableOpacity>
  )
}

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