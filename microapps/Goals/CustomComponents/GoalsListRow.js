import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight,TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview'
import ReadMore from 'react-native-read-more-text';
import GoalsListPressEvents from './GoalsListPressEvents';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const GoalsListRow = ({ name, lkup_GoalTypeValue, lkup_GoalStatusValue, description, progress, dueDate, item, params})  => (
  <View>
  <TouchableHighlight>
    <CardView style={{margin: 10, backgroundColor: '#F8F8F8'}}
    cardElevation={1}
    cardMaxElevation={1}
    cornerRadius={0}>
      <View>
        <View id="title" style={{flex: 1,marginTop: 10, marginLeft: 10}}>
          <Text style={{color: "#444D58",fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
        </View>

        <View id="nameprogress"  style={{flexDirection:  'row',backgroundColor: 'transparent'}}>
          <View style={{flexDirection:  'row',marginTop: 10, marginLeft: 10,width:60,height: 60, borderRadius: 30, backgroundColor:"transparent",position:'absolute'}}>
            <Text style={{color: "#4599C7", marginTop: 25,flex:1,textAlignVertical: "center",textAlign: "center",fontSize: 12,justifyContent: "center",alignItems: "center"}}>{progress}%</Text>
            <AnimatedCircularProgress
            style={{flex: 1,marginLeft: -60}}
            size={60}
            width={5}
            fill={progress}
            tintColor="#4599C7"
            onAnimationComplete={() => edf=''}
            backgroundColor="#AAAAAA" />
          </View>
          <View style={{marginLeft: 70}}>
            <Text style={{marginTop: 10, marginLeft: 10,fontSize: 14, color: '#434652'}}>{name}</Text>
            <Text style={{marginTop: 10, marginLeft: 10,fontSize: 12, color: '#8B8C90'}}>In Progress</Text>
            <Text style={{marginTop: 5, marginLeft: 10,fontSize: 12, color: '#8B8C90'}}>Due: {dueDate}</Text>
          </View>
        </View>

        <View id="readmore" style={{flex: 1}}>
          <View style={{marginHorizontal: 10, padding: 10}}>
            <ReadMore
              numberOfLines={2}
              onReady={this._handleTextReady}>
              <Text style={{fontSize: 14, color: '#434652'}}>{description}
              </Text>
            </ReadMore>
          </View>
        </View>

        <View id="seperator" style={{height: 1,  width: '100%', backgroundColor: '#E8E8E8',justifyContent: 'space-between'}}>
        </View>

        <View id="actionscomments" style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', backgroundColor: 'transparent'}}>
          <TouchableOpacity id="actions" style={{width: '50%',justifyContent: 'center'}} onPress={() => GoalsListPressEvents.showActions(params,item)}>
            <View>
              <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color: 'gray',textAlign: 'center'}}>Actions</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity id="comments" style={{width: '50%',justifyContent: 'center'}} onPress={() => GoalsListPressEvents.showComments(params,item)}>
            <View>
              <Text style={{marginTop: 10,marginBottom: 10,fontSize: 12,color: 'gray',textAlign: 'center'}}>Comments</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </CardView>
   </TouchableHighlight>
  </View>
)

export default GoalsListRow;
