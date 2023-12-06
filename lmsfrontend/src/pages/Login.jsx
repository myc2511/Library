import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice'
import { useFormik } from "formik"
import { useGoogleLogin } from '@react-oauth/google';
import { loginSchema } from '../schema/AuthSchema'
import Footer from '../components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const initialValues = {
  email: "",
  password: "",
}

const Login = () => {
  const [type, setType] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(login({ ...values, admin: type }))
      resetForm()
    }
  })
  const googleLogin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    dispatch(login({ admin: type, accessToken: accessToken }))
  }
  const { isSuccess, isLoading } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isSuccess) {
      if (type === true) {
        navigate('/')
      }
      else {
        navigate('/users')
      }
    }
    dispatch(reset())
  }, [isSuccess, navigate, dispatch])

  return (
    <>
    <Box className='login' component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ p: 2, m: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50vh', height: 'fit-content' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LibraryBooksIcon sx = {{ m:1 , width: '5vh', height: 'fit-content'}}></LibraryBooksIcon> <Typography variant="h2" component='h2' >Library</Typography>
        </Box>
        <Box sx={{ m: 5,marginBottom: 1 , width: '40vh'}}>
          <TextField
            required
            name="email"
            type="email"
            id="login-email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email && touched.email ? errors.email : null}
            error={errors.email && touched.email}
            style={{ width: '100%' }}
          />
        </Box>
        <Box sx={{ m: 2 , width: '40vh'}}>
          <TextField
            required
            name="password"
            type='password'
            id="login-password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password && touched.password ? errors.password : null}
            error={errors.password && touched.password}
            style={{ width: '100%' }}
          />
        </Box>
        <Box>
          <Typography><NavLink to='/forgotlink'>Forgot Password?</NavLink></Typography>
        </Box>
        <Box sx={{ marginTop: 2 , width: '40vh'}}>
          <FormGroup>
            <FormControlLabel
              onChange={(e) => setType(e.target.checked)}
              value={type}
              control={<Checkbox />}
              label='Login as Admin'
            />
          </FormGroup>
        </Box>
        <Box sx={{ m:1,p:1, display: 'flex', flexDirection: 'row' , width: '40vh'}}>
          <Typography>Don't have an account?&nbsp;</Typography>
          <Typography><NavLink to='/register'>Register</NavLink></Typography>
        </Box>
        <Box>
          <Button disabled={isLoading === true ? true : false} sx={{ m: 2 , p:2 , backgroundColor : '#3FD2C7' , width : '15vh' }} variant='contained' onClick={handleSubmit}>{isLoading === false ? 'Login' : 'Loging in...'}</Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '20%' }}><Divider sx={{ width: '1' }} />&nbsp;&nbsp;<Typography>or</Typography>&nbsp;&nbsp;<Divider sx={{ width: '1' }} /></Box>
        <Box><Button sx={{ m: 1, p:2 , marginBottom:2, backgroundColor : '#3FD2C7'}} variant='contained' onClick={() => googleLogin()} startIcon={<GoogleIcon />} >
          Login with google</Button>
        </Box>
      </Card>
    </Box>
      <Footer />
    </>
  );
};
export default Login;
