import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const CurrencyConverterScreen = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyRates, setCurrencyRates] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = 'scjp55736e8fvt8sdksr9o16nc6an74fon7epv7ojqd8e70uf0r5op'; 
  const BASE_URL = 'https://anyapi.io/api/v1/exchange/rates?base=USD&apiKey=scjp55736e8fvt8sdksr9o16nc6an74fon7epv7ojqd8e70uf0r5op';

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });
        setCurrencyRates(response.data.rates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyRates();
  }, []);

  const handleConvert = () => {
    if (currencyRates[fromCurrency] && currencyRates[toCurrency]) {
      const rate = currencyRates[toCurrency] / currencyRates[fromCurrency];
      const result = (amount * rate).toFixed(2);
      setConvertedAmount(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>De:</Text>
      <Picker
        selectedValue={fromCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
      >
        {Object.keys(currencyRates).map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Text style={styles.label}>Para:</Text>
      <Picker
        selectedValue={toCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
      >
        {Object.keys(currencyRates).map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Button title="Convert" onPress={handleConvert} />
      {convertedAmount && (
        <Text style={styles.result}>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </Text>
      )}
      {loading && <Text style={styles.loading}>Loading currency rates...</Text>}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'gloock',
  },
  input: {
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#FFD700',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  result: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FFD700',
  },
});

export default CurrencyConverterScreen;