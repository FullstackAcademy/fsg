'use strict';

import React, { Component } from 'react';
import { getStash } from '../../api/secretStash';
import './_MembersOnly';

class MembersOnly extends Component {
  constructor (props) {
    super(props);

    this.state = {
      stash: []
    };

    this.renderSecretStash = this.renderSecretStash.bind(this);
  }

  componentWillMount () {
    getStash()
      .then(stash => {
        this.setState({ ...this.state, stash })
      })
  }

  renderSecretStash () {
    return this.state.stash.map(item => (<img width="300" src={item} />));
  }

  render () {
    return (
      <div id='members-only'>
        <h1>Members Only Area</h1>
        {this.renderSecretStash()}
      </div>
    )
  }
}

export default MembersOnly;
