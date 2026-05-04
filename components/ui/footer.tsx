import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const Footer = () => {
  const theme = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
        © 2025 Mobike. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
});
