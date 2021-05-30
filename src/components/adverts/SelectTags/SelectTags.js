import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckboxGroup } from '../../shared';
import { getAdvertsTags } from '../../../store/selectors';
import { advertsTagsAction } from '../../../store/actions';

function SelectTags(props) {
  const dispatch = useDispatch();
  const listTags = useSelector(getAdvertsTags);
  console.log('tag del selector', listTags);
 
  React.useEffect(() => {
    
    dispatch(advertsTagsAction());
  }, []);

  return <CheckboxGroup options={[listTags]} {...props} />;
}

export default SelectTags;
