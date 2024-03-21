import { TouchableOpacity, StyleSheet, View, Text, ScrollView,Image, Pressable  } from 'react-native'
import React, {useState, useEffect} from 'react'
import NewsItem from '../../../components/NewsItem';
import appIcon from '../../../assets/ClawLogoWhite.png'
import styles from '../../../styles';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { horizontalScale, moderateScale, verticalScale } from '../../../styles/mixins';
import {BarIndicator} from 'react-native-indicators'
import GavelIconLight from '../../../assets/GavelIcon.png';
import GavelIconDark from '../../../assets/GavelIconDark.png';
import MoneyIconLight from '../../../assets/MoneyIcon.png';
import MoneyIconDark from '../../../assets/MoneyIconDark.png';
import Ripple from 'react-native-material-ripple'
import { NEWS_URL } from '../../../actions';

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

  const res = await fetch( NEWS_URL, requestOptions);

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
  <View style={[{backgroundColor:'#1B202C',flex:1}]}>
      <View 
       style={[styles.alignViewCenter, styles.alignItemsCenter]}
      >
        <Image  
          source={appIcon}
          style={[{marginTop: verticalScale(30),height:verticalScale(36),width:horizontalScale(114)}]} 
        />
      </View>
      <View style={[styles.alignViewCenter, styles.alignItemsCenter,{marginTop:18,}]}>
        <Text style={[styles.textWhite, styles.font_700, styles.font_28,]}> Latest News </Text>
      </View>
      <View style={{flexDirection:'row',borderColor:'#D9D9D9',justifyContent:'space-between',width:'80%',marginTop:28,marginBottom:20,alignSelf:'center'}}>
           <Ripple 
              style={NewsType==0 ? styles2.activeNewsTab: styles2.inactiveNewsTab} onPress={()=>setNewType(0)}
              rippleColor={NewsType==0 ? 'white' : '#8940ff'}
            >

              <Image source={ MoneyIconLight} style={{width:25,height:22,marginRight:5}}/>
             <Text style={NewsType==0 ? {color:'white',fontSize:18}: {color:'white',fontSize:18}}>Financial</Text>

            </Ripple>

            <Ripple 
              style={NewsType==1 ? styles2.activeNewsTab: styles2.inactiveNewsTab} 
              onPress={()=>setNewType(1)}
              rippleColor={NewsType==1 ? 'white' : '#8940ff'}
            >
              
              <Image source={GavelIconLight} style={{width:25,height:22,marginRight:5}}/>
              <Text style={NewsType==1 ? {color:'white',fontSize:18}: {color:'white',fontSize:18}}>Legal</Text>

            </Ripple>
        </View>

      <View style={{flex:1,justifyContent:'center'}}>
        {newsData.length>0? <ScrollView 
          showsVerticalScrollIndicator={false}
        >
      {newsData.map((item) => {
        //console.log(news)
        return(
        <NewsItem key={item._id} news={item} isOnboarding={false}/>
      )})}
      </ScrollView> : 
        <View style={{marginTop:moderateScale(10)}}>
          <BarIndicator color='#D9D9D9' size={50}/>
        </View>
       
      }
      </View>
      {/* <View style={{height:moderateScale(30),marginTop:10}}></View> */}
  </View>
)
}

const styles2 = StyleSheet.create({

  activeNewsTab :{
    alignItems:'center',
    backgroundColor:'#8940FF',
     borderColor:'#D9D9D9', 
     paddingRight:15,
     paddingLeft:10,
     paddingVertical:5,
     flexDirection:'row',
    borderRadius:10,
    overflow:'hidden'
    },

  inactiveNewsTab :{
    alignItems:'center',
    borderBottomWidth:1,
    borderRightWidth:1, 
    padding:10,
    borderColor:'#ffffff10',
    paddingRight:15,
     paddingLeft:10,
    paddingVertical:5,
     flexDirection:'row',
    borderRadius:10,
    elevation:15
  }

})

export default NewsScreen