import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth'
import { createHangout } from '../firebase/firebaseService';
import Gstyle from '../styles/stylesheetconst';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop&q=60';

export default function CreateHangoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isEditMode = !!route.params?.hangoutData;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (isEditMode) {
      setFormData(route.params.hangoutData);
      // If editing and has image, prefill view
      if (route.params.hangoutData.imageUri) {
        setSelectedImage({ uri: route.params.hangoutData.imageUri });
      }
    }
  }, [isEditMode, route.params]);

  const handleCancel = () => navigation.goBack();

  const handlePost = async () => {
    try {
      console.log('Uploading as user:', auth().currentUser?.uid);
      let imageUrl = PLACEHOLDER_IMAGE;
      if (selectedImage) {
        imageUrl = await uploadImageToFirebase(selectedImage);
      }
      console.log(formData);
      await createHangout({
        ...formData,
        imageUrl,
        time: '10:30 PM',
      });
      Toast.show({
        type: 'customSuccess',
        text1: isEditMode ? 'Updated!' : 'Posted!',
        text2: `Hangout ${isEditMode ? 'updated' : 'created'} successfully.`,
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Oh no!',
        text2: 'Something went wrong.',
      });
    }
  };

  const uploadImageToFirebase = async (image) => {
    if (!image?.uri) throw new Error('No image selected');
    const uri = Platform.OS === 'android' && !image.uri.startsWith('file://')
      ? `file://${image.uri}`
      : image.uri;
    const filename = image.fileName || `hangout_${Date.now()}.jpg`;
    await storage().ref(`hangoutImages/${filename}`).putFile(uri);
    return await storage().ref(`hangoutImages/${filename}`).getDownloadURL();
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (resp) => {
      const asset = resp.assets?.[0];
      if (asset) {
        setSelectedImage(asset);
        setFormData({ ...formData, image: asset });
      }
    });
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setFormData({ ...formData, date: date.toLocaleDateString() });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {isEditMode ? 'Edit Hangout' : 'Create Hangout'}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
            <Text style={styles.imageLabel}>Upload Image</Text>
          </TouchableOpacity>
          {selectedImage?.uri && (
            <Image source={{ uri: selectedImage.uri }} style={styles.preview} />
          )}

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#999"
            value={formData.title}
            onChangeText={(t) => setFormData({ ...formData, title: t })}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#999"
            multiline
            value={formData.description}
            onChangeText={(t) => setFormData({ ...formData, description: t })}
          />

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown((v) => !v)}
          >
            <Text style={formData.category ? styles.dropdownText : styles.dropdownPlaceholder}>
              {formData.category || 'Select Category'}
            </Text>
            <Text style={styles.dropdownArrow}>⌄</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownList}>
              {['Indoor', 'Outdoor'].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setFormData({ ...formData, category: option });
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItem}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text style={formData.date ? styles.fieldText : styles.fieldPlaceholder}>
              {formData.date || 'Select Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#999"
            value={formData.location}
            onChangeText={(t) => setFormData({ ...formData, location: t })}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handlePost}>
              <Text style={styles.submitText}>
                {isEditMode ? 'Update' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: { fontSize: 24, marginRight: 20, color: '#555' },
  title: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  content: { padding: 20, paddingBottom: 40 },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: { fontSize: 24 },
  imageLabel: { marginLeft: 12, fontSize: 16, color: '#555' },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  dropdown: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  dropdownText: { flex: 1, fontSize: 16, color: '#000' },
  dropdownPlaceholder: { flex: 1, fontSize: 16, color: '#999' },
  dropdownArrow: { fontSize: 18, color: '#555' },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    padding: 10,
  },
  dropdownItem: { paddingVertical: 10, fontSize: 16 },
  fieldText: { fontSize: 16, color: '#000' },
  fieldPlaceholder: { fontSize: 16, color: '#999' },
  buttons: { flexDirection: 'row', marginTop: 10 },
  cancelBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  submitBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
