import { TouchableOpacity, StyleSheet, View, Text, ScrollView,Image, Pressable  } from 'react-native'
import React, {useState, useEffect} from 'react'
import NewsItem from '../../../components/NewsItem';
import data from '../../../data/dummy'
import styles from '../../../styles';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { moderateScale, verticalScale } from '../../../styles/mixins';
import {BarIndicator} from 'react-native-indicators'
import GavelIconLight from '../../../assets/GavelIconLight.png';
import GavelIconDark from '../../../assets/GavelIconDark.png';
import MoneyIconLight from '../../../assets/MoneyIconLight.png';
import MoneyIconDark from '../../../assets/MoneyIconDark.png';
import Ripple from 'react-native-material-ripple'

const NewsScreen = ({route}) => {
  const {newsType} = route.params;
  const [newsData,setNewsData] = useState([]);
  const [NewsType, setNewType] = useState();
  
  const isFocused = useIsFocused();  
 console.log(newsType,NewsType);
const getNews = async() => {

    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "type": NewsType
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const res = await fetch("https://claw-backend.onrender.com/api/v1/news", requestOptions);

  const response = await res.json();
  const response2 = response.data;

  let newsData = [];
    response2.map((item) =>{

      newsData.push(item);
      
    })

    setNewsData(newsData);
  }

  useEffect(() => {
    setNewType(newsType);
  },[]);

  useEffect(() => {

  
    getNews();
  },[isFocused,NewsType]);

return (
  <View style={[styles.alignItemsCenter, styles.alignViewCenter,{backgroundColor:'white',flex:1}]}>
      <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
        <Image  
          source={require('../../../assets/app-icon.png')}
          style={[styles.logoStyle,{marginTop: verticalScale(30)}]} 
        />
      </View>
      <View style={[styles.alignViewCenter, styles.alignItemsLeft]}>
        <Text style={[styles.textBlack, styles.font_700, styles.font_25,]}> Latest News </Text>
      </View>
      <View style={{flexDirection:'row',borderColor:'#D9D9D9',justifyContent:'space-between',width:'80%',marginTop:10}}>
           <Ripple 
              style={NewsType==0 ? styles2.activeNewsTab: styles2.inactiveNewsTab} onPress={()=>setNewType(0)}
              rippleColor={NewsType==0 ? 'white' : '#8940ff'}
            >

              <Image source={NewsType == 0? MoneyIconLight:MoneyIconDark} style={{width:25,height:22,marginHorizontal:5}}/>
             <Text style={NewsType==0 ? {color:'white',fontSize:18}: {color:'black',fontSize:18}}>Financial</Text>

            </Ripple>

            <Ripple 
              style={NewsType==1 ? styles2.activeNewsTab: styles2.inactiveNewsTab} 
              onPress={()=>setNewType(1)}
              rippleColor={NewsType==1 ? 'white' : '#8940ff'}
            >
              
              <Image source={NewsType == 1? GavelIconLight:GavelIconDark} style={{width:25,height:22,marginHorizontal:5}}/>
              <Text style={NewsType==1 ? {color:'white',fontSize:18}: {color:'black',fontSize:18}}>Legal</Text>

            </Ripple>
        </View>
       
        {newsData.length>0? <ScrollView 
          showsVerticalScrollIndicator={false}
        >
      {newsData.map((item) => {
        //console.log(news)
        return(
        <NewsItem key={item._id} news={item} isOnboarding={false}/>
      )})}
      </ScrollView> : 
      <View><BarIndicator color='#D9D9D9' size={50}/></View>
       
      }
      <View style={{height:moderateScale(30),marginTop:10}}></View>
  </View>
)
}

const styles2 = StyleSheet.create({

  activeNewsTab :{
    alignItems:'center',
    backgroundColor:'#8940FF',
     borderColor:'#D9D9D9', 
     paddingHorizontal:15,
     paddingVertical:5,
     flexDirection:'row',
    borderRadius:10
    },

  inactiveNewsTab :{
    alignItems:'center',
    
    borderRightWidth:1, 
    padding:10,
    borderColor:'#D9D9D9',
    paddingHorizontal:15,
    paddingVertical:5,
     flexDirection:'row',
    borderRadius:10
  }

})

export default NewsScreen