import React, { useEffect, useState, useRef, useMemo } from 'react';
import CmdbGridContainer from '../HelperComponents/GridContainer';
// import ContentDevider from '../HelperComponents/ContentDevider';
import { Button, Grid } from '@mui/material';
import { OrgOptions } from '../../Utils/CMDB-Data/CIData';
// import { approvedData } from '../../Utils/Request Data/RequestItemData';
import CmdbTextField from '../HelperComponents/TextField';
// import { createMuiTheme } from '@mui/material/styles'
// import { RequestContext } from '../../Routes/HomeRouter';
// import MUIRichTextEditor from 'mui-rte'
// import {convertToRaw} from 'draft-js';
import JoditEditor from 'jodit-react';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
// import { Preview } from '@mui/icons-material';
import NotifyBar from '../Notification Components/NotifyBar';
// import KnowledgeList from './KnowledgeList';
import { useSelector, useDispatch } from "react-redux";
import { setKnowledgeContent } from '../../Redux state management/Redux Slices/KnowledgeDataSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function CreateKnowledge({ placeholder }) {

  // const{articleID} = useParams();
  const navigate = useHistory();
  // const{knowledgeContent,setknowledgeContent}=useContext(RequestContext);
  const [articleNumber, setArticleNumber] = useState("");
  const [articleType, setArticleType] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [image, setImage] = useState();
  const [PreviewImage, setPreviewImage] = useState();

  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  // const [searchParams, setSearchParams] = useState();
  // const knowledgeContent = useSelector((state) => state.knowledgeReducers.knowledgeContent);
  // const dispatch = useDispatch();


  useEffect(() => {
    let data = {
      articleNumber,
      articleContent,
      articleType,
      title,
      shortDescription,
      author,
      category,
      PreviewImage
    }
    setKnowledgeContent(data)
    // dispatch(setKnowledgeContent(data));
  }, [articleNumber, articleType, category, author, articleContent, title, shortDescription]);

  const formData = new FormData();
  const [update, setUpdate] = useState();
  const [articleID, setArticleID] = useState("");
  function postArticle() {
    if (!update) {
      const params = `${serverAPI}/publish-knowledge-article`
      publish_article(params)
    } else {
      const params = `${serverAPI}/update-knowledge-article/${articleID}`
      publish_article(params)
    }
  }

  async function publish_article(params) {
    // formData.append('KnowledgeArticleModel', new Blob([JSON.stringify(knowledgeContent)], { type: 'application/json' }));
    formData.append("file", image)
    await axios.post(params, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data)
      if (res.data) {
        setNotifyStatus(true);
        setNotifyMessage("Successfully knowledge articles published");
        navigate(-1)
      } else {
        setNotifyStatus(true);
        setNotifyMessage(res.data.statusMessage)
      }
    }).catch((err) => {
      setError(true);
      setNotifyStatus(true);
      if (err.response.data.statusMessage) {
        setNotifyMessage(err.response.data.statusMessage);
      } else {
        setNotifyMessage(err.response.data.message)
      }
      console.log(err)
    })
  }

  useEffect(() => {
    articleCount();
  }, [])

  async function articleCount() {
    await axios.get(`${serverAPI}/all-articles-count`).then((res) => {
      const tempNum = parseInt(res.data.totalCount) + 1;
      setArticleNumber(`KB-024-0000` + tempNum);

    }).catch((err) => { console.log(err) });
  }


  useEffect(() => {
    // setArticleNumber(knowledgeContent.articleNumber);
    // setArticleType(knowledgeContent.articleType)
    // setArticleContent(knowledgeContent.articleContent)
    // setTitle(knowledgeContent.title);
    // setShortDescription(knowledgeContent.shortDescription)
    // setCategory(knowledgeContent.category);
    // setAuthor(knowledgeContent.author);
    // setPreviewImage(knowledgeContent.PreviewImage);
    // setImage(knowledgeContent.imageData)
  }, [])

  // const defaultTheme = createMuiTheme();

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typings...'
    })[placeholder]);

  function handleFileChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  useEffect(() => {
    console.log(articleContent)
  }, [articleContent])

  async function fetchArticle(id) {
    await axios.get(`${serverAPI}/get-knowledge-article/${id}`).then((res) => {
      const { articleNumber, articleType, articleContent, title, shortDescription, category, author, PreviewImage } = res.data[0];
      setArticleNumber(articleNumber);
      setArticleType(articleType)
      setArticleContent(articleContent)
      setTitle(title);
      setShortDescription(shortDescription)
      setCategory(category);
      setAuthor(author);
      setPreviewImage(PreviewImage)
      // dispatch(setKnowledgeContent(res.data[0]))
    }).catch((err) => {
      console.log(err)
    })
  }


  useEffect(() => {
    // console.log(searchParams.get("articleID"));
    // if (searchParams.get("articleID")) {
    //   fetchArticle(searchParams.get("articleID"));
    //   setArticleID(searchParams.get("articleID"))
    //   setUpdate(true)
    // } else {
    //   setUpdate(false);
    // }
  }, [])

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
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        {/* <Link to="/knowledge-preview-page"> */}
        <Button variant="contained" color="warning" style={{ width: 200, fontSize: 12, marginTop: 13, marginRight: 5 }} onClick={() => { console.log(articleContent) }}>show Preview</Button>
        {/* </Link> */}
        <Button variant="contained" color="primary" style={{ width: 200, fontSize: 12, marginTop: 13, }} onClick={() => { postArticle() }}>{update ? "Update Article" : "Publish Article"}</Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, true]} name={["Article Number", "Article Type"]} Name1={articleNumber} SelectedValue2={articleType} setSelectValue2={setArticleType} label={["Requested Date", ""]} MenuItems={[OrgOptions, [{ value: "HTML" }]]} setName1={setArticleNumber} />

        <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, true]} name={["Author", "Category"]} Name1={author} SelectedValue2={category} setSelectValue2={setCategory} label={["Requested Date", ""]} MenuItems={[OrgOptions, [{ value: "My articles" }, { value: "IT Support" }, { value: "CMDB Queries" }, { value: "ITSM Articles" }]]} setName1={setAuthor} />

        <Grid container style={{ width: "100%" }}>
          <Grid item xs={12}>
            <CmdbTextField name="Title" Name={title} setName={setTitle} />
          </Grid>
          <Grid item xs={12}>
            <CmdbTextField name="short description" Name={shortDescription} setName={setShortDescription} />
          </Grid>
        </Grid>
        <div style={{ marginLeft: 78, marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "40%" }}>
          <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} onChange={(e) => handleFileChange(e)}>upload cover image<VisuallyHiddenInput type="file" />
          </Button>
          {PreviewImage ? <img src={PreviewImage} height={50} width={50} /> : null}
        </div>
        <div style={{ width: "80%", marginLeft: 80, marginTop: 20 }}>
          <JoditEditor
            ref={editor}
            value={articleContent}
            config={config}
            // tabIndex={1}
            onBlur={newContent => { setArticleContent(newContent) }} />
        </div>
      </div>
      <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
    </>
  )
}
