
import React,{useState} from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





// bringing all screens
import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'

//storage


const Stack = createStackNavigator();





const App = () => {


  return (
  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            headerStyle:{
              backgroundColor: "#E83A59"
            },
            title: 'TODO App',
            headerTitleStyle: {
              textAlign: "center",
              color:"#fff"
            }
          }}
          >

          </Stack.Screen>
          <Stack.Screen 
          name="Add"
          component={Add}
          options={{
            headerStyle:{
              backgroundColor: "#E83A59"
            },
            title: 'TODO App',
            headerTitleStyle: {
              textAlign: "center",
              color:"#fff"
            }
          }}
          >

          </Stack.Screen>
          <Stack.Screen 
          name="Edit"
          component={Edit}
          options={{
            headerStyle:{
              backgroundColor: "#E83A59"
            },
            title: 'TODO App',
            headerTitleStyle: {
              textAlign: "center",
              color:"#fff"
            }
          }}
          >

          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
 
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});

export default App;
