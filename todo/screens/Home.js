import React,{useState,useEffect} from 'react';

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
  H1,
  Fab,
  Subtitle,
  Container,
  Text,
  Spinner


} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';


import {
    
    StyleSheet,
    ScrollView
} from 'react-native';

const Home = ({navigation, route}) => {

      const isFocused = useIsFocused()



    const [todos,setTodos] = useState([])
    const [loading,setLoeading] = useState(false)




    const getTodos = async () =>{
      //
      setLoeading(true)
      const stored = await AsyncStorage.getItem('@season_list');
      
      if(!stored){

        setTodos([])
      }

      const list = JSON.parse(stored)
      setTodos(list)
      setLoeading(false)
      
    }

    const deleteTodo = async (id) => {
      //
      const newList = await todos.filter((list) => list.id !==id)
      await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
      setTodos(newList)
    }

    const markComplete = async (id) => {
        const newArr = todos.map((todo) => {
          if(todo.id == id){
              todo.isFinished = !todo.isFinished
              

          }
          return todo
        })
        await AsyncStorage.setItem('@season_list',JSON.stringify(newArr))
        getTodos()
      }


    useEffect(() => {
      getTodos()
    }, [isFocused])

    if(loading){
      return(
        <Container style={styles.container}>
          <Spinner color="#00b7c2"/>
        </Container>
      )
    }
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
           {todos.length ==0 ? (
             
               <Container>
                 <H1>
                   Todos List is empty
                 </H1>
               </Container>
             )
            : (
           <>
                <H1 style={styles.heading}>
                  All Todos
                </H1>
                <List>
                 {todos.map((todo)=>{
                   {console.log('>>>>>>>>>>>>>>>>>>>',todos)}
                   return(
                    <ListItem key={todo.id} style={styles.listItem} noBorder>
                    <Left>
    
                      <Button style={styles.actionButton} danger
                              onPress={()=>{deleteTodo(todo.id)}}
                      >
                        <Icon name='trash' active/>
                      </Button>
                      <Button style={styles.actionButton}
                            onPress={()=>navigation.navigate('Edit',{todo})}
                      >
                        <Icon name='edit' type="Feather" active/>
                      </Button>
                    </Left>
                      <Body>
                        <Title>
                         {todo.name}
                        </Title>
                        <Text note>
                        {todo.descrption}

                        </Text>
                      </Body>
                      <Right>
                        <CheckBox checked={todo.isFinished}
                         onPress={()=>{markComplete(todo.id)}}
                        />
                      </Right>
                      </ListItem>
                   )
                 })}
                </List>
                </>
           )

           }

            <Fab style={{backgroundColor:'#5067FF'}}
                position="bottomRight"
                onPress={() => navigation.navigate('Add')}
            > 
          <Icon name='add'/>
            </Fab>
        </ScrollView>
    )
}
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
export default Home;