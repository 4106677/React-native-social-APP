import { StyleSheet } from 'react-native';
import { fontFamily } from '../../../variables/fontFamily';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 32,
    paddingBottom: 42,
    paddingHorizontal: 16,
  },
  imgWrapper: {
    position: 'relative',
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
  },
  img: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imgText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  cameraBtnWrapper: {
    // TODO need opacity control, for example 0.7
    position: 'absolute',
    zIndex: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  inputIcon: {
    marginRight: 4,
  },
});
