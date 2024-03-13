import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/back-button.png'
import { moderateScale } from '../../../styles/mixins'
const ProfileScreen = ({route}) => {

  const navigation = useNavigation();
  const {post} = route.params;
   
  

  return (
    <ScrollView style={{backgroundColor:'white'}}>   
     
      <View style={{paddingHorizontal:20,marginTop:10}}>
        <TouchableOpacity 
            style={{alignSelf:'flex-start'}}
            onPress={() => navigation.navigate('LawyerListing')}
            >
                <Image 
                source={BackIcon}
                style={{height:moderateScale(50),width:moderateScale(50)}}
                />
        </TouchableOpacity> 
        <View style={{marginTop:moderateScale(18)}} >
            <Text style={{fontSize:moderateScale(28),color:'black',fontWeight:'500'}}>{post.title}</Text>

            <Text style={{fontSize:moderateScale(14),marginTop:moderateScale(8)}}>{post.time}</Text>

            <Text style={{color:'black',marginTop:moderateScale(20)}}>{post.description}</Text>

            <Text style={{color:'black',marginTop:moderateScale(28)}}>₹{post.fees}</Text>
            <Text style={{fontSize:moderateScale(14),}}>{post.priceType}</Text>

            <Text style={{color:'black',marginTop:moderateScale(28)}}>{post.type}</Text>
            <Text style={{fontSize:moderateScale(14),}}>{post.experience}</Text>

        </View>
       
      </View>
    </ScrollView>
  )
}

export default ProfileScreen