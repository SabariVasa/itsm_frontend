import React from 'react';
import { withTranslation } from 'react-i18next';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import CreateKnowledge from '../../Components/KnowledgeArticle/CreateKnowledge';
import UserPortalRightPanel from './UserPortalRightPanel';
import UserIncidentTable from '../../Components/UserPortal Pages/UserIncidentTable';
import UserRequestTable from '../../Components/UserPortal Pages/UserRequestTable';

function UserPortalLandingPage(props) {
    const { t } = props;
    // const history = useHistory();
    // const roleName = UserInfo.getRole();
    // const { pathname } = useLocation();
    return (
        <div>
            <>
                <UserPortalRightPanel activeTab={props.activeTab} />
            </>
        </div>
    );
}

export default withTranslation('common')(UserPortalLandingPage);
