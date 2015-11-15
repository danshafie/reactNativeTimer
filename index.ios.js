var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var {
  AppRegistry,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = React;


var stopwatch = React.createClass({
  getInitialState: function(){
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function(){
    return <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.timerWrapper}>
      <Text style={styles.timer}>{formatTime(this.state.timeElapsed)}</Text>
      </View>
      <View style={styles.buttonWrapper}>
      {this.startStopButton()}
      {this.lapButton()}
      </View>
    </View>
    <View style={styles.footer}>
      {this.laps()}
    </View> 
  </View>
  },
  laps: function(){
    return this.state.laps.map(function(lap, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}># {index + 1} </Text>
        <Text style={styles.lapText}> {formatTime(lap)}</Text>
      </View>
    })
  },
  startStopButton: function(){

    var style = this.state.running ? styles.stopButton : styles.startButton

    return <TouchableHighlight 
    underlayColor='gray'
    style={[styles.button, style]}
    onPress={this.handleStartPress}
    >
      <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
    </TouchableHighlight>
  },
  lapButton: function(){
    return <TouchableHighlight 
    underlayColor = 'gray'
    onPress = {this.handleLapPress}
    style={styles.button}>
      <Text>Lap</Text>
    </TouchableHighlight>
  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed
    
    console.log('this is lap in handleLapPress', formatTime(lap));
    
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    })
  },
  handleStartPress: function(){
    var startTime = new Date();

    if(this.state.running){
      clearInterval(this.interval)
      this.setState({running: false})
      return
    }

    this.setState({startTime: new Date()})

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      })
    }, 30)
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 20
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    backgroundColor: '00CC00'
  },
  stopButton: {
    backgroundColor: '#FF0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
})

AppRegistry.registerComponent('stopwatch', () => stopwatch);