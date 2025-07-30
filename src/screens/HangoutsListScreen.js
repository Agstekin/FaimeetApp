import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Menu, IconButton, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const HangoutsListScreen = () => {
  const [hangoutsdatas, setHangoutsdatas] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);
  const navigation = useNavigation();
const handleCancel = () => navigation.goBack();
  useEffect(() => {
    const user = auth().currentUser;

    const subscriber = firestore()
      .collection('hangouts')
      .where('createdBy', '==', auth().currentUser?.uid)
      .orderBy('timeCreated', 'desc')
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            title: data.title,
            date: data.date,
            time: data.time,
            location: data.location,
            category: data.environmentType,
            image: data.imageUrl,
            description: data.description,
          });
        });
        setHangoutsdatas(list);
      });

    return () => subscriber();
  }, []);

  const deleteHangout = async (id) => {
    try {
      await firestore().collection('hangouts').doc(id).delete();
      Alert.alert('Success', 'Hangout deleted successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete hangout');
    }
  };

  const renderItem = ({ item, index }) => (
    
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>

        <Menu
          visible={menuVisible === item.id}
          onDismiss={() => setMenuVisible(null)}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={24}
              onPress={() => setMenuVisible(item.id)}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setMenuVisible(null);
              navigation.navigate('CreateHangout', { hangoutData: item });
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => {
              setMenuVisible(null);
              Alert.alert(
                'Confirm Delete',
                'Are you sure you want to delete this hangout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteHangout(item.id),
                  },
                ]
              );
            }}
            title="Delete"
          />
        </Menu>
      </View>
    </View>
  );

  return (
    <Provider>
      <SafeAreaView >
       
      <FlatList
        data={hangoutsdatas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 2,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    flex: 1,
  },
});

export default HangoutsListScreen;
