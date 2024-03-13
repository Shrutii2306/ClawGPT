import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react'
import styles from '../../../styles'
import Background from '../../../assets/background.jpg'
import {launchImageLibrary} from 'react-native-image-picker';
import mime from 'mime';
import UserIcon from '../../../assets/userIcon.png';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/back-button.png'
import {useSelector, connect} from 'react-redux';
import { moderateScale } from '../../../styles/mixins'
import { updateUserProfile } from '../../../actions/userProfile';
import { states,cities } from '../../../data/location';
import { Dropdown } from 'react-native-element-dropdown';

const EditProfile = (props) => {
  
  const navigation = useNavigation();
  const jwtToken = useSelector(state => state.variables.jwtToken);
  const [_firstName, _setFirstName] = useState('')
  const [_lastName, _setLastName] = useState('');
  const [_email, _setEmail] = useState('');
  const [_photo, _setPhoto] = useState({});
  const  [_photoPath, _setPhotoPath] = useState('');
  const data = states;
  const [_idState, _setidState] = useState('');
  const [cityData, setCityData] = useState([]);
  const [_state, _setState] = useState('');
    const [_city, _setCity] = useState('');
    const [_stateId, _setStateId] = useState('');
    const [_pincode, _setPincode] = useState('');
    const [isFocusState, setisFocusState] = useState(false);
    const [isFocusCity, setisFocusCity] = useState(false);

    
    const fetchCities = () =>{

      const citiesData = cities.filter(city => city.stateId == _stateId);
      setCityData(citiesData);
    }

    handleChoosePhoto = async() =>{
      const options = {
          
          title: 'Select Image',
          type : 'library',
          options: {
            selectionLimit : 1,
            mediaType : 'photo',
            includeBase64 :false
          },
      }

     
      //console.log(Platform.OS);
      const res = await launchImageLibrary(options);
      //console.log(res);
      const uriParts = res.assets[0].uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const newImageUri = "file:///" + res.assets[0].uri.split("file:/").join("");
    
      _setPhoto({
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
          uri: newImageUri,
      })
      //console.log('_photo',_photo);
    
      _setPhotoPath(res.assets[0].uri);
  }

  const submitProfile = () =>{
    
    const data = {
        firstName: _firstName,
        lastName : _lastName,
        email : _email,
        photo : _photo,
        jwtToken : jwtToken 
    }

    props.updateUserProfile(data,navigation);

  }

  useEffect(() => {
    fetchCities();
  },[_stateId]);

  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={[styles.container,{backgroundColor: 'white',}]}>
        <ImageBackground 
          source={Background}
          resizeMode='cover'
          style={{justifyContent: 'flex-end', alignItems: 'center', height: 200}}
        >
          <TouchableOpacity 
        style={{alignSelf:'flex-start',top:moderateScale(-80),marginLeft:moderateScale(15)}}
        onPress={() => navigation.navigate('ProfileScreen')}
        >
            <Image 
            source={BackIcon}
            style={{height:moderateScale(50),width:moderateScale(50),borderRadius:moderateScale(25)}}
            />
        </TouchableOpacity> 

          <View style={{justifyContent: 'center', alignItems: 'center', height: moderateScale(140), width: moderateScale(140), borderRadius:moderateScale(70), backgroundColor: 'white',marginBottom: -50}}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image 
                  source={_photoPath ==''? UserIcon : {uri:_photoPath}}
                  style={{height: moderateScale(130), width: moderateScale(130), borderRadius: moderateScale(65)}}
              />
      
            </TouchableOpacity>
            </View>
        </ImageBackground>
        
        {/* name */}
        <View style={{paddingHorizontal:20,marginTop:10}}>
          <View style={[styles.alignViewCenter, styles.alignItemsCenter, {marginTop: 40, width: '100%', flexDirection:'row'}]}>
            <Text style={{fontSize:13,fontWeight:'500',color:'black'}}>Change Picture</Text>          
          </View>
        </View> 

      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              First Name
          </Text>
          <TextInput 
            placeholder='Enter first name...' 
            style={styles2.profileTextInput} 
            value={_firstName}
            onChangeText={(fname) => _setFirstName(fname)}
          />

      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              Last Name
          </Text>
          <TextInput 
            placeholder='Enter last name...' 
            style={styles2.profileTextInput} 
            value={_lastName}
            onChangeText={(lname) => _setLastName(lname)}
          />

      </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              Email ID
          </Text>
          <TextInput 
            placeholder='example@gmail.com' 
            style={styles2.profileTextInput} 
            value={_email}
            onChangeText={(email) => _setEmail(email)}
          />

      </View>
      
      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              Address
          </Text>
          <TextInput 
            placeholder='---' 
            style={styles2.profileTextInput} 
            // value={_email}
            // onChangeText={(email) => _setEmail(email)}
          />

      </View>

      <View style={{paddingTop:20,paddingHorizontal:20,}}>
        <Text style={[{color:'black'} ]}>
          State 
        </Text>
                   
        <Dropdown
          style={[styles2.dropdown, isFocusState && { borderColor: 'blue' }]}
          placeholderStyle={styles2.placeholderStyle}
          selectedTextStyle={styles2.selectedTextStyle}
          inputSearchStyle={styles2.inputSearchStyle}
          labelStyle={{color:'black'}}
          itemTextStyle={{color:'black'}}
          data={data}
          maxHeight={300}
          labelField="stateName"
          valueField="stateId"
          placeholder={!isFocusState ? 'Select state' : '...'}
          value={data}
          onFocus={() => setisFocusState(true)}
          onBlur={() => setisFocusState(false)}
          onChange={item => {
          _setStateId(item.stateId);
          _setState(item.stateName);
          setisFocusState(false);
          }}
        />
                                            
      </View>
      
      <View style={{paddingTop:20,paddingHorizontal:20,}}>
        <Text style={[{color:'black'} ]}>
          City 
        </Text>
          <Dropdown
            style={[styles2.dropdown, isFocusCity && { borderColor: 'blue' }]}
            placeholderStyle={styles2.placeholderStyle}
            selectedTextStyle={styles2.selectedTextStyle}
            inputSearchStyle={styles2.inputSearchStyle}
            labelStyle={{color:'black'}}
            itemTextStyle={{color:'black'}}
            data={cityData}
            maxHeight={300}
            labelField="cityName"
            valueField="cityId"
            placeholder={!isFocusCity? 'Select city' : '...'}
            value={cityData}
            onFocus={() => setisFocusCity(true)}
            onBlur={() => setisFocusCity(false)}
            onChange={item => {
              _setCity(item.cityName);
              setisFocusCity(false);
            }}
          />
        </View>

      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={{color:'black'}}>
              Pincode
          </Text>
          <TextInput 
            placeholder='000000' 
            style={styles2.profileTextInput} 
            // value={_email}
            // onChangeText={(email) => _setEmail(email)}
            keyboardType='number-pad'
            maxLength={6}
          />

      </View>

      <TouchableOpacity
        style={{
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:moderateScale(12),
            backgroundColor:'#8940FF',
            borderRadius:10,
            width:'75%',
            alignSelf:'center',
            marginTop:moderateScale(44),
            marginBottom:moderateScale(20)
        }}

        onPress={submitProfile}
      >
        <Text 
        style={{color:'white',fontSize:moderateScale(21),fontWeight:'bold'}}>
          Update
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles2 = StyleSheet.create({

    profileTextInput :{

        color: 'black',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#0000001A',
        marginTop:5,
        height:moderateScale(55),
        paddingHorizontal:moderateScale(15)
    },
    inputLabel:{

      fontSize: 15,
      color:'white',
      color:'black'
  },
  input : {
      borderColor: 'grey',
      marginTop:10,
      color:'white',
      color:'black'    
  },
 
  signupLink:{

      color: 'blue',
      textAlign:'center'
  },
  container:{

      flex:1,
      justifyContent: 'center',
      backgroundColor: 'black',
      color:'black'
  },
  dropdown: {
      height: 50,
      borderColor: 'rgba(137, 64, 255, 0.3)',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginTop:10,
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
    iconStyle: {
      width: 20,
      height: 20,
      color:'black'
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color:'black'
    },
  heading : {

      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom:30,
      marginTop:60,
      color:'black'

  },
  errorMessage : {

      fontSize: 16,
      color:'red',
      textAlign:'center'
  },
  textInput:{
      borderColor:'rgba(137, 64, 255, 0.3)',
      borderWidth:1,
      borderRadius:10,
      height:45,
      textAlign:'center',
      fontSize:15,
      textAlign:'left',
      paddingLeft:15,
      marginTop:5,
      color:'black'
  }
})

export default connect(null, {
  updateUserProfile
})(EditProfile);