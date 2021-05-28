import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import T from 'prop-types';
import LoginForm from './LoginForm';
import { getUi } from '../../../store/selectors';
import { loginAction, resetError } from '../../../store/actions';

function LoginPage() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(getUi);
  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials));
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {loading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={() => dispatch(resetError())} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default LoginPage;
