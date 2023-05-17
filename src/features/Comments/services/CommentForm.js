import React, {useState} from 'react';
import styled from "styled-components";

const CommentForm = ({handleSubmit, submitLabel, hasCancelButton = false, initialText = "", handleCancel}) => {
    const [text, setText] = useState(initialText);
    const isTextAreaDisabled = text.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text)
        setText("")
    }

    return (
        <form onSubmit={onSubmit}>
            <CommentFormTextArea
                value={text}
                onChange={(e) => setText(e.target.value)}>
            </CommentFormTextArea>
            <CommentFormButton disabled={isTextAreaDisabled}>{submitLabel}</CommentFormButton>
            {hasCancelButton && (
                <CancelFormButton
                    onClick={handleCancel}
                    type="button"
                >
                    Cancel
                </CancelFormButton>
            )}
        </form>
    );
};

const CommentFormTextArea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 8px;
  margin-top: 8px;
  border: 1px solid rgb(107, 114, 12);

`
const CommentFormButton = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  background: rgb(59, 130, 246);
  border-radius: 8px;
  color: white;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  &:enabled {
    cursor: pointer;
    background: rgb(37, 99, 235);
  }
`

const CancelFormButton = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  background: rgb(59, 130, 246);
  border-radius: 8px;
  color: white;
  margin-left: 10px;
`

export default CommentForm;
