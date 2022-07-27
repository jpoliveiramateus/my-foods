import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
        className="button-drinks"
        style={
          pathname.includes('drinks')
            ? { backgroundColor: 'rgb(0, 110, 219)' }
            : {}
        }
      >
        <i className="fa-solid fa-martini-glass-citrus" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
        className="button-foods"
        style={
          pathname.includes('foods')
            ? { backgroundColor: 'rgb(0, 110, 219)' }
            : {}
        }
      >
        <i className="fa-solid fa-burger" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
