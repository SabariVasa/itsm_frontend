import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { BsClipboardPlus } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import NewClassCreationPanel from "./NewClassCreationPanel";
import styles from './ClassManagement.module.scss';
import CMDB from "../../../Pages/CMDB";
import { useHistory } from "react-router-dom";
import { ThemeProvider, useTheme } from "../../../global/commonComponents/ThemeContext";


function ClassManagementMain(props) {
  const { t } = props;
  const history = useHistory();
  const { theme } = useTheme();

  return (
    <div className={styles.classCategory}>
      <div onClick={() => history.push('/superadmin/create_class')} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
        <div style={{ width: 200, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: theme.outerBodyColor }} className="form-glass-design">
          <BsClipboardPlus style={{ fontSize: 45 }} />
          <h4>Create New</h4>
        </div>
      </div>
      <div onClick={() => history.push('/superadmin/show_class')} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
        <div style={{ width: 200, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: theme.outerBodyColor }} className="form-glass-design">
          <AiOutlineForm style={{ fontSize: 45 }} />
          <h4>{t('show_classes')}</h4>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(ClassManagementMain);
