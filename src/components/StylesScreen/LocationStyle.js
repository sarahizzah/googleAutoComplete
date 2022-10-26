import {StyleSheet, Platform} from 'react-native';
import {scale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
  },
  clearButton: {
    padding: 10,
  },
  searchPlace: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
    position: 'absolute',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
});
