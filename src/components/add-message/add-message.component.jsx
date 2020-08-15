import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './add-message.styles.scss';

class AddMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='add-message'>
        <form className="message-form" onSubmit={this.handleSubmit}>
          <FormInput
            name='message'
            type='text'
            value={this.state.message}
            handleChange={this.handleChange}
            label='message'
            required
          />
          <button className="send-button" type='submit'>Send</button>  
        </form>
      </div>
    );
  }
}

export default AddMessage;
