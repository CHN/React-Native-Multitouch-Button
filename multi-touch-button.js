import React,{Component} from 'react';
import {Text,View,PanResponder,Animated} from 'react-native';
export class MultiTouchButton extends Component {
    transform = {
      width:0,height:0,x:0,y:0
    };
    targetColor;
    state = {
      fadeAnim:0,
      size:0
    }
    constructor(props){
      super(props);
      this.onClickDown = this.onClickDown.bind(this);
      this.onClickUp = this.onClickUp.bind(this);
      this.updateProps = this.updateProps.bind(this);
      this.click = false;
      this.touchId = -1;
      this.touchRelativePos = {x:0,y:0};
      this.updateProps();
      this.props.context.buttons.push(this);
      this.props.context.buttons.sort(function(a,b){return b.props.style.zIndex-a.props.style.zIndex});
    }
    updateProps(){
      if(typeof this.props.textStyle["fontWeight"]=="undefined") this.props.textStyle["fontWeight"] = "bold";
      if(typeof this.props.style["borderRadius"]=="undefined") this.props.style["borderRadius"] = 3;
      if(typeof this.props.style["isAnimating"]=="undefined") this.props.style["isAnimating"] = true;
      if(typeof this.props.style["zIndex"]=="undefined") this.props.style["zIndex"] = 0;
      if(typeof this.props.style["pressDarknessMultiplier"]=="undefined") this.props.style["pressDarknessMultiplier"] = 0.5;
      if(typeof this.props.style["onReleaseColor"]=="undefined") this.props.style["onReleaseColor"] = "#2196f3";
      if(typeof this.props.style["onPressColor"] == "def") this.props.style["onPressColor"] = this.props.style["onReleaseColor"];
      if(typeof this.props.style["onPressColor"]=="undefined") this.props.style["onPressColor"] = this.createPressColor(this.props.style.onReleaseColor,this.props.style.pressDarknessMultiplier);
      if(!this.click)this.targetColor = this.props.style.onReleaseColor;
    }
    createPressColor(releaseColor,darknessMultiplier){
      let int = parseInt(releaseColor.substring(1),16);
      let b = int & (0x0000FF);
      let g = int & (0x00FF00);
      let r = int & (0xFF0000);
      g = g >> 8;
      r = r >> 16;
      b *= darknessMultiplier;g *= darknessMultiplier;r *= darknessMultiplier;
      b = Math.floor(b);g = Math.floor(g);r = Math.floor(r);
      r |= 0x11;g |= 0x11;b |= 0x11;
      let rClr = 0;
      rClr = r << 16 | g << 8 | b;
      return "#"+(rClr).toString(16);
    }
    componentDidMount() {
      setTimeout(()=>{this.setState({})},1);
    }
    componentDidUpdate() {
      this.refs["button"].measure((ox, oy, width, height, px, py) => {
        this.transform.x = px+width/2;
        this.transform.y = py+height/2;
        this.transform.width = width;
        this.transform.height = height;
      });
    }
    render(){
      this.updateProps();
      let animation = this.props.style.isAnimating?<Animated.View style={{zIndex:1,backgroundColor:"#000000",transform:[{translateX:this.touchRelativePos.x},{translateY:this.touchRelativePos.y}],width:this.state.size,height:this.state.size,position:"absolute",opacity:this.state.fadeAnim,borderRadius:100}}></Animated.View>:null;

      return  <View ref="button" style={{...this.props.style,backgroundColor:this.targetColor,justifyContent: 'center',alignItems: 'center',overflow:"hidden"}}>
                {animation}
                <Text style={{...this.props.textStyle,zIndex:2}}>{this.props.title}</Text>
              </View>
    }
    onClickDown(touchId){
      if(this.props.style.isAnimating)
      {
        this.state.fadeAnim = new Animated.Value(0.3);
        this.state.size = new Animated.Value(0.5*this.props.style.width);
        Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 250,
        },
      ).start(); 
        Animated.timing(
          this.state.size,
          {
            toValue: 1.5*this.props.style.width,
            duration: 250,
          }
        ).start(); 
      }
      this.click = true;
      if(typeof this.props.onClickDown != "undefined")this.props.onClickDown();
      this.targetColor = this.props.style.onPressColor;
      this.touchId = touchId;
      this.setState({});
    }
    onClickUp(){
      this.click = false;
      if(typeof this.props.onClickUp != "undefined")this.props.onClickUp();
      this.targetColor = this.props.style.onReleaseColor;
      this.touchId = -1;
      this.setState({});
    }
  }
  export class MultiTouchApp extends Component {
    constructor(props){
      super(props);
      this.buttons = [];
      this.multiTouchResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderStart: (evt, gestureState) => {
          evt.nativeEvent.touches.forEach((e)=>{
            try{
              this.buttons.forEach((b)=>{
              if(!b.click) 
            {
              let pos2touch = {x:e.pageX-b.transform.x,y:e.pageY-b.transform.y};
              let width = b.transform.width;
              let height = b.transform.height;
              if(pos2touch.x > -width/2 && pos2touch.x < width/2){
                if(pos2touch.y > -height/2 && pos2touch.y < height/2){
                  b.touchRelativePos = pos2touch;
                  b.onClickDown(e.identifier);
                  throw new Break;
                }
              }
            }
            });
          }catch{}
          });
        },
        onPanResponderEnd:(evt,gestureState)=>{
          this.buttons.forEach((b)=>{
            evt.nativeEvent.changedTouches.forEach((e)=>{
              if(b.touchId == e.identifier){
                b.onClickUp();
              }
            })});
        }
      });
    }
  }
  export class MultiView extends  Component{
    constructor(props){
      super(props);
    }
    render(){
    return <View {...this.props}{...this.props.app.multiTouchResponder.panHandlers}>{this.props.children}</View>;
    }
  }