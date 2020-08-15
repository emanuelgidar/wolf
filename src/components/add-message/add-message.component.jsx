import React from 'react';

import FormInput from '../form-input/form-input.component';
// import CustomButton from '../custom-button/custom-button.component';

// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './add-message.styles.scss';

class AddMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='username'
            type='text'
            handleChange={this.handleChange}
            value={this.state.username}
            label='username'
            required
          />
          <FormInput
            name='message'
            type='text'
            value={this.state.message}
            handleChange={this.handleChange}
            label='message'
            required
          />
          <div className='buttons'>
            <button type='submit'> Submit </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddMessage;
