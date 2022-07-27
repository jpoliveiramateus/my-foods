import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title, isSearch }) {
  const history = useHistory();
  const [searchBarState, setSearchBarState] = useState(false);
  return (
    <header className="header">
      <nav>
        <button type="button" onClick={ () => history.push('/profile') }>
          <i className="fa-solid fa-user" data-testid="profile-top-btn" />
        </button>
        <h1 data-testid="page-title">{title}</h1>
        {isSearch ? (
          <button type="button" onClick={ () => setSearchBarState(!searchBarState) }>
            <i className="fa-solid fa-magnifying-glass" data-testid="search-top-btn" />
          </button>
        ) : (
          <img
            src=""
            alt=""
            width="50"
          />
        )}
      </nav>
      {searchBarState && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  isSearch: propTypes.bool.isRequired,
};

export default Header;
