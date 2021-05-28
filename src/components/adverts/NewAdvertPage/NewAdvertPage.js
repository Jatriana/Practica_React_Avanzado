import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { advertCreated } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function NewAdvertPage() {
  // const { isPending: isLoading, error, execute } = usePromise(null);
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);
  const history = useHistory();
  const handleSubmit = async (newAdvert) => {
    try {
      const advert = await createAdvert(newAdvert);
      console.log('advert', advert.id);
      const id = advert.id;
      dispatch(advertCreated(advert));
      history.push(`/adverts/${id}`);
    } catch (error) {}
  };
  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({
    push: T.func.isRequired,
  }).isRequired,
};

export default NewAdvertPage;
