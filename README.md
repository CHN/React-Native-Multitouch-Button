# React-Native-Multitouch-Button
This project is multitouch button support for React Native with easily implement systems.

@Author: Cihan Sakarya<br>
@Contact: cihansakaryacs@gmail.com<br>
@Patreon: https://www.patreon.com/chngames<br>
@Twitter: https://twitter.com/fuse_apps<br>
@Linkedin: https://www.linkedin.com/in/cihan-s-23a633160/<br>

# Installation 1 - Using this project
Download all files in this repository, unzip to a folder, and run npm install command in the folder. Then, you can use multitouch buttons.
# Installation 2 - Implementing to an existing project
Download only multi-touch-button.js file, import to file that you want to use multitouch buttons, then extend your registered or navigated React component class. I don't recommend to add this project to an existing project, because this project is still in development and may not work as expected. 

![Implementing to an existing project](https://i.imgur.com/LtH4DOb.png)<br>
#Available Props for MultiView
You can use <b>ALL</b> style props.
<h3>app Prop</h3> You must use this prop and pass Component instant object reference(Use this keyword to do this)
# Available Props for MultiTouchButton

You can use <b>ALL</b> style props with buttons. If you want to change background, you need to use <b>style</b> prop, if you want to change button's text, you need to use <b>textStyle</b> prop. textStyle prop is same with style prop, it's name is only for separating styles.

<h3>context Prop</h3> You must use this prop and pass Component instant object reference(Same as app Prop)(Use this keyword to do this)
<h3>title Prop</h3> This sets the title of button.
<h3>onClickDown Prop</h3> When button is pressed, the method that passed will be invoked.
<h3>onClickUp Prop</h3> When button is released, the method that passed will be invoked.
<h2> New Style Props</h2>
<h3>isAnimating</h3> Type: boolean. If value is true; When button is clicked, button will animate like React Native's original buttons, otherwise will not be animated.
<h3>onReleaseColor</h3> Type: string. Sets button color as hex when it is released. Default is #2196f3 color.
<h3>onPressColor</h3> Type: string. Sets button color as hex when it is pressed. Default color is onReleaseColor multiplied by pressDarknessMultiplier. If you set to "def", it will automatically set to onReleaseColor.
<h3>pressDarknessMultiplier</h3> Type: number. When onPressColor isn't used, it will be set to onReleaseColor multiplied by pressDarknessMultiplier.

<h2> Default Values of Some Props</h2>
<h3>fontWeight of textStyle  --></h3> Type: string, Value: "bold"
<h3>borderRadius of style  --></h3> Type: number, Value: 3
<h3>isAnimating of style  --></h3> Type: boolean, Value: true
<h3>zIndex of style  --></h3> Type: number, Value: 0
<h3>pressDarknessMultiplier of style  --></h3> Type: number, Value: 0.5
<h3>onReleaseColor of style  --></h3> Type: string(color hex with # prefix), Value: "#2196f3"
<h3>onPressColor of style  --></h3> Type: string, Value: onReleaseColor * pressDarknessMultiplier in color hex format as string

<br>
<h2>Examples for Usage of Props</h2>

![Example for Usage of Props1](https://i.imgur.com/6co4fTB.png)<br>
![Example for Usage of Props2](https://i.imgur.com/IVrS0wS.png)

