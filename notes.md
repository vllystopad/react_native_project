headerStyle: {
  height: 80, // Specify the height of your custom header
}; - solves problem of  header's height being different from the default header height

// md 2 is old shit 
// ms 3 is new one and more complex 

The createMaterialBottomTabNavigator has been deprecated as of react-native-paper@5.14.0. Instead, use @react-navigation/bottom-tabs version 7.x or later, combined with BottomNavigation.Bar to achieve a Material Design look

Caution: DataStore is a modern data storage solution that you should use instead of SharedPreferences. It builds on Kotlin coroutines and Flow, and overcomes many of the drawbacks of SharedPreferences.
Read the DataStore guide for more information.


Android

On Android, values are stored in SharedPreferences, encrypted with Android's Keystore system.

iOS

On iOS, values are stored using the keychain services as kSecClassGenericPassword. Due to the underlying nature of iOS Keychain, data stored with expo-secure-store will persist across app uninstallations when the app is reinstalled with the same bundle ID. This is an expected behavior of the iOS Keychain system and should be considered when designing your app's data handling. iOS has the additional option of being able to set the value's kSecAttrAccessible attribute, which controls when the value is available to be fetched.

