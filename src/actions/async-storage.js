import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchData = async key => {
  const data = await AsyncStorage.getItem(key);
  if (data === null) {
    return undefined;
  }
  return data;
};

export const removeData = async key => {
  await AsyncStorage.removeItem(key);
};

export const storeData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};