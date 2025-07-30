// firebaseService.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getHangoutDetails = async (documentId) => {
  try {
    const docRef = firestore().collection('hangouts').doc(documentId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      return {
        date: data.date,
        description: data.description,
        hangout_id: data.hangout_id,
        location: data.location,
        time: data.time,
        title: data.title,
        imageUrl: data.imageUrl
      };
    } else {
      console.warn('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching hangout details:', error);
    throw error;
  }
};



// export const createHangout = async ({
//   title,
//   description,
//   date,
//   time,
//   location,
//   imageUrl,        // ✅ New
//   environmentType, // ✅ New: "Indoor" or "Outdoor"
// }) => {
//   try {
//     const uid = auth().currentUser?.uid || 'anonymous';

//     const docRef = await firestore().collection('hangouts').add({
//       title,
//       description,
//       date,
//       time: firestore.FieldValue.serverTimestamp(),
//       location,
//       imageUrl,          // ✅ Store the uploaded image URL
//       environmentType,   // ✅ Store "Indoor" or "Outdoor"
//       createdBy: uid,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });

//     return docRef.id;
//   } catch (error) {
//     console.error('Error creating hangout:', error);
//     throw error;
//   }
// };


export const createHangout = async ({
  title,
  description,
  date,
  time,            // "6:30 PM"
  location,
  imageUrl,
  category,
}) => {
  try {
    const uid = auth().currentUser?.uid || 'anonymous';
    const docRef = await firestore()
      .collection('hangouts')
      .add({
        title,
        description,
        date,
        time,                           // store your provided time
        timeCreated: firestore.FieldValue.serverTimestamp(),
        location,
        imageUrl,
        environmentType: category,
        createdBy: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    return docRef.id; // returns the new document's ID
  } catch (error) {
    console.error('Error creating hangout:', error);
    throw error;
  }
};
