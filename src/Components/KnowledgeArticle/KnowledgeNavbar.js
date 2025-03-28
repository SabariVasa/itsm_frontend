import React, { useState } from 'react'
import SearchBar from './HelperComponents/SearchBar';
import CmdbSelectField from '../HelperComponents/SelectField';
import { Button } from '@mui/material';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
import { useTheme } from '../../global/commonComponents/ThemeContext';

export default function KnowledgeNavbar() {
  const { theme } = useTheme();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [localCategory, setLocalCategory] = useState();

  return (
    <div className="flex justify-between px-3 py-6 items-center">
      <SearchBar />
      <CmdbSelectField
        MenuItems={[{ value: "My articles" }, { value: "IT Support" }, { value: "CMDB Queries" }, { value: "ITSM Articles" }]} label={"Choose Category"}
        setSelectValue={setLocalCategory}
        SelectedValue={localCategory}
        style={{ width: '30%' }}
      />
      <Button
        variant="contained"
        sx={{
          height: 52,
          background: `${theme.outerBodyColor}`,
          color: `${theme.outerBodyfontColor}`,
          "&:hover": {
            backgroundColor: `${theme.btnHoverColor}`,
          },
          textTransform: 'none', // This will prevent the text from being uppercased
        }}
        onClick={() => history.push(`${path}/knowledge-creation`)}
      >
        Create New
      </Button>
    </div>
  )
}
