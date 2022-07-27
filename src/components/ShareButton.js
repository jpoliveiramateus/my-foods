import React, { useState } from 'react';
import copy from 'clipboard-copy';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const THREE_MILLISECONDS = 3000;

function ShareButton({ recipe, index }) {
  const [isShare, setIsShare] = useState(false);

  const copyLink = (recipeReceived) => {
    const { id, type } = recipeReceived;
    const linkURL = window.location.href;
    const newLinkURL = linkURL.replace('/done-recipes', `/${type}s/${id}`);
    copy(newLinkURL);
    setIsShare(true);
    setTimeout(() => setIsShare(false), THREE_MILLISECONDS);
  };

  return (
    <>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyLink(recipe) }
        src={ shareIcon }
      >
        <i className="fa-solid fa-share-from-square" />
      </button>
      {isShare && <span>Link copied!</span>}
    </>
  );
}

ShareButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.any).isRequired,
  index: propTypes.number.isRequired,
};

export default ShareButton;
