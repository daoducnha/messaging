import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Status from './components/Status';

export default class App extends Component {

  renderMessageList() {
    return (
      <View style={styles.content}></View>
    )
  }

  renderInputMethod() {
    return (
      <View style={styles.inputMethodEditor}></View>
    )
  }

  renderToolBar() {
    return (
      <View style={styles.toolBar}></View>
    )
  }
  render() {
    return (
      <View style={styles.container} >
        <Status />
        {this.renderMessageList()}
        {this.renderToolBar()}
        {this.renderInputMethod()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});
