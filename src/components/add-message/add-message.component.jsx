import React from 'react';

import FormInput from '../form-input/form-input.component';

import './add-message.styles.scss';

class AddMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleKeyPress = event => {
    if (this.state.message && event.key === 'Enter') {
      this.setState({ message: '' });
      this.props.handleSubmit(this.state.message);
    }
  }

  handleSendButtonClick = () => {
    this.setState({ message: '' });
    this.props.handleSubmit(this.state.message);  
  }

  render() {
    return (
      <div className='add-message'>
        <div className="message-form">
          <FormInput
            name='message'
            type='text'
            value={this.state.message}
            handleChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            label='message'
            required
          />
          <button onClick={this.handleSendButtonClick} className="send-button">Send</button>
        </div>
      </div>
    );
  }
}

export default AddMessage;
