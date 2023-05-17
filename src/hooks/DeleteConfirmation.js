import React from 'react';
import styled from "styled-components";

const DeleteConfirmation = ({ message, onConfirm, onCancel }) => {

    const styles = {
        popup: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
        }
    };

    return (
        <div style={styles.popup}>
            <div style={styles.content}>
                <h4>{message}</h4>
                <ButtonStyled onClick={onConfirm}>Confirm</ButtonStyled>
                <ButtonStyled onClick={onCancel}>Cancel</ButtonStyled>
            </div>
        </div>
    );
};

export default DeleteConfirmation;


const ButtonStyled = styled.button`
  margin-right: 0.5rem;
  margin-bottom: 20px;
  margin-top: 20px;
  color: white;
  background-color: #0f3a6a;

  transition: all 0.3s ease;

  &:hover {
    border-color: #b0b0b0;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);

`