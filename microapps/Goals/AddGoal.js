import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity,TouchableHighlight, Icon, ActivityIndicator} from 'react-native';
import {AsyncStorage} from 'react-native';
import CardView from 'react-native-cardview'
import CheckBox from 'react-native-check-box'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Container, Header, Content, Picker, Form } from "native-base";


export default class AddGoal extends Component<Props> {

    static navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};

    return {
      title:       params.title,
      headerRight: params.headerRight,
      headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
      headerTitleStyle: {textAlign:"center",flex:1},
      headerStyle:{backgroundColor:'#00d08e'},
      headerTintColor: 'white',
    }
  }

  _setNavigationParams() {
    let title       = 'Add Goal';
    let headerLeft  = <Button title="headerLeft" onPress={this._clearForm.bind(this)} />;
    let headerRight =
    <TouchableOpacity style={{width:60,backgroundColor:"transparent"}} onPress={this.onPressAddGoalButton.bind(this)} >
      <Text style={{marginTop: 10, marginLeft: 10,fontSize: 16, color: '#ffffff'}}>Add</Text>
    </TouchableOpacity>;


    this.props.navigation.setParams({
      title,
      headerLeft,
      headerRight,
    });
  }

  constructor(props){
    super(props);
    currentDate = new Date().toLocaleString()
    this.state = {goalNameText: ''}
    this.state = {date: Moment(currentDate).format('DD MMMM YYYY')}
    this.state = {goalType: ''}
    this.state = {goalDescText: ''}
    this.state = {goalTypeArray: []}
    this.state = { isLoading: false}
  }

  componentDidMount = () => {
    this._setNavigationParams();
     const {navigate} = this.props.navigation;
     this.props.navigation.setParams({ onPressAddGoalButton: this.onPressAddGoalButton, goalNameText: '',dueDate: '', goalType: ''  })
     const {params} = this.props.navigation.state
     lookupArray = params.lookupArray
     goalTypeArray = lookupArray.GoalType
     this.setState({ goalTypeArray: goalTypeArray})
   }

   _clearForm() {
     // Clear form code...
    console.log("_clearForm");
  }



  onPressAddGoalButton() {
    // Submit form code...
    console.log("onPressAddGoalButton", this.props.navigation.state.params);
    name = this.props.navigation.state.params.goalNameText
    dueDate = this.props.navigation.state.params.dueDate
    goalType = this.props.navigation.state.params.goalType


    if(name.length==0) {
        Alert.alert(
        'Please fill Goal Name',
        '',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
        );
    }
    else if(dueDate.length==0) {
        Alert.alert(
        'Please fill Goal DueDate',
        '',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
        );
    }
    else if(goalType.length==0) {
        Alert.alert(
        'Please fill Goal Type',
        '',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
        );
    }
    else {
      this.setState({isLoading: true})
      addGoalJson = {"UserID": 926, "Name": name, "DueDate": dueDate, "GoalType": goalType}
      console.log("addGoal Input",addGoalJson);
        return fetch(addgoalUrl, {
          method: 'post',
          headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
          body: JSON.stringify(addGoalJson)
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log("addgoal Output",JSON.stringify(responseJson));
          this.props.navigation.goBack()

          // setTimeout(navigateToList, 1000);

          // console.log('length',responseJson.length);
          // if(responseJson.length > 0) {
          //   this.props.navigation.navigate('CheckInListScreen');
          // }

        })
        .catch((error) =>{
          console.error(error);
        });
    }
  }



  renderProfilePic = () => {
    if(pictureURL == ""){
      // console.warn("NO");
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

  getCurrentDate(){
     currentDate = new Date().toLocaleString()
     Moment.locale('en')
     checkInDate = Moment(currentDate).format('DD MMMM YYYY')
     // console.warn(checkInDate);
     return checkInDate
  }

  showGoalTypeDropdown() {

    // console.warn("showGoalTypeDropdown",this.state.goalTypeArray);
    if (typeof(this.state.goalTypeArray) !== 'undefined') {

      return(
        <Picker
        style={{height: 40, width: '100%'}}
        mode="dropdown"
        placeholder="Goal Type"
        selectedValue={this.state.goalType}
        onValueChange={(itemValue, itemIndex) => {
            this.setState({goalType: itemValue})
            this.props.navigation.setParams({ goalType: itemValue })
          }
        }>
        {this.state.goalTypeArray.map((item, index) => {
          return (<Picker.Item label={item.Value} value={item.ID} key={index}/>)
        })}
        </Picker>
      )
    }

  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1, flexDirection: 'column',justifyContent: 'space-between',  justifyContent: 'center',alignItems: 'center'}}>
          <CardView style={{width: '95%', height: '95%'}}
          cardElevation={10}
          cardMaxElevation={10}
          cornerRadius={2}>
            <View style={{width: '100%', height: '100%', backgroundColor: '#F8F8F8'}} >

              <View key='goal name' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
                <TextInput
                  style={{height: 40,width: '100%', marginLeft: 5 }}
                  placeholder="Goal Name"
                  placeholderTextColor="gray"
                  onChangeText={(goalNameText) => {
                    this.setState({goalNameText})
                    this.props.navigation.setParams({ goalNameText: goalNameText })
                  }}
                  value={this.state.goalNameText}
                />
              </View>
              <View key='duedate' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
                <DatePicker
                  style={{height: 40, width: '100%',marginLeft: 0,borderWidth: 0, borderColor: 'light-gray'}}
                  date={this.state.date}
                  mode="date"
                  showIcon= { false }
                  placeholder="Due Date"
                  format="DD MMMM YYYY"
                  minDate={this.getCurrentDate()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems: "flex-start",
                      marginLeft: 5,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({date: date})
                    this.props.navigation.setParams({ dueDate: date })
                  }}
                />
              </View>
              <View key='goaltype' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
                {this.showGoalTypeDropdown()}
              </View>
              <View key='goal desc' style={{height: '50%',flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
                <TextInput
                  style={{ marginLeft: 5,textAlignVertical: 'top' }}
                  multiline={true}
                  placeholder="Goal Description"
                  placeholderTextColor="gray"
                  onChangeText={(goalDescText) => this.setState({goalDescText})}
                  value={this.state.goalDescText}
                />
              </View>
            </View>

          </CardView>
        </View>
      );
    }


   //  if(this.state.isLoading){
   //   return(
   //     <View style={{flex: 1, padding: 20}}>
   //       <ActivityIndicator/>
   //     </View>
   //   )
   // }
   // else {
   //   return (
   //     <View style={{flex: 1, flexDirection: 'column',justifyContent: 'space-between',  justifyContent: 'center',alignItems: 'center'}}>
   //       <CardView style={{width: '95%', height: '95%'}}
   //       cardElevation={10}
   //       cardMaxElevation={10}
   //       cornerRadius={2}>
   //         <View style={{width: '100%', height: '100%', backgroundColor: '#F8F8F8'}} >
   //
   //           <View style={{width: '100%',flexDirection: 'row',backgroundColor: 'transparent',alignItems: 'center'}}>
   //             <View style={styles.profileImgContainer}>
   //               {this.renderProfilePic()}
   //             </View>
   //             <Text style={{marginTop: 10, marginLeft: 10,fontSize: 16, fontFamily:'OpenSans',color: '#222222'}}>{name}</Text>
   //           </View>
   //
   //           <View key='goal name' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
   //             <TextInput
   //               style={{height: 40, marginLeft: 5 }}
   //               placeholder="Goal Name"
   //               placeholderTextColor="gray"
   //               onChangeText={(goalNameText) => this.setState({goalNameText})}
   //               value={this.state.goalNameText}
   //             />
   //           </View>
   //           <View key='duedate' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
   //             <DatePicker
   //               style={{height: 40, marginLeft: 5,borderWidth: 0, borderColor: 'light-gray'}}
   //               date={this.state.date}
   //               mode="date"
   //               showIcon= { false }
   //               placeholder="Due Date"
   //               format="DD MMMM YYYY"
   //               minDate={this.getCurrentDate()}
   //               confirmBtnText="Confirm"
   //               cancelBtnText="Cancel"
   //               customStyles={{
   //                 dateInput: {
   //                   borderWidth: 0,
   //                 },
   //               }}
   //               onDateChange={(date) => {this.setState({date: date})}}
   //             />
   //           </View>
   //           <View key='goaltype' style={{flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
   //             {this.showGoalTypeDropdown()}
   //           </View>
   //           <View key='goal desc' style={{height: '50%',flexDirection: 'row',marginTop: 10,marginLeft:10, marginRight: 10,borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>
   //             <TextInput
   //               style={{ marginLeft: 5,textAlignVertical: 'top' }}
   //               multiline={true}
   //               placeholder="Goal Description"
   //               placeholderTextColor="gray"
   //               onChangeText={(goalDescText) => this.setState({goalDescText})}
   //               value={this.state.goalDescText}
   //             />
   //           </View>
   //         </View>
   //
   //       </CardView>
   //     </View>
   //   );
   // }

  }
}

const styles = StyleSheet.create({
  //MARK:- Profile Image styles
  profileImgContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 62,
    width: 62,
    borderRadius: 30,
    borderWidth: 0
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
