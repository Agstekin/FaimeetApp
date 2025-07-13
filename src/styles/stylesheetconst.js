import { StyleSheet, Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');

// Global styles and constant values
// const Gstyle = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
    
// });
 

const Gstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screensContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width * 3,
  },
  screenWrapper: {
    position: 'absolute',
    width: width,
    height: height,
  },
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // started search and model style 
  headerContainer: {
  padding: 16,
  backgroundColor: '#f8f9fa',
},

headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10, // Space between rows
},

searchInput: {
  flex: 1,
  height: 40,
  backgroundColor: '#e0e0e0',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginRight: 10,
},

filterButton: {
  padding: 8,
},

headerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
},

addButton: {
  backgroundColor: '#007AFF',
  borderRadius: 20,
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
},

addButtonText: {
  color: '#fff',
  fontSize: 20,
  lineHeight: 20,
},
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cancelText: { color: '#888', fontWeight: '600' },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  resetText: { color: '#007BFF', fontWeight: '600' },
  filterOption: {
    paddingVertical: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptionContainer: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  flexDirection: 'row',
  alignItems: 'center',
},

applyButton: {
  marginTop: 20,
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  borderRadius: 5,
  alignItems: 'center',
},

applyButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
  // ended search and model styles
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: '#007bff',
    fontWeight: 'bold',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Hangout Card Styles
  hangoutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    height: 200,
    width: '100%',
  },
  mockImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8fbc8f',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  joinButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Bottom Auth Styles
  bottomAuth: {
    padding: 20,
    paddingBottom: 40,
  },
  googleButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emailButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Details Screen Styles
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#2c3e50',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  optionsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsButtonText: {
    fontSize: 24,
    color: '#2c3e50',
  },
  detailsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailsHangoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsImageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  detailsMockImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8fbc8f',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  playButtonText: {
    fontSize: 24,
    color: '#2c3e50',
    marginLeft: 4,
  },
  detailsMainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  detailsDateTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  detailsLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsLocationText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    marginLeft: 6,
  },
  detailsCategoryBadge: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailsDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  fullDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
  },
  messageInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  joinHangoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  joinHangoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Create Screen Styles
  createHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  createTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 20,
  },
  createContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadSection: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 30,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadIconText: {
    fontSize: 32,
  },
  uploadText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  createInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  createTextArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dropdownInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666',
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Gstyle;