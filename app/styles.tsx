import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      display: "flex"
    },
    list: {
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 6,
      marginVertical: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
      padding: 20
    },
    image: {
      width: 260,
      height: 220,
      marginBottom: 8,
      backgroundColor: "grey"
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default styles 