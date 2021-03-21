import React,{useState} from 'react';
import {
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  H1
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
const shortid = require('shortid');
const App = ({navigation, route}) => {

  
  const [name,setName] = useState('');
  const [descrption,setDescrption] = useState('');


  const addToList = async () => {
    try{
      if(!name && !descrption){
        return alert('Plase provide name and descroption')
      }
      const addTodo = {
        id:shortid.generate(),
        name:name,
        descrption:descrption,
        isFinished:false
      }

      const storedValue = await AsyncStorage.getItem('@season_list')
      const prevList = await JSON.parse(storedValue)

      if(!prevList){
        const newList = [addTodo]
        await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
      }else{
      prevList.push(addTodo)
      await AsyncStorage.setItem('@season_list',JSON.stringify(prevList))

      }
      setName('')
      setDescrption('')
      navigation.navigate('Home')

    }
    catch(err){
      console.log(err)
    }
  }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}} style={{marginTop:53}}>
                <H1 style={styles.heading}>
                  Add TODO here
                </H1>

                <Form style={{padding:40}}>
                  <Item style={styles.formItem}> 
                    <Input
                    value={name}
                    placeholder="Name of the task"
                    style={{color:'black'}}
                    onChangeText={(text)=>{setName(text)}}

                    />
                     
                  </Item>
                  <Item style={styles.formItem}> 
                  <Input
                    value={descrption}
                    onChangeText={(text)=>{setDescrption(text)}}
                    placeholder="Description of the task"
                    style={{color:'black'}}
                    />
                  </Item>
                    <Button rounded block 
                    onPress={addToList}
                    >
          <Text style={{color:'#fff'}}>
            Save
          </Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    
  },
  heading: {
    textAlign: 'center',
    color: '#000',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  });
export default App;