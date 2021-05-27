import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { advertsCreated } from '../../../store/actions';

function NewAdvertPage({ history }) {
  const { isPending: isLoading, error, execute } = usePromise(null);
  const dispatch = useDispatch();

  const handleSubmit = async (newAdvert) => {
    const advert = await execute(createAdvert(newAdvert));
    dispatch(advertsCreated(advert)).the(({ id }) =>
      history.push(`/adverts/${id}`)
    );
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
