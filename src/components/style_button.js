import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

import Icon from './icon';

export default class StyleButton extends Component {
  constructor() {
    super();

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let buttonStyle;
    let iconClass = '';
    if (this.props.active) {
      buttonStyle = {background: '#cccccc'};
      iconClass = 'active-button';
    }

    return (
      <IconButton key={this.props.label} onMouseDown={this.onToggle} iconStyle={buttonStyle}>
          {this.props.button}
      </IconButton>
    );
  }
}
