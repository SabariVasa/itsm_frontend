import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { serverAPI } from '../../Utils/Server';
// import { useDispatch } from 'react-redux';
import { setKnowledgeContent } from '../../Redux state management/Redux Slices/KnowledgeDataSlice';
import AlertComponent from '../HelperComponents/AlertComponent';
import { Link, useHistory } from 'react-router-dom';
import { StyledCard } from '../../commonComponents/StyledComponents';
// import { Alert } from 'flowbite-react';


export default function KnowledgeCard(props) {
  // const dispatch = useDispatch();
  const navigate = useHistory();
  async function editArticle() {
    navigate.push(`/create-knowledge-article?articleID=${props.articleNumber}`)
  }

  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteArticle() {
    try {
      const response = await axios.delete(`${serverAPI}/delete-knowledge-article/${props.articleNumber}`);
      if (response.status === 200) {
        console.log("Knowledge article successfully deleted:", response.data);
        setNotifyStatus(true);
        setNotifyMessage("Knowledge article successfully deleted")
        // dispatch(setKnowledgeContent({}));??
        window.location.reload();
        setConfirm(false)  // Resetting knowledge content after deletion
      } else {
        setNotifyStatus(true);
        setError(true);
        setNotifyMessage("something went wrong!please try again later")
        console.log("Failed to delete the article:", response.data);
      }
    } catch (error) {
      setNotifyStatus(true);
      setError(true);
      setNotifyMessage("something went wrong!please try again later")
      console.error("An error occurred while deleting the article:", error);
    }

  }
  function handleConfirm() {
    setConfirm(true)
  }
  return (
    <>
      <div style={{ display: "flex !important", width: '100%', alignItems: "center", flexDirection: 'row' }}>
        <div>
          <img
            src={props.img}
            width={160}
            height={150}
            style={{ borderRadius: 10 }}
            alt="Knowledge Article"
          />
        </div>
      </div>
      <StyledCard sx={{ border: 'none', width:'80%' }}>
        <p style={{ fontSize: 17 }}>{props.title}</p>
        <p style={{ fontWeight: "normal" }} className="text-wrapper-knowledge">
          {props.articleContent}
        </p>
        <p style={{ fontWeight: "normal", fontSize: 13 }}>{props.date}</p>
      </StyledCard>
      <AlertComponent handleConfirm={handleConfirm} open={open} deleteArticle={deleteArticle} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      {/* {props.myArticle ? <div style={{ display: "flex", justifyContent: "center" }}>
        <EditIcon
          style={{ cursor: "pointer", marginRight: 10, color: "blue" }}
          onClick={editArticle} // Optional handler for edit action
        />
        <DeleteIcon
          style={{ cursor: "pointer", color: "red" }}
          onClick={handleClickOpen} // Optional handler for delete action
        />

      </div> : null}
      <Link to={`/article-details/${props.articleNumber}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="knowledge-card">

          <div style={{ display: "flex", alignItems: "center" }}>
            
            <img
              src={props.img}
              width={160}
              height={140}
              style={{ borderRadius: 10 }}
              alt="Knowledge Article"
            />
          </div>

          <div style={{ marginLeft: 5, marginTop: 12 }}>

            <p style={{ fontSize: 17 }}>{props.title}</p>
            <p style={{ fontWeight: "normal" }} className="text-wrapper-knowledge">
              {props.articleContent}
            </p>
            <p style={{ fontWeight: "normal", fontSize: 13 }}>{props.date}</p>
          </div>

        </div>
      </Link>
      <AlertComponent handleConfirm={handleConfirm} open={open} deleteArticle={deleteArticle} handleClickOpen={handleClickOpen} handleClose={handleClose} /> */}

    </>
  );
}
