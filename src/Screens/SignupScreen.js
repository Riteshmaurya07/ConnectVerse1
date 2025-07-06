import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { createUserProfile } from '../Utils/db';

export default function SignupScreen() {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    try {
      const result = await signup(email, pass);
      await createUserProfile(result.user.uid, { name, email, createdAt: Date.now() });
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    }
  };

  return (
    <View style={{ flex:1, padding:16 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={pass} onChangeText={setPass} />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}