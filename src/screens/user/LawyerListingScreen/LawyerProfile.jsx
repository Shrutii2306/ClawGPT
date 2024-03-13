import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
    import React, { useEffect } from 'react'
    import styles from '../../../styles'
    import { cases } from '../../../data/cases'
    import { services } from '../../../data/services'
    import Background from '../../../assets/background.jpg'
    import YellowStar from '../../../assets/YellowStar.png';
    import PieChart from 'react-native-pie-chart'
    import userIcon from '../../../assets/userIcon.png';
    import ProfileMesssageIcon from '../../../assets/ProfileMesssageIcon.png';
    import CaseDetailComponent from '../../../components/CaseDetailComponent'
    import ServiceDetailComponent from '../../../components/ServiceDetailComponent'
    import RatingDetailComponent from '../../../components/RatingDetailComponent'
    import { ratings } from '../../../data/ratings'
    import { moderateScale } from '../../../styles/mixins'
    import {useNavigation} from '@react-navigation/native';
    import CallIcon from '../../../assets/ProfileCallIcon.png'
    import BackIcon from '../../../assets/back-button.png'

import ZegoUIKitPrebuiltCallService, {ZegoSendCallInvitationButton,} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const LawyerProfile = ({route}) => {

  const {lawyer} = route.params;
  console.log('lawyerId',lawyer);
      
    
      //console.log(props);
        const widthAndHeight = 200
      const series = [10,13,23,35,13,20];
       const sliceColor = [ '#497AF9', '#789DFB', '#E5E5E5','#497AF9','#789DFB','#E5E5E5'];
       const navigation = useNavigation();
     
      return (
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={[styles.container,{backgroundColor: 'white',}]}>
          <ImageBackground 
            source={Background}
            resizeMode='cover'
            style={{justifyContent: 'flex-end', alignItems: 'center', height: 200}}
          >
            <TouchableOpacity 
            style={{alignSelf:'flex-start',top:moderateScale(-100),marginLeft:moderateScale(15)}}
            onPress={() => navigation.navigate('LawyerListing')}
            >
                <Image 
                source={BackIcon}
                style={{height:moderateScale(50),width:moderateScale(50)}}
                />
            </TouchableOpacity>     
            <View style={{justifyContent: 'center', alignItems: 'center', height: 100, width: 100, borderRadius:50, backgroundColor: 'white',marginBottom: -50}}>
            <Image 
                  source={userIcon}
                  style={{height: 92, width: 92, borderRadius: 46,zIndex:1,position:'absolute'}}
              />
              <Image 
                  source={userIcon}
                  style={{height: 92, width: 92, borderRadius: 46,zIndex:2,borderWidth:1}}
              />
            </View>
          </ImageBackground>
          
          {/* name */}
          <View style={{paddingHorizontal:20,marginTop:10}}>
            <View style={[styles.alignViewCenter, styles.alignItemsCenter, {marginTop: 50, width: '100%', flexDirection:'row'}]}>
              <Text style={{fontSize:20,fontWeight:'400',color:'black'}}>{lawyer.firstName} {lawyer.lastName}</Text>
              
            </View>
            <Text style={{alignSelf:'center',fontSize:12}}>Lawyer</Text>
            {/* Consultation charge */}
            <View style={{backgroundColor:'#8940FF',padding:6,borderRadius:10,marginTop:20,width:220}}>
              <Text style={{color:'white'}}>Consultation Charge: Rs.200/hr</Text>
            </View>
            <View style={{backgroundColor:'#8940FF',padding:6,borderRadius:10,marginTop:5,width:130}}>
              <Text style={{color:'white'}}>20 Cases solved</Text>
            </View>
    
            {/* About */}
            <View style={{marginTop:10}}>
    
              <Text style={{color:'black',fontWeight:'500',fontSize:22}}>About me: </Text>
              <Text style={{color:'black',fontSize:12}}>
              With a passion for justice and a commitment to client success, I am a seasoned lawyer dedicated to navigating the complexities of the legal landscape. Armed with extensive experience and a strategic approach, I strive to deliver optimal outcomes for my clients. Trust in my expertise to advocate for your rights and secure the justice you deserve.
              </Text>
              
            </View>
    
            {/* Pie Chart */}
            <View style={{alignItems:'center',marginTop:40}}>
              <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.6}
              />
                <View style={{alignSelf:'baseline',alignItems:'flex-start',marginTop:20}}>
                  <Text style={{color:'#4D4D4D',fontSize:30,fontWeight:500}}>
                    Total Cases
                  </Text>
                  <Text style={{color:'black',fontWeight:'bold',fontSize:35,letterSpacing:1}}>4,209</Text>
                  
                  <View>
                    <CaseDetailComponent cases={cases}/>
                  </View>
    
                  
                  <View style={{width:'100%'}}>
                  <Text style={{color:'black',fontSize:30,marginTop:13,fontWeight:500}}>
                    Services
                  </Text>
                    <ServiceDetailComponent services = {services}/>
                  </View>
    
                  <View style={{width:'100%'}}>
                  <Text style={{color:'black',fontSize:30,marginTop:13,fontWeight:500}}>
                    Ratings
                  </Text>
                    <RatingDetailComponent ratings = {ratings}/>
                  </View>
    
                  <View style={{height:1,width:moderateScale(400),alignSelf:'center',backgroundColor:'#f0f0f0',marginVertical:12}}></View>
    
                  {/* Review */}
                  <View style={{width:'100%'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginTop:10}}>
                      <View>
                        <Text style={{color:'black'}}>Kristin Watson</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Image source={YellowStar} style={{height:20,width:20}}></Image>
                        <Image source={YellowStar} style={{height:20,width:20}}></Image>
                        <Image source={YellowStar} style={{height:20,width:20}}></Image>
                        <Image source={YellowStar} style={{height:20,width:20}}></Image>
                        <Image source={YellowStar} style={{height:20,width:20}}></Image>
                      </View>
                      
                    </View>
                    <View style={{marginTop:10}}>
                      <Text style={{color:'#00000099',fontSize:12,lineHeight:18,}}>
                      Exceptional legal prowess! This lawyer navigated my case with precision, delivering results beyond my expectations. A true legal maestro, I highly recommend their services.
                      </Text>
                    </View>
                    <View style={{flexDirection:'row',width:'100%',marginTop:10,flex:1,justifyContent:'space-between'}}>
                      <Text style={{color:'#00000061',fontSize:12}}>Helpul ?</Text>
                      <Text style={{color:'#00000061',fontSize:12}}>Yes (2) | No (2)</Text>
                      <Text style={{color:'#00000061',fontSize:12,}}>Nov 09, 2022</Text>
                    </View>
    
                    <View style={{height:1,width:moderateScale(400),alignSelf:'center',backgroundColor:'#f0f0f0',marginVertical:12}}></View>
    
    
                  </View>
    
                  {/* Contact Button */}
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:20,marginTop:80}}>
                    <TouchableOpacity 
                      style={{backgroundColor:'#8940FF',borderRadius:15,paddingVertical:12,paddingHorizontal:22,flexDirection:'row',justifyContent:'center'}}
                      onPress={() => navigation.navigate('ChatWindow',{
                        receiverName: lawyer.firstName+' '+lawyer.lastName,
                        photo_url : userIcon,
                        uid : lawyer.id
                      })}
                    >
                      <Image source={ProfileMesssageIcon} style={{marginRight:5,marginVertical:2,height:moderateScale(26),width:moderateScale(26)}}/>
                      <Text style={{color:'white',fontSize:17,fontWeight:'400'}}>Message</Text>
                    </TouchableOpacity>
    
                    <ZegoSendCallInvitationButton 
                      invitees = {[{userID :lawyer.id, userName : lawyer.firstName}]} 
                      isVideoCall = {false}
                      resourceID = {'voice_call'}
                      text={'Call lawyer'}
                      width={150}
                      height={50}
                      icon={CallIcon}
                      borderRadius={15}
                      backgroundColor={'#8940FF'}
                      textColor={'white'}
                    />
                  </View>
                  
                  
                </View>
              
            </View>
          </View>
          
          
         
          
        </View>
        </ScrollView>
      )
    }
    
const styles2 = StyleSheet.create({})

export default LawyerProfile;