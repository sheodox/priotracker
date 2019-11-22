import React from 'react';

interface BoundProps {
	//the parent component, for which to set the state on with value changes
	host: React.Component;
	//the property on the parent component's state that should match the value of the input
	stateKey: string;
	//label text
	label: string;
}

const createBoundInput = elementType => {
	return class BoundFormElement extends React.Component<BoundProps> {
		private input: React.RefObject<HTMLTextAreaElement | HTMLInputElement>;
		constructor(props) {
			super(props);
			this.input = React.createRef();
		}
		componentDidMount(): void {
			const startVal = this.props.host.state[this.props.stateKey];
			if (!startVal) {
				return;
			}
			this.input.current.value = startVal;
		}
		onKeyUp(e) {
			const newState = {};
			newState[this.props.stateKey] = e.target.value;
			this.props.host.setState(newState);
		}
		render() {
			return React.createElement(
				'label',
				null,
				this.props.label,
				React.createElement(elementType, {
					ref: this.input,
					onKeyUp: this.onKeyUp.bind(this)
				})
			);
		}
	};
};

export const BoundInput = createBoundInput('input');
export const BoundTextArea = createBoundInput('textarea');
