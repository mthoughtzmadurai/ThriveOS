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


export const plusSlides = (n)=>{
  console.log("plusSlides",n);
    // showSlides(slideIndex += n);
}
