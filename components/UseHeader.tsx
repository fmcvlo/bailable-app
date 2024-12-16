import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Link } from 'expo-router';

type UserHeaderProps = {
  name: string;
  surname: string;
  role: number;
};

const UserHeader: React.FC<UserHeaderProps> = ({ name, surname, role }) => {
  return (
    <View style={styles.header}>
      <Avatar.Image
        size={100}
        source={{ uri: 'https://example.com/default-avatar.png' }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{`${name} ${surname}`}</Text>
        {role === 1 && (
          <Link href="/LocalesScreen" asChild>
            <Button mode="outlined" style={styles.editButton}>
              Editar
            </Button>
          </Link>
        )}
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
