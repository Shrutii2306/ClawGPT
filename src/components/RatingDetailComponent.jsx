import { View, Text, Image } from 'react-native'
import React from 'react'
import RatingStar from '../assets/RatingStar.png'
import { moderateScale } from '../styles/mixins'
export default function RatingDetailComponent({ratings}) {
  return (
    <View style={{width:'100%'}}>

        <Text style={{alignSelf:'center'}}>Summary</Text>
        <View style={{flexDirection:'row',flex:1,width:'100%',justifyContent:'space-between'}}>
            <View style={{width:'63%'}}>
                {ratings.map((item) => {

                    return (

                        <View key={item.id} style={{flexDirection:'row',justifyContent:'center',flex:1,marginVertical:5}}>
                            <Text style={{marginRight:10,color:'black'}}>{item.rating}</Text>
                            <View style={{width:'100%',height:10,backgroundColor:'#f0f0f0',borderRadius:2,marginVertical:5}}>
                                <View style={{width:`${item.percent}%`,backgroundColor:'#8940FF',height:10,borderRadius:2}}></View>
                            </View>
                        </View>
                    )
                })}
            
            </View>
            <View style={{justifyContent:'space-between',paddingVertical:5,marginLeft:moderateScale(25)}}>
                <View style={{alignItems:'flex-start'}}>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginBottom:5}}>
                        <Text style={{color:'black',fontSize:25}}>4.5 </Text>
                        <Image source={RatingStar} style={{marginVertical:8,height:20,width:20}}/>
                    </View>
                    <Text style={{color:'#00000061'}}>
                        273 Reviews
                    </Text>
                </View>
                
                <View style={{alignItems:'flex-start'}}>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginBottom:5}}>
                        <Text style={{color:'black',fontSize:25}}>88%</Text>
                        
                    </View>
                    <Text style={{color:'#00000061'}}>
                        Recommended
                    </Text>
                </View>
            </View>

        </View>
        
      
      
    </View>
  )
}