import React from 'react';
import {Todo} from "./todo-types";
import {BoundInput, BoundTextArea} from "./BoundInputs";
import {Icon} from './Icon';
import {Modal} from './Modal'

interface EditModalState {
    name: string,
    description: string
}
interface EditModalProps {
    doneEditing(any): any,
    todo: Todo
}

export class EditModal extends React.Component<EditModalProps, EditModalState> {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.todo.name,
            description: this.props.todo.description
        }
    }
    save = () => {
        this.props.doneEditing({
            name: this.state.name,
            description: this.state.description
        })
    };
    cancel = () => {
        this.props.doneEditing(null);
    };
    componentDidMount(): void {
    }

    render() {
        return <Modal title="Edit Todo" save={this.save} cancel={this.cancel}>
            <BoundInput label="Todo name"  host={this} stateKey='name'/>
            <BoundTextArea label="Description"  host={this} stateKey='description'/>
        </Modal>
    }
}
