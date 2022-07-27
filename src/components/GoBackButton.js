import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/GoBackButton.css';

function GoBackButton() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <button type="button" onClick={ goBack } className="goBack">
      <i className="fa-solid fa-arrow-left" />
    </button>
  );
}

export default GoBackButton;
