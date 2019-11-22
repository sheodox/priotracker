import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	title: string;
	cancel: () => void;
	save: () => void;
}

export class Modal extends React.Component<ModalProps> {
	private el: HTMLElement;
	private modalRoot: HTMLElement;
	state = {
		show: false
	};
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
		this.modalRoot = document.getElementById('modal-root');
	}
	componentDidMount(): void {
		this.modalRoot.appendChild(this.el);
		this.setState({ show: true });
	}
	componentWillUnmount(): void {
		this.modalRoot.removeChild(this.el);
	}
	render() {
		const modal = (
			<React.Fragment>
				<div
					className={'modal fade ' + (this.state.show ? 'show' : '')}
					tabIndex={-1}
					role="dialog"
					aria-labelledby="exampleModalCenterTitle"
					aria-hidden="true"
					style={{ display: 'block' }}
				>
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">
									{this.props.title}
								</h5>
								<button
									type="button"
									className="close"
									aria-label="Close"
									onClick={this.props.cancel}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">{this.props.children}</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={this.props.cancel}
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={this.props.save}
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-backdrop fade show" />
			</React.Fragment>
		);

		return ReactDOM.createPortal(modal, this.el);
	}
}
