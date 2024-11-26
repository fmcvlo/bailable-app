import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatsProps = {
  reservations: number;
  followers: number;
  following: number;
};

const Stats: React.FC<StatsProps> = ({
  reservations,
  followers,
  following,
}) => {
  return (
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{reservations}</Text>
        <Text style={styles.statLabel}>Reservas</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{followers}</Text>
        <Text style={styles.statLabel}>Seguidores</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{following}</Text>
        <Text style={styles.statLabel}>Seguidos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Stats;
