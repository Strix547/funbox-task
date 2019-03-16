import React, { Component } from 'react';

import './PointAddForm.scss';

export default class PointAddForm extends Component {

  state = {
    name: ''
  }

  onInputChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) {
      alert('Please, enter an address');
      return;
    }
    this.props.onPointAdded(name);
    this.setState({
      name: ''
    });
  };

  render() {
    const { name } = this.state;
    return (
      <form className="point-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          id="suggest"
          placeholder="add new point"
          onChange={this.onInputChange}
          value={name}
        />
      </form>
     );
  }
}