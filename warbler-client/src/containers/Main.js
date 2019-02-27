// Routing logic (main component)
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth'; // we pass authUser as a prop to our form
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return(
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
        <Route exact path="/signin" render={props => {
          return (
            <AuthForm onAuth={authUser} errors={errors} removeError={removeError} buttonText="Log In" heading="Welcome Back" {...props} />
          );
        }} />
        <Route exact path="/signup" render={props => {
          return (
            <AuthForm signUp onAuth={authUser} errors={errors} removeError={removeError} buttonText="Sign me up!" heading="Join Warbler Today" {...props} />
          );
        }} />
        <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));