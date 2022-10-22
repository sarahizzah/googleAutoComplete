import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Button} from 'react-native';

const Trending = () => {
  return (
    <View style={styles.container}>
      <Text>You have friends.</Text>

      <Button
        title="Add some friends"
        onPress={() => this.props.navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  const {friends} = state;
};

export default connect(mapStateToProps)(Trending);
