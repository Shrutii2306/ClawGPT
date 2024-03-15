import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple'
const NewsItem = ({news, isOnboarding}) => {
  
  const navigation = useNavigation();
  function NewsRedirect(){
    if(isOnboarding)
      navigation.navigate('NewsScreen')
    if(!isOnboarding){
      navigation.navigate('NewsDetail',{news:news});
    }
  
  }
 return (
    <Ripple 
      style={isOnboarding? [{width:'100%',marginTop:8}]:[styles.newsContainer,{width:'95%',alignSelf:'center'}]} 
      onPress={NewsRedirect}
      rippleColor='#ffffff'
      rippleOpacity={0.20}
      rippleDuration={1200}
      rippleSize={2000}
    >
      <Image
        style={{height:138,width:'100%',borderRadius:10}}
        source={{uri: news.imageUrl}}
      />
      <View style={[{width:'100%'}]}>
        <Text style={[styles.font_20, styles.font_bold, styles.textWhite]}>{news.title}</Text>
        <Text style={[styles.font_14, styles.marginB_5, styles.textWhite]}>{news.publishedAt.slice(0, news.publishedAt.indexOf('T'))}, {news.publishedAt.slice(news.publishedAt.indexOf('T')+1, news.publishedAt.indexOf('.'))} hours</Text>
      </View>
    </Ripple>
 );
};


export default NewsItem;