import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from '../../styles'
import { horizontalScale, verticalScale } from '../../styles/mixins'

const ExpandedNewsScreen = () => {
  return (
    <View style={[styles.alignItemsCenter, styles.alignViewCenter]}>
       <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
          <Image  
            source={require('../../assets/app-icon.png')}
            style={[styles.logoStyle,{marginTop: verticalScale(30)}]} 
          />
        </View>
        <View style={[styles.alignViewSplit, {width: '90%'}]}>
            <View style={[styles.alignViewCenter, styles.alignItemsCenter]}>
                <Image  
                source={require('../../assets/back-button.png')}
                style={[styles.backButtonIcon]} 
                />
            </View>
        
            <View style={[styles.alignItemsCenter, styles.alignViewCenter, styles.alignViaRow]}>
                <Image  
                    source={require('../../assets/share-button.png')}
                    style={[styles.backButtonIcon, {marginRight: horizontalScale(20)}]} 
                />
                <Image  
                source={require('../../assets/hamburger-button.png')}
                style={[styles.backButtonIcon]} 
            />
            </View>
        </View>

        <View>
            <Text>

            </Text>
            <Text>

            </Text>
            <Image />
        </View>
    </View>
  )
}

export default ExpandedNewsScreen