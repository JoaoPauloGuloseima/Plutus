import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Entrou como:', email, password);
    navigation.navigate("Converter");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plutus</Text>
      <Text style={styles.subtitle}>O Melhor Conversor</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button 
      style={styles.button}
      title="Login" onPress={handleLogin} />
      <Button style={styles.button} title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E0F7FA', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', 
    textAlign: 'center',
    fontFamily: 'GreekFont', 
  },
  subtitle: {
    fontSize: 24,
    color: '#FFD700', 
    textAlign: 'center',
    fontFamily: 'GreekFont', 
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    width: '50%',
    marginBottom: 12,
  },
});

export default LoginScreen;