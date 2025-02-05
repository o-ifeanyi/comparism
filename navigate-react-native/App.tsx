import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerLargeTitle: true,
            headerTransparent: Platform.select({ ios: true }),
            headerBlurEffect: 'systemThinMaterial',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Platform.select({ android: '#f2f2f2' }),
            },
          }}
        >
          <Stack.Screen
            name='colors'
            component={ColorsScreen}
            options={{ title: 'Colors' }}
          />
          <Stack.Screen
            name='color_detail'
            component={ColorDetailScreen}
            options={{ title: 'Color detail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const ColorsScreen = ({ navigation }: { navigation: any }) => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'black'];
  return (
    <FlatList
      data={colors}
      numColumns={2}
      style={{ paddingHorizontal: 11 }}
      keyExtractor={(_, index) => `${index}`}
      renderItem={(itemData) => (
        <View style={styles.container}>
          <Pressable
            style={() => [
              styles.pressable,
              { backgroundColor: itemData.item, height: 150, margin: 4 },
            ]}
            onPress={() => {
              navigation.navigate('color_detail', {
                color: itemData.item,
              });
            }}
          ></Pressable>
        </View>
      )}
      contentInsetAdjustmentBehavior='automatic'
    />
  );
};

const ColorDetailScreen = ({ route }: { route: any }) => {
  const { color } = route.params;
  return (
    <FlatList
      data={[0, 0, 0, 0]}
      style={{ paddingHorizontal: 15 }}
      keyExtractor={(_, index) => `${index}`}
      renderItem={(_) => (
        <View
          style={[
            styles.pressable,
            { backgroundColor: color, height: 300, marginBottom: 20 },
          ]}
        ></View>
      )}
      contentInsetAdjustmentBehavior='automatic'
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
