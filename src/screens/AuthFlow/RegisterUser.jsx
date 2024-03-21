import { View, Text, StyleSheet, StatusBar, TextInput, ToastAndroid, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { moderateScale } from '../../styles/mixins';
import { Dropdown } from 'react-native-element-dropdown';
import {states, cities} from '../../data/location';
import styles from '../../styles';
import Ripple from 'react-native-material-ripple'
import { registerUser } from '../../actions';
import {BarIndicator} from 'react-native-indicators';
const RegisterUser = (props) => {

    const {phoneNumber,userId} = props.route.params;
    const navigation = useNavigation();
    console.log(phoneNumber);
    const statesData = states;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isFocusState, setisFocusState] = useState(false);
    const [isFocusCity, setisFocusCity] = useState(false);
    const [_state, _setState] = useState('');
    const [_city, _setCity] = useState('');
    const [_stateId, _setStateId] = useState('');
    const [cityData, setCityData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchCities = () =>{

        const citiesData = cities.filter(city => city.stateId == _stateId);
       // console.log(citiesData);
       citiesData.sort(function(a,b){

        return a.cityName.localeCompare(b.cityName);
      })
      
        setCityData(citiesData);
    }

    const RegisterUserDetails = () => {


        if(firstName.length==0 || lastName.length==0 || email.length==0 || _state.length==0 || _city.length==0){

            ToastAndroid.show('One or more fields are empty!',ToastAndroid.SHORT);
            return;
        }
        else{
            setIsLoading(true)
            const data = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                state: _state,
                city: _city,
                email: email,
                jwtToken : userId
            }

            console.log(data)
            props.registerUser(data,navigation)
            setIsLoading(false)
        }
    }
    useEffect(()=>{

        fetchCities();
    },[_stateId])
  return (
    <View style={localStyles.container}>
        <StatusBar backgroundColor='#1B202C'/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={localStyles.heading}>Register</Text>

          <View>
            <Text style={localStyles.inputTitle}>First Name <Text style={{color:'red'}}>*</Text></Text>
            <TextInput 
                placeholder='Type your first name' 
                style={localStyles.inputField}
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>

          <View>
            <Text style={localStyles.inputTitle}>Last Name <Text style={{color:'red'}}>*</Text></Text>
            <TextInput 
                placeholder='Type your last name' 
                style={localStyles.inputField}
                value={lastName}
                onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>

          <View>
            <Text style={localStyles.inputTitle}>Email <Text style={{color:'red'}}>*</Text></Text>
            <TextInput 
                placeholder='Type your email' 
                style={localStyles.inputField}
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize='none'
            />
          </View>

          <View>
            <Text style={localStyles.inputTitle}>State <Text style={{color:'red'}}>*</Text></Text>
                <Dropdown
                    style={[localStyles.dropdown, isFocusState && { borderColor: '#8940ff' }]}
                    placeholderStyle={localStyles.placeholderStyle}
                    selectedTextStyle={localStyles.selectedTextStyle}
                    itemTextStyle={{color:'black'}}
                    data={statesData}
                    maxHeight={300}
                    labelField="stateName"
                    valueField="stateId"
                    placeholder={!isFocusState ? 'Select state' : '...'}
                    value={statesData}
                    onFocus={() => setisFocusState(true)}
                    onBlur={() => setisFocusState(false)}
                    onChange={item => {
                        _setStateId(item.stateId);
                        _setState(item.stateName);
                        setisFocusState(false);
                    }}
                />
          </View>

          <View>
            <Text style={localStyles.inputTitle}>City <Text style={{color:'red'}}>*</Text></Text>
            <Dropdown
                style={[localStyles.dropdown, isFocusCity && { borderColor: '#8940ff' }]}
                placeholderStyle={localStyles.placeholderStyle}
                selectedTextStyle={localStyles.selectedTextStyle}
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
                    //_setStateId(item.stateId);
                    _setCity(item.cityName);
                    setisFocusCity(false);
                }}
            />
          </View>

          <Ripple 
            onPress={RegisterUserDetails}
            style={[styles.loginButton,styles.alignViewCenter, styles.alignItemsCenter,{alignSelf:'center',marginTop:15,overflow:'hidden'}]}
            rippleColor='white'
            
          >
           {isLoading? < BarIndicator color='white' size={20}/>: <Text style={[styles.font_25, styles.textWhite,]}>Next</Text>}
          </Ripple>
        </ScrollView>
      
    </View>
  )
}

const localStyles = StyleSheet.create({

    container:{
        backgroundColor:'#1B202C',
        flex:1,
        paddingTop:moderateScale(45),
        paddingHorizontal:moderateScale(16),
        paddingBottom:moderateScale(35)
    },
    heading:{
        color:'white',
        fontSize: moderateScale(48),
        fontWeight:'500',
        marginBottom:moderateScale(33)
    },
    inputTitle:{
        color:'white',
        fontSize:moderateScale(22)
    },
    inputField:{
        backgroundColor:'white',
        borderRadius:moderateScale(10),
        marginTop:moderateScale(11),
        marginBottom:moderateScale(25),
        height:moderateScale(45),
        overflow:'hidden'

    },
    dropdown: {
        height: 45,
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop:moderateScale(11),
        marginBottom:moderateScale(25),
        color:'black',
        backgroundColor:'white',
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color:'white'
      },
      placeholderStyle: {
        fontSize: 15,
        color:'grey'
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'black'
      }
});

export default connect(null,{
    registerUser
})(RegisterUser);