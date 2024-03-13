import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';
import { horizontalScale, moderateScale } from '../styles/mixins';
import styles from '../styles';

const Dropdown = ({heading}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: {heading},
    value: null,
  };

  const options = [
    { label: 'CA/Lawyer', value: 'User' },
    { label: 'Client', value: 'Client' },
  ];

  return (
    <View style={[styles.alignItemsCenter, styles.alignViewCenter,{width: moderateScale(350), height: moderateScale(42), borderRadius: moderateScale(10)}]}>
      <RNPickerSelect
        placeholder={{
            label :`${heading}`,
            value : null,
        }}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
      {selectedValue && <Text>Selected: {selectedValue}</Text>}
    </View>
  );
};

export default Dropdown;