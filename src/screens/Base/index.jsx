 import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewsScreen from '../user/NewsScreen';
import LegalGPTScreen from '../user/LegalGPTScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createDrawerNavigator } from '@react-navigation/drawer';
import SignupUser from '../AuthFlow/SignupUser';
import AuthFlow from '../AuthFlow/AuthFlow';
import NewsDetail from '../user/NewsScreen/NewsDetail';
import InitialLandingScreen from './InitialLandingScreen';
import GPTCustomDrawer from '../../components/GPTCustomDrawer';
import GPTProfileScreen from '../user/LegalGPTScreen/GPTProfileScreen';
import RegisterUser from '../AuthFlow/RegisterUser';
const UserCall = createNativeStackNavigator();
const Root = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tab2 = createBottomTabNavigator();
const News = createNativeStackNavigator();
const UserNews = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function SignupFlow  ()  {

  return(

    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen component={AuthFlow} name="Auth" />   
      <Stack.Screen component={SignupUser} name="SignupUser"/>
      <Stack.Screen component={RegisterUser} name='RegisterUser' />
      <Stack.Screen component={GPTFlow} name='UserFlow' />
    </Stack.Navigator>
  )

 
}

function GPTFlow() {

  return(

    <Drawer.Navigator 
      screenOptions={{
      drawerStyle: {
        width: 250,
      },headerShown:false,
      drawerPosition:'right'
      }} drawerContent={(props) => <GPTCustomDrawer {...props}/>}> 
      <Drawer.Screen component={LegalGPTScreen} name='Legal GPT' options={{headerShown:false}}/>
      <Drawer.Screen component={NewsScreen} name="NewsScreen" />
      <Drawer.Screen component={NewsDetail} name='NewsDetail' />
      <Drawer.Screen component={GPTProfileScreen} name='GPTProfileScreen' />
    </Drawer.Navigator>
  )
}

function AppFlow () {

  return (
    <AppStack.Navigator screenOptions={{headerShown:false}}>
      <AppStack.Screen  component={InitialLandingScreen} name='InitialLandingScreen'/>
      <AppStack.Screen component={SignupFlow} name='SignupFlow' />
      <AppStack.Screen component={GPTFlow} name='UserFlow' />
    </AppStack.Navigator>
  )
}
function Base() {
    return (
       <NavigationContainer>
         <Root.Navigator screenOptions={{ headerShown: false }}>
          <Root.Screen component={AppFlow} name="AppFlow" />
        
         </Root.Navigator>
       </NavigationContainer>
    );
   }

export default Base