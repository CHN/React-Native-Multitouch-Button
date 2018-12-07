import React from 'react';
import {StyleSheet,Button,View} from 'react-native';
import {MultiView,MultiTouchButton,MultiTouchApp} from './multi-touch-button'

export default class App extends MultiTouchApp {
  constructor(){
    super();
  }
  render() {
    return (
      <MultiView app={this} style={styles.container}>
        <MultiTouchButton context={this} title="Multi1"style={{onReleaseColor:"#FF0000", onPressColor:"def", zIndex:1,height:40,width:80,transform:[{translateX:-50},{translateY:0}],position:"absolute"}} textStyle={{fontSize:10,color:"#ffffff"}}></MultiTouchButton>
        <MultiTouchButton context={this} title="Multi2"style={{zIndex:0,height:80,width:60,transform:[{translateX:50},{translateY:0}],position:"absolute"}} textStyle={{fontSize:25,color:"#00FFAA"}}></MultiTouchButton>
        <View style={{position:"absolute",transform:[{translateX:0},{translateY:100}]}}><Button title = {"React Native Default Button"} onPress={()=>{}}></Button></View>
      </MultiView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
