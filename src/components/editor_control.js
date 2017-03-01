import React from 'react';
import IconButton from 'material-ui/IconButton';
import FormatSize from 'material-ui/svg-icons/editor/format-size';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import StyleButton from './style_button';
import Icon from './icon';

export default (props) => {
  let currentStyle, blockType, editorState, selection;

  if (props.type == 'inline') {
    currentStyle = props.editorState.getCurrentInlineStyle();
  } else {
    editorState = props.editorState;
    selection = editorState.getSelection();
    blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  }

  let controls;
  if (props.type == 'header') {
      controls = (
        <IconMenu
          iconButtonElement={<IconButton><FormatSize /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          {
            props.actions.map((type) => {
              let buttonStyle;
              if (type.style === blockType) {
                buttonStyle = {background: '#cccccc'};
              }
              return (
                <MenuItem
                  key={type.label}
                  primaryText={type.label}
                  onClick={ () => { props.onToggle(type.style) } }
                  style={buttonStyle}
                />
              )
            })
          }
        </IconMenu>
      )
  } else {

    controls = props.actions.map((type) => {
      return (
        <StyleButton
          key={type.label}
          active={props.type == 'inline' ? currentStyle.has(type.style) : type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          button={type.button}
        />
      )
    });
  }

  return (
    <div className="RichEditor-controls">
      {controls}
    </div>
  );
}
