import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addBook, uploadEbook } from '../../features/admin/adminSlice'
import { useFormik } from 'formik'
import { addBookSchema } from '../../schema/AdminSchema'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const initialValues = {
  title: "",
  author: "",
  total: "",
  rating: "",
  numOfRatings: "",
  genre: []
}

const AddBook = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const { uploadedBook } = useSelector(state => state.admin)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: addBookSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(addBook(values))
      setOpen(true)
      resetForm()
    }
  })
  const { isLoading } = useSelector((state) => state.admin)
  const categories = ["action", "drama", "sci - fi", "romance", "comedy"];
  const handleGenreChange = (e) => {
    if (e.target.checked) {
      setFieldValue("genre", [...values.genre, e.target.value]);
    } else {
      setFieldValue("genre", values.genre.filter((sel) => sel !== e.target.value));
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEbookUpload = () => {
    if (file === undefined) {
      alert("Select a PDF to Upload")
      setOpen(false)
    }
    else {
      const formData = new FormData()
      formData.append("id", uploadedBook._id)
      formData.append("file", file)
      dispatch(uploadEbook(formData))
      setOpen(false)
    }
  }
  return (
    <Card sx={{ m: 2, p: 2, backgroundColor: '#c4d3f5' , width:'100vh', marginLeft:'auto', marginRight:'auto'}}>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          multiline
          fullWidth
          name="title"
          id="add-title"
          label="Title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.title && touched.title ? errors.title : null}
          error={errors.title && touched.title}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          multiline
          fullWidth
          id="add-author"
          label="Author"
          name="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.author && touched.author ? errors.author : null}
          error={errors.author && touched.author}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          type='number'
          InputProps={{ inputProps: { min: 0 } }}
          id="add-rating"
          label="Rating"
          name="rating"
          value={values.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.rating && touched.rating ? errors.rating : null}
          error={errors.rating && touched.rating}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          type='number'
          InputProps={{ inputProps: { min: 0 } }}
          id="add-numOfRatings"
          label="Num Of Ratings"
          name="numOfRatings"
          value={values.numOfRatings}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.numOfRatings && touched.numOfRatings ? errors.numOfRatings : null}
          error={errors.numOfRatings && touched.numOfRatings}
        />
      </Box>
      <Box sx={{ border: '0.1px solid #9fa3ab', borderRadius: '5px', m: 1, width: 222, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='p' sx={{ p: 1, color: 'grey' }}>
          Genre *
        </Typography>
        <Box>
          {categories.map((cat) => (
            <Box sx={{ display: 'flex', flexDirection: 'row' }} key={cat}>
              <input
                id={cat}
                type="checkbox"
                name={cat}
                value={cat}
                checked={values.genre.includes(cat)}
                onChange={handleGenreChange}
                onBlur={handleBlur}
              />
              <label htmlFor={cat}>{cat}</label>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          type='number'
          InputProps={{ inputProps: { min: 1 } }}
          id="add-total"
          label="Total Books"
          name="total"
          value={values.total}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.total && touched.total ? errors.total : null}
          error={errors.total && touched.total}
        />
      </Box>
      <Box sx={{ pl: 1, display: 'flex', justifyContent: 'center' }}>
        <Button disabled={isLoading === true ? true : false} fullWidth sx={{ backgroundColor: '#89e681', '&:hover': { backgroundColor: '#5ad14f' } }} variant='contained' onClick={handleSubmit} startIcon={<AddCircleOutlineIcon />}>{isLoading === false ? 'Add Book' : 'Adding...'}</Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload E-Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do You Want to upload a E-Book for this book?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="EBook"
            type="file"
            fullWidth
            variant="standard"
            inputProps={{ accept: "application/pdf" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEbookUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
export default AddBook;
