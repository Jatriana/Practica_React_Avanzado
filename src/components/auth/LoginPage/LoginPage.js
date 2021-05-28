import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import T from 'prop-types';
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  resetError,
} from '../../../store/actions';
// import usePromise from '../../../hooks/usePromise';
import LoginForm from './LoginForm';
import { login } from '../../../api/auth';
import { getUi } from '../../../store/selectors';

function LoginPage() {
  // const { isPending: isLoading, error, execute, resetError } = usePromise();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { loading, error } = useSelector(getUi);
  const handleSubmit = async (credentials) => {
    try {
      dispatch(authLoginRequest());

      await login(credentials);
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(authLoginSuccess());
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
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
