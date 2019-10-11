import React, { Component } from 'react';
import { AsyncStorage, View, Text, Button, TouchableOpacity, ActivityIndicator, FlatList,StyleSheet, Image, Alert} from 'react-native';
import firebase from 'react-native-firebase';
import {NativeModules, NativeEventEmitter} from 'react-native';
var DownloadManager = NativeModules.DownloadManager;
// import CardView from 'react-native-cardview'
// import Moment from 'moment';
import {plusSlides} from '../helpers/FirebaseNotification'
import RNRestart from 'react-native-restart';
const RNFS = require('react-native-fs')
// const FileDownload = require('react-native-file-download')


export class Dashboard extends Component {

  static navigationOptions = {
        title: 'THRIVE',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerTitleStyle: {textAlign:"center",flex:1},
        headerStyle:{backgroundColor:'#00d08e'},
        headerLeft: null,
        headerTintColor: 'white',
  };

  constructor(props){
    super(props);
    this.onPressGoalListButton = this.onPressGoalListButton.bind(this);
    this.state = { isLoading: false}
    this.state = { dataSource: []}
  }

  componentDidMount(){
    const {navigate} = this.props.navigation;
    console.log("Dashboard componentDidMount");
    plusSlides(1);
  }

  async componentDidMount() {
    // console.log("componentDidMount");
    this.checkPermission();
     this.createNotificationListeners(); //add this line
     firebase.messaging().getToken().then((token) => {
         console.log("token",token);
         this.addFCMToken(token)
      });

      firebase.messaging().onTokenRefresh((token) => {
          console.log("onTokenRefresh",token);
          this.addFCMToken(token)
      });
      this.fetchMicroAppsDetails()

      const myModuleEvt = new NativeEventEmitter(DownloadManager)
      myModuleEvt.addListener('sayHello', (data) =>
      {
        console.log("NativeEventEmitter",data)
        RNRestart.Restart();
      })
  }

  addFCMToken(token) {
    fcmtokenJson = {"UserId":"","DeviceToken" : token }
    console.log("fcmtokenJson Input",JSON.stringify(fcmtokenJson));
    return fetch(saveTokenUrl, {
      method: 'post',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
      body: JSON.stringify(fcmtokenJson)
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log("fcmtokenJson Output",JSON.stringify(responseJson));
      // console.log('length',responseJson.length);
      // if(responseJson.length > 0) {
      //   this.props.navigation.navigate('CheckInListScreen');
      // }

    })
    .catch((error) =>{
      console.error(error);
    });

  }

  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }
    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log("foreground",title, body);
        this.receivePushNotification(title, body)
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log("background clicked",title, body);
        this.receivePushNotification(title, body)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log("closed clicked",title, body);
        this.receivePushNotification(title, body)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      // this.showAlert();
      console.log("foreground - payload",JSON.stringify(message));
      console.log("foreground - payload",message)
    });
  }
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  receivePushNotification(title, body) {

    this.showAlert(title, body);
    if(title.includes("New Goal added")) {
      this.props.navigation.navigate('GoalsListScreen')
    }
    else {
      DownloadManager.addEvent(title, 'Downloading');
      // RNRestart.Restart();
    }

  }

  onPressGoalListButton() {
    console.log("onPressGoalListButton");
    this.props.navigation.navigate('GoalsListScreen')
  }

  onPressDownloadButton() {
    console.log("onPressDownloadButton....");
    DownloadManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');

  }

  fetchMicroAppsDetails() {
    console.log("fetchMicroAppsDetails");
    return fetch(appsListUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson",responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });


  }

  render() {

    console.log("",this.state.dataSource);
    // return (
    //   <View style={{flex: 1, padding: 20}}>
    //     <View style={[styles.MainContainer, { alignItems: 'center' }]}  id="goals">
    //         <Text style={{marginTop: 10, alignItems: 'center', fontSize: 18, fontWeight: 'bold'}}>No Apps</Text>
    //     </View>
    //   </View>
    // )


    if(this.state.dataSource.length == 0) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <View style={[styles.MainContainer, { alignItems: 'center' }]}  id="goals">
              <Text style={{marginTop: 10, alignItems: 'center', fontSize: 18, fontWeight: 'bold'}}>No Apps</Text>
          </View>
        </View>
      )
    }
    else {
      return(
        <View style={{flex: 1, padding: 20}}>
          <View style={[styles.MainContainer, { alignItems: 'center' }]}  id="goals">
          <TouchableOpacity onPress={this.onPressGoalListButton}>
            <View id="goals" style={[styles.MainContainer, { alignItems: 'center' }]}>
              <Image style={{width:60,height:60}} source={require('../images/appicon.png')}/>
              <Text style={{marginTop: 10, alignItems: 'center'}}>Goals</Text>
            </View>
            </TouchableOpacity>
          </View>

        </View>
      )
    }



    // <TouchableOpacity onPress={this.onPressDownloadButton}>
    //   <Text style={{marginTop: 10, alignItems: 'center'}}>Download</Text>
    // </TouchableOpacity>
    // return(
    //   <View style={{flex: 1, padding: 20}}>
    //     <View style={[styles.MainContainer, { alignItems: 'center' }]}  id="goals">
    //     <TouchableOpacity onPress={this.onPressGoalListButton}>
    //       <View id="goals" style={[styles.MainContainer, { alignItems: 'center' }]}>
    //         <Image style={{width:60,height:60}} source={require('../images/appicon.png')}/>
    //         <Text style={{marginTop: 10, alignItems: 'center'}}>Goals</Text>
    //       </View>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // )
  }

};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  //MARK:- Profile Image styles
  profileImgContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 82,
    width: 82,
    borderRadius: 40,
    borderWidth: 0
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },

  //MARK:- Align center
  buttonImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
