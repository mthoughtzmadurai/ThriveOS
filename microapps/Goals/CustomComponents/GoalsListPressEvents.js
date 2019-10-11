import {AsyncStorage} from 'react-native';
const GoalsListPressEvents = {

    showActions: function(param1,item){
      console.log("showActions");
        // console.warn('showActions',param1,item.goalActions);
        param1.navigate('GoalActionsListScreen', {item: item})
    },

    showComments: function(param1,item){
        // console.warn('showComments',param1,item);
        param1.navigate('GoalCommentsListScreen', {item: item})
    }
}

export default GoalsListPressEvents;
