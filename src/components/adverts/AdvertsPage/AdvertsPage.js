import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertsList } from '../../../store/selectors';
import { advertsLoaded } from '../../../store/actions';
import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import { getAdverts } from '../../../api/adverts';
import { defaultFilters, filterAdverts } from './filters';
import usePromise from '../../../hooks/usePromise';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = (filters) => storage.set('filters', filters);

function AdvertsPage() {
  const {
    isPending: isLoading,
    error,
    execute,
    data: adverts,
  } = usePromise([]);

  const [filters, setFilters] = React.useState(getFilters);
  const dispatch = useDispatch();
  const listAdverts = useSelector(getAdvertsList);

  React.useEffect(() => {
    execute(getAdverts().then((adverts) => dispatch(advertsLoaded(adverts))));
  }, []);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  const filteredAdverts = filterAdverts(listAdverts, filters);

  return (
    <Layout>
      {listAdverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={listAdverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={listAdverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
