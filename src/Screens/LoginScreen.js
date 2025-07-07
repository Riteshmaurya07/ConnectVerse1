import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../Context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, pass);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={pass} onChangeText={setPass} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}