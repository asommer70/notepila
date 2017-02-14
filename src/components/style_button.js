import React, { Component } from 'react';
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
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    let middle;
    if (this.props.style.substr(0, 7) == 'header-') {
      middle = this.props.label;
      className += ' header-btn';
    } else {
      middle = <Icon name={this.props.label} className={'editor-icon'} />
    }

    return (
      <div className={'btn btn-inline ' + className} onMouseDown={this.onToggle}>
        {middle}
      </div>
    );
  }
}
