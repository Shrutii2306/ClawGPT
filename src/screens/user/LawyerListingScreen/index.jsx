import { StyleSheet, Text, View ,TouchableOpacity,Image,TextInput, ScrollView} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import { moderateScale } from '../../../styles/mixins';
import Search from '../../../assets/search-icon.png'
import styles from '../../../styles';
import BackIcon from '../../../assets/back-button.png'
import userIcon from '../../../assets/userIcon.png'
// import CallIcon from '../../../assets/call-icon-black.png';
import RatingStar from '../../../assets/RatingStar.png';
import CallIcon from '../../../assets/call-icon-black.png'

const LawerListing =() => {

    const navigation =useNavigation();

    const lawyers = [
        {
            name : 'Aditya Goel',
            title : 'Criminal lawyer',
            cases :'20',
            rating : 4.4,
            consultationChage : 200,
            profileImage : userIcon
        },
        {
            name : 'Aditya Goel',
            title : 'Criminal lawyer',
            cases :'20',
            rating : 4.4,
            consultationChage : 200,
            profileImage : userIcon
        }
    ]
    
  return (
    <View style={{backgroundColor:'white',flex:1,paddingHorizontal:moderateScale(20),paddingTop:20}}>
        <View style={[styles.alignViaRow, styles.alignItemsCenter, {width: '100%'},]}>
            <TouchableOpacity 
              style={{alignSelf:'flex-start'}}
              onPress={() => navigation.navigate('OnboardingSnippet')}
            >
                <Image 
                source={BackIcon}
                style={{height:moderateScale(50),width:moderateScale(50)}}
                />
            </TouchableOpacity>      
            <Text style={{fontWeight:'bold',fontSize:moderateScale(38),color:'black',marginLeft:moderateScale(85)}}>Lawyer</Text>     
        </View>
        
       
   
        <View style={[styles.alignViaRow, styles.alignItemsCenter, styles.alignViewCenter,styles.searchBar,{width:'100%',marginTop:moderateScale(20)}]}>
            <TouchableOpacity >
              <Image 
                  source={Search}
                  style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TextInput
                  placeholder='Search'
                  placeholderTextColor='#999999'
                  style={[ styles.font_20,styles.marginL_10, styles.textBlack, { width: '90%',marginBottom:moderateScale(-2)}]}
            />
                
          </View>

            <ScrollView style={{marginTop:moderateScale(8)}}>
                {lawyers.map((item) => {

                   return( 
                   
                    <View style={{borderWidth:1,borderColor:'#9747FF',marginVertical:moderateScale(5),borderRadius:15,paddingVertical:moderateScale(20),flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:moderateScale(20)}}>
                        <View>
                            <View >
                                <View style={{flexDirection:'row'}}>
                                    <View>
                                        <Image source={userIcon} alt='user icon' />
                                    </View>
                                    <View style={{marginLeft:moderateScale(8)}}>
                                        <Text style={{color:'black',fontSize:moderateScale(23)}}>{item.name}</Text>
                                        <Text style={{fontSize:moderateScale(13)}}>{item.title}</Text>
                                        <Text style={{fontSize:moderateScale(15)}}>{item.cases} cases solved</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Image source={RatingStar} style={{height:moderateScale(15),width:moderateScale(15),marginTop:2,marginRight:2}}/>
                                            <Text style={{fontSize:moderateScale(14),fontWeight:'bold'}}>{item.rating}</Text>
                                        </View>
                                        
                                    </View>
                                </View>

                                <View style={{backgroundColor:'#10CC5C',borderRadius:10,paddingVertical:moderateScale(4),paddingHorizontal:moderateScale(9),marginHorizontal:5,marginTop:moderateScale(5)}}>
                                    <Text style={{color:'white',fontSize:moderateScale(14)}}>Consultation charge : Rs. {item.consultationChage}/hr</Text>
                                </View>
                                
                            </View>
                                                       
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('LawyerProfile')}>
                                <Image source={CallIcon} style={{height:moderateScale(70),width:moderateScale(70)}}/>
                            </TouchableOpacity>
                        </View>
                            
                    </View>
                    )
                })}
            </ScrollView>
            <TouchableOpacity
                style={{
                    
                    alignItems:'center',
                    justifyContent:'space-between',
                    position:'absolute',             
                    flex:1,     
                    bottom:15,
                    paddingVertical:moderateScale(15),
                    backgroundColor:'#8940FF',
                    borderRadius:10,
                    width:'100%',
                    marginHorizontal:moderateScale(20)
                }}
              
                onPress={() => navigation.navigate('AddGigsScreen')}

          >
               <Text style={{color:'white',fontSize:moderateScale(21),fontWeight:'bold'
            }}>Add Listing</Text>
            </TouchableOpacity>

    </View>
  )
}

const styles2 = StyleSheet.create({})

export default LawerListing;