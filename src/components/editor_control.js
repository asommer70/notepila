import React from 'react';
import StyleButton from './style_button';

export default (props) => {
  let currentStyle, blockType, editorState, selection;

  if (props.type == 'inline') {
    currentStyle = props.editorState.getCurrentInlineStyle();
  } else if (props.type == 'block') {
    editorState = props.editorState;
    selection = editorState.getSelection();
    blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  }

  const controls = props.actions.map((type) => {
    return (
      <StyleButton
        key={type.label}
        active={props.type == 'inline' ? currentStyle.has(type.style) : type.style === blockType}
        label={type.label}
        onToggle={props.onToggle}
        style={type.style}
      />
    )
  });

  return (
    <div className="RichEditor-controls">
      {controls}
    </div>
  );
}
