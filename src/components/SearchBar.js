import React, { useContext, useState } from 'react';
import context from '../context/context';
import '../styles/SearchBar.css';

function SearchBar() {
  const { setFilters } = useContext(context);
  const [search, setSearch] = useState('');
  const [ingredient, setIngredient] = useState(true);
  const [name, setName] = useState(false);
  const [firstLetter, setFirstLetter] = useState(false);

  return (
    <div className="search-bar">
      <label htmlFor="searchBar">
        <input
          id="searchBar"
          type="text"
          placeholder="Search..."
          data-testid="search-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </label>
      <div>
        <label htmlFor="radioIndredients">
          <input
            id="radioIndredients"
            name="search"
            type="radio"
            data-testid="ingredient-search-radio"
            defaultChecked={ ingredient }
            onClick={ () => {
              setIngredient(true);
              setName(false);
              setFirstLetter(false);
            } }
          />
          Ingredients
        </label>

        <label htmlFor="radioName">
          <input
            id="radioName"
            type="radio"
            name="search"
            data-testid="name-search-radio"
            defaultChecked={ name }
            onClick={ () => {
              setName(true);
              setIngredient(false);
              setFirstLetter(false);
            } }
          />
          Name
        </label>

        <label htmlFor="radioFisrt">
          <input
            type="radio"
            name="search"
            id="radioFisrt"
            data-testid="first-letter-search-radio"
            defaultChecked={ firstLetter }
            onClick={ () => {
              setFirstLetter(true);
              setName(false);
              setIngredient(false);
            } }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (ingredient) setFilters({ filter: 'Ingredient', search });
          if (name) setFilters({ filter: 'Name', search });
          if (firstLetter && search.length === 1) {
            setFilters({ filter: 'First Letter', search });
          } else if (firstLetter && search.length > 1) {
            global.alert('Your search must have only 1 (one) character');
          }
        } }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
