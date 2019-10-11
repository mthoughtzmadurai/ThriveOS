import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, Icon, Image, FlatList} from 'react-native';
import {AsyncStorage} from 'react-native';
import GoalsListView from './CustomComponents/GoalsListView'
import Moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {NavigationEvents} from 'react-navigation';
import GoalsListRow from './CustomComponents/GoalsListRow';

export default class GoalsList extends Component<Props> {

 static navigationOptions = {
        title: 'Goals',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerTitleStyle: {textAlign:"center",flex:1},
        headerStyle:{backgroundColor:'#00d08e'},
        headerTintColor: 'white',
  };

 constructor(props){
    super(props);
    this.state = { isLoading: true}
    this.onPressAddGoalButton = this.onPressAddGoalButton.bind(this);
    this.state.goalsArray = []
    this.state.partnerCheckInsArray = []
    this.state.lookupArray = []
    this.state.offset = '0'
  }

  componentWillMount ()  {

  }

  componentWillUnmount () {
    this.focusListener.remove()
  }

  onFocusFunction = () => {
  // do some stuff on every screen focus
    console.log("every screen focus");
    this.startFetchingGoalsLookup()
  }

  async componentDidMount () {
    const {navigate} = this.props.navigation

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

 // async componentDidMount = () => {
 //   // console.warn("componentDidMount");
 //    const {navigate} = this.props.navigation
 //    // this.tempGoalsArray()
 //    // AsyncStorage.multiGet(['employeeID','championID','pictureURL','name']).then((data) => {
 //    //    if(data.length > 0) {
 //    //     // console.warn("isLogin",data)
 //    //     let employeeID = data[0][1];
 //    //     let championID = data[1][1];
 //    //     let pictureURL = data[2][1];
 //    //     let name = data[3][1];
 //    //
 //    //     if(employeeID != null) {
 //    //       this.state.employeeID = JSON.parse(employeeID)
 //    //       this.state.championID = JSON.parse(championID)
 //    //       this.state.pictureURL = JSON.parse(pictureURL)
 //    //       this.state.name = JSON.parse(name)
 //    //
 //          this.startFetchingGoalsLookup()
 //    //     }
 //    //    }
 //    //    else {
 //    //      console.warn("not Login")
 //    //    }
 //    // });
 //
 //    this.focusListener = this.props.navigation.addListener('didFocus', () => {
 //      this.onFocusFunction()
 //    })
 // }

 startFetchingGoalsLookup() {
   this.setState({isLoading: true,});
   return fetch(goalslookupdataUrl, {
     method: 'get'
   }).then((response) => response.json())
   .then((responseJson) => {
     goalType = responseJson.data
     // console.log("startFetchingGoalsLookup",goalType);
     this.setState({
       isLoading: false,
       lookupArray: goalType,
     }, function(){
     });
     this.startFetchingGoalsList()
   })
   .catch((error) =>{
     console.error(error);
   });
   // console.warn("Out",responseJson);
 }

  startFetchingGoalsList() {
    return fetch(listgoalsUrl, {
      method: 'get'
    }).then((response) => response.json())
    .then((responseJson) => {
      // console.log("In",responseJson);
      console.log("startFetchingGoalsList.......");
      this.parseDataSource(responseJson.data)
      this.setState({
        isLoading: false,
        dataSource: responseJson.data,
      }, function(){
      });
    })

    .catch((error) =>{
      console.error(error);
    });

    // console.warn("Out",responseJson);
  }

  onPressAddGoalButton() {
    // console.warn(this.state.employeeID,this.state.championID , this.state.pictureURL,this.state.name)

    // this.props.navigation.navigate('AddGoalScreen', {
    //                               employeeID: this.state.employeeID,
    //                               championID: this.state.championID,
    //                               pictureURL: this.state.pictureURL,
    //                               name: this.state.name});
    this.props.navigation.navigate('AddGoalScreen',{lookupArray: this.state.lookupArray})
    console.log("onPressAddGoalButton");
  }

  tempGoalsArray() {
    dueDateM = "Feb 2019"
    createdDate = "Feb 2019"
    modDate = "Feb 2019"
    iD = "11"
    userID = "14078"
    title = "Archi"
    name = "Murali"
    description = "Archi Archi Archi Archi"
    goalStatus = "In Progress"
    goalType = "type"
    isDeleted = "N"
    createdUser = "Murali"
    modUser = "Murali"
    source = "Web"
    goalCmtCount = "5"
    viewMoreClickCount = "0"
    user = "0"
    pictureURL = "e"
    lkup_GoalType = "lkup_GoalType"
    lkup_GoalStatus = "lkup_GoalStatus"
    goalActionsArray = ["Actions1","Actions2","Actions3"]
    goalCommentsArray = ["Comments1","Comments2","Comments3"]
    lkup_GoalTypeValue = "lkup_GoalTypeValue"
    lkup_GoalStatusValue = "lkup_GoalTypeValue"
    tmp_array = { dueDate: dueDateM,
                  createdDate: createdDate,
                  modDate:modDate,
                  iD:iD,
                  userID: userID,
                  title: title,
                  name: name,
                  description: description,
                  goalStatus: goalStatus,
                  goalType: goalType,
                  isDeleted:isDeleted,
                  createdUser:createdUser,
                  modUser: modUser,
                  source: source,
                  goalCmtCount: goalCmtCount,
                  viewMoreClickCount: viewMoreClickCount,
                  user: user,
                  pictureURL: user.PictureURL,
                  lkup_GoalType: lkup_GoalType,
                  lkup_GoalStatus: lkup_GoalStatus,
                  goalActions: goalActionsArray,
                  goalComments: goalCommentsArray,
                  lkup_GoalTypeValue: lkup_GoalTypeValue,
                  lkup_GoalStatusValue: lkup_GoalStatusValue
                }
    console.log("tmp_array",tmp_array);

    array = []
    array.push(tmp_array)
    this.setState({
      goalsArray: array,
    }, function(){
    });
    console.log("length",this.state.goalsArray.length);

  }

  parseDataSource(dataSource) {
    console.log("parseDataSource",dataSource.length);
    array = []
    dataSource.map((obj) => {
       goalActionsArray = []
       goalCommentsArray = []
       dueDate = obj.DueDate
       createdDate = obj.CreatedDate
       modDate = obj.ModDate
       iD = obj.ID
       userID = obj.UserID
       title = obj.Title
       name = obj.Name
       description = obj.Description
       goalStatus = obj.GoalStatus
       goalType = obj.GoalType
       isDeleted = obj.IsDeleted
       createdUser = obj.CreatedUser
       modUser = obj.ModUser
       source = obj.Source
       dueDateM = Moment(dueDate).format('MMMM YYYY')
       tmp_array = { dueDate: dueDateM,
                     createdDate: createdDate,
                     modDate:modDate,
                     iD:iD,
                     userID: userID,
                     title: title,
                     name: name,
                     description: description,
                     goalStatus: goalStatus,
                     goalType: goalType,
                     isDeleted:isDeleted,
                     createdUser:createdUser,
                     modUser: modUser,
                     source: source,
                   }
     array.push(tmp_array)
     })

     this.setState({
       goalsArray: array.reverse(),
     }, function(){
     });
     console.log("goalsArray.....",this.state.goalsArray.length);
  }

  onRefresh() {
     this.setState({ isLoading: true }, function() { this.startFetchingGoalsList() });
  }


  render() {
    // this.parseDataSource()
    // console.warn("render");
    // console.warn(this.props.navigation);
  <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
   if(this.state.isLoading){
       return(
         <View style={{flex: 1, padding: 20}}>
           <ActivityIndicator/>
         </View>
       )
     }
  else {
   return (
      <View style={{flex: 1, flexDirection: 'column',justifyContent: 'space-between',  justifyContent: 'center',
        alignItems: 'stretch',}}>

         <FlatList
             data={this.state.goalsArray}
             onRefresh={() => this.onRefresh()}
             refreshing={this.state.isLoading}
             extraData={this.state.goalsArray}
             renderItem={({ item}) => <GoalsListRow
                 name={item.name}
                 lkup_GoalTypeValue={item.lkup_GoalTypeValue}
                 lkup_GoalStatusValue={item.lkup_GoalStatusValue}
                 description={item.description}
                 progress = {60}
                 dueDate = {item.dueDate}
                 item = {item}
                 params = {this.props.navigation}
             />}
         />

          <View style={{width:60, borderRadius: 30, backgroundColor:"#00d08e",position:'absolute',top:"80%",left:"80%"}}>
              <TouchableOpacity style={{width:60, borderRadius: 30, backgroundColor:"#00d08e", shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0}} onPress={this.onPressAddGoalButton}>
              <Image style={{width:60}} source={require('../../images/ic_add_white.png')}/>
              </TouchableOpacity>
          </View>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  button: {
   marginBottom: 30,
   width: 260,
   alignItems: 'center',
   backgroundColor: '#2196F3'
 },
 buttonText: {
   padding: 20,
   color: 'white'
 }
});
