import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, Icon, Image, ScrollView} from 'react-native';
import {AsyncStorage} from 'react-native';
import GoalsListView from './CustomComponents/GoalsListView'
import Moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GoalsListRow from './CustomComponents/GoalsListRow';
import CardView from 'react-native-cardview'
import ActionsListView from './CustomComponents/Actions/ActionsListView'

export default class GoalActionsList extends Component<Props> {

  static navigationOptions = {
        title: '',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerTitleStyle: {textAlign:"center",flex:1},
        headerStyle:{backgroundColor:'#00d08e'},
        headerTintColor: 'white',
  };

  constructor(props){
    super(props);
    this.state = { isLoading: false}
    this.onPressAddGoalButton = this.onPressAddGoalButton.bind(this);
    this.state.myCheckInsArray = []
    this.state.partnerCheckInsArray = []
    this.onPressYesButton = this.onPressYesButton.bind(this);
    this.state = { isYesSelect: false}
  }

 componentDidMount = () => {
   // console.warn("componentDidMount");
    const {navigate} = this.props.navigation
    const {params} = this.props.navigation.state
    this.state = {
         text: 'text',
         navigateParam: this.props,
         selectedGoalItem: params.item
    }
    // AsyncStorage.multiGet(['employeeID','championID']).then((data) => {
    //    if(data.length > 0) {
    //     // console.warn("isLogin")
    //     let employeeID = data[0][1];
    //     let championID = data[1][1];
    //     if(employeeID != null) {
    //       this.state.employeeID = JSON.parse(employeeID)
    //       this.state.championID = JSON.parse(championID)
    //       this.startFecthingCheckInLookups()
    //     }
    //    }
    //    else {
    //      console.warn("not Login")
    //    }
    // });

 }

  onPressAddGoalButton() {

  }

  showGoalContent(item) {
    progress = 0
    return(
      <View>
        <View style={{margin: 0, backgroundColor: '#F8F8F8'}}
        cornerRadius={0}>
          <View>
            <View style={{flexDirection:  'row',backgroundColor: 'transparent'}}>
              <View style={{flexDirection:  'row',marginTop: 10, marginLeft: 10,width:60,height: 60, borderRadius: 30, backgroundColor:"transparent",position:'absolute'}}>
                <Text style={{flex:1,textAlignVertical: "center",textAlign: "center",fontSize: 12, color: '#555555',justifyContent: "center",alignItems: "center"}}>{progress}%</Text>
                <AnimatedCircularProgress
                style={{flex: 1,marginLeft: -60}}
                size={60}
                width={5}
                fill={progress}
                tintColor="#555555"
                onAnimationComplete={() => edf=''}
                backgroundColor="#AAAAAA" />
              </View>
              <View style={{marginLeft: 70}}>
                <Text style={{marginTop: 10, marginLeft: 10,fontSize: 14, color: '#222222'}}>{item.name}</Text>
                <Text style={{marginTop: 10, marginLeft: 10,fontSize: 14, color: '#222222'}}>{item.lkup_GoalTypeValue}</Text>
                <Text style={{marginTop: 10, marginLeft: 10,fontSize: 14, color: '#222222'}}>{item.lkup_GoalStatusValue} (Due: {item.dueDate}) </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{marginHorizontal: 10, padding: 10}}>
                <Text style={{fontSize: 14}}>{item.description}
                </Text>
              </View>
            </View>
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'right',fontSize: 12,marginRight: 10}}>{item.goalActions.length} Actions</Text>
          </View>
          <View key ='seperator' style={{marginTop:5, marginBottom: 10,height: 1,  width: '100%', backgroundColor: '#E8E8E8',justifyContent: 'space-between'}}></View>
          <View style={{ backgroundColor: 'transparent'}}>
                {this.showActions(item.goalActions)}
          </View>
          </View>
        </View>
      </View>
    )
  }

  changeActionCompletedState (isCompleted) {
    if(isCompleted == 1) {
      return (
        <Image style={{height: 20,width: 20}}
        source={require('../../images/ic_radio_on.png')}
        />
      )
    }
    else if(isCompleted == 0 ) {
      return (
        <Image style={{height: 20,width: 20}}
        source={require('../../images/ic_radio_off.png')}
        />
      )
    }
  }

  onPressYesButton() {
    // if(this.state.isYesSelect) {
    //   this.setState({
    //     isYesSelect: false
    //   }, function(){
    //   });
    // }
    // else {
    //   this.setState({
    //     isYesSelect: true
    //   }, function(){
    //   });
    // }
  }

  renderProfilePic(pictureURL) {
   if(pictureURL == ""){
       return(
         <Image style={styles.profileImg}
         source={require('../../images/NoPhoto.jpg')}
         />
       );
   }else{
     console.warn(pictureURL);
       return(
         <Image style={styles.profileImg}
         source={{uri: pictureURL}}
         />
       );
   }
 }

  renderActionAddView(pictureURL) {
    return (
      <View key='actionadd' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,marginBottom: 10,borderRadius: 5, borderWidth: 0, borderColor: 'gray'}}>
        {this.renderProfilePic(pictureURL)}
        <View key='textInput' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
          <TextInput
            style={{height: 40, marginLeft: 5, width: '85%',marginRight: 10 }}
            placeholder="Write goal Action.."
            placeholderTextColor="gray"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
      </View>
    )
  }

  showActions(actionsArray) {
    var myloop = [];
    for (let i = 0; i < actionsArray.length; i++) {
      actionObj = actionsArray [i]
      myloop.push(
       <View key={i} style={{flexDirection:  'row',marginTop: 10, marginLeft: 10, marginBottom: 10}}>
       <TouchableOpacity style={{alignItems: 'center'}} backgroundColor='#00d08e' onPress={this.onPressYesButton}>
          {this.changeActionCompletedState(actionObj.isCompleted)}
       </TouchableOpacity>
       <Text style={{ marginLeft: 10,textAlign: 'center', marginTop: 0,fontSize: 14, color: '#222222' }} >{actionObj.actionName}</Text>
       </View>
     );
   }
   return myloop
 }

  render() {
    // console.warn("render");
    // console.warn(this.props.navigation);
    if(this.state.isLoading){
     return(
       <View style={{flex: 1, padding: 20}}>
         <ActivityIndicator/>
       </View>
     )
   }


   const {params} = this.props.navigation.state
   selectedGoalItem =  params.item
   // console.warn(selectedGoalItem);

    return (
      <View style={{flex: 1, flexDirection: 'column',justifyContent: 'space-between',  justifyContent: 'center',
        alignItems: 'stretch',}}>
        <CardView style={{margin: 10, backgroundColor: '#F8F8F8',height: '95%'}}
        cardElevation={1}
        cardMaxElevation={1}
        cornerRadius={0}>
          <ScrollView style={{paddingVertical: 0}}>
              {this.showGoalContent(selectedGoalItem)}
          </ScrollView>
        {this.renderActionAddView(selectedGoalItem.pictureURL)}
        </CardView>
      </View>

    );
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
 },
 profileImg: {
   marginTop: 10,
   height: 40,
   width: 40,
   borderRadius: 20,
 },
});
