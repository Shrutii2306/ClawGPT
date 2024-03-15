import { StyleSheet, Dimensions } from 'react-native';
// const HEIGHT = Dimensions.get('window').height;
import {
  horizontalScale, verticalScale, moderateScale, padding,
} from './mixins';

const WIDTH = Dimensions.get('window').width;

const colors = {
  primaryColor : '#8940FF',
  black: '#000',
  white: '#fff'
}

export default StyleSheet.create({
  textPrimary:{
    color: colors.primaryColor,
  },
  textBlack:{
    color: colors.black,
  },
  textWhite:{
    color: colors.white
  },
  container:{
      flex: 1,
      backgroundColor: colors.white,
  },

    //flex
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  flex_3: {
    flex: 3,
  },
  flex_4:{
    flex:4
  },
  flex_5: {
    flex: 5,
  },
  flex_6:{
    flex:6
  },
  //positions
  absolute: {
    position: 'absolute',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsLeft: {
    alignItems: 'flex-start',
  },
  alignItemsRight: {
    alignItems: 'flex-end',
  },
  alignViaColumn: {
    flexDirection: 'column',
  },
  alignViaRow: {
    flexDirection: 'row',
  },
  alignViewCenter: {
    justifyContent: 'center',
  },
  alignViewSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyFlexEnd: {
    justifyContent: 'flex-end',
  },
  //font weights
  font_bold:{
    fontWeight: 'bold'
  },
  font_med:{
    fontWeight: "500",
  },
  font_700:{
    fontWeight: '700'
  },
  font_600:{
    fontWeight: '600'
  },
  font_w_400:{
    fontWeight: '400'
  },

  //padding
  padding10:{
    padding: moderateScale(10),
  },
  paddingH_35:{
    paddingHorizontal: horizontalScale(35),
  },
  paddingH_20:{
    paddingHorizontal: horizontalScale(20)
  },
  //margin
  marginL_10:{
    marginLeft: horizontalScale(10),
  },
  marginB_5:{
    marginBottom: verticalScale(5),
  },
  marginT_30:{
    marginTop: verticalScale(30),
  },
  marginT_20:{
    marginTop: verticalScale(20),
  },
  marginT_10:{
    marginTop: verticalScale(10),
  },

  //fontsizes
  font_50:{
    fontSize: moderateScale(50),
  },
  font_40:{
    fontSize: moderateScale(40),
  },
  font_35:{
    fontSize: moderateScale(35),
  },
  font_32:{
    fontSize: 32,
  },
  font_30:{
    fontSize: 30,
  },
  font_28:{
    fontSize: 28,
  },
  font_25:{
    fontSize: moderateScale(25),
  },
  font_24:{
    fontSize: 24,
  },
  font_23:{
    fontSize: moderateScale(23),
  },
  font_22:{
    fontSize: moderateScale(22),
  },
  font_20:{
    fontSize: moderateScale(20),
  },
  font_19:{
    fontSize: moderateScale(19),
  },
  font_18:{
    fontSize: 18,
  },
  font_15:{
    fontSize: moderateScale(15),
  },
  font_14:{
  fontSize: moderateScale(14)
},
// ***********Tab Bar****************************
iconFocus:{
  height: moderateScale(34),
  width: moderateScale(34)

},
iconUnFocus:{
  marginTop: verticalScale(21),
  height: moderateScale(34),
  width: moderateScale(34)

},
// ***********Auth Flow***************************
startGraphic:{
  height: moderateScale(286),
  width: moderateScale(343.07),
  alignSelf:'center',
},
startLogo:{
  height: moderateScale(61),
  width: moderateScale(158)
},
loginButton:{
  height: moderateScale(58),
  width: moderateScale(175),
  backgroundColor: colors.primaryColor,
  borderRadius: moderateScale(15),
  marginTop: verticalScale(20)
},
signupButton:{
  height: moderateScale(58),
  width: moderateScale(205),
  backgroundColor: "#fff",
  borderRadius: moderateScale(15),
  borderColor: colors.primaryColor,
  borderWidth: 1,
  marginTop: verticalScale(20)
},
backButtonIcon:{
  height: moderateScale(28),
  width: moderateScale(30.33),

},
socialIcon:{
  height: moderateScale(50),
  width: moderateScale(50),
  resizeMode: 'contain',
  padding: moderateScale(10),
  marginHorizontal: horizontalScale(23.5),
  marginTop: verticalScale(35)
},

pinInput:{
  borderColor:'rgba(137, 64, 255, 0.3)',
  borderWidth:1,
  borderRadius:10,
  width:moderateScale(53),
  height:moderateScale(53),
  textAlign:'center',
  fontSize:15,
  color:'white'
},
//************Registration Page***************** */
radioGroup: { 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-around', 
  marginTop: 20, 
  borderRadius: 8, 
  backgroundColor: 'white', 
  padding: 16, 
  elevation: 4, 
  shadowColor: '#000', 
  shadowOffset: { 
      width: 0, 
      height: 2, 
  }, 
  shadowOpacity: 0.25, 
  shadowRadius: 3.84, 
}, 
radioButton: { 
  flexDirection: 'row', 
  alignItems: 'center', 
}, 
radioLabel: { 
  marginLeft: 8, 
  fontSize: 16, 
  color: '#333', 
}, 
dropdown: {
  height: 50,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 8,
  color:'black'
},
icon: {
  marginRight: 5,
  color:'black'
},
label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 22,
  top: 8,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  color:'black'
},
placeholderStyle: {
  fontSize: 16,
  color:'black'
},
selectedTextStyle: {
  fontSize: 16,
  color:'black'
},

inputSearchStyle: {
  height: 40,
  fontSize: 16,
  color:'black'
},
//************Client Screens**********************
//Onboarding
logoStyle:{
  height: moderateScale(60),
  width: moderateScale(150),
  marginBottom: verticalScale(15)
},
searchIcon:{
  height: moderateScale(24),
  width: moderateScale(24)
,},
adviceBox:{
  height: moderateScale(110),
  width: moderateScale(350),
  borderRadius: moderateScale(15),
  marginVertical: verticalScale(12),
  padding: moderateScale(10)
},
newsBox:{
  height: moderateScale(211),
  width: moderateScale(350),
  backgroundColor: '#fff',
  borderRadius: moderateScale(15),
  padding: moderateScale(10),
  marginTop: verticalScale(15)
},
caOnboardingImage:{
  height: moderateScale(115),
  width: moderateScale(140)
},
lawyerOnboardingImage:{
  height: moderateScale(110),
  width: moderateScale(119.41),
  marginTop: verticalScale(20)
},


// News Screen
newsContainer:{
  padding: moderateScale(10),
  borderBottomWidth: moderateScale(1),
  borderBottomColor: '#ffffff30',
  alignContent: 'center',
  alignItems: 'center',
  padding: moderateScale(15),
  borderRadius: moderateScale(10),
  width: horizontalScale(WIDTH)

},
newsImage:{
  height: moderateScale(165),
  width: moderateScale(350),
  borderRadius: moderateScale(15),
},


//Search Screen
searchBar: {
  paddingHorizontal:moderateScale(5),
  //paddingVertical:moderateScale(5),
  flexDirection: 'row', 
  alignItems: 'center',
  width: moderateScale(380),
  backgroundColor: '#E4E3E3',
  borderRadius: moderateScale(50),
  height: moderateScale(40),
  marginBottom: moderateScale(10)
},

// Missed Call Screen
callImage:{
  height:moderateScale(40),
  width: moderateScale(41.6),
  borderRadius: moderateScale(20),
  marginRight: horizontalScale(10)
},
callName:{
  fontSize: moderateScale(16),
  color: colors.black
},
callNameRed:{
  fontSize: moderateScale(16),
  color: 'red'
},
callDirection:{
  fontSize: moderateScale(14),
  color: '#8E8E93'
},
miniCallIcon:{
  height: moderateScale(20),
  width: moderateScale(20),
  resizeMode: 'contain',
  marginRight: horizontalScale(5),
},
detailsLogo:{
  height: moderateScale(22),
  width: moderateScale(22),
  resizeMode: 'contain'
},
callDate:{
  fontSize: moderateScale(14),
  color: '#8E8E93',
  marginRight: horizontalScale(10)
},
filterToggle:{
  height: moderateScale(40),
  width: moderateScale(166),
  borderRadius: moderateScale(15),
  borderWidth: 1,
  borderColor: colors.primaryColor
},
selectedFilter:{
  backgroundColor: colors.primaryColor,
  color: colors.white,
},
unSelectedFilter:{
  backgroundColor: colors.white,
  color: colors.primaryColor,
},
callFilterSelectedText:{
  fontSize: moderateScale(20),
  fontWeight: '600',
  color: colors.white
},
callFilterUnSelectedText:{
  fontSize: moderateScale(20),
  fontWeight: '600',
  color: colors.primaryColor
},
allFilterToggle:{
  width: '50%', 
  height: '100%', 
  borderTopLeftRadius: moderateScale(15), 
  borderBottomLeftRadius: moderateScale(15)
},
missedFilterToggle:{
  width: '50%', 
  height: '100%', 
  borderTopRightRadius: moderateScale(15), 
  borderBottomRightRadius: moderateScale(15)
}
})