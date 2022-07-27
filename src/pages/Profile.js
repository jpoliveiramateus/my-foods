import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import profile from '../images/profile.png';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <>
      <Header title="Profile" isSearch={ false } />
      <main className="profile">
        <img src={ profile } alt="profile" />
        <p data-testid="profile-email">{email?.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            window.localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
