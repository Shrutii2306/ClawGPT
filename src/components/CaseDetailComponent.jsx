import { View, Text } from 'react-native'
import React from 'react'

export default function CaseDetailComponent({cases}) {
  
  return (
    <View>
      {cases.map((item) => {

        return(
        
        <View key={item.id} style={{flexDirection:'row',marginVertical:5}}>
            <View style={{backgroundColor:`${item.color}`,width:20,height:20,borderRadius:4}}></View>
            <Text style={{fontWeight:'bold',marginHorizontal:8,color:'black'}}>{item.percent}%</Text>
            <Text style={{color:'black'}}>{item.title}</Text>
        </View>
        
        )


        })}
    </View>
  )
}