import React, { createContext, useState } from 'react'
import ContentDevider from '../HelperComponents/ContentDevider'
import KnowledgeList from './KnowledgeList';
import KnowledgeNavbar from './KnowledgeNavbar';
import CreateKnowledge from './CreateKnowledge';
import { Route, Routes, Switch } from 'react-router-dom';
import PreviewPage from './HelperComponents/PreviewPage';

export const KnowledgeContext = createContext(null);
export default function KnowledgeContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [createKnowledge, setCreateKnowledge] = useState(false);

  return (
    <KnowledgeContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div>
        {/* <Routes>
          <Route>
            <Route path="/knowledge-preview-page" element={<PreviewPage />} />
            <Route path="/endUser/knowledge-creation" Component={<CreateKnowledge />} />
          </Route>
        </Routes> */}
        {/* <KnowledgeNavbar setCreateKnowledge={setCreateKnowledge} />
        <ContentDevider title="Knowledge Articles" img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQBgB33joO4vztszGsK3VUnceedDFJ2Kcpw&s"} />
        <KnowledgeList /> */}
        <Switch>
          <Route path="/superadmin/knowledge-preview-page" element={<PreviewPage />} />
          <Route path="/superadmin/endUser/knowledge-creation" Component={<CreateKnowledge />} />
        </Switch>
        {createKnowledge ? (
          <CreateKnowledge />
        ) : (
          <>
            <KnowledgeNavbar setCreateKnowledge={setCreateKnowledge} />
            <ContentDevider title="Knowledge Articles" img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQBgB33joO4vztszGsK3VUnceedDFJ2Kcpw&s"} />
            <KnowledgeList />
          </>
        )}
      </div>
    </KnowledgeContext.Provider>
  )
}
