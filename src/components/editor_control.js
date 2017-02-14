import React from 'react';
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
        <div id="dropdown">
          <nav>
              <ul>
                <li>
                  <a className="btn btn-inline RichEditor-styleButton" href="#" onClick={(e) => e.preventDefault()}>
                    <Icon name={'header'} className={'headers'} />                  <span className="arrow-down"></span>

                  </a>
                  <br/>

                  <ul>
                    {
                      props.actions.map((type) => {
                        return (
                          <li key={type.label}>
                            <StyleButton
                              key={type.label}
                              active={props.type == 'inline' ? currentStyle.has(type.style) : type.style === blockType}
                              label={type.label}
                              onToggle={props.onToggle}
                              style={type.style}
                            />
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              </ul>
          </nav>
        </div>
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
