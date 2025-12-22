import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Stack, Box, InputAdornment, Select, Typography, Autocomplete } from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Import ikon untuk rol
import { addUser } from "../../utils/ListApi";



const MasterUserAdd = (props) => {

  // Role 
  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "USER", label: "User" },
    { value: "STAFF", label: "Staff" },
  ];

  // Validation Form
  const formik = useFormik({
    initialValues:
    {
      email: "",
      name: "",
      role: "",
    },
    validationSchema: Yup.object
      ({
        email: Yup.string()
          .required("Email is required.")
          .email("Please enter a valid email address."),
        name: Yup.string()
          .required("Name is required.")
          .min(4, "Name must be at least 4 characters.")
          .max(20, "Name must not exceed 20 characters.")
          .matches(
            /^[a-zA-Z0-9_]+$/,
            "Name can only contain letters, numbers, and underscores."
          ),
        role: Yup.string().required("Role is required."),
      }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Default state and submit form
      setSubmitting(true)
      // setLoadingSpinner(true);
      // setShowAlert(false)
      // setMessage("");

      try {
        debugger
        const response = await addUser(values)
        props.handleModalAddClose()

      } catch (error) {
        setShowAlert(true)
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("System is Unavailable. Please Try Again Later.");
        }

      } finally {
        setSubmitting(false);
        setLoadingSpinner(false);
        resetForm()

        // setTimeout(() => {
        //   setShowAlert(false);
        //   setMessage("");
        // }, 3000);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm(); // Reset form saat modal ditutup
    props.handleModalAddClose();
  }


  return (
    <React.Fragment>

      <Dialog
        open={props.modalAddOpen}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          handleClose()
        }}
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        scroll={"paper"}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'background.default',
            borderRadius: 2
          }
        }}
      // aria-labelledby="scroll-dialog-title"
      // aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pr: 1,
          }}
        >
          Add User

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Stack
            spacing={4}
            sx={{
              // bgcolor: 'darkRed',
              p: 4
            }}>

            <DialogContentText
              textAlign={"center"}
              sx={{
                color: 'text.primary'
              }}>
              Add a new user and complete the information below
            </DialogContentText>

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 3,
                // bgcolor: "darkblue"
              }}
            >

              <Box>
                <Typography
                  variant="body2" fontWeight="medium"
                  mb={1}
                >
                  Email
                </Typography>
                <TextField
                  className="auth-field"
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  size="medium"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineOutlinedIcon
                            sx={{
                              color: formik.values.email === "" ? 'text.secondary' : 'text.primary'
                            }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="body2" fontWeight="medium"
                  mb={1}
                >
                  Name
                </Typography>
                <TextField
                  className="auth-field"
                  placeholder="Name"
                  name="name"
                  size="medium"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon
                            sx={{
                              color: formik.values.name === "" ? 'text.secondary' : 'text.primary'
                            }} />
                        </InputAdornment>
                      ),
                    },
                  }}


                />
              </Box>

              <Box>
                <Typography
                  variant="body2" fontWeight="medium"
                  mb={1}
                >
                  Role
                </Typography>

                <Autocomplete
                  fullWidth
                  options={roleOptions}
                  getOptionLabel={(option) => option.label}
                  value={roleOptions.find(opt => opt.value === formik.values.role) || null}
                  onChange={(event, newValue) => { formik.setFieldValue('role', newValue ? newValue.value : '') }}
                  onBlur={() => formik.handleBlur('role')}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="auth-field"
                      placeholder="Role"
                      variant="outlined"
                      name="role"
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <AdminPanelSettingsIcon
                                fontSize="small"
                                sx={{ color: 'text.secondary' }}
                              />
                              {params.InputProps.startAdornment}
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 0 }}  >
                <Button
                  color="main"
                  variant="contained"
                  fullWidth
                  sx={{
                    minHeight: '50px',
                    bgcolor: 'button.grey',
                    borderRadius: '15px',
                    '&:hover': {
                      bgcolor: 'button.grey',
                      opacity: 0.9,
                    },
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    minHeight: '50px',
                    borderRadius: '15px',
                    bgcolor: 'button.success',
                    '&:hover': {
                      bgcolor: 'button.success',
                      opacity: 0.9,
                    },
                  }}
                >
                  Add
                </Button>
              </DialogActions>


            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

MasterUserAdd.propTypes = {
  modalAddOpen: PropTypes.any,
  handleModalAddClose: PropTypes.any,

};

export default MasterUserAdd