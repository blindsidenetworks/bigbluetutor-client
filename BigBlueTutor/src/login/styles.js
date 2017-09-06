import { StyleSheet } from 'react-native'

export default StyleSheet.create(
  {
    form: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 40,
    },
    input: {
      height: 30,
      alignSelf: 'stretch',
    },
    fieldContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      marginTop: 5,
      marginHorizontal: 10,
      alignSelf: 'stretch',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignSelf: 'stretch',
      marginTop: 5,
    },
  }
)
