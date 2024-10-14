import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CustomTextField from './TextField';
// import { Divider } from '@mui/material';
import SelectField from './SelectField';
import DateComponent from './DateComponent';
import { IconSelector } from './IconSelector';
import SearchTextField from './SearchTextField';  // Import the SearchTextField component

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GridContainer({
  show = [],
  dropdown = [],
  MenuItems = [[], []],
  name = [],
  setName1,
  Name1,
  setName2,
  Name2,
  setSelectValue1,
  SelectedValue1,
  setSelectValue2,
  SelectedValue2,
  icon,
  label = [],
  Date1,
  setDate1,
  Date2,
  setDate2,
  isSearch,  // New prop to determine if it's a search field
  searchFieldValue,
  setSearchFieldValue,
  handleSearchClick,  // Function to handle search click
}) {
  const renderField = (isDropdown, isSearch, Name, setName, selectValue, setSelectValue, menuItems, label, idx) => {
    if (isSearch) {
      return (
        <SearchTextField
          placeholder={label}  // Label for search field
          fieldValue={searchFieldValue}
          setFieldValue={setSearchFieldValue}
          search={true}
          handleClickOpen={handleSearchClick}
          style={{ width: '100%' }}  // Customize the style as needed
        />
      );
    }

    return !isDropdown ? (
      <CustomTextField Name={Name} setName={setName} name={name[idx]} />
    ) : (
      <SelectField MenuItems={menuItems} setSelectValue={setSelectValue} SelectedValue={selectValue} label={label} />
    );
  };

  const renderDateComponent = (idx) => (
    <DateComponent label={label[idx]} Date={idx === 0 ? Date1 : Date2} setDate={idx === 0 ? setDate1 : setDate2} />
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} sx={{ width: '80%', display: 'flex', alignItems: 'center' }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {show[0] && (
          <Grid item xs={6}>
            {renderField(dropdown[0], isSearch, Name1, setName1, SelectedValue1, setSelectValue1, MenuItems[0], name[0], 0)}
          </Grid>
        )}
        {show[1] && (
          <Grid item xs={6}>
            {renderField(dropdown[1], false, Name2, setName2, SelectedValue2, setSelectValue2, MenuItems[1], name[1], 1)}
          </Grid>
        )}
        {icon && (
          <Grid item xs={6}>
            <IconSelector />
          </Grid>
        )}
        {show[2] && (
          <Grid item xs={6}>
            {renderDateComponent(0)}
          </Grid>
        )}
        {show[3] && (
          <Grid item xs={6}>
            {renderDateComponent(1)}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
