import React from 'react';
import { withTranslation } from 'react-i18next';
import UserPortalRightPanel from './UserPortalRightPanel';

function UserPortalLandingPage(props) {
    return (
        <div>
            <UserPortalRightPanel activeTab={props.activeTab} />
        </div>
    );
}

export default withTranslation('common')(UserPortalLandingPage);
