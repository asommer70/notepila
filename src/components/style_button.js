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

    return (
      <div className={'btn btn-inline ' + className} onMouseDown={this.onToggle}>
        <Icon name={this.props.label} className={'editor-icon'} />
      </div>
    );
  }
}
