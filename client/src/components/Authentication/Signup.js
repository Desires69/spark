import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './authAction';
import Footer from '../App/Footer';
import './auth.css';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    // Call action creator to signup the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {
      handleSubmit, fields: {
      firstName, lastName, email, password, passwordConfirm, couple, otherEmail,
    }
    } = this.props;
    return (
      <div className="signup--box">
        <div className="hero__overlay">
          <div className="signin__overlay">
            <Link to="/" className="logo__auth">Sparkq</Link>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <h6 className="signup--box__title">A better relationship is right
                around the corner...</h6>
              <fieldset className="form-group">
                <div className="input-field">
                  <input id="firstname" type="text" className="auth__input form-control validate" {...firstName} />
                  <label for="firstname">
                    <i className="icon material-icons">person_pin</i>
                    First Name:</label>
                  {firstName.touched && firstName.error &&
                  <div className="error">{firstName.error}</div>}
                </div>
              </fieldset>
              <fieldset className="form-group">
                <div className="input-field">
                  <input type="text" className="auth__input form-control validate" {...lastName} />
                  <label>
                    <i className="icon material-icons">person_pin</i>
                    Last Name:
                  </label>
                  {lastName.touched && lastName.error &&
                  <div className="error">{lastName.error}</div>}
                </div>
              </fieldset>
              <fieldset className="form-group">
                <div className="input-field">
                  <input type="email" className="auth__input form-control validate" {...email} />
                  <label>
                    <i className="icon material-icons">email</i>
                    Email:
                  </label>
                  {email.touched && email.error &&
                  <div className="error">{email.error}</div>}
                </div>
              </fieldset>
              <fieldset className="form-group">
                <div className="input-field">
                  <input type="password"
                         className="auth__input form-control validate" {...password} />
                  <label>
                    <i className="icon material-icons">lock</i>
                    Password:
                  </label>
                  {password.touched && password.error &&
                  <div className="error">{password.error}</div>}
                </div>
              </fieldset>
              <fieldset className="form-group">
                <div className="input-field">
                  <input type="password"
                         className="auth__input form-control validate" {...passwordConfirm} />
                  <label>
                    <i className="icon material-icons">lock</i>
                    Confirm Password:
                  </label>
                  {passwordConfirm.touched && passwordConfirm.error &&
                  <div className="error">{passwordConfirm.error}</div>}
                </div>
              </fieldset>
              <fieldset className="form-group">
                <label className="form__question">Would you like to start a new couple?</label>
                <div>
                  <select className="signup-questions" {...couple}>
                    <option>Select an answer...</option>
                    <option value="yes">Yes - my partner has not signed up yet
                    </option>
                    <option value="no">No - connect with my partner</option>
                  </select>
                </div>
              </fieldset>
              <fieldset className="form-group">
                <div
                  className="input-field"
                  hidden={this.props.fields.couple.value === 'no' ? false : true}
                >
                  <input type="email"
                         className="auth__input form-control" {...otherEmail} />
                  <label>
                    <i className="icon material-icons">email</i>
                    Partner's Email:
                  </label>
                </div>
              </fieldset>
              {this.renderAlert()}
              <button
                action="Submit"
                className="form__btn btn btn-primary waves-effect waves-light"
              >Signup
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

/*
 Mike's Attempt at radio buttons....
 <p>
 <input name="group1" type="radio" {...couple} value="yes" />
 <label>Yes - my partner has not signed up yet</label>
 </p>
 <p>
 <input name="group1" type="radio" {...couple} value="no" />
 <label>No - connect with my partner</label>
 </p>

 Josh's attempt at radio buttons....
 to replace dropdown, need to get this working
 <form action="#">
 <p>
 <input className="with-gap" name="group1" id="agree" type="radio" />
 <label for="agree">Yes - my partner has not signed up yet</label>
 </p>
 <p>
 <input className="with-gap" name="group1" type="radio" />
 <label for="disagree">No - connect with my partner</label>
 </p>
 </form>
 <select className="signup-questions" {...couple}>
 <option>Select an answer...</option>
 <option value="yes">Yes - my partner has not signed up yet</option>
 <option value="no">No - connect with my partner</option>
 </select>
 */

const validate = (formProps) => {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter your first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter your last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'signup',
  fields: ['firstName', 'lastName', 'email', 'password', 'passwordConfirm', 'couple', 'otherEmail'],
  validate,
}, mapStateToProps, actions)(Signup);
