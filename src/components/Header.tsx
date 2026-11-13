import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
});
