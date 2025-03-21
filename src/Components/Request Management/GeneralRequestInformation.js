import { Grid, IconButton, MenuItem, TextField } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { sharedStyles } from "../../commonComponents/StyledComponents";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function GeneralRequestInformation(props) {
  const {
    values,
    handleChange,
    touched,
    errors,
    setFieldValue,
    handleOpen,
    catelogueLists,
    setCategoryLists,
    categoryLists,
    setSubCategoryLists,
    subCategoryLists,
    turnAroundTimeList,
    setTurnAroundTimeList,
  } = props;

  const { theme } = useTheme()

  return (
    <>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <Grid xs={9}>
          <TextField
            fullWidth
            label="Service Request Name"
            name="serviceRequestName"
            value={values.serviceRequestName}
            onChange={handleChange}
            sx={sharedStyles}
            error={
              touched.serviceRequestName && errors.serviceRequestName
            }
            helperText={
              touched.serviceRequestName &&
              errors.serviceRequestName && (
                <span style={{ color: "gray" }}>{errors.serviceRequestName}</span>
              )
            }
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Service Request Description"
            name="serviceRequestDescription"
            value={values.serviceRequestDescription}
            onChange={handleChange}
            sx={sharedStyles}
            error={
              touched.serviceRequestDescription &&
              errors.serviceRequestDescription
            }
            helperText={
              touched.serviceRequestDescription &&
              errors.serviceRequestDescription && (
                <span style={{ color: "gray" }}>
                  {errors.serviceRequestDescription}
                </span>
              )
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", marginBottom: "1em" }}>
          <Grid xs={4} sx={{ display: "flex", marginBottom: "1em", width: "100%" }}>
            <TextField
              select
              fullWidth
              label="Select Catalogue"
              name="selectCatelogue"
              value={values?.selectCatelogue?.catalogueName}
              sx={sharedStyles}
              onChange={(ele) => {
                const selectedCatelogueDetails = ele.target.value;
                setFieldValue("selectCatelogue",
                  {
                    id: selectedCatelogueDetails.catalogueId, name: selectedCatelogueDetails.catalogueName
                  });
                setCategoryLists(selectedCatelogueDetails.categoryList);
                setTurnAroundTimeList(selectedCatelogueDetails.turnAroundtime)
                setFieldValue("catelogueCatrgory", "");
                setFieldValue("catalogueSubCategory", "");
                setFieldValue("turnAroundTime", "");
                }}
                error={touched.selectCatelogue && errors.selectCatelogue}
                helperText={
                touched.selectCatelogue &&
                errors.selectCatelogue && (
                  <span style={{ color: "gray" }}>{errors.selectCatelogue}</span>
                )
                }
              >
                {catelogueLists?.map((ele) => (
                <MenuItem value={ele}>{ele.catalogueName}</MenuItem>
                ))}
              </TextField>
              <IconButton onClick={() => handleOpen("Select Catalogue")}>
                <AddCircleIcon sx={{ color:`${theme.valueFontColor}`, fontSize: "2rem" }} />
              </IconButton>
              </Grid>
              <Grid item xs={4} sm={4} sx={{ display: "flex", marginBottom: "1em", width: "100%" }}>
              <TextField
                select
                fullWidth
                label="Catalogue Category"
                disabled={!categoryLists?.length > 0}
                name="catelogueCatrgory"
                value={values?.catelogueCategory?.categoryName}
                sx={{ ...sharedStyles, width: "100%" }}
                onChange={(ele) => {
                const selectedCategoryDetails = ele.target.value;
                setFieldValue("catelogueCatrgory",
                  {
                    id: selectedCategoryDetails.categoryId, name: selectedCategoryDetails.categoryName
                  });
                setSubCategoryLists(selectedCategoryDetails.subCategoryList);
              }}
              error={
                touched.catelogueCategory &&
                errors.catelogueCategory
              }
              helperText={
                touched.catelogueCategory &&
                errors.catelogueCategory && (
                  <span style={{ color: "gray" }}>
                    {errors.catelogueCategory}
                  </span>
                )
              }
            >
              {categoryLists?.map((ele) => (
                <MenuItem value={ele}>{ele.categoryName}</MenuItem>
              ))}
            </TextField>
            <IconButton disabled={!values.selectCatelogue || values.selectCatelogue === null} onClick={() => handleOpen("Catalogue Category", values.selectCatelogue.id)}>
              <AddCircleIcon sx={{ color: `${theme.valueFontColor}`, fontSize: "2rem" }} />
            </IconButton>
          </Grid>
          <Grid item xs={4} sm={4} sx={{ display: "flex", marginBottom: "1em", width: "100%" }}>
            <TextField
              select
              fullWidth
              disabled={!subCategoryLists?.length > 0}
              label="Catalogue Sub-Category"
              name="catalogueSubCategory"
              value={values?.catalogueSubCategory?.subCategoryName}
              sx={sharedStyles}
              error={
                touched.catalogueSubCategory &&
                errors.catalogueSubCategory
              }
              onChange={(ele) => {
                const selectedSubCategoryDetails = ele.target.value;
                setFieldValue("catalogueSubCategory",
                  {
                    id: selectedSubCategoryDetails.subCategoryId, name: selectedSubCategoryDetails.subCategoryName
                  });
              }}
              helperText={
                touched.catelogueSubCategory &&
                errors.catelogueSubCategory && (
                  <span style={{ color: "gray" }}>
                    {errors.catelogueSubCategory}
                  </span>
                )
              }
            >
              {subCategoryLists?.map((ele) => (
                <MenuItem value={ele}>{ele.subCategoryName}</MenuItem>
              ))}
            </TextField>
            <IconButton disabled={!categoryLists?.length > 0} onClick={() => handleOpen("Catalogue Sub-Category", values.selectCatelogue.id, values.catelogueCatrgory.id)}>
              <AddCircleIcon sx={{ color: `${theme.valueFontColor}`, fontSize: "2rem" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={4} sm={4} sx={{ display: "flex", marginBottom: "1em" }}>
          <TextField
            select
            fullWidth
            disabled={!turnAroundTimeList?.length > 0}
            label="Turn Around Time (TAT)"
            name="turnAroundTime"
            value={values.turnAroundTime}
            sx={sharedStyles}
            onChange={handleChange}
            error={touched.turnAroundTime && Boolean(errors.turnAroundTime)}
            helperText={
              touched.turnAroundTime && errors.turnAroundTime && (
                <span style={{ color: "gray" }}>{errors.turnAroundTime}</span>
              )
            }
          >
            {turnAroundTimeList?.map((turn) => (
              <MenuItem value={turn}>{turn}</MenuItem>
            ))}
          </TextField>
          <IconButton onClick={() => handleOpen("Turn Around Time (TAT)")}>
            <AddCircleIcon sx={{ color: `${theme.valueFontColor}`, fontSize: "2rem" }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
