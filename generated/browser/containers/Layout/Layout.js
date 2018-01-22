'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import './_Layout';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func
  }

  render () {
    const { children, user, dispatch } = this.props

    return (
      <div>
        <Navbar user={user} dispatch={dispatch} />
        <div id='main' className='container'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

export default connect(mapStateToProps)(Layout);
