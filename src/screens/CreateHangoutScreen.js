import React, { useState } from 'react';
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


// Here is our global style and constant stylesheet
import Gstyle from '../styles/stylesheetconst';

// Date picker new rn and image picker
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';



import { getHangoutDetails, createHangout } from '../firebase/firebaseService';
// import storage from '@react-native-firebase/storage'; // firevase storage service\
import storage from '@react-native-firebase/storage';




export default function CreateHangoutScreen({ navigateToHome, formData, setFormData }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const placeholderImage = 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGV2ZW50fGVufDB8fDB8fHww'


  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      date: '',
      location: '',
      message: '',
    });
    navigateToHome();
  };

  const handlePost = async () => {
    try {
      
       let imageUrl = placeholderImage;

    // if (selectedImage) {
    //   imageUrl = await uploadImageToFirebase(selectedImage);
    // }
      
      console.log('Posting Hangout:', formData);
    console.log('Posting Hangout:', formData.date);


     const title = formData.title ?? '';
    const description = formData.description ?? '';
    const date = formData.date ?? '';
    const location = formData.location ?? '';
    const time = '10:30 PM'; // Placeholder time, you can change this to a dynamic value if needed
    const environmentType = formData.category ?? '';
   
    // const docIdDetails = await createHangout({
    //   title,
    //   description,
    //   date,
    //   time: '', // serverTimestamp will override
    //   location,
    //   imageUrl,
    //   environmentType,
    // });

    const docIdDetails = await createHangout({
      title: title,
      description: description,
      date: date,
      time: time,
      location: location,
      imageUrl: imageUrl,
      environmentType: environmentType,

    });
    

    console.log('Hangout created with ID:', docIdDetails);
    navigateToHome();}
    catch (err){
      console.error('Error posting hangout:', err);
    }
  };



const uploadImageToFirebase = async (image) => {
  try {
    if (!image?.uri) throw new Error('No image selected');

    let fileUri = image.uri;
    if (Platform.OS === 'android' && !fileUri.startsWith('file://')) {
      fileUri = `file://${fileUri}`;
    }

    const filename = image.fileName || `hangout_${Date.now()}.jpg`;

    const refPath = `hangoutImages/${filename}`;
    const storageRef = storage().ref(refPath);

    console.log('Uploading:', fileUri);
    console.log('Firebase Storage Path:', refPath);

    // Upload the file
    await storageRef.putFile(fileUri);
    console.log('✅ Upload successful');

    const downloadURL = await storageRef.getDownloadURL();
    console.log('✅ Download URL:', downloadURL);

    return downloadURL;
  } catch (error) {
    console.error('❌ Image upload failed:', error);
    throw error;
  }
};




  // Here is the function for image picker logic 
   const pickImageFromGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('Image Picker Error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const image = response.assets[0];
          console.log('Selected image:', image);
          setSelectedImage(image);
          setFormData({ ...formData, image: image });
        }
      }
    );
  };


  return (
    <KeyboardAvoidingView
      style={Gstyle.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={Gstyle.createHeader}>
        <TouchableOpacity onPress={navigateToHome} style={Gstyle.backButton}>
          <Text style={Gstyle.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={Gstyle.createTitle}>Create Hangout</Text>
      </View>

      <ScrollView style={Gstyle.createContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
        
        {/* Image upload section */}
         {/* Upload Section */}
      <TouchableOpacity onPress={pickImageFromGallery} style={Gstyle.uploadSection}>
        <View style={Gstyle.uploadIcon}>
          <Text style={Gstyle.uploadIconText}>📷</Text>
        </View>
        <Text style={Gstyle.uploadText}>Pick Image from Gallery</Text>
      </TouchableOpacity>

      {/* Preview Image */}
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200, borderRadius: 10, alignSelf: 'center', marginTop: 10 }}
        />
      )}

        <TextInput
          style={Gstyle.createInput}
          placeholder="Title"
          placeholderTextColor="#999"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />

        <TextInput
          style={[Gstyle.createInput, Gstyle.createTextArea]}
          placeholder="Description"
          placeholderTextColor="#999"
          multiline
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />

        {/* Dropdown */}
        <TouchableOpacity
          style={Gstyle.dropdownInput}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={formData.category ? Gstyle.dropdownText : Gstyle.dropdownPlaceholder}>
            {formData.category || 'Select Category'}
          </Text>
          <Text style={Gstyle.dropdownArrow}>⌄</Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownOptions}>
            {['Indoor', 'Outdoor'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setFormData({ ...formData, category: option });
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

       {/* 👇 Date Picker */}
<TouchableOpacity
  style={Gstyle.createInput}
  onPress={() => setShowDatePicker(true)}
>
  <Text style={{ color: formData.date ? '#000' : '#999' }}>
    {formData.date || 'Select Date'}
  </Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={selectedDate}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    onChange={(event, date) => {
      setShowDatePicker(false);
      if (date) {
        const formattedDate = date.toLocaleDateString();
        setSelectedDate(date);
        setFormData({ ...formData, date: formattedDate });
      }
    }}
  />
)}

        <TextInput
          style={Gstyle.createInput}
          placeholder="Location"
          placeholderTextColor="#999"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  postButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: -8,
    marginBottom: 16,
    padding: 10,
  },
  dropdownOptionText: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
});

