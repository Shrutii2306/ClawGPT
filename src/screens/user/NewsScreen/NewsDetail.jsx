import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import styles from '../../../styles'
import { horizontalScale, moderateScale, verticalScale } from '../../../styles/mixins'
import { useNavigation, useIsFocused} from '@react-navigation/native';
import appIcon from '../../../assets/ClawLogoWhite.png'

const NewsDetail = ({route}) => {

    let {news} = route.params;
    console.log('news',news);
    const [newsData,setNewsData] = useState([]);
    const [newsType, setNewType] = useState(0);
    const isFocused = useIsFocused();  
  const getNews = async() => {

      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "type": news.type
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

    const updateNewsItem =(item)=>{

      news = item;
      console.log('itemmm',item)
      console.log(news);
    }

  useEffect(() => {

    getNews();
  },[isFocused,newsType,news]);

    const navigation = useNavigation();
  return (
    <View style={[styles.alignItemsCenter, styles.alignViewCenter,{backgroundColor:'#1B202C',flex:1,justifyContent:'flex-start'}]}>
      <ScrollView style={{paddingHorizontal:moderateScale(15)}}>
       <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
          <Image  
            source={appIcon}
            style={{marginTop: verticalScale(30),height:verticalScale(36),width:horizontalScale(114)}} 
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:moderateScale(15),marginTop:28}}>
            <View style={{}}>

                <TouchableOpacity onPress={() => navigation.navigate('NewsScreen',{newsType:newsType})}>
                  <Image  
                  source={require('../../../assets/back-button.png')}
                  style={[styles.backButtonIcon]} 
                  />
                </TouchableOpacity>
                
            </View>
        
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity>
                <Image  
                      source={require('../../../assets/share-button.png')}
                      style={[ {marginRight: horizontalScale(20),height:moderateScale(28.5),width:moderateScale(25)}]} 
                  />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image  
                  source={require('../../../assets/hamburger-button.png')}
                  style={{height:moderateScale(28),width:moderateScale(7)}} 
                />
              </TouchableOpacity>
            </View>
        </View>

        <View style={{marginTop:20}}>
          <Text style={[styles.font_20, styles.font_bold, styles.textWhite]}>{news.title}</Text>
          <Text style={[styles.font_14, styles.marginB_5, styles.textWhite]}>{news.publishedAt.slice(0, news.publishedAt.indexOf('T'))}, {news.publishedAt.slice(news.publishedAt.indexOf('T')+1, news.publishedAt.indexOf('.'))} hours</Text>

          <Image
            style={[styles.newsImage,{height:moderateScale(200),width:'auto',marginRight:moderateScale(15)}]}
            source={{uri: news.imageUrl}}
            resizeMode="cover"
          />
          <Text style={{color:'white',marginTop:15,lineHeight:19}}>{news.description}</Text>

          <View style={{height:1,width:moderateScale(400),backgroundColor:'#0f0f0f30',marginVertical:15}}></View>

          <Text style={{fontWeight:'500',color:'white',fontSize:30,marginBottom:10}}>Read more</Text>

          {newsData.map((item) => {

            if(item._id != news._id){
              return(
                <TouchableOpacity key={item._id} onPress={() => navigation.navigate('NewsDetail',{news:item})}>
                    <View style={{flexDirection:'row',}}>
                    <Text style={{fontWeight:'bold',color:'white',fontSize:15,width:'65%'}} numberOfLines={3}>{item.title}</Text>
                    <Image source={{uri: item.imageUrl}} style={{height:moderateScale(95),width:moderateScale(120),borderRadius:12}}/>
                  </View>

                  <View style={{height:1,width:moderateScale(400),backgroundColor:'#0f0f0f30',marginVertical:10}}></View>
                </TouchableOpacity>
               
                
              )
            }
          })}

        </View>

        </ScrollView>
    </View>
  )
}

export default NewsDetail;