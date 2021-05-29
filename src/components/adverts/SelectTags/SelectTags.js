import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../../api/adverts';
import { CheckboxGroup } from '../../shared';
import { getAdvertsTags } from '../../../store/selectors';
import { advertsTagsAction } from '../../../store/actions';

function SelectTags(props) {
  const dispatch = useDispatch();
  const listTags = useSelector(getAdvertsTags);
  // const [tags, setTags] = React.useState([]);
  dispatch(advertsTagsAction());
  // getTags().then(setTags);
  React.useEffect(() => {}, []);

  return <CheckboxGroup options={listTags} {...props} />;
}

export default SelectTags;
