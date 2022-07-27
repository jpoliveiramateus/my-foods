import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonsFavorite from '../components/ButtonsFavorite';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [faveRecipes, setFaveRecipes] = useState([]);
  const [allFaveRecipes, setAllFaveRecipes] = useState([]);
  const [attList, setAttList] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setFaveRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setAllFaveRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [setFaveRecipes, attList]);

  const filter = (fil) => {
    if (fil === 'drinks') {
      const newList = allFaveRecipes.filter((recipe) => recipe.type === 'drink');
      setFaveRecipes(newList);
    } else if (fil === 'foods') {
      const newList = allFaveRecipes.filter((recipe) => recipe.type === 'food');
      setFaveRecipes(newList);
    } else {
      setFaveRecipes(allFaveRecipes);
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" isSearch={ false } />
      {allFaveRecipes?.length > 0 && (
        <div className="filter-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filter('all') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filter('foods') }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filter('drinks') }
          >
            Drinks
          </button>
        </div>
      )}
      {faveRecipes?.length > 0 && (
        faveRecipes.map((recipe, index) => {
          const { id, category, name, image, nationality, type, alcoholicOrNot } = recipe;
          return (
            <div key={ `${index}-${name}` } className="done-recipe">
              <button
                onClick={ () => {
                  if (type === 'drink') {
                    history.push(`/drinks/${id}`);
                  } else {
                    history.push(`/foods/${id}`);
                  }
                } }
                type="button"
              >
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                  width="200px"
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
              </button>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}`}
              </p>
              <ButtonsFavorite
                recipe={ recipe }
                index={ index }
                setAttList={ setAttList }
              />
            </div>
          );
        })
      )}
    </>
  );
}

export default FavoriteRecipes;
