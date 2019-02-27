// handle validation to make sure that a user is logged in before they see a component
import React, { Component } from 'react';
import { connect } from 'react-redux'; 

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }

    // we want to make sure if the user is still authenticacted
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />
    }
  }
  
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    };
  }
  
  return connect(mapStateToProps)(Authenticate);
}
