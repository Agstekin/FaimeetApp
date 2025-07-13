import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Image, 
  StatusBar,
  Animated,
  SafeAreaView,
  BackHandler,
  Alert
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';

// import { GoogleAuthProvider, signInWithCredential, getAuth } from 'firebase/auth';
// import { auth } from '../firebase/firebaseConfig'; // ✅ instead of getAuth()

import { useNavigation } from '@react-navigation/native';

// import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');


// firebase services
import { getHangoutDetails, createHangout } from '../firebase/firebaseService';
import { GET_HANGOUT_DOC_ID } from '../firebase/firebaseConstants';

const LoginScreen = () => {

  const DocId = GET_HANGOUT_DOC_ID;

  const [hangout, setHangout] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      const details = await getHangoutDetails(DocId);

      console.log('Hangout Details:', details);


  let tok =   await createHangout({
  title: 'React Native Meetup',
  description: 'Discuss latest updates in React Native.',
  date: '2025-07-15',
  time: '6:30 PM',
  location: 'Bhopal madhya pradesh',
});
      console.log('New Hangout Created:', tok);
      setHangout(details);
    };

    fetchData();
  }, []);

  console.log('Hangout:', hangout);

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '592922567982-oatslsud24jn5jbfvjjt24m5gh0k8n8o.apps.googleusercontent.com',
    });
  }, []);

  // Reset and start animations whenever component mounts or becomes focused
  const startAnimations = useCallback(() => {
    // Reset animation values
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.8);
    
    // Start animations after a small delay to ensure proper reset
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 100);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, scaleAnim]);

  useEffect(() => {
    startAnimations();
  }, [startAnimations]);

  // Handle back button press and restart animations
  useEffect(() => {
    const backAction = () => {
      // If user pressed back, restart animations when they return
      setTimeout(() => {
        startAnimations();
      }, 200);
      return false; // Allow default back behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [startAnimations]);

  const testNavigation = async () => {

    let tok =   await createHangout({
  title: 'React Native Meetup',
  description: 'Discuss latest updates in React Native.',
  date: '2025-07-15',
  time: '6:30 PM',
  location: 'Bhopal madhya pradesh',
  imageUrl: 'https://example.com/image.jpg', // Placeholder for image URL
  environmentType: 'Outdoor', // Placeholder for environment type
  
});

console.log('New Hangout Created with ID:', tok);
  console.log('Navigating to HomeScreen...');
  navigation.navigate('MainTabs', {
    name: 'Test User',
    email: 'testuser@example.com',
    photo: null,
  });

};

// Sign in with google email 

const signInfuncUserMail = () => {
 createUserWithEmailAndPassword(getAuth(), 'jane.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
    
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

}

// Olderversion 
  // async function onGoogleButtonPress() {
  //   try {
  //     setIsLoading(true);
  //     console.log('Starting Google Sign-in...');
      
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     const signInResult = await GoogleSignin.signIn();
  //     console.log('Google Sign-in result:', signInResult);

  //     // Handle both old and new versions of the library
  //     let idToken = signInResult.data?.idToken || signInResult.idToken;
      

      
  //     const result = await signInResult
  //     // r
  //     navigation.replace('HomeScreen')

  //     const { user } = signInResult;

  //   // Optional: Check if user object is valid
  //   if (!user || !user.email) {
  //     throw new Error('Google user data is missing');
  //   }

  //   // ✅ Navigate to Home
  //    if (user) {
  //     console.log('📋 User Details:');
  //     console.log('👤 Name:', user.name);
  //     console.log('📧 Email:', user.email);
  //     console.log('🖼️ Photo:', user.photo);
  //   } else {
  //     console.warn('⚠️ No user info found in signInResult');
  //   }
      
  //     // Here we are adding the auth from firebase
  //     // const auth = getAuth(firebaseApp)
  //   //   const googleCredential = GoogleAuthProvider.credential(idToken);
  //   //   const result = await signInWithCredential(auth, googleCredential);
      
  //   //   console.log('Firebase sign-in successful:', result.user.email);
  //     setIsLoading(false);

  //   //    navigation.replace('HomeScreen', {
  //   //   email: result.user.email,
  //   //   name: result.user.displayName,
  //   //   photo: result.user.photoURL,
  //   // });
  //   //   return result;
  //   } catch (error) {
  //     console.log('Google Sign-In Error:', error);
  //     setIsLoading(false);
      
  //     // Handle specific error cases
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       console.log('Account exists with different credential');
  //     } else if (error.code === 'auth/invalid-credential') {
  //       console.log('Invalid credential');
  //     }
  //   }
  // }


  // Newer Version

  async function onGoogleButtonPress() {

   

    console.log("Pressed the sign in button")
  // Check if your device supports Google Play
  try{
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  const {user } = signInResult

  console.log("user: details",user)

  console.log(signInResult)

  // Try the new style of google-sign in result, from v13+ of that module
  idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);



  // 4. Sign in to Firebase
    const userCredential = await signInWithCredential(getAuth(), googleCredential);

    // 5. Get user details
    const usser = userCredential.user;
    console.log("User Details:", usser);

    // You can access:
    console.log("Display Name:", usser.displayName);
    console.log("Email:", usser.email);
    console.log("UID:", usser.uid);
    console.log("Photo URL:", usser.photoURL);
    testNavigation();
    return usser;
   }
   catch(error){
        console.error(error);
        Alert.alert("Google Sign-In Failed");
   }

}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      {/* Background with Gradient Effect */}
      <View style={styles.gradientBackground}>
        {/* Floating Elements for Visual Interest */}
        <View style={[styles.floatingElement, styles.element1]} />
        <View style={[styles.floatingElement, styles.element2]} />
        <View style={[styles.floatingElement, styles.element3]} />
        
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Logo/Brand Section */}
          <Animated.View 
            style={[
              styles.brandContainer,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>FAI</Text>
              <Text style={styles.logoSubtext}>MEET</Text>
            </View>
            <Text style={styles.tagline}>Connect. Meet. Explore.</Text>
          </Animated.View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            <Text style={styles.welcomeSubtitle}>
              Join thousands of people discovering amazing meetups and connections
            </Text>
          </View>

          {/* Google Sign-In Button */}
          <TouchableOpacity 
            style={[styles.googleButton, isLoading && styles.buttonDisabled]} 
            onPress={onGoogleButtonPress}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Image
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={styles.googleLogo}
                onError={() => console.log('Failed to load Google logo')}
              />
              <Text style={styles.googleButtonText} >
                {isLoading ? 'Connecting...' : 'Continue with Google'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Alternative Login Options */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.guestButton} onPress={testNavigation}>
            <Text style={styles.guestButtonText}>Continue with E-Mail</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#6366f1',
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  element1: {
    width: 80,
    height: 80,
    top: height * 0.15,
    left: width * 0.1,
  },
  element2: {
    width: 60,
    height: 60,
    top: height * 0.25,
    right: width * 0.15,
  },
  element3: {
    width: 40,
    height: 40,
    bottom: height * 0.3,
    left: width * 0.2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 8,
    marginTop: -8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    letterSpacing: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  googleButton: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  googleButtonText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  guestButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 40,
  },
  guestButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;