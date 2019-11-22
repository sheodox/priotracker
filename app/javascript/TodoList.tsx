import { Todo } from './todo-types';
import React from 'react';
import { BoundInput, BoundTextArea } from './BoundInputs';
import { EditModal } from './EditModal';
import { Icon } from './Icon';
import { request } from './request';
import { If } from './If';

interface TodoListProps {
	priorityLevel: number;
	priorityName: string;
	list: Todo[];
	refresh: Function;
}

interface TodoListState {
	newTodoName: string;
	newTodoDescription: string;
}

const blankTodoListState = (): TodoListState => {
	return {
		newTodoName: '',
		newTodoDescription: ''
	};
};

export class TodoList extends React.Component<TodoListProps, TodoListState> {
	state = blankTodoListState();

	constructor(props) {
		super(props);
	}
	handleSubmit = async e => {
		e.preventDefault();
		const body = JSON.stringify({
			name: this.state.newTodoName,
			description: this.state.newTodoDescription,
			priority: this.props.priorityLevel
		});

		e.target.reset();
		this.setState(blankTodoListState());

		await request('/todo', {
			method: 'POST',
			body
		});

		await this.props.refresh();
	};
	showAll = async () => {
		await request('/todo/show_all', {
			method: 'POST',
			body: JSON.stringify({
				priority: this.props.priorityLevel
			})
		});
		await this.props.refresh();
	};
	render() {
		const list = this.props.list.map((todo: Todo) => {
				const key = `prio-${this.props.priorityLevel}-todo-item-${todo.id}`;
				return (
					<TodoItem
						key={key}
						uniqueId={key}
						todo={todo}
						refresh={this.props.refresh}
					/>
				);
			}),
			numHidden = this.props.list.filter(todo => !todo.visible).length,
			listContainer = (
				<ul className="list-group list-group-flush container">{list}</ul>
			),
			emptyListMessage = <p>No todos! Congratulations!</p>;

		return (
			<div className="col-sm">
				<div className="card m-1">
					<div className="card-body">
						<h2 className="card-title">{this.props.priorityName}</h2>
						<div className="card-text">
							<form onSubmit={this.handleSubmit}>
								<BoundInput
									host={this}
									stateKey="newTodoName"
									label="New todo"
								/>
								<BoundTextArea
									host={this}
									stateKey="newTodoDescription"
									label="Description"
								/>
								<button type="submit" className="btn btn-primary">
									Add
								</button>
							</form>
						</div>
					</div>
				</div>
				{numHidden > 0 && (
					<button className="w-100 btn btn-secondary" onClick={this.showAll}>
						Show all ({numHidden} hidden)
					</button>
				)}
				{this.props.list.length > 0 ? listContainer : emptyListMessage}
			</div>
		);
	}
}

interface TodoProps {
	todo: Todo;
	// a unique id that can be used in subsequent elements within the component
	uniqueId: string;
	refresh: Function;
}

interface TodoState {
	name: string;
	description: string;
	editing: boolean;
}

class TodoItem extends React.Component<TodoProps, TodoState> {
	state = {
		name: '',
		description: '',
		editing: false
	};
	constructor(props) {
		super(props);
	}
	deleteTodo = async () => {
		await request(`/todo/${this.props.todo.id}`, {
			method: 'DELETE'
		});
		this.props.refresh();
	};
	hide = async () => {
		await request(`/todo/${this.props.todo.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				visible: false
			})
		});
		this.props.refresh();
	};
	edit = () => {
		this.setState({ editing: true });
	};
	doneEditing = async newData => {
		this.setState({ editing: false });

		if (newData) {
			await request(`/todo/${this.props.todo.id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					id: this.props.todo.id,
					...newData
				})
			});
			this.props.refresh();
		}
	};
	render() {
		if (!this.props.todo.visible) {
			return null;
		}
		const button = (icon: string, click: any) => {
			return (
				<button
					className="btn btn-sm btn-light float-right icon-button"
					onClick={click}
				>
					<Icon name={icon} />
				</button>
			);
		};

		const inputId = `checkbox-${this.props.uniqueId}`,
			descriptionTooltip = this.props.todo.description || '<No description>';
		return (
			<li className="list-group-item form-check">
				<input
					type="checkbox"
					id={inputId}
					className="form-check-input"
					onChange={this.deleteTodo}
				/>
				<label
					htmlFor={inputId}
					className="form-check-label"
					title={descriptionTooltip}
				>
					{this.props.todo.name}
				</label>
				{button('eye', this.hide)}
				{button('menu', this.edit)}
				<If insertWhen={this.state.editing}>
					<EditModal doneEditing={this.doneEditing} todo={this.props.todo} />
				</If>
			</li>
		);
	}
}
