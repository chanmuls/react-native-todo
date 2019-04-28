import React from 'react';
import {AppLoading} from 'expo'
import {StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import Todo from "./Todo";
import uuidv1 from "uuid/v1"

const {width, height} = Dimensions.get("window");

export default class App extends React.Component {
    state = {
        newTodo: "",
        loadedTodos: false,
        todos: {}
    };

    componentDidMount() {
        this._loadTodos();
    }

    render() {
        const {newTodo, loadedTodos, todos} = this.state;

        console.log(todos);

        if (!loadedTodos) {
            return <AppLoading/>;
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Text style={styles.title}>Reac Native ToDo</Text>
                <View style={styles.card}>
                    <TextInput style={styles.input} placeholder={"New input todo"}
                               onChangeText={this._controllNewTodo} placeholderTextColor={"#999"}
                               returnKeyType={"done"} autoCorrect={false} onSubmitEditing={this._addTodo}
                               value={newTodo}/>
                    <ScrollView contentContainerStyle={styles.todos}>
                        {Object.values(todos).map(todo => <Todo key={todo.id} {...todo} />)}
                    </ScrollView>
                </View>
            </View>
        );
    }

    _controllNewTodo = text => {
        this.setState({
            newTodo: text
        })
    };

    _loadTodos = () => {
        this.setState({
            loadedTodos: true
        })
    };

    _addTodo = () => {
        const {newTodo} = this.state;

        if (newTodo !== "") {
            this.setState(prevState => {
                const ID = uuidv1();
                const newTodoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newTodo,
                        createdAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newTodo: "",
                    todos: {
                        ...prevState.todos,
                        ...newTodoObject
                    }
                };

                return {...newState};
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f23657',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 30,
        marginTop: 50,
        fontWeight: "200",
        marginBottom: 30
    },
    card: {
        backgroundColor: '#fff',
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    width: -1,
                    height: 0,
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 25,

    },
    todos: {
        alignItems: "center"
    }
});
