import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup
import React from "react";
import { withTranslation } from "react-i18next";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { DatePicker } from '@mui/x-date-pickers';
import GlobalService from "../../../services/GlobalService";
import { resturls } from "../../../global/utils/apiurls";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// function GeneratedForm(props) {
//   const {
//     formFields,
//     setFormFields,
//     t,
//     createBtn,
//     generatedForm,
//     selectCategoryType,
//     className,
//     setCallMethod,
//     logo,
//     selectedClass
//   } = props;

//   const createValidationSchema = (fields) => {
//     const shape = {};

//     fields.forEach((field) => {
//       switch (field.fieldType) {
//         case 'Text':
//           shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
//           break;
//         case 'Number':
//           shape[field.fieldName] = Yup.number().required(`${field.fieldName} is required`).typeError(`${field.fieldName} must be a number`);
//           break;
//         case 'Password':
//           shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`).min(8, 'Password must be at least 8 characters');
//           break;
//         case 'Email':
//           shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`).email('Invalid email format');
//           break;
//         case 'Select':
//           shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
//           break;
//         case 'Boolean':
//           shape[field.fieldName] = Yup.boolean();
//           break;
//         case 'Date':
//           shape[field.fieldName] = Yup.date().required(`${field.fieldName} is required`).nullable();
//           break;
//         default:
//           break;
//       }
//     });

//     return Yup.object().shape(shape);
//   };

//   const handleRemoveField = (index) => {
//     const updatedFields = formFields.filter((_, i) => i !== index);
//     setFormFields(updatedFields);
//   };

//   const getGeneretedFormList = () => {
//     console.log(formFields, 'formFields');
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, data: responseData } = respdata;
//         if ((!estatus || estatus === null) && responseData.success) {

//         }
//       },
//       resturls.CreateClass,
//       {
//         attributes: formFields,
//         itemRequirement: selectCategoryType,
//         className,
//         image: logo
//       },
//       'POST'
//     );
//   }

//   const addItemRequirement = (values) => {
//     console.log(values, selectedClass, 'formvalues');
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, data: responseData } = respdata;
//         if ((!estatus || estatus === null) && responseData.success) {

//         }
//       },
//       resturls.CreateClassInstance,
//       {
//         values,
//         classCategoryId: selectedClass,
//       },
//       'POST'
//     );
//   }

//   return (
//     <div>
//       {createBtn &&
//         (
//           <>
//             <span><ArrowBackIcon onClick={() => setCallMethod(false)} /></span>
//             <span><h3>Add Config Items</h3></span>
//           </>
//         )
//       }
//       <Box mt={4}>
//         <Formik
//           initialValues={formFields.reduce((acc, curr) => {
//             acc[curr.fieldName] = '';
//             return acc;
//           }, {})}
//           validationSchema={createValidationSchema(formFields)}
//           onSubmit={(values) => {
//             console.log('Generated Form Submission:', values);
//             addItemRequirement(values);
//           }}
//         >
//           {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
//             <Form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 {formFields.map((field, index) => (
//                   <React.Fragment key={index}>
//                     <Grid item xs={6}>
//                       <h4 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         {field.fieldName}
//                         {selectedClass === '' ? (
//                           <IconButton onClick={() => handleRemoveField(index)} color="warning">
//                             <RemoveCircleIcon />
//                           </IconButton>
//                         ) : (
//                           <></>
//                         )}
//                       </h4>
//                       {field.fieldType === 'Text' && (
//                         <TextField
//                           label={field.fieldName}
//                           name={field.fieldName}
//                           value={values[field.fieldName]}
//                           onChange={handleChange}
//                           fullWidth
//                           error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
//                           helperText={touched[field.fieldName] && errors[field.fieldName]}
//                         />
//                       )}
//                       {field.fieldType === 'Number' && (
//                         <TextField
//                           label={field.fieldName}
//                           name={field.fieldName}
//                           type="number"
//                           value={values[field.fieldName]}
//                           onChange={handleChange}
//                           fullWidth
//                           error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
//                           helperText={touched[field.fieldName] && errors[field.fieldName]}
//                         />
//                       )}
//                       {field.fieldType === 'Password' && (
//                         <TextField
//                           label={field.fieldName}
//                           name={field.fieldName}
//                           type="password"
//                           value={values[field.fieldName]}
//                           onChange={handleChange}
//                           fullWidth
//                           error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
//                           helperText={touched[field.fieldName] && errors[field.fieldName]}
//                         />
//                       )}
//                       {field.fieldType === 'Email' && (
//                         <TextField
//                           label={field.fieldName}
//                           name={field.fieldName}
//                           type="email"
//                           value={values[field.fieldName]}
//                           onChange={handleChange}
//                           fullWidth
//                           error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
//                           helperText={touched[field.fieldName] && errors[field.fieldName]}
//                         />
//                       )}
//                       {field.fieldType === 'Select' && (
//                         <FormControl fullWidth error={touched[field.fieldName] && Boolean(errors[field.fieldName])}>
//                           <InputLabel id={`select-${index}-label`} shrink={values[field.fieldName] !== ""}>
//                             {field.fieldName}
//                           </InputLabel>
//                           <Select
//                             labelId={`select-${index}-label`}
//                             name={field.fieldName}
//                             value={values[field.fieldName]}
//                             onChange={handleChange}
//                           >
//                             {field.optionList?.map((option, optIndex) => (
//                               <MenuItem key={optIndex} value={option}>
//                                 {option}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                           {touched[field.fieldName] && errors[field.fieldName] && (
//                             <Box color="error.main">{errors[field.fieldName]}</Box>
//                           )}
//                         </FormControl>
//                       )}
//                       {field.fieldType === 'Date' && (
//                         <FormControl fullWidth>
//                           <DatePicker
//                             label={field.fieldName}
//                             value={values[field.fieldName]}
//                             onChange={(newValue) => setFieldValue(field.fieldName, newValue || null)}
//                             renderInput={(params) => (
//                               <TextField
//                                 fullWidth
//                                 {...params}
//                                 error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
//                                 helperText={touched[field.fieldName] && errors[field.fieldName]}
//                               />
//                             )}
//                           />
//                         </FormControl>
//                       )}
//                       {field.fieldType === 'Boolean' && (
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={values[field.fieldName]}
//                               onChange={handleChange}
//                               name={field.fieldName}
//                             />
//                           }
//                           label={field.fieldName}
//                         />
//                       )}
//                     </Grid>
//                   </React.Fragment>
//                 ))}
//               </Grid>
//               {createBtn && (
//                 <Box mt={2}>
//                   <Button type="submit" variant="contained" disabled={formFields.length === 0} color="primary">
//                     {t('create')}
//                   </Button>
//                 </Box>
//               )}
//             </Form>
//           )}
//         </Formik>
//         <Box mt={2}>
//           {generatedForm && (
//             <Box mt={2}>
//               <Button type="submit" variant="contained" disabled={formFields.length === 0} onClick={getGeneretedFormList} color="primary">
//                 {t('submit_generated_form')}
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// }
function GeneratedForm(props) {
  const {
    formFields,
    setFormFields,
    t,
    createBtn,
    generatedForm,
    selectCategoryType,
    className,
    setCallMethod,
    logo,
    selectedClass,
    initialValues, // Add a prop for initial values
    isEditMode // Flag to indicate if the form is in edit mode
  } = props;

  const createValidationSchema = (fields) => {
    const shape = {};

    fields.forEach((field) => {
      switch (field.fieldType) {
        case 'Text':
          shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
          break;
        case 'Number':
          shape[field.fieldName] = Yup.number().required(`${field.fieldName} is required`).typeError(`${field.fieldName} must be a number`);
          break;
        case 'Password':
          shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`).min(8, 'Password must be at least 8 characters');
          break;
        case 'Email':
          shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`).email('Invalid email format');
          break;
        case 'Select':
          shape[field.fieldName] = Yup.string().required(`${field.fieldName} is required`);
          break;
        case 'Boolean':
          shape[field.fieldName] = Yup.boolean();
          break;
        case 'Date':
          shape[field.fieldName] = Yup.date().required(`${field.fieldName} is required`).nullable();
          break;
        default:
          break;
      }
    });

    return Yup.object().shape(shape);
  };

  const handleRemoveField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  const getGeneretedFormList = () => {
    console.log(formFields, 'formFields');
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data: responseData } = respdata;
        if ((!estatus || estatus === null) && responseData.success) {

        }
      },
      resturls.CreateClass,
      {
        attributes: formFields,
        itemRequirement: selectCategoryType,
        className,
        image: logo
      },
      'POST'
    );
  };

  const addItemRequirement = (values) => {
    console.log(values, selectedClass, 'formvalues');
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data: responseData } = respdata;
        if ((!estatus || estatus === null) && responseData.success) {

        }
      },
      resturls.CreateClassInstance,
      {
        values,
        classCategoryId: selectedClass,
      },
      'POST'
    );
  };

  const initialFormValues = formFields.reduce((acc, curr) => {
    // If in edit mode, populate the initial value from initialValues prop
    acc[curr.fieldName] = isEditMode && initialValues && initialValues[curr.fieldName] !== undefined
      ? initialValues[curr.fieldName]
      : ''; // Otherwise set to empty string
    return acc;
  }, {});

  return (
    <div>
      {createBtn &&
        (
          <>
            <span><ArrowBackIcon onClick={() => setCallMethod(false)} /></span>
            <span><h3>Add Config Items</h3></span>
          </>
        )
      }
      <Box mt={4}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={createValidationSchema(formFields)}
          onSubmit={(values) => {
            console.log('Generated Form Submission:', values);
            addItemRequirement(values);
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {formFields.map((field, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <h4 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {field.fieldName}
                        {selectedClass === '' ? (
                          <IconButton onClick={() => handleRemoveField(index)} color="warning">
                            <RemoveCircleIcon />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                      </h4>
                      {field.fieldType === 'Text' && (
                        <TextField
                          label={field.fieldName}
                          name={field.fieldName}
                          value={values[field.fieldName]}
                          onChange={handleChange}
                          fullWidth
                          error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
                          helperText={touched[field.fieldName] && errors[field.fieldName]}
                        />
                      )}
                      {field.fieldType === 'Number' && (
                        <TextField
                          label={field.fieldName}
                          name={field.fieldName}
                          type="number"
                          value={values[field.fieldName]}
                          onChange={handleChange}
                          fullWidth
                          error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
                          helperText={touched[field.fieldName] && errors[field.fieldName]}
                        />
                      )}
                      {field.fieldType === 'Password' && (
                        <TextField
                          label={field.fieldName}
                          name={field.fieldName}
                          type="password"
                          value={values[field.fieldName]}
                          onChange={handleChange}
                          fullWidth
                          error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
                          helperText={touched[field.fieldName] && errors[field.fieldName]}
                        />
                      )}
                      {field.fieldType === 'Email' && (
                        <TextField
                          label={field.fieldName}
                          name={field.fieldName}
                          type="email"
                          value={values[field.fieldName]}
                          onChange={handleChange}
                          fullWidth
                          error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
                          helperText={touched[field.fieldName] && errors[field.fieldName]}
                        />
                      )}
                      {field.fieldType === 'Select' && (
                        <FormControl fullWidth error={touched[field.fieldName] && Boolean(errors[field.fieldName])}>
                          <InputLabel id={`select-${index}-label`} shrink={values[field.fieldName] !== ""}>
                            {field.fieldName}
                          </InputLabel>
                          <Select
                            labelId={`select-${index}-label`}
                            name={field.fieldName}
                            value={values[field.fieldName]}
                            onChange={handleChange}
                          >
                            {field.optionList?.map((option, optIndex) => (
                              <MenuItem key={optIndex} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched[field.fieldName] && errors[field.fieldName] && (
                            <Box color="error.main">{errors[field.fieldName]}</Box>
                          )}
                        </FormControl>
                      )}
                      {field.fieldType === 'Date' && (
                        <FormControl fullWidth>
                          <DatePicker
                            label={field.fieldName}
                            value={values[field.fieldName]}
                            onChange={(newValue) => setFieldValue(field.fieldName, newValue || null)}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                {...params}
                                error={touched[field.fieldName] && Boolean(errors[field.fieldName])}
                                helperText={touched[field.fieldName] && errors[field.fieldName]}
                              />
                            )}
                          />
                        </FormControl>
                      )}
                      {field.fieldType === 'Boolean' && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values[field.fieldName]}
                              onChange={handleChange}
                              name={field.fieldName}
                            />
                          }
                          label={field.fieldName}
                        />
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
              {createBtn && (
                <Box mt={2}>
                  <Button type="submit" variant="contained" disabled={formFields.length === 0} color="primary">
                    {t('create')}
                  </Button>
                </Box>
              )}
            </Form>
          )}
        </Formik>
        <Box mt={2}>
          {generatedForm && (
            <Box mt={2}>
              <Button type="submit" variant="contained" disabled={formFields.length === 0} onClick={getGeneretedFormList} color="primary">
                {t('submit_generated_form')}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default withTranslation('common')(GeneratedForm);