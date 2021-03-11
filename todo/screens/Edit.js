import React, { useEffect, useState } from 'react';
import {
   ScrollView,
    StyleSheet
} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  CheckBox,
  Title,
  Form,
  H1,
  Input,
  Fab,
  Subtitle,
  Item,
  Container,
  Text,
  Spinner


} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation, route}) => {

  const [name, setname] = useState('')
const [description, setdescription] = useState('')
const [id, setid] = useState('')

const updateTodo = async () => {
  try{
    
    if(!name || !description){
  
      return alert("Plases enter the correct value")

  
    }
    const seasonUpdate = {
      id,
      name,
      description,
      isFinished: false
    }

    const storedValue = await AsyncStorage.getItem('@season_list')
    const list = await JSON.parse(storedValue)

    list.map((todo) => {
      if(todo.id == id){
        todo.name = name
        todo.description = description
      }
      return todo
    })
    await AsyncStorage.setItem('@season_list',JSON.stringify(list))
    navigation.navigate('Home')
  }
  catch(err){
    console.log(err)
  }
  

}

useEffect(() => {
  const {todo} = route.params;
  const {id,name,descrption} = todo;
  setname(name)
  setdescription(descrption)
  setid(id)
}, [])
  return (
    <Container style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <H1 style={styles.heading}>
              Add TODO here
            </H1>

            <Form style={{padding:20}}>
              <Item  style={styles.formItem}> 
                <Input
                value={name}
                placeholder="Name of the task"
                style={{color:'black'}}
                onChangeText={(text)=>{setname(text)}}

                />
                 
              </Item>
              <Item  style={styles.formItem}> 
              <Input
                value={description}
                onChangeText={(text)=>{setdescription(text)}}
                placeholder="Description of the task"
                style={{color:'black'}}
                />
              </Item>
                <Button rounded block 
                onPress={updateTodo}
                >
      <Text style={{color:'#fff'}}>
        Update
      </Text>
                </Button>
            </Form>
        </ScrollView>
    </Container>
)
}




const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#fff',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#000',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    formItem:{
      marginBottom:20
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
export default Edit;