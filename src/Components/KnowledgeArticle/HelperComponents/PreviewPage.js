import { Container } from '@mui/material';
import React from 'react';
import parse from 'html-react-parser';
// import { RequestContext } from '../../../Routes/HomeRouter';
import { useSelector } from 'react-redux';


export default function PreviewPage() {
  // const{knowledgeData,title,setTitle}=useContext(RequestContext);
  const knowledgeContent = useSelector((state) => state.knowledgeReducers.knowledgeContent);
  // const dispatch = useDispatch();
  return (
    <Container>
      <div style={{ width: "100%" }}>
        <h1>{knowledgeContent.title}</h1>
      </div>
      <hr className="sidenav-hr" />
      <div style={{ marginBottom: 50, width: "100%" }}>
        {parse(knowledgeContent.articleContent)}
      </div>
    </Container>
  )
}
