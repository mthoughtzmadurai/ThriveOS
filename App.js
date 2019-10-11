/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  AppRegistry,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import {NativeModules} from 'react-native';
var DownloadManager = NativeModules.DownloadManager;
import { StackNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Dashboard from './screens/Dashboard'
import GoalsList from './microapps/Goals/GoalsList'
import AddGoal from './microapps/Goals/AddGoal'
import GoalActionsList from './microapps/Goals/GoalActionsList'

// appsListUrl = "http://172.20.10.11:8000/api/v1/apps/list"
// goalslookupdataUrl = "http://172.20.10.11:8000/api/v1/goals/lookupdata"
// listgoalsUrl = "http://172.20.10.11:8000/api/v1/goals/listgoals"
// addgoalUrl = "http://172.20.10.11:8000/api/v1/goals/addgoal"
// saveTokenUrl = "http://172.20.10.11:8000/api/v1/administrator/saveToken"
// appsListUrl = "http://192.168.0.101:8000/api/v1/apps/list"
// goalslookupdataUrl = "http://192.168.0.101:8000/api/v1/goals/lookupdata"
// listgoalsUrl = "http://192.168.0.101:8000/api/v1/goals/listgoals"
// addgoalUrl = "http://192.168.0.101:8000/api/v1/goals/addgoal"
// saveTokenUrl = "http://192.168.0.101:8000/api/v1/administrator/saveToken"

appsListUrl = "http://thrive2.us-east-1.elasticbeanstalk.com/api/v1/apps/list"
goalslookupdataUrl = "http://thrive2.us-east-1.elasticbeanstalk.com/api/v1/goals/lookupdata"
listgoalsUrl = "http://thrive2.us-east-1.elasticbeanstalk.com/api/v1/goals/listgoals"
addgoalUrl = "http://thrive2.us-east-1.elasticbeanstalk.com/api/v1/goals/addgoal"
saveTokenUrl = "http://thrive2.us-east-1.elasticbeanstalk.com/api/v1/administrator/saveToken"


// export default class App extends Component {
//
// async componentDidMount() {
//   this.checkPermission();
//    this.createNotificationListeners(); //add this line
//    firebase.messaging().getToken().then((token) => {
//        console.log("token",token);
//     });
//
//     firebase.messaging().onTokenRefresh((token) => {
//         console.log("onTokenRefresh",token);
//     });
// }
//
// componentWillUnmount() {
//   this.notificationListener();
//   this.notificationOpenedListener();
// }
//   //1
// async checkPermission() {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//       this.getToken();
//   } else {
//       this.requestPermission();
//   }
// }
//
//   //3
// async getToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
// }
//
// async createNotificationListeners() {
//   /*
//   * Triggered when a particular notification has been received in foreground
//   * */
//   this.notificationListener = firebase.notifications().onNotification((notification) => {
//       const { title, body } = notification;
//       console.log("foreground",title, body);
//
//
//       DownloadManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
//
//       this.showAlert(title, body);
//   });
//
//   /*
//   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//   * */
//   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body } = notificationOpen.notification;
//       console.log("background clicked",title, body);
//       DownloadManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
//       this.showAlert(title, body);
//   });
//
//   /*
//   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//   * */
//   const notificationOpen = await firebase.notifications().getInitialNotification();
//   if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//       console.log("closed clicked",title, body);
//       DownloadManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
//       this.showAlert(title, body);
//   }
//   /*
//   * Triggered for data only payload in foreground
//   * */
//   this.messageListener = firebase.messaging().onMessage((message) => {
//     //process data message
//     // this.showAlert();
//     console.log("foreground - payload",JSON.stringify(message));
//     console.log("foreground - payload",message)
//   });
// }
//
//   //2
// async requestPermission() {
//   try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//   }
// }
//
// showAlert(title, body) {
//   Alert.alert(
//     title, body,
//     [
//         { text: 'OK', onPress: () => console.log('OK Pressed') },
//     ],
//     { cancelable: false },
//   );
// }
//
// render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>Welcome to React Native!</Text>
//         <Text>Welcome to React Native!</Text>
//         <Text>Welcome to React Native!</Text>
//         <Text>Welcome to React Native!</Text>
//         <Text>Welcome to React Native!</Text>
//         <TouchableOpacity onPress = {this.showAlert} style = {styles.button}>
//          <Text>Alert</Text>
//       </TouchableOpacity>
//       </View>
//     );
// }
//
// }

const MainNavigator = createStackNavigator({
  DashboardScreen: {screen: Dashboard},
  GoalsListScreen: {screen: GoalsList},
  AddGoalScreen: {screen: AddGoal},
  GoalActionsListScreen: {screen: GoalActionsList},
});

const App = createAppContainer(MainNavigator);

export default App;


const styles = StyleSheet.create ({
   button: {
      backgroundColor: '#4ba37b',
      width: 100,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 100
   }
})
