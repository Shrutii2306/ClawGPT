import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../../../styles'
import Background from '../../../assets/background.jpg'
import rightArrow from '../../../assets/rightArrow.png';
import PieChart from 'react-native-pie-chart'
// import Back from '../../../assets/back-icon.png'
import UserIcon from '../../../assets/userIcon.png';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import { fetchData, removeData } from '../../../actions/async-storage';
import auth from '@react-native-firebase/auth';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { moderateScale } from '../../../styles/mixins'
import {useSelector, connect} from 'react-redux'
import { getUserProfile } from '../../../actions/userProfile';
const ProfileScreen = (props) => {

  const navigation = useNavigation();
  const fname = useSelector(state => state.variables.firstName)
  const lname = useSelector(state => state.variables.lastName)
  const photo_url = useSelector(state => state.variables.photo_url)
  const state = useSelector(state => state.variables)
  console.log(state)
  const isFocused = useIsFocused()
  
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

   
    useEffect(()=>{

      props.getUserProfile()
    },[isFocused])
  return (
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={[styles.container,{backgroundColor: 'white',}]}>
      <ImageBackground 
        source={Background}
        resizeMode='cover'
        style={{justifyContent: 'flex-end', alignItems: 'center', height: moderateScale(220)}}
      >
        <View style={{justifyContent: 'center', alignItems: 'center', height: moderateScale(140), width: moderateScale(140), borderRadius:moderateScale(70), backgroundColor: 'white',marginBottom: -50}}>
          <Image 
              source={UserIcon}
              style={{height: moderateScale(130), width: moderateScale(130), borderRadius: 46}}
          />
        </View>
      </ImageBackground>
      
      {/* name */}
      <View style={{paddingHorizontal:20,marginTop:10}}>
        <View style={[styles.alignViewCenter, styles.alignItemsCenter, {marginTop: 45, width: '100%', flexDirection:'column'}]}>
          <Text style={{fontSize:moderateScale(30),fontWeight:'400',color:'black'}}>{fname == '' || fname==undefined ? 'user': `${fname} ${lname}`}</Text>
          {state.email == '' ? null: <Text style={{alignSelf:'center',fontSize:12,marginBottom:moderateScale(8)}}>{state.email}</Text>}
          <TouchableOpacity
                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginTop:2,
                    flex:1,   
                    paddingVertical:moderateScale(7),
                    paddingHorizontal:moderateScale(20),
                    backgroundColor:'#8940FF',
                    borderRadius:3,
                    
                    marginHorizontal:moderateScale(20)
                }}
              
                onPress={() => navigation.navigate('EditProfile')}

          >
               <Text style={{color:'white',fontSize:moderateScale(13),fontWeight:'500'
            }}>Edit Profile</Text>
            </TouchableOpacity>
           
        </View>   
        
        {/* ------------------------ New Design ------------------------ */}

        <View>
          <Text>Address</Text>
          <View style={{color: 'black', borderWidth:1, borderRadius:10, borderColor:'#8940FF40', marginTop:5,justifyContent:'center',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(15)}}>
            <Text style={{fontSize:14}} > {state.address == ''? '---' : state.address} </Text>
          </View>

          <View style={{marginTop:moderateScale(14)}}>
            <TouchableOpacity 
              style={{color: 'black', borderRadius:10, backgroundColor:'#8940FF', marginTop:5,justifyContent:'center',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(15),justifyContent:'space-between',flexDirection:'row'}}
              onPress={() => navigation.navigate('ProfileSettings')}
            >
              <Text style={{fontSize:14,color:'white',fontWeight:'bold'}} >Profile settings</Text>
              <Image source={rightArrow}/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{color: 'black', borderRadius:10, backgroundColor:'#8940FF', marginTop:5,justifyContent:'center',paddingHorizontal:moderateScale(15),paddingVertical:moderateScale(15),justifyContent:'space-between',flexDirection:'row'}}
              onPress={logout}
            >
              <Text style={{fontSize:14,color:'white',fontWeight:'bold'}} >Log out</Text>
            </TouchableOpacity>
          </View>
          

        </View>

        {/* ------------------------Initial design with user posts------------------------ */}
        {/* <View style={{borderBottomWidth:1.5,borderColor:'black',paddingVertical:4,marginTop:20}}>
          <Text style={{color:'black',fontWeight:'500'}}>Sign out</Text>
        </View> 

        <View style={{marginTop:moderateScale(25),marginBottom:moderateScale(18)}}>
            <Text style={{fontSize:moderateScale(23),fontWeight:'bold',color:'black'}}>Your posts</Text>
        </View>   

        {posts.map((item) => {
        return(
          
          <View style={{borderWidth:1,borderColor:'#9747FF',marginVertical:moderateScale(5),borderRadius:15,paddingVertical:moderateScale(8),flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',paddingHorizontal:moderateScale(10)}}>
            <Text style={{color:'black',fontSize:moderateScale(24),fontWeight:'500'}}>{item.title}</Text>
            <Text style={{fontSize:moderateScale(15)}}>{item.time}</Text>

            <View style={{flexDirection:'row',width:'100%',marginTop:17,marginBottom:moderateScale(10)}}>
              <View style={{alignItems:'flex-start',marginRight:70}}>
                <Text style={{fontSize:moderateScale(18),color:'black'}}>₹{item.fees}</Text>
                <Text style={{fontSize:moderateScale(15)}}>{item.priceType}</Text>
              </View>

              <View style={{alignItems:'flex-start'}}>
                <Text style={{fontSize:moderateScale(18),color:'black'}}>{item.type}</Text>
                <Text style={{fontSize:moderateScale(15)}}>{item.experience}</Text>
              </View>
            </View>
            
            <Text style={{fontSize:moderateScale(18),color:'black'}} numberOfLines={3}>
              {item.description}
            </Text>
            <TouchableOpacity

                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginTop:10,
                    flex:1,   
                    paddingVertical:moderateScale(7),
                    paddingHorizontal:moderateScale(20),
                    backgroundColor:'#8940FF',
                    borderRadius:9,
                    width:'90%',
                    alignSelf:'center' 
                }}
              
                onPress={() => navigation.navigate('PostDetail',{post :item})}

          >
               <Text style={{color:'white',fontSize:moderateScale(13),fontWeight:'500'
            }}>See more</Text>
            </TouchableOpacity>
        </View>
        )
      })}    */}
      </View>

      
      
    </View>
    </ScrollView>
  )
}

export default connect(null,{

  getUserProfile
})(ProfileScreen)