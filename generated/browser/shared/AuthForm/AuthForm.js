'use strict';

import React, { Component, PropTypes } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Row,
  Col
} from 'react-bootstrap'

export default class AuthForm extends Component {

  static propTypes = {
    buttonLabel: PropTypes.string,
    buttonStyle: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    buttonStyle: 'default',
    buttonLabel: 'Submit'
  }

  constructor (props) {
    super(props)
    this.state = {
      form: {
        email: '',
        password: ''
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.form)
    const newState = {...this.state}
    newState.form = { email: '', password: '' }
    this.setState(newState)
  }

  handleChange = (e, field) => {
    const newState = {...this.state}
    newState.form[field] = e.target.value
    this.setState(newState)
  }

  render () {
    const { form } = this.state
    const { buttonLabel, buttonStyle } = this.props

    return (
      <Col xs={6} xsOffset={3}>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type='text'
              placeholder='Enter email'
              value={form.email}
              onChange={(e) => this.handleChange(e, 'email')}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type='password'
              placeholder='Password'
              value={form.password}
              onChange={(e) => this.handleChange(e, 'password')}
            />
          </FormGroup>
          <Button type='submit' bsStyle={buttonStyle}>{buttonLabel}</Button>
        </form>
      </Col>
    )
  }
}
