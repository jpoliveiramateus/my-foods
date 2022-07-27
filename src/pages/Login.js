import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import '../styles/Login.css';

const SIX = 6;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const validatedLogin = () => {
      const emailRegex = /\S+@\S+\.\S+/;
      if (emailRegex.test(email) && password.length > SIX) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };
    validatedLogin();
  }, [password, email]);

  const saveData = () => {
    const infos = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(infos));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
    history.push('/foods');
  };

  return (
    <form className="login">
      <h1>MY FOODS</h1>
      <img src="https://img.freepik.com/psd-gratuitas/renderizacao-3d-de-uma-deliciosa-massa_23-2149108551.jpg?t=st=1658770837~exp=1658771437~hmac=83c7240b3e5bb9b9087e76bd3efdd346d086c5998ace7598320226d9506d9cbb&w=740" alt="icon" />
      <input
        placeholder="Email"
        name="email"
        id="login-id"
        value={ email }
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        placeholder="Senha"
        type="password"
        name="password"
        id="password"
        value={ password }
        data-testid="password-input"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisable }
        onClick={ () => saveData() }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default Login;
