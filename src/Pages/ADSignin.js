import { Image } from "@mui/icons-material";
import { Box, Button, Modal, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import GlobalService from '../services/GlobalService';
import { resturls } from '../global/utils/apiurls';

export default function ADSignin() {
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const ADLoginUser = (values, data) => {
    GlobalService.generalSelect(
      (respdata) => {
        const {
          estatus, data, emessage, valid
        } = respdata;
        if (estatus) {
          setAlreadyLogin(true);
        }
        console.log(respdata, 'ADLoginUser');
      }, resturls.getADUser,
      {
        emailAddress: values.username,
        password: values.password,
        configID: data.id
      },
      'POST',
    );
  }

  const AdLoginAuthentication = (value) => {
    GlobalService.generalSelect(
      (respdata) => {
        const {
          estatus, data, emessage, valid
        } = respdata;
        console.log(respdata, 'reqObj');
        ADLoginUser(value, data);
      }, resturls.AdLogin,
      {
        ldapUrl: "ldap://teksible.fortiddns.com:389",
        baseDn: "cn=Users,dc=Teksible,dc=com",
        userDn: value.username,
        password: value.password
      },
      'POST',
    );
  }

  return (
    <>
      {alreadyLogin ? (
        <Redirect to={'/'} />
      ) : (
        <Modal
          open
          aria-labelledby="profile-modal-title"
          aria-describedby="profile-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 450,
              height: 300,
              overflowY: 'scroll',
              bgcolor: '#f0f0f0',
              border: '2px solid #d1d1d1',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#a6a6a6',
              borderBottomColor: '#a6a6a6',
              boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              p: 4,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
              <Image src="./public/adLogo.webp" />
              <h3>Active Directory Sign-In</h3>
            </div>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                AdLoginAuthentication(values);
              }}
            >
              {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto' }}>
                    <Field
                      as={TextField}
                      name="username"
                      label="Username"
                      variant="outlined"
                      fullWidth
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      )}
    </>
  );
}