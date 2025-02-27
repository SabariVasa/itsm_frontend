import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import KnowledgeContainer from './KnowledgeContainer';
import PreviewPage from './HelperComponents/PreviewPage';
import CreateKnowledge from './CreateKnowledge';


function KnowledgeArticleMainPanel() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/created-knowledge-preview`} component={PreviewPage} />
            <Route path={`${path}/knowledge-creation`} component={CreateKnowledge} />
            <Route path={path} component={KnowledgeContainer} />
        </Switch>
    )
}

export default KnowledgeArticleMainPanel