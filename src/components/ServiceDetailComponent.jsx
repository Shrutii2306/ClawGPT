import { View, Text } from 'react-native'
import React from 'react'

export default function ServiceDetailComponent({services}) {
  return (
    <View style={{backgroundColor:'#8940FF',borderRadius:10,width:'100%',paddingVertical:10,paddingHorizontal:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',borderBottomWidth:1,borderColor:'white',paddingVertical:5}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Case type</Text>
            <Text style={{color:'white',fontWeight:'bold'}}>Hourly charge</Text>
        </View>
      {services.map((item) => {

        return(

            <View key={item.id} style={{flexDirection:'row',justifyContent:'space-between',width:'100%',borderBottomWidth:1,borderColor:'white',paddingVertical:5}}>
            <Text style={{color:'white',}}>{item.type}</Text>
            <Text style={{color:'white',marginRight:5}}>₹{item.charge}</Text>
        </View>
        )
      })}
    </View>
  )
}