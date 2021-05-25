import { Link } from 'react-router-dom';
import T from 'prop-types';
import { connect } from 'react-redux';
import { getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions';
import { ConfirmationButton } from '../../shared';

import { logout } from '../../../api/auth';

const AuthButton = ({ handleLogout, isLogged }) => {
  const handleLogoutConfirm = async () => {
    await logout();
    handleLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const mapStateToProps = (state) => ({ isLogged: getIsLogged(state) });
const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(authLogout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
