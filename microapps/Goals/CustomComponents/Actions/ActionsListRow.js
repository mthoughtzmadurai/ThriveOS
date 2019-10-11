import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

const ActionsListRow = ({ item }) => (
    <View>
      <View style={{flexDirection: 'row',backgroundColor: 'transparent'}}>
        <Text style={{marginTop: 10, marginLeft: 10,fontSize: 14, fontFamily:'OpenSans',color: '#222222'}}>Test Comments</Text>
        <TouchableOpacity style={{alignItems: 'center'}} backgroundColor='#00d08e' onPress={this.onPressYesButton}>

        </TouchableOpacity>
       </View>
    </View>
);
export default ActionsListRow;
