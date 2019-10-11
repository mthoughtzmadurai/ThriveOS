import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import ActionsListRow from './ActionsListRow';


const ActionsListView = ({ itemList}) => (
    <View style={{backgroundColor: 'red'}}>
    <Text style={{fontSize: 12}}>{itemList} Actions</Text>
        <FlatList
                data={[
                      {key: 'Devin'},
                      {key: 'Jackson'},
                      {key: 'James'},
                      {key: 'Joel'},
                      {key: 'John'},
                      {key: 'Jillian'},
                      {key: 'Jimmy'},
                      {key: 'Julie'},
                    ]}
                renderItem={({ item}) => <ActionsListRow
                    item = {item}
                />}
            />

    </View>
);

export default ActionsListView;
