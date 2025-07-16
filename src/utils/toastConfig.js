import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ToastConfig } from 'react-native-toast-message';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomToast = ({ text1, text2 }) => (
  <View style={styles.toastContainer}>
    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.icon} />
    <View>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  </View>
);
const CustomErrorToast = ({ text1, text2 }) => (
  <View style={styles.toastContainerError}>
    <Ionicons name="close-circle" size={24} color="red" style={styles.icon} />
    <View>
      <Text style={styles.errorText1}>{text1}</Text>
      <Text style={styles.errorText2}>{text2}</Text>
    </View>
  </View>
);
export const toastConfig = {
  customSuccess: (props) => <CustomToast {...props} />,
  customError: (props) => <CustomErrorToast {...props} />,
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 10,
  },
  toastContainerError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  errorText1: {
    fontWeight: 'bold', // ✅ Bold text
    fontSize: 16,
    color: 'red',
  },
  errorText2: {
    fontSize: 14,
    color: 'black',
  },
  text1: {
    fontWeight: 'bold', // ✅ Bold text
    fontSize: 16,
    color: '#2e7d32',
  },
  text2: {
    fontSize: 14,
    color: '#4caf50',
  },
});