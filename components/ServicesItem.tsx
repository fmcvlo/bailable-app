import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

type ServiceItemProps = {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  isSelected: boolean;
  toggleSelection: (id: string) => void;
};

const ServiceItem: React.FC<ServiceItemProps> = ({
  item,
  isSelected,
  toggleSelection,
}) => {
  return (
    <View style={styles.serviceContainer}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
      <Text style={styles.servicePrice}>${item.price}</Text>
      <CheckBox
        checked={isSelected}
        onPress={() => toggleSelection(item.id)}
        containerStyle={styles.checkBoxContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  checkBoxContainer: {
    margin: 0,
    padding: 0,
  },
});

export default ServiceItem;
