import {Todo} from "./todo-types";

import React from 'react';
import ReactDOM from 'react-dom';
import {TodoList} from './TodoList';
import {request} from "./request";


interface AppState {
    high: Todo[],
    medium: Todo[],
    low: Todo[],
}

class App extends React.Component<{}, AppState> {
    state = {
        high: [], medium: [], low: []
    };
    refresh = async () => {
        const lists: AppState = await request('/todo');
        this.setState(lists);
    };
    async componentDidMount() {
        await this.refresh();
    }
    render() {
        return <div className='container'>
            <div className="row">
                <TodoList refresh={this.refresh} list={this.state.high} priorityLevel={1} priorityName="High"/>
                <TodoList refresh={this.refresh} list={this.state.medium} priorityLevel={2} priorityName="Medium"/>
                <TodoList refresh={this.refresh} list={this.state.low} priorityLevel={3} priorityName="Low"/>
            </div>
        </div>
    }
}

window.addEventListener('load', () => {
    ReactDOM.render(<App />, document.getElementById('react-root'));
});
