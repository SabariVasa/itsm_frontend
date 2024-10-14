import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { BsClipboardPlus } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import NewClassCreationPanel from "./NewClassCreationPanel";
import styles from './ClassManagement.module.scss';
import CMDB from "../../../Pages/CMDB";

function ClassManagementMain(props) {
  const { t } = props;
  const [activeTab, setActiveTab] = useState('');

  const componentObj = {
    create_class: NewClassCreationPanel,
    show_class: CMDB
  };

  let Component = null;
  Component = componentObj[activeTab];

  return (
    <div className={styles.classCategory}>
      {/* {!createMainClassForm ? (
        <>
          <h3>{t('create_class')}</h3>
          <ContentDevider title="Create Class" />
          <Grid container >
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{'Select Category Type'}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectCategoryType}
                  label='Select Category'
                  onChange={handleChangeCategory}
                >
                  <MenuItem value="">
                    <em>Select Service</em>
                  </MenuItem>
                  {categoryTypeList.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5} sx={{ marginLeft: '1em' }}>
              <TextField
                label="Header"
                name="header"
                fullWidth
                onChange={handleHeaderChange}
                value={header}
                helperText={header === '' ? t('header_required') : ''}
                error={header === ''}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              onClick={() => setCreateMainClassForm(true)}
              variant="outlined"
              disabled={!selectCategoryType || header === ''}
              color="warning"
              style={{ width: 100 }}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <CreateNewClassFormCreation
          selectCategoryType={selectCategoryType}
          header={header}
          setCreateMainClassForm={setCreateMainClassForm}
        />
      )} */}
      {console.log(Component, activeTab, 'Component')}
      {activeTab === '' ? (
        <>
          <div onClick={() => setActiveTab('create_class')} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
            <div style={{ width: 120, height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 20 }} className="form-glass-design">
              <BsClipboardPlus style={{ fontSize: 45 }} />
              <h4>Create New</h4>
            </div>
          </div>
          <div onClick={() => setActiveTab('show_class')} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
            <div style={{ width: 120, height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 20 }} className="form-glass-design">
              <AiOutlineForm style={{ fontSize: 45 }} />
              <h4>{t('show_classes')}</h4>
            </div>
          </div>
        </>
      ) : (
        <Component setActiveTab={setActiveTab} />
      )}

    </div>
  );
}

export default withTranslation('common')(ClassManagementMain);
