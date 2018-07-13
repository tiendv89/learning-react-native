import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MaskView from './app/mask/MaskView';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            this.props.navigation.navigate('MaskView');
          }}
        >
          <Text> What the fuck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let AppNavigator = createStackNavigator(
  {
    Home: Home,
    MaskView: MaskView
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
