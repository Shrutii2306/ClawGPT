import { View, Text, Image, TouchableOpacity, TextInput , StyleSheet} from 'react-native'
import React from 'react'
import styles from '../../../styles'
import BackButton from '../../../assets/back-button.png'
import { horizontalScale, moderateScale } from '../../../styles/mixins'
import Search from '../../../assets/search-icon.png'
import {useNavigation} from '@react-navigation/native';

// const data =[
//   {
//     id: 1,
//     title: 'Corporate restructure to protect profit from sale.',
//     datetime: '22',
//     fixedprice: 30000,
//     type: 'Lawyer',
//     experience: 'Experienced',

//   }
// ]

const ClientGigsScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={[{paddingHorizontal:moderateScale(16),marginTop:moderateScale(20)}]}>
      <View style={[ ]}>
        <TouchableOpacity onPress={() =>navigation.navigate('LawyerListing')}>
          <Image 
            source={BackButton}
            style={{height: moderateScale(50), width: moderateScale(50), }}
            resizeMode='contain'
          />
        </TouchableOpacity>
        
        
      </View>

      <View style={{justifyContent:'center',alignItems:'center',marginTop:moderateScale(20)}}>
        <Text style={{color:'black',fontWeight:'500',fontSize:moderateScale(20)}}>Find Your Business Ally in Law & Finance</Text>
        <Text style={{fontSize:moderateScale(14)}}>
          Post Your Job Gig Below and Get Matched with Experienced  
        </Text>
        <Text style={{fontSize:moderateScale(14)}}>
          Lawyers and CAs Ready to Assist You!
        </Text>
       
      </View>
      
      <View>

        <View style={{marginTop:20}}>
          <Text style={{fontSize:moderateScale(20),color:'black'}}>Job title:</Text>
          <TextInput placeholder='Enter your job title' style={styles2.profileTextInput} />
        </View>

        <View style={{marginTop:20}}>
          <Text style={{fontSize:moderateScale(20),color:'black'}}>Job Description:</Text>
          <TextInput placeholder='Enter your job description' style={styles2.profileTextInput} />
        </View>

        <View style={{marginTop:20}}>
          <Text style={{fontSize:moderateScale(20),color:'black'}}>Price Range:</Text>
          <TextInput placeholder='Enter the price for your project' style={styles2.profileTextInput} />
        </View>

        <View style={{marginTop:20}}>
          <Text style={{fontSize:moderateScale(20),color:'black'}}>Country:</Text>
          <TextInput placeholder="I'm from..." style={styles2.profileTextInput} />
        </View>

        <View style={{marginTop:20}}>
          <Text style={{fontSize:moderateScale(20),color:'black'}}>Pincode:</Text>
          <TextInput placeholder='Enter your pincode' style={styles2.profileTextInput} />
        </View>

        <View style={{marginTop:20}}>
          <Text style={{fontSize:moderateScale(20),color:'black'}}>Profession:</Text>
          <TextInput placeholder='I need a...' style={styles2.profileTextInput} />
        </View>

      </View>
      <TouchableOpacity
                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    paddingVertical:moderateScale(15),
                    backgroundColor:'#8940FF',
                    borderRadius:10,
                    width:'55%',
                    alignSelf:'center',
                    marginTop:moderateScale(20)
                }}
              
                // onPress={}

          >
               <Text style={{color:'white',fontSize:moderateScale(21),fontWeight:'bold'
            }}>Post Gig</Text>
            </TouchableOpacity>

    </View>
  )
}

export default ClientGigsScreen


const styles2 = StyleSheet.create({

  profileTextInput :{

      color: 'black',
      borderWidth:1,
      borderRadius:10,
      borderColor:'#8940FF',
      marginTop:5,
      height:moderateScale(45)
  }
})