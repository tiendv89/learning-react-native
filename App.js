import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={() => {}} />
        <Text> What the fuck</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
