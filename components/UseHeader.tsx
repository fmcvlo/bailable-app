import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

type UserHeaderProps = {
  name: string;
  surname: string;
};

const UserHeader: React.FC<UserHeaderProps> = ({ name, surname }) => {
  return (
    <View style={styles.header}>
      <Avatar.Image
        size={100}
        source={{ uri: 'https://example.com/default-avatar.png' }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{`${name} ${surname}`}</Text>
        <Button mode="outlined" style={styles.editButton}>
          Editar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
  },
});

export default UserHeader;
