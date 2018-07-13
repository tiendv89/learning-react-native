import React from 'react';
import {
  Button,
  Animated,
  MaskedViewIOS,
  StyleSheet,
  View
} from 'react-native';

export default class MaskView extends React.Component {
  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false,
    isLoaded: false
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.resetAnimation();
    });
  }

  resetAnimation() {
    if (!this.state.isLoaded) {
      this.setState(
        {
          isLoaded: true
        },
        () => {
          Animated.timing(this.state.loadingProgress, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true
          }).start(() => {
            this.setState({
              animationDone: true
            });
          });
        }
      );
    }
  }

  fullScreenBackgroundLayer = this.state.animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'blue' }]} />
  );
  fullScreenWhiteLayer = this.state.animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, styles.fullScreenWhiteLayer]} />
  );

  render() {
    const imageScale = {
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 200]
          })
        }
      ]
    };
    const opacityClearToVisible = {
      opacity: this.state.loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
      })
    };
    const appScale = {
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 7, 100],
            outputRange: [1.1, 1.03, 1]
          })
        }
      ]
    };
    return (
      <View style={styles.root}>
        {this.fullScreenBackgroundLayer}
        <MaskedViewIOS
          style={{
            flex: 1
          }}
          maskElement={
            <View style={styles.centeredFullScreen}>
              <Animated.Image
                style={[styles.maskImageStyle, imageScale]}
                source={require('../../logo.png')}
              />
            </View>
          }
        >
          {this.fullScreenWhiteLayer}
          <Animated.View style={[opacityClearToVisible, appScale, { flex: 1 }]}>
            <View style={styles.container}>
              <Button
                onPress={() => {
                  this.setState(
                    { isLoaded: false, loadingProgress: new Animated.Value(0) },
                    () => this.resetAnimation()
                  );
                }}
                title="See it again"
              />
            </View>
          </Animated.View>
        </MaskedViewIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  fullScreenBlueLayer: {
    backgroundColor: 'blue'
  },
  fullScreenWhiteLayer: {
    backgroundColor: 'white'
  },
  maskImageStyle: {
    height: 100,
    width: 100
  },
  centeredFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  loadingBackgroundStyle: {
    backgroundColor: 'rgba(125, 125, 255, 1)'
  }
});
