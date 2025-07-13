import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Gstyle from '../styles/stylesheetconst';

const mockHangout = {
  title: 'Mock Beach Party',
  date: '2025-07-15',
  time: '5:00 PM',
  location: 'Juhu Beach, Mumbai',
  category: 'Outdoor',
  description: 'Enjoy a fun evening at the beach with games, music, and snacks!',
};

export default function HangoutDetailsScreen({ hangout = mockHangout, navigateToHome }) {
  return (
    <View style={Gstyle.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header with Back Button */}
      <View style={Gstyle.detailsHeader}>
        <TouchableOpacity onPress={navigateToHome} style={Gstyle.backButton}>
          <Text style={Gstyle.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={Gstyle.detailsTitle}>Hangout Details</Text>
      </View>

      {/* Basic Info */}
      <View style={Gstyle.detailsContent}>
        <Text style={Gstyle.detailsHangoutTitle}>{hangout.title}</Text>
        <Text style={Gstyle.detailsDateTime}>{'20'} • {hangout.time}</Text>
        <Text style={Gstyle.detailsLocationText}>📍 {hangout.location}</Text>
        <Text style={Gstyle.categoryText}>Category: {hangout.category}</Text>
        <Text style={Gstyle.fullDescription}>{hangout.description}</Text>
      </View>
    </View>
  );
}


// ✅ screens/HangoutDetailsScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
// import Gstyle from '../styles/stylesheetconst';

// export default function HangoutDetailsScreen({ hangout, onBack }) {
//   if (!hangout) return null;

//   return (
//     <View style={Gstyle.screen}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
//       <View style={Gstyle.detailsHeader}>
//         <TouchableOpacity onPress={onBack} style={Gstyle.backButton}>
//           <Text style={Gstyle.backButtonText}>←</Text>
//         </TouchableOpacity>
//         <Text style={Gstyle.detailsTitle}>Hangout Details</Text>
//         <TouchableOpacity style={Gstyle.optionsButton}>
//           <Text style={Gstyle.optionsButtonText}>⋯</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={Gstyle.detailsContent} showsVerticalScrollIndicator={false}>
//         <Text style={Gstyle.detailsHangoutTitle}>{hangout.title}</Text>
//         <View style={Gstyle.detailsImageContainer}>
//           <View style={Gstyle.detailsMockImage} />
//           <TouchableOpacity style={Gstyle.playButton}>
//             <Text style={Gstyle.playButtonText}>▶</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={Gstyle.detailsMainTitle}>{hangout.title}</Text>
//         <Text style={Gstyle.detailsDateTime}>{hangout.date} • {hangout.time}</Text>
//         <View style={Gstyle.detailsLocationRow}>
//           <Text style={Gstyle.locationIcon}>📍</Text>
//           <Text style={Gstyle.detailsLocationText}>{hangout.location}</Text>
//           <View style={Gstyle.detailsCategoryBadge}>
//             <Text style={Gstyle.categoryText}>{hangout.category}</Text>
//           </View>
//         </View>

//         <Text style={Gstyle.detailsDescription}>{hangout.description}</Text>

//         <Text style={Gstyle.descriptionLabel}>Description</Text>
//         <Text style={Gstyle.fullDescription}>{hangout.description}</Text>

//         <TextInput
//           style={Gstyle.messageInput}
//           placeholder="Message..."
//           placeholderTextColor="#999"
//           multiline
//         />

//         <TouchableOpacity style={Gstyle.joinHangoutButton}>
//           <Text style={Gstyle.joinHangoutButtonText}>Join Hangout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }
