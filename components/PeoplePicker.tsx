import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type PeoplePickerProps = {
  numPeople: string;
  setNumPeople: (value: string) => void;
};

const PeoplePicker: React.FC<PeoplePickerProps> = ({
  numPeople,
  setNumPeople,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>Cantidad de personas</Text>
      <Picker
        selectedValue={numPeople}
        onValueChange={(value) => setNumPeople(value)}
        style={styles.picker}
      >
        {[...Array(11).keys()]
          .filter((i) => i !== 0)
          .map((i) => (
            <Picker.Item key={i} label={String(i)} value={String(i)} />
          ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  picker: {
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
});

export default PeoplePicker;
