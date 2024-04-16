import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, addArticle } from '../../../../store/actions/articles';
import { AdminTitle, Loader } from '../../../../utils/tools';
import WYSIWYG from '../../../../utils/form/tiptap';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';

const AddArticle = () => {
    const [values, setValues] = useState({
        title: '',
        content: '',
        excerpt: '',
        score: '',
        actors: [],
        director: '',
        status: '',
        category: ''
    });
    const [errors, setErrors] = useState({});
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const actorsValue = useRef();
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleEditorState = (state) => {
        setValues({
            ...values,
            content: state
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form
        const validationErrors = {};
        if (!values.title.trim()) {
            validationErrors.title = 'Title is required';
        }
        if (!values.content.trim()) {
            validationErrors.content = 'Content is required';
        }
        // Add more validations as needed

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch(addArticle(values))
                .unwrap()
                .then(() => {
                    navigate('/dashboard/articles');
                });
        }
    };

    useEffect(() => {
        dispatch(getCategories({}));
    }, []);

    return (
        <>
            <AdminTitle title="Add article"/>
            <form className='mt-3 article_form' onSubmit={handleSubmit}>

                <div className='form-group'>
                    <TextField
                        style={{width:'100%'}}
                        name="title"
                        label="Enter a title"
                        variant='outlined'
                        value={values.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </div>

                <div className='form-group'>
                    <WYSIWYG
                        setEditorState={(state)=>handleEditorState(state)}
                    />
                </div>

                <div className='form-group'>
                    <TextField
                        style={{width:'100%'}}
                        name="excerpt"
                        label="Enter a short desc"
                        variant='outlined'
                        value={values.excerpt}
                        onChange={handleChange}
                        error={!!errors.excerpt}
                        helperText={errors.excerpt}
                        multiline
                        rows={4}
                    />
                </div>

                <Divider className='mt-3 mb-3'/>

                <div className='form-group'>
                    <TextField
                        style={{width:'100%'}}
                        name="score"
                        label="Enter a score"
                        variant='outlined'
                        value={values.score}
                        onChange={handleChange}
                        error={!!errors.score}
                        helperText={errors.score}
                    />
                </div>

                <div className='form-group'>
                    <Paper className='actors_form'>
                        <InputBase
                            inputRef={actorsValue}
                            className='input'
                            placeholder='Add actor name here'
                        />
                        <IconButton
                            onClick={() => {
                                if (actorsValue.current.value !== '') {
                                    setValues({
                                        ...values,
                                        actors: [...values.actors, actorsValue.current.value]
                                    });
                                }
                                actorsValue.current.value = '';
                            }}
                        >
                            <AddIcon/>
                        </IconButton>
                    </Paper>
                    { errors.actors ?
                        <FormHelperText error={true}>
                            {errors.actors}
                        </FormHelperText>
                    :null}

                    <div className='chip_container'>
                        { values.actors.map((actor, index) => (
                            <div key={index}>
                                <Chip
                                    label={`${actor}`}
                                    color="primary"
                                    onDelete={() => {
                                        const newActors = [...values.actors];
                                        newActors.splice(index, 1);
                                        setValues({
                                            ...values,
                                            actors: newActors
                                        });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='form-group'>
                    <TextField
                        style={{width:'100%'}}
                        name="director"
                        label="Enter a director"
                        variant='outlined'
                        value={values.director}
                        onChange={handleChange}
                        error={!!errors.director}
                        helperText={errors.director}
                    />
                </div>

                <Divider className='mt-3 mb-3'/>

                <FormControl fullWidth>
                    <InputLabel>Select a status</InputLabel>
                    <Select
                        name="status"
                        label="Select a status"
                        value={values.status}
                        onChange={handleChange}
                        error={!!errors.status}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>
                    { errors.status ?
                        <FormHelperText error={true}>
                            {errors.status}
                        </FormHelperText>
                    :null}
                </FormControl>

                <Divider className='mt-3 mb-3'/>

                <FormControl fullWidth>
                    <InputLabel>Select a category</InputLabel>
                    <Select
                        name="category"
                        label="Select a category"
                        value={values.category}
                        onChange={handleChange}
                        error={!!errors.category}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        { articles.categories ?
                            articles.categories.map(item => (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.name}
                                </MenuItem>
                            ))
                        :null}
                    </Select>
                    { errors.category ?
                        <FormHelperText error={true}>
                            {errors.category}
                        </FormHelperText>
                    :null}
                </FormControl>

                <Divider className='mt-3 mb-3'/>

                { articles.loading ?
                    <Loader/>
                :
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        <span>Add article</span>
                    </Button>
                }
            </form>
        </>
    );
};

export default AddArticle;
