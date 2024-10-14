import React, { useEffect, useState } from 'react'
import SearchBar from './HelperComponents/SearchBar';
import CmdbSelectField from '../HelperComponents/SelectField';
// import ContentDevider from '../HelperComponents/ContentDevider';
import { Button } from '@mui/material';
import { useNavigate, useMatch, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCategory } from '../../Redux state management/Redux Slices/KnowledgeDataSlice';

export default function KnowledgeNavbar(props) {
  const { setCreateKnowledge } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname, 'pathName');
  const [localCategory, setLocalCategory] = useState();
  // const dispatch = useDispatch();
  // const category = useSelector((state) => state.knowledgeReducers.category);

  useEffect(() => {
    // dispatch(setCategory(localCategory))
  }, [localCategory])
  return (
    <>
      <div className="knowledge-navbar">
        <div style={{ marginTop: 15 }}>
          <SearchBar />
        </div>
        <div>
          <CmdbSelectField MenuItems={[{ value: "My articles" }, { value: "IT Support" }, { value: "CMDB Queries" }, { value: "ITSM Articles" }]} label={"Choose Category"} setSelectValue={setLocalCategory} SelectedValue={localCategory} style={{ width: 250 }} />
        </div>
        <div>
          <Button variant="contained" color="primary" style={{ width: 200, fontSize: 12, height: 52, marginTop: 13 }} onClick={() => setCreateKnowledge(true)}>Create New</Button>
        </div>
      </div>
    </>
  )
}
