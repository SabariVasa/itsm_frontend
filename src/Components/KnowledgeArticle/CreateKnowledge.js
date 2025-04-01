// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import CmdbGridContainer from '../HelperComponents/GridContainer';
// // import ContentDevider from '../HelperComponents/ContentDevider';
// import { Button, Grid } from '@mui/material';
// import { OrgOptions } from '../../Utils/CMDB-Data/CIData';
// // import { approvedData } from '../../Utils/Request Data/RequestItemData';
// import CmdbTextField from '../HelperComponents/TextField';
// // import { createMuiTheme } from '@mui/material/styles'
// // import { RequestContext } from '../../Routes/HomeRouter';
// // import MUIRichTextEditor from 'mui-rte'
// // import {convertToRaw} from 'draft-js';
// import JoditEditor from 'jodit-react';
// // import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { serverAPI } from '../../Utils/Server';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
// // import { Preview } from '@mui/icons-material';
// import NotifyBar from '../Notification Components/NotifyBar';
// // import KnowledgeList from './KnowledgeList';
// import { useSelector, useDispatch } from "react-redux";
// import { setKnowledgeContent } from '../../Redux state management/Redux Slices/KnowledgeDataSlice';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom';

// export default function CreateKnowledge({ placeholder }) {

//   // const{articleID} = useParams();
//   const navigate = useHistory();
//   const { path } = useRouteMatch();

//   const handleCellClick = (params) => {
//     const updatedPath = path.replace('knowledge-creation', '');
//     navigate.push(`${updatedPath}created-knowledge-preview`);
//   };
//   // const{knowledgeContent,setknowledgeContent}=useContext(RequestContext);
//   const [articleNumber, setArticleNumber] = useState("");
//   const [articleType, setArticleType] = useState("");
//   const [category, setCategory] = useState("");
//   const [author, setAuthor] = useState("");
//   const [title, setTitle] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [articleContent, setArticleContent] = useState("");
//   const [image, setImage] = useState();
//   const [PreviewImage, setPreviewImage] = useState();

//   const [error, setError] = useState(false);
//   const [notifyStatus, setNotifyStatus] = useState(false);
//   const [notifyMessage, setNotifyMessage] = useState("");

//   // const [searchParams, setSearchParams] = useState();
//   // const knowledgeContent = useSelector((state) => state.knowledgeReducers.knowledgeContent);
//   // const dispatch = useDispatch();


//   useEffect(() => {
//     let data = {
//       articleNumber,
//       articleContent,
//       articleType,
//       title,
//       shortDescription,
//       author,
//       category,
//       PreviewImage
//     }
//     setKnowledgeContent(data)
//     // dispatch(setKnowledgeContent(data));
//   }, [articleNumber, articleType, category, author, articleContent, title, shortDescription]);

//   const formData = new FormData();
//   const [update, setUpdate] = useState();
//   const [articleID, setArticleID] = useState("");
//   function postArticle() {
//     if (!update) {
//       const params = `${serverAPI}/publish-knowledge-article`
//       publish_article(params)
//     } else {
//       const params = `${serverAPI}/update-knowledge-article/${articleID}`
//       publish_article(params)
//     }
//   }

//   async function publish_article(params) {
//     // formData.append('KnowledgeArticleModel', new Blob([JSON.stringify(knowledgeContent)], { type: 'application/json' }));
//     formData.append("file", image)
//     await axios.post(params, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }).then((res) => {
//       console.log(res.data)
//       if (res.data) {
//         setNotifyStatus(true);
//         setNotifyMessage("Successfully knowledge articles published");
//         navigate(-1)
//       } else {
//         setNotifyStatus(true);
//         setNotifyMessage(res.data.statusMessage)
//       }
//     }).catch((err) => {
//       setError(true);
//       setNotifyStatus(true);
//       if (err.response.data.statusMessage) {
//         setNotifyMessage(err.response.data.statusMessage);
//       } else {
//         setNotifyMessage(err.response.data.message)
//       }
//       console.log(err)
//     })
//   }

//   useEffect(() => {
//     articleCount();
//   }, [])

//   async function articleCount() {
//     await axios.get(`${serverAPI}/all-articles-count`).then((res) => {
//       const tempNum = parseInt(res.data.totalCount) + 1;
//       setArticleNumber(`KB-024-0000` + tempNum);

//     }).catch((err) => { console.log(err) });
//   }


//   useEffect(() => {
//     // setArticleNumber(knowledgeContent.articleNumber);
//     // setArticleType(knowledgeContent.articleType)
//     // setArticleContent(knowledgeContent.articleContent)
//     // setTitle(knowledgeContent.title);
//     // setShortDescription(knowledgeContent.shortDescription)
//     // setCategory(knowledgeContent.category);
//     // setAuthor(knowledgeContent.author);
//     // setPreviewImage(knowledgeContent.PreviewImage);
//     // setImage(knowledgeContent.imageData)
//   }, [])

//   // const defaultTheme = createMuiTheme();

//   const editor = useRef(null);
//   const [content, setContent] = useState('');

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: placeholder || 'Start typings...'
//     })[placeholder]);

//   function handleFileChange(e) {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0])
//       setPreviewImage(URL.createObjectURL(e.target.files[0]));
//     }
//   }

//   useEffect(() => {
//     console.log(articleContent)
//   }, [articleContent])

//   async function fetchArticle(id) {
//     await axios.get(`${serverAPI}/get-knowledge-article/${id}`).then((res) => {
//       const { articleNumber, articleType, articleContent, title, shortDescription, category, author, PreviewImage } = res.data[0];
//       setArticleNumber(articleNumber);
//       setArticleType(articleType)
//       setArticleContent(articleContent)
//       setTitle(title);
//       setShortDescription(shortDescription)
//       setCategory(category);
//       setAuthor(author);
//       setPreviewImage(PreviewImage)
//       // dispatch(setKnowledgeContent(res.data[0]))
//     }).catch((err) => {
//       console.log(err)
//     })
//   }


//   useEffect(() => {
//     // console.log(searchParams.get("articleID"));
//     // if (searchParams.get("articleID")) {
//     //   fetchArticle(searchParams.get("articleID"));
//     //   setArticleID(searchParams.get("articleID"))
//     //   setUpdate(true)
//     // } else {
//     //   setUpdate(false);
//     // }
//   }, [])

//   const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });
//   return (
//     <>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" , paddingL:"30px" }}>
//         {/* <Link to="/knowledge-preview-page"> */}
//         <Button
//           variant="contained"
//           sx={{
//             width: 170,
//             fontSize: 12,
//             marginTop: 2,
//             marginRight: 5,
//             backgroundColor: '#540C00', 
//             '&:hover': {
//               backgroundColor: '#A37B31',
//             },
//             textTransform: 'none', 

//           }}
//           onClick={() => handleCellClick(articleContent)}
//         >
//           Show Preview
//         </Button>
//         {/* </Link> */}
//         <Button
//           variant="contained"
//           sx={{
//             width: 170,
//             fontSize: 12,
//             marginTop: 2,
//             backgroundColor: '#A37B31', 
//             '&:hover': {
//               backgroundColor: '#540C00', 
//             },
//             textTransform: 'none', 
//           }}
//           onClick={() => postArticle()}
//         >
//           {update ? "Update Article" : "Publish Article"}
//         </Button>
//       </div>
//       <div style={{ marginTop: 30, paddingRight: '60px' }}>
//         <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, true]} name={["Article Number", "Article Type"]} Name1={articleNumber} SelectedValue2={articleType} setSelectValue2={setArticleType} label={["Requested Date", ""]} MenuItems={[OrgOptions, [{ value: "HTML" }]]} setName1={setArticleNumber} />

//         <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, true]} name={["Author", "Category"]} Name1={author} SelectedValue2={category} setSelectValue2={setCategory} label={["Requested Date", ""]} MenuItems={[OrgOptions, [{ value: "My articles" }, { value: "IT Support" }, { value: "CMDB Queries" }, { value: "ITSM Articles" }]]} setName1={setAuthor} />

//         <Grid container style={{ width: "100%" }}>
//           <Grid item xs={12}>
//             <CmdbTextField name="Title" Name={title} setName={setTitle} />
//           </Grid>
//           <Grid item xs={12}>
//             <CmdbTextField name="short description" Name={shortDescription} setName={setShortDescription} />
//           </Grid>
//         </Grid>
//         <div style={{ marginLeft: 78, marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "40%" }}>
//           <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} onChange={(e) => handleFileChange(e)}>upload cover image<VisuallyHiddenInput type="file" />
//           </Button>
//           {PreviewImage ? <img src={PreviewImage} height={50} width={50} /> : null}
//         </div>
//         <div style={{ width: "80%", marginLeft: 80, marginTop: 20 }}>
//           <JoditEditor
//             ref={editor}
//             value={articleContent}
//             config={config}
//             // tabIndex={1}
//             onBlur={newContent => { setArticleContent(newContent) }} />
//         </div>
//       </div>
//       <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
//     </>
//   )
// }


// import React, { useEffect, useState, useRef, useMemo } from 'react';
// import { Button, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { styled } from '@mui/material/styles';
// import JoditEditor from 'jodit-react';
// import axios from 'axios';
// import { serverAPI } from '../../Utils/Server';
// import NotifyBar from '../Notification Components/NotifyBar';
// import { useHistory, useRouteMatch } from 'react-router-dom';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// export default function CreateKnowledge({ placeholder }) {
//   const navigate = useHistory();
//   const { path } = useRouteMatch();

//   const [articleNumber, setArticleNumber] = useState('');
//   const [articleType, setArticleType] = useState('');
//   const [category, setCategory] = useState('');
//   const [author, setAuthor] = useState('');
//   const [title, setTitle] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [articleContent, setArticleContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const [error, setError] = useState(false);
//   const [notifyStatus, setNotifyStatus] = useState(false);
//   const [notifyMessage, setNotifyMessage] = useState('');
//   const [update, setUpdate] = useState(false);
//   const [articleID, setArticleID] = useState('');

//   const editor = useRef(null);

//   const config = useMemo(() => ({
//     readonly: false,
//     placeholder: placeholder || 'Start typing...',
//   }), [placeholder]);

//   const handleCellClick = () => {
//     const updatedPath = path.replace('knowledge-creation', '');
//     navigate.push(`${updatedPath}created-knowledge-preview`);
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//       setPreviewImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   async function publish_article(params) {
//     const formData = new FormData();
//     formData.append('file', image);

//     await axios.post(params, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })
//       .then((res) => {
//         if (res.data) {
//           setNotifyStatus(true);
//           setNotifyMessage('Successfully published knowledge article.');
//           navigate(-1);
//         } else {
//           setNotifyStatus(true);
//           setNotifyMessage(res.data.statusMessage);
//         }
//       })
//       .catch((err) => {
//         setError(true);
//         setNotifyStatus(true);
//         setNotifyMessage(err.response?.data?.statusMessage || err.response?.data?.message || 'Error occurred');
//       });
//   }

//   function postArticle() {
//     const params = update
//       ? `${serverAPI}/update-knowledge-article/${articleID}`
//       : `${serverAPI}/publish-knowledge-article`;
//     publish_article(params);
//   }

//   async function articleCount() {
//     await axios.get(`${serverAPI}/all-articles-count`).then((res) => {
//       const tempNum = parseInt(res.data.totalCount) + 1;
//       setArticleNumber(`KB-024-0000${tempNum}`);
//     }).catch((err) => { console.log(err); });
//   }

//   useEffect(() => {
//     articleCount();
//   }, []);

//   useEffect(() => {
//     console.log(articleContent);
//   }, [articleContent]);

//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
//         <Button
//           variant="contained"
//           sx={{
//             fontSize: 12,
//             backgroundColor: '#540C00',
//             '&:hover': { backgroundColor: '#A37B31' },
//             marginLeft: '70%',
//           }}
//           onClick={handleCellClick}
//         >
//           Show Preview
//         </Button>
//         <Button
//           variant="contained"
//           sx={{
//             fontSize: 12,
//             backgroundColor: '#A37B31',
//             '&:hover': { backgroundColor: '#540C00' },
//           }}
//           onClick={postArticle}
//         >
//           {update ? 'Update Article' : 'Publish Article'}
//         </Button>
//       </div>

//       <Grid container spacing={3} sx={{ padding: '0 60px' }}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Article Number"
// InputLabelProps={{
//   sx: {
//     color: '#696969',
//     '&.Mui-focused': {
//       color: '#540C00',
//     },
//   },
// }}
//             value={articleNumber}
//             onChange={(e) => {
//               if (!update) {
//                 setArticleNumber(e.target.value); // Allow editing only if it's not an update
//               }
//             }}
//             fullWidth
//             disabled={update}  // Disable if updating an article
// sx={{
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#540C00', // Border color when focused (can be changed to any color)
//     },

//   },
// }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel
//   sx={{
//     color: '#696969',
//     '&.Mui-focused': {
//       color: '#540C00', // Changes label color when Select is focused
//     },
//   }}
// >
//               Article Type</InputLabel>
//             <Select
//               value={articleType}
//               onChange={(e) => setArticleType(e.target.value)}
//               label="Article Type"
// sx={{
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#540C00 !important', // Default border
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#540C00  !important', // Hover border
//   },
//   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#540C00  !important', // Focused border
//     borderWidth: '2px !important',
//   },
// }}
//             >
//               <MenuItem value="HTML">HTML</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Author"
//             InputLabelProps={{
//   sx: {
//     color: '#696969',
//     '&.Mui-focused': {
//       color: '#540C00',
//     },
//   },
// }}
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             fullWidth
// sx={{
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#540C00', // Border color when focused (can be changed to any color)
//     },
//   },
// }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel

// sx={{
//   color: '#696969',
//   '&.Mui-focused': {
//     color: '#540C00', // Changes label color when Select is focused
//   },
// }}
//           >
//             Category</InputLabel>
//             <Select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               label="Category"
// sx={{
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#540C00',
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#540C00',
//   },
//   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//     borderColor: '#540C00',
//     borderWidth: 2,
//   },
// }}
//             >
// <MenuItem value="IT Support" sx={{ color: '#540C00' }}>My Articles</MenuItem>
// <MenuItem value="CMDB Queries" sx={{ color: '#540C00' }}>IT Support</MenuItem>
// <MenuItem value="IT Support" sx={{ color: '#540C00' }}>CMDB Queries</MenuItem>
// <MenuItem value="CMDB Queries" sx={{ color: '#540C00' }}>ITSM Articles</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             label="Title"
//             InputLabelProps={{
//               sx: {
//                 color: '#696969',
//                 '&.Mui-focused': {
//                   color: '#540C00',
//                 },
//               },
//             }}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#540C00', // Border color when focused (can be changed to any color)
//                 },
//               },
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Short Description"
//             InputLabelProps={{
//               sx: {
//                 color: '#696969',
//                 '&.Mui-focused': {
//                   color: '#540C00',
//                 },
//               },
//             }}
//             value={shortDescription}
//             onChange={(e) => setShortDescription(e.target.value)}
//             fullWidth
//             multiline
//             rows={4}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#540C00', // Border color when focused (can be changed to any color)
//                 },
//               },
//             }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
//               Upload Cover Image
//               <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//             </Button>
//             {previewImage && (
//               <img src={previewImage} alt="Preview" height={50} width={50} style={{ marginLeft: '10px' }} />
//             )}
//           </div>
//         </Grid>

//         <Grid item xs={12}>
//           <JoditEditor
//             ref={editor}
//             value={articleContent}
//             config={config}
//             onBlur={(newContent) => setArticleContent(newContent)}
//           />
//         </Grid>
//       </Grid>

//       <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
//     </>
//   );
// }



import React, { useEffect, useState, useMemo } from 'react';
import { Button, Grid, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import NotifyBar from '../Notification Components/NotifyBar';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const validationSchema = Yup.object({
  articleNumber: Yup.string().required('Article Number is required'),
  articleType: Yup.string().required('Article Type is required'),
  category: Yup.string().required('Category is required'),
  author: Yup.string().required('Author is required'),
  title: Yup.string().required('Title is required'),
  shortDescription: Yup.string().required('Short Description is required'),
  articleContent: Yup.string().required('Article Content is required'),
});

export default function CreateKnowledge({ placeholder }) {
  const navigate = useHistory();
  const { path } = useRouteMatch();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [update, setUpdate] = useState(false);
  const [articleID, setArticleID] = useState('');
  const [articleNumber, setArticleNumber] = useState('');
  const [articleType, setArticleType] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...',
  }), [placeholder]);

  const handleCellClick = () => {
    const updatedPath = path.replace('knowledge-creation', '');
    navigate.push(`${updatedPath}created-knowledge-preview`);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  async function publish_article(params) {
    const formData = new FormData();
    formData.append('file', image);

    await axios.post(params, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.data) {
          setNotifyStatus(true);
          setNotifyMessage('Successfully published knowledge article.');
          navigate(-1);
        } else {
          setNotifyStatus(true);
          setNotifyMessage(res.data.statusMessage);
        }
      })
      .catch((err) => {
        setError(true);
        setNotifyStatus(true);
        setNotifyMessage(err.response?.data?.statusMessage || err.response?.data?.message || 'Error occurred');
      });
  }

  function postArticle(values) {
    const params = update
      ? `${serverAPI}/update-knowledge-article/${articleID}`
      : `${serverAPI}/publish-knowledge-article`;

    publish_article(params);
  }

  async function articleCount() {
    await axios.get(`${serverAPI}/all-articles-count`).then((res) => {
      const tempNum = parseInt(res.data.totalCount) + 1;
      setArticleNumber(`KB-024-0000${tempNum}`);
    }).catch((err) => { console.log(err); });
  }

  useEffect(() => {
    articleCount();
  }, []);

  useEffect(() => {
    console.log(articleContent);
  }, [articleContent]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', marginTop: '20px' }}>
        <Button
          variant="contained"
          sx={{
            fontSize: 15,
            backgroundColor: '#540C00',
            '&:hover': { backgroundColor: '#A37B31' },
            textTransform: 'none', // This will prevent the text from being uppercased
            marginLeft: '65%',
          }}
          onClick={handleCellClick}
        >
          Show Preview
        </Button>
        <Button
          variant="contained"
          sx={{
            fontSize: 15,
            backgroundColor: '#A37B31',
            '&:hover': { backgroundColor: '#540C00' },
            textTransform: 'none', // This will prevent the text from being uppercased
            marginRight: '40px',
          }}
          type="submit"
        >
          {update ? 'Update Article' : 'Publish Article'}
        </Button>
      </div>

      <Formik
        initialValues={{
          articleNumber:'',
          articleType:'',
          category:'',
          author:'',
          title:'',
          shortDescription:'',
          articleContent:'',
        }}
        validationSchema={validationSchema}
        onSubmit={postArticle}
      >
        {({ values, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ padding: '0 60px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Article Number"
                  name="articleNumber"
                  InputLabelProps={{
                    sx: {
                      color: '#696969',
                      '&.Mui-focused': {
                        color: '#540C00',
                      },
                    },
                  }}
                  value={values.articleNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#540C00', // Border color when focused (can be changed to any color)
                      },

                    },
                  }}
                  disabled={update}
                  helperText={<ErrorMessage name="articleNumber" />}
                  error={Boolean(values.articleNumber && !values.articleNumber)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: '#696969',
                      '&.Mui-focused': {
                        color: '#540C00', // Changes label color when Select is focused
                      },
                    }}
                  >
                    Article Type</InputLabel>
                  <Select
                    value={values.articleType}
                    onChange={handleChange}
                    name="articleType"
                    label="Article Type"
                    onBlur={handleBlur}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#540C00 !important', // Default border
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#540C00  !important', // Hover border
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#540C00  !important', // Focused border
                        borderWidth: '2px !important',
                      },
                    }}
                  >
                    <MenuItem value="HTML">HTML</MenuItem>
                  </Select>
                  <ErrorMessage name="articleType" component="div" />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Author"
                  name="author"
                  InputLabelProps={{
                    sx: {
                      color: '#696969',
                      '&.Mui-focused': {
                        color: '#540C00',
                      },
                    },
                  }}
                  value={values.author}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#540C00', // Border color when focused (can be changed to any color)
                      },
                    },
                  }}
                  helperText={<ErrorMessage name="author" />}
                  error={Boolean(values.author && !values.author)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: '#696969',
                      '&.Mui-focused': {
                        color: '#540C00', // Changes label color when Select is focused
                      },
                    }}
                  >Category</InputLabel>
                  <Select
                    value={values.category}
                    onChange={handleChange}
                    name="category"
                    label="Category"
                    onBlur={handleBlur}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#540C00',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#540C00',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#540C00',
                        borderWidth: 2,
                      },
                    }}
                  >
                    <MenuItem value="IT Support" sx={{ color: '#540C00' }}>My Articles</MenuItem>
                    <MenuItem value="CMDB Queries" sx={{ color: '#540C00' }}>IT Support</MenuItem>
                    <MenuItem value="IT Support" sx={{ color: '#540C00' }}>CMDB Queries</MenuItem>
                    <MenuItem value="CMDB Queries" sx={{ color: '#540C00' }}>ITSM Articles</MenuItem>
                  </Select>
                  <ErrorMessage name="category" component="div" />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title" 
                  InputLabelProps={{
                    sx: {
                      color: '#696969',
                      '&.Mui-focused': {
                        color: '#540C00',
                      },
                    },
                  }}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#540C00', // Border color when focused (can be changed to any color)
                      },
                    },
                  }}
                  helperText={<ErrorMessage name="title" />}
                  error={Boolean(values.title && !values.title)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Short Description"
                  name="shortDescription"
                  InputLabelProps={{
                    sx: {
                      color: '#696969',
                      '&.Mui-focused': {
                        color: '#540C00',
                      },
                    },
                  }}
                  value={values.shortDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: update ? '#540C00' : '#540C00', // Set border color based on the update condition
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#540C00', // Border color when focused (can be changed to any color)
                      },
                    },
                  }}
                  multiline
                  rows={4}
                  helperText={<ErrorMessage name="shortDescription" />}
                  error={Boolean(values.shortDescription && !values.shortDescription)}
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}

                  sx={{
                    backgroundColor: '#540C00',  // Set the default background color
                    '&:hover': { backgroundColor: '#A37B31' },  // Set the hover background color
                    textTransform: 'none',  // Prevent text from being uppercased
                  }}
                  >
                    Upload Cover Image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => setFieldValue('image', e.target.files[0])}
                    />
                  </Button>
                  {previewImage && (
                    <img src={previewImage} alt="Preview" height={50} width={50} style={{ marginLeft: '10px' }} />
                  )}
                </div>
              </Grid>

              <Grid item xs={12}>
                <JoditEditor
                  value={values.articleContent}
                  config={config}
                  onBlur={(newContent) => setFieldValue('articleContent', newContent)}
                />
              </Grid>
            </Grid>

            <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
          </Form>
        )}
      </Formik>
    </>
  );
}
