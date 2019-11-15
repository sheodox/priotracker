import {Todo} from "./todo-types";

import React from 'react';
import ReactDOM from 'react-dom';
import {TodoList} from './TodoList';


interface AppState {
    high: Todo[],
    medium: Todo[],
    low: Todo[],
}

class App extends React.Component<{}, AppState> {
    state = {
        high: [], medium: [], low: []
    };
    async componentDidMount() {
        const lists: AppState = await fetch('/todo.json').then(res => res.json());
        this.setState(lists);
    }
    render() {
        return <div className='container'>
            <div className="row">
                <TodoList list={this.state.high} priorityLevel={1} priorityName="High"/>
                <TodoList list={this.state.medium} priorityLevel={2} priorityName="Medium"/>
                <TodoList list={this.state.low} priorityLevel={3} priorityName="Low"/>
            </div>
        </div>
    }
}

window.addEventListener('load', () => {
    // @ts-ignore
    ReactDOM.render(<App />, document.getElementById('react-root'));
});
