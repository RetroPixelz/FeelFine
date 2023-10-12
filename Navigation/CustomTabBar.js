import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'purple' }}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

      const isFocused = state.index === index;
      const tabColor = isFocused ? 'white' : 'purple';

      return (
        <TouchableOpacity
          key={route.key}
          onPress={() => navigation.navigate(route.name)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
          }}
        >
          {isFocused ? (
            <View
              style={{
                backgroundColor: 'purple', // Background color for active tab
                borderRadius: 25, // Make it circular
              }}
            >
              <Text style={{ color: 'white' }}>{label}</Text>
            </View>
          ) : (
            <Text style={{ color: tabColor }}>{label}</Text>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({})