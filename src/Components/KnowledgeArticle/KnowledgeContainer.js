import React, { createContext, useState } from 'react'
import KnowledgeList from './KnowledgeList';
import KnowledgeNavbar from './KnowledgeNavbar';

export const KnowledgeContext = createContext(null);
export default function KnowledgeContainer() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <KnowledgeContext.Provider value={{ searchTerm, setSearchTerm }}>
      <KnowledgeNavbar />
      <KnowledgeList />
    </KnowledgeContext.Provider>
  )
}
