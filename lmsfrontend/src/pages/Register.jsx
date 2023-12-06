import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import { useGoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik'
import { registerSchema } from '../schema/AuthSchema'
import Footer from '../components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


const initialValues = {
    name: "",
    email: "",
    password: "",
    password2: ""
}

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, isLoading } = useSelector((state) => state.auth)
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(register(values))
            resetForm()
        }
    })
    const googleLogin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        dispatch(register({ accessToken: accessToken }))
    }
    useEffect(() => {
        if (isSuccess) {
            navigate('/users')
        }
        return () => dispatch(reset())
    }, [isSuccess, navigate, dispatch])
    return (
        <>
        <Box  style={{margin:'4vh'}} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ p: 2, m: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width:'50vh'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LibraryBooksIcon sx = {{ m:1 , width: '5vh', height: 'fit-content'}}></LibraryBooksIcon> <Typography variant="h2" component='h2' >Library</Typography>
                </Box>
                <Box sx={{ marginTop: 5,marginBottom: 1 , width: '40vh'}}>
                    <TextField
                        required
                        name="name"
                        id="name"
                        label="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name && touched.name ? errors.name : null}
                        error={errors.name && touched.name}
                        style={{ width: '100%' }}
                    />
                </Box>
                <Box sx={{ m: 2,marginBottom: 1 , width: '40vh'}}>
                    <TextField
                        required
                        name="email"
                        id="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.email && touched.email ? errors.email : null}
                        error={errors.email && touched.email}
                        style={{ width: '100%' }}
                    />
                </Box>
                <Box sx={{ m: 2,marginBottom: 1 , width: '40vh'}}>
                    <TextField
                        required
                        name="password"
                        id="password"
                        label="Password"
                        value={values.password}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.password && touched.password ? errors.password : null}
                        error={errors.password && touched.password}
                        style={{ width: '100%' }}
                    />
                </Box>
                <Box sx={{ m: 2,marginBottom: 1 , width: '40vh'}}>
                    <TextField
                        required
                        name="password2"
                        id="password2"
                        label="Confirm Password"
                        value={values.password2}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.password2 && touched.password2 ? errors.password2 : null}
                        error={errors.password2 && touched.password2}
                        style={{ width: '100%' }}
                    />
                </Box>
                <Box sx={{ m: 1, display: 'flex', flexDirection: 'row' }}>
                    <Typography>Already have an account?&nbsp;</Typography>
                    <Typography><NavLink to='/login'>Login</NavLink></Typography>
                </Box>
                <Box>
                    <Button disabled={isLoading === true ? true : false} sx={{ m: 2 , p:2 , backgroundColor : '#3FD2C7' , width : '15vh' }} type="submit" variant='contained' onClick={handleSubmit}>{isLoading === false ? 'SignUp' : 'Submitting...'}</Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '20%' }}><Divider sx={{ width: '1' }} />&nbsp;&nbsp;<Typography>or</Typography>&nbsp;&nbsp;<Divider sx={{ width: '1' }} /></Box>
                <Box><Button sx={{ m: 1, p:2 , marginBottom:2, backgroundColor : '#3FD2C7'}} variant='contained' onClick={() => googleLogin()} startIcon={<GoogleIcon />} >
                    Register with google</Button>
                </Box>
            </Card>
           
        </Box>
        <Divider sx={{ width: '100%', m: 2 }} />
            <Footer />
        </>
    )
}

export default Register