import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  input: {
    padding: 16,
    paddingVertical: 11,
    width: '100%',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },
  inputWrapperFocus: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
  },
  btnInput: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  btnInputText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});
