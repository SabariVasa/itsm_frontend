import React, { useState, useEffect } from 'react';
import { serverAPI } from '../../Utils/Server';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import { Container } from '@mui/material';
import ReactLoading from 'react-loading';


export default function ArticleDetailsPage() {
   const { articleID } = useParams();
   const [articleContent, setArticleContent] = useState({ articleContent: "" });

   const [loading, setLoading] = useState(false);
   function spinnerLoading(message) {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 2000)
   }

   async function fetchArticle() {
      await axios.get(`${serverAPI}/get-knowledge-article/${articleID}`).then((res) => {
         if (res.data) {
            setArticleContent(res.data[0])
            console.log(res.data[0])
         }
      }).catch((err) => { console.log(err) })
   }

   useEffect(() => {
      spinnerLoading();
      fetchArticle();
   }, [])
   return (
      <Container>
         {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <ReactLoading type={"bars"} color={"#ff751a"} /></div>
            : <>
               {/* <Stack style={{display:'flex',alignItems:"center",justifyContent:"right",paddingRight:20,marginTop:20}} direction="row">
         <Link to={`/create-knowledge-article?articleID=${articleID}`}>
          <Button variant="contained"  color="primary" style={{width:100,fontSize:12}}>Edit</Button>
          </Link>
         </Stack> */}
               <div style={{ width: "100%" }}>
                  <h1>{articleContent.title}</h1>
                  <p style={{ fontWeight: "normal", fontSize: 14 }}>Author : <strong>{articleContent.author}</strong></p>
                  <p style={{ fontWeight: "normal", fontSize: 14, marginTop: -13 }}>updated at <strong>{articleContent.createdDate ? articleContent.createdDate : "09/18/2024"}</strong></p>
               </div>
               <hr className="sidenav-hr" />
               <img src={articleContent.imageData} style={{ width: 950, height: 300 }} />
               <div style={{ marginBottom: 50, width: "100%" }}>
                  {parse(articleContent.articleContent)}
               </div></>}
      </Container>
   )
}
