import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';

import { getAdvertDetail, getUi } from '../../../store/selectors';
import {
  advertsDetailAction,
  advertDeletedAction,
} from '../../../store/actions';

function AdvertPage() {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);

  const advert = useSelector((state) => getAdvertDetail(state, advertId));
  React.useEffect(() => {
    dispatch(advertsDetailAction(advertId));
  }, []);

  const handleDelete = () => {
    dispatch(advertDeletedAction(advertId));
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
