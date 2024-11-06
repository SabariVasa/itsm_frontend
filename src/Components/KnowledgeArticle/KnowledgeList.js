import React, { useContext, useEffect, useState } from 'react'
import KnowledgeCard from './KnowledgeCard';
import { Grid } from '@mui/material';
// import { knowledgeData } from './HelperComponents/KnowledgeData';
import ReactLoading from 'react-loading';
import { styled } from '@mui/material/styles';
import { KnowledgeContext } from './KnowledgeContainer';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
// import NotifyBar from '../Notification Components/NotifyBar';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setKnowledgeContent } from '../../Redux state management/Redux Slices/KnowledgeDataSlice';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function KnowledgeList() {
  const [loading, setLoading] = useState(false);
  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }
  const { searchTerm, setSearchTerm } = useContext(KnowledgeContext);


  const [knowledgeData, setKnowledgeData] = useState([]);
  async function loadKnowledgeArticles() {
    await axios.get(`${serverAPI}/knowledge_article_service/all_articles`, {
      auth: {
        username: 'admin',
        password: 'admin@123'
      }
    }).then((res) => {
      console.log(res);
      setKnowledgeData(res.data)
    }).catch((err) => { console.log(err) })
  }

  const filteredArticles = knowledgeData.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.articleContent.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    spinnerLoading();
    loadKnowledgeArticles();
  }, [searchTerm])

  const category = "My articles";
  // const category = useSelector((state) => state.knowledgeReducers.category);
  // const knowledgeContent = useSelector((state) => state.knowledgeReducers.knowledgeContent);
  // const dispatch = useDispatch();

  async function fetchMyArticles() {
    await axios.get(`${serverAPI}/get-knowledge-articles-by-author/${"Mahathir Mohamed"}`).then((res) => {
      console.log(res.data);
      setKnowledgeData(res.data)
    }).catch((err) => { console.log(err) })
  }

  const [myArticle, setMyArticle] = useState(false);
  useEffect(() => {
    if (category === "My articles") {
      spinnerLoading();
      fetchMyArticles();
      setMyArticle(true);
    } else {
      spinnerLoading();
      loadKnowledgeArticles();
      setMyArticle(false);
    }
  }, [category])
  return (
    <>
      <Grid container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", overflowX: "hidden" }}>
        {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
          <ReactLoading type={"bars"} color={"#ff751a"} />
        </div> : null}
        {knowledgeData.length > 0 || loading ? !loading && filteredArticles.map((item, index) => {
          return (
            // <Link to={`/article-details/${item.articleNumber}`} style={{textDecoration:"none",color:"black"}}>
            <Grid item xs={12} md={5} style={{ cursor: "pointer", marginRight: 35 }}>
              <KnowledgeCard key={index} title={item.title} articleNumber={item.articleNumber} articleContent={item.shortDescription} img={item.imageData} date={item.date} myArticle={myArticle} />
            </Grid>
            // </Link>

          )
        }) : <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Knowledge articles found</div>}
      </Grid>
    </>
  )
}
