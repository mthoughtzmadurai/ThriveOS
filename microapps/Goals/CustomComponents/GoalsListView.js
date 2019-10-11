import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text,TouchableHighlight, TouchableOpacity } from 'react-native';
import GoalsListRow from './GoalsListRow';
import CardView from 'react-native-cardview'
import ReadMore from 'react-native-read-more-text';
import GoalsListPressEvents from './GoalsListPressEvents';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const GoalsListView = ({ itemList, params, lookupArray }) => (
  // console.log("itemList",itemList);
    <View style={styles.container}>
    <FlatList
        data={itemList}
        extraData={itemList}
        renderItem={({ item}) => <GoalsListRow
            name={item.name}
            lkup_GoalTypeValue={item.lkup_GoalTypeValue}
            lkup_GoalStatusValue={item.lkup_GoalStatusValue}
            description={item.description}
            progress = {60}
            dueDate = {item.dueDate}
            item = {item}
            params = {params}
        />}
    />
    </View>
);

export default GoalsListView;
