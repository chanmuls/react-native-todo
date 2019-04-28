import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get("window");

export default class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            toDoValue: props.text
        };
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
    };

    render() {
        const {isCompleted, isEditing, toDoValue} = this.state;
        const {text} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompletedCircle]}/>
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, styles.text, isCompleted ? styles.completeText : styles.uncompletedText]}
                            value={toDoValue} multiline={true} onChangeText={this._controllInput} returnKeyType={"done"}/>
                    ) : (
                        <Text
                            style={[styles.text, isCompleted ? styles.completeText : styles.uncompletedText]}>
                            {text}
                        </Text>
                    )}
                </View>
                <View style={styles.column}>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        <MaterialIcons name="check" size={32} color="green"/></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        <MaterialIcons name="edit" size={32} color="green"/></Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        <MaterialIcons name="delete" size={32} color="green"/></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };

    _startEditing = () => {
        const {text} = this.props;

        this.setState({
            isEditing: true,
            toDoValue: text
        });
    };

    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };

    _controllInput = (text) => {
        this.setState({
            toDoValue: text
        });
    };
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "#f23657",
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completeText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        borderColor: "#353839",
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        // width: width / 2,
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15
    }
});

