import React, { useState, useEffect } from 'react';
import { View,Text } from 'react-native';
import { lawFacts } from '../data/lawFactList';
const Typewriter = ({ text, delay }) => {

  
  const facttext = lawFacts[text];
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(text, facttext);
  // Typing logic goes here
  useEffect(() => {
    if(facttext != undefined){
      if (currentIndex < facttext.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + facttext[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
    
        return () => clearTimeout(timeout);
      }
    }
    
  }, [currentIndex, delay, facttext]);
  
  return <Text>{currentText}</Text>;
};

export default Typewriter;