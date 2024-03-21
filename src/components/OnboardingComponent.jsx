import React,{useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Animated, Dimensions, Pressable, Text, Image} from 'react-native';
import OnboardingItem from './OnboardingItem';
import Onboardingchevron from '../assets/Onbordingchevron.png'
import features from '../data/features';
import {useNavigation} from '@react-navigation/native'
import { moderateScale } from '../styles/mixins';
import Ripple from 'react-native-material-ripple'
const OnboardingComponent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const { width,height} = Dimensions.get('window');
   const navigation = useNavigation()
    const ref = useRef(null);

    const updateCurrentSlideIndex = (e) => {

        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentInd = Math.round(contentOffsetX/width);
        setCurrentIndex(currentInd);
    }

    const goNextSlide = () => {
        const nextSlideIndex = currentIndex+1;
        if(nextSlideIndex!= features.length)
        {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({offset});
            setCurrentIndex(nextSlideIndex);
        }
        else{
            navigation.replace('SignupUser');
        }
        
    }

    const skip = () => {

        if(currentIndex==0)
        {

            const lastSlideIndex = features.length -1;
            const offset = lastSlideIndex*width;
            ref?.current?.scrollToOffset({offset});
            setCurrentIndex(lastSlideIndex);
        }

        else
        {
            const previousSlideIndex = currentIndex -1;
            const offset = previousSlideIndex * width;
            ref?.current?.scrollToOffset({offset});
            setCurrentIndex(previousSlideIndex);
        }
    }
    
    const Paginator = () => {
        return <View style={{height:height*0.41, justifyContent:'space-between',zIndex:3,position:'absolute',marginTop:moderateScale(374)}}>
            <View style={{ flexDirection:'row',justifyContent:'center',}}>
                {features.map((_, index) => {
                    return <View key={index} style={[localStyles.indicatorStyle, currentIndex==index && { backgroundColor:'#8940ff90',width:22}]}/>
                })}
               
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',width:width,paddingHorizontal:moderateScale(15),marginTop:moderateScale(30)}}>
               
                    <Ripple 
                        onPress={skip} 
                        style={[localStyles.btn, {backgroundColor:'transparent',elevation:0}]} 
                        rippleColor='white'
                        rippleDuration={500}
                        rippleSize={10000}
                        rippleContainerBorderRadius={10}
                        >
                        <Text style={{color:'#979797',fontSize:15}}>{currentIndex==0 ? 'Skip' : 'Back'}</Text>
                    </Ripple>
                
                <Ripple 
                    onPress={goNextSlide} 
                    style={localStyles.btn}
                    rippleColor='white'
                    rippleDuration={500}
                    rippleSize={10000}
                    rippleContainerBorderRadius={10}
                >
                    {currentIndex!=features.length-1 ? <Image source={Onboardingchevron} style={{height:23,width:13,marginRight:-5}}/> : <Text style={{marginHorizontal:moderateScale(24),fontSize:moderateScale(17),color:'white'}}>Get Started</Text>}
                </Ripple>
               
            </View>
        </View>
    }

    
    return (
        <View 
        style={[localStyles.container,{height:height*0.70}]}
        >
            <View style={{flex:1,}}>
                <FlatList
                    
                    data={features}
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    renderItem={({item})=> <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                   ref={ref}
                />
            </View>
            <Paginator/>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },

    indicatorStyle:{
        height:10,
        width:10,
        backgroundColor:'#8940ff40',
        marginHorizontal:2,
        borderRadius:5
    },
    btn :{
        height:moderateScale(55),
        minWidth:moderateScale(55),
        backgroundColor:'#8940ff',
        borderRadius:28,
        elevation:8,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default OnboardingComponent;
