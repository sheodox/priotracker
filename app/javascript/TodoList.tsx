import {Todo} from "./todo-types";
import React from 'react';
import {BoundInput, BoundTextArea} from "./BoundInputs";

interface TodoListProps {
    priorityLevel: number,
    priorityName: string,
    list: Todo[]
}

interface TodoListState {
    newTodoName: string,
    newTodoDescription: string
}

const blankTodoListState = () : TodoListState => {
    return {
        newTodoName: '',
        newTodoDescription: ''
    }
};

export class TodoList extends React.Component<TodoListProps, TodoListState> {
    state = blankTodoListState();

    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(blankTodoListState());
        e.target.reset();
    };
    render() {
        const list = this.props.list.map((todo: Todo) => {

        });
        return <div className="card col-sm m-1">
            <div className="card-body">
                <h2 className="card-title">{this.props.priorityName}</h2>
                <div className="card-text">
                    <form onSubmit={this.handleSubmit}>
                        <BoundInput host={this} stateKey='newTodoName' label="New todo"/>
                        <BoundTextArea host={this} stateKey='newTodoDescription' label="Description"/>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                    <p>{this.state.newTodoName}</p>
                    <p>{this.state.newTodoDescription}</p>
                    <ul>
                        {list}
                    </ul>
                </div>
            </div>
        </div>
    }
}
