import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Rating,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function RequestServiceManagement({ fromUser = "superadmin" }) {
  const location = useLocation();
  const history = useHistory();
  const { theme } = useTheme()
  const pathParts = location.pathname.split("/");
  const mainPath = pathParts[1];

  const [catelogueDetails, setCatelogueDetails] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [openCategories, setOpenCategories] = useState({});
  const [requestCardDetails, setRequestCardDetails] = useState();
  const [noRequestCardMessage, setNoRequestCardMessage] = useState("");

  const toggleCategory = (categoryId) => {
    GlobalService.generalSelect(
      (respData) => {
        const { estatus, data, emessage } = respData;
        if (estatus) {
          if (data.length > 0) {
            setRequestCardDetails(data);
            setNoRequestCardMessage("");
          }
        } else {
          setRequestCardDetails([]);
          setNoRequestCardMessage(emessage || "No data available for this category.");
        }
      },
      `${resturls.getByCategory}?categoryId=${categoryId}`,
      {},
      "GET"
    );
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCatelogueHandler = (catelogue) => {
    setCatelogueDetails(catelogue);
    setCategoryList(catelogue?.categories || []);
  };

  const obtainAllCatelogue = () => {
    GlobalService.generalSelect(
      (respData) => {
        const { estatus, data } = respData;
        if (estatus) {
          handleCatelogueHandler(data[0]);
          setLoader(false);
        }
      },
      resturls.fetchAllCatalogues,
      {},
      "GET"
    );
  };

  const handleRequestCard = (id) => {
    GlobalService.generalSelect(
      (respData) => {
        const { estatus, data, emessage } = respData;
        if (estatus) {
          if (data.length > 0) {
            setRequestCardDetails(data);
            setNoRequestCardMessage("");
          }
        } else {
          setRequestCardDetails([]);
          setNoRequestCardMessage(emessage || "No data available for this category.");
        }
      },
      `${resturls.getBySubCategory}?subCategoryId=${id}`,
      {},
      "GET"
    );
  };

  useEffect(() => {
    obtainAllCatelogue();
  }, []);

  return (
    <div>
      {loader ? (
        <Grid container wrap="nowrap">
          <Box sx={{ width: "30%", my: 5 }}>
            <Skeleton variant="rectangular" width={250} height={500} />
          </Box>
          <Box sx={{ width: "70%", my: 5 }}>
            <Skeleton variant="rectangular" height={500} />
          </Box>
        </Grid>
      ) : (
        <>
          {mainPath !== "enduser" && (
            <div style={{ display: "flex", justifyContent: "flex-end", margin:"0 0.8em" }}>
              <Button
                onClick={() =>
                  history.push(
                    `/${fromUser}/request-management/create-catelogue`
                  )
                }
                sx={{
                  background: `${theme.outerBodyColor}`,
                  color: `${theme.outerBodyfontColor}`,
                  "&:hover": {
                    backgroundColor: `${theme.btnHoverColor}`,
                  },
                  textTransform: "none",
                }}
              >
                Create Category
              </Button>
            </div>
          )}
          {catelogueDetails && (
            <div className="flex p-1 mt-4">
              <div item xs={4} className="rounded-md border-2 p-4 w-1/4">
                <Typography variant="h6" gutterBottom>
                  Categories
                </Typography>
                <List>
                  {categoryList.map((category) => (
                    <div key={category.categoryId}>
                      <ListItem
                        button
                        onClick={() =>
                          toggleCategory(
                            category.categoryId,
                            category.subCategoryList
                          )
                        }
                      >
                        <ListItemText primary={category.categoryName} />
                        {category?.subCategoryList?.length &&
                          (openCategories[category.categoryId] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          ))}
                      </ListItem>
                      <Collapse
                        in={openCategories[category.categoryId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {category?.subCategoryList?.map((subCategory) => (
                            <ListItem
                              button
                              key={subCategory.subCategoryId}
                              sx={{ pl: 4 }}
                              onClick={() =>
                                handleRequestCard(subCategory.subCategoryId)
                              }
                            >
                              <ListItemText
                                primary={subCategory.subCategoryName}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  ))}
                </List>
              </div>
              <div className="rounded-md border-2 p-4 w-[80%] ml-4">
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      borderRadius: 2,
                      textAlign: "center",
                      background: "#f2efec",
                      marginBottom: "1px",
                    }}
                    gutterBottom
                  >
                    {catelogueDetails?.catalogueName}
                  </Typography>
                  {requestCardDetails && requestCardDetails.length > 0 ? (
                    requestCardDetails.map((item, index) => (
                      <Card
                        key={index}
                        variant="outlined"
                        sx={{ marginBottom: 2, borderRadius: 2 }}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <span
                                  style={{
                                    color: theme.subHeaderFontColor,
                                    textDecoration: "underline", // Adds underline effect
                                    cursor: "pointer", // Ensures it's clickable
                                  }}
                                  onClick={() =>
                                    history.push(
                                      `/${fromUser}/server-request/create-request/${item.generalInformation.catelogueCatrgory.id}/${item.catalogItemId}?noBanner=true`
                                    )
                                  }
                                >
                                  {item.generalInformation.serviceRequestName}
                                </span>
                                {console.log(item, 'item')}
                                <Box>
                                  <IconButton
                                    onClick={() =>
                                      history.push(
                                        `/${fromUser}/request-management/update-request/${item.catalogItemId}?noBanner=true`
                                      )
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    // onClick={() =>
                                    //   history.push(
                                    //     `/${fromUser}/server-request/create-request/${item.generalInformation.catelogueCatrgory.id}/${item.catalogItemId}?noBanner=true`
                                    //   )
                                    // }
                                  >
                                    <DeleteOutlineIcon />
                                  </IconButton>
                                </Box>
                              </Box>

                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" color="textSecondary">
                                {
                                  item.generalInformation
                                    .serviceRequestDescription
                                }
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography variant="body2" color="textSecondary">
                                Turn Around Time: {item.generalInformation.turnAroundTime}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ color: "#FF0000", fontSize: "20px" }}
                    >
                      {noRequestCardMessage}
                    </Typography>
                  )}
                </Box>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}