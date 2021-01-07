import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';


export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: '',
      password: '',
    };
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          return (
              Alert.alert('Successfully Logged In')
          )
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('USER DOES NOT EXIST');
            break;
          case 'auth/invalid-email':
            Alert.alert('INCORRECT EMAIL ID OR PASSWORD');
            break;
          case 'auth/invalid-password':
            Alert.alert('INCORRECT EMAIL ID OR PASSWORD');
            break;
        }
      }
    } else {
      Alert.alert('Enter Email ID and Password');
    }
  };

  signUp = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          return (
              Alert.alert('User Added Successfully')
          )
        }
      } catch (error) {
          console.log(error.code)
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('USER DOES NOT EXIST');
            break;
          case 'auth/invalid-email':
            Alert.alert('INCORRECT EMAIL ID OR PASSWORD');
            break;
          case 'auth/invalid-password':
            Alert.alert('INCORRECT EMAIL ID OR PASSWORD');
            break;
        }
      }
    } else {
      Alert.alert('Enter Email ID and Password');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: 'center', margin: 20 }}>
        <View>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder={'Enter Your Email Adress'}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              this.setState({ emailID: text });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder={'Enter Your Password'}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[styles.loginButton, {marginTop: 20, marginBottom: 20,}]}
            onPress={() => {
              this.login(this.state.emailID, this.state.password);
            }}>
            <Text style={{ textAlign: 'center', justifyContent: 'center' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.signUp(this.state.emailID, this.state.password);
            }}>
            <Text style={{ textAlign: 'center' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
  },
  loginButton: {
    height: 40,
    width: 120,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 50,
  },
  title :{ 
    fontSize:65, 
    fontWeight:'300', 
    paddingBottom:30, 
    color : '#ff3d00' 
  },
});
