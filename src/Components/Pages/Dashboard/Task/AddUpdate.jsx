import React, { useState, useEffect, useContext } from 'react';
import { Grid, TextField, Button, Container } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { taskRetriveApiContext, addUpdateTaskApiContext, projectApiContext } from '../../../../ContextApi/Auth';

const AddUpdate = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const retriveContext = useContext(taskRetriveApiContext)
    const projectContext = useContext(projectApiContext)

    const addUpdateContext = useContext(addUpdateTaskApiContext)

    const [state, setState] = useState({
        form: {
            title: "",
            description: "",
            project:null,
            completed:false
        },

        autoComplete:{
            project:null
        }

    })

    const [project, setProject] = useState({
        data: []
    })

    function onChangeHandeler(e) {
        let { name, value } = e.target
        let { form, autoComplete } = state
        form[name] = value
        setState({ form, autoComplete })
    }

    async function onSubmitHandeler(e) {
        e.preventDefault()

        if (!id) {
            await addUpdateContext({ payload: state.form, method: "post" }).then(resp => {
                if (resp.status) {
                    return navigate('/task')
                }
            })
        }
        else {
            await addUpdateContext({ payload: state.form, method: "patch", id: id }).then(resp => {
                if (resp.status) {
                    return navigate('/task')
                }
            })

        }
    }

    async function loadData() {
        let { form, autoComplete } = state
        await retriveContext(id).then(resp => {
            if (resp.status) {
                form.title = resp.data.title
                form.description = resp.data.description
                form.project = resp.data.project
                form.completed = resp.data.completed
                autoComplete.project = {id:resp.data.project, name:resp.data.project_name}
                setState({ form , autoComplete})
                return
            }

            navigate("/")

        })
    }

    function onChangeProject(event, value) {
        let { form, autoComplete } = state
        if (value){
            autoComplete.project = value
            form.project = value.id
        }
        else{
            autoComplete.project = null
            form.project = null
        }
        
        setState({ form, autoComplete })
    }

    async function loadProject() {
        await projectContext(null, true).then(resp => {
            setProject({ data: resp.data })
        })
    }

    useEffect(() => {
        loadProject()
        if (id) {
            loadData()
        }
        else{
            
            setState(
                {
                    form: {
                        title: "",
                        description: "",
                        project:null
                    },

                    autoComplete:{
                        project:null
                    }
                }

            )
            
        }


    }, [id])


    return (
        <Container>
            {!id ?
                <h1>Add Task</h1>
                :
                <h1>Title ID: {id}</h1>
            }
            <form onSubmit={onSubmitHandeler}>
                {console.log(state, '---->>')}
                <Grid container spacing={2} >
                    <Grid item xs={12} spacing={5}>
                        <TextField
                            label="Task Title"
                            required
                            value={state.form.title}
                            variant="outlined"
                            onChange={onChangeHandeler}
                            fullWidth
                            name="title"
                            margin="normal"
                        />


                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={project.data}
                            getOptionLabel={(i) => i.name}
                            onChange={onChangeProject}
                            value={state.autoComplete.project}
                            fullWidth
                            renderOption={(props, option) => (
                                <li {...props}>{option.name}</li>
                            )}

                            renderInput={
                                (params) => <TextField {...params}
                                    color="success"
                                    label={
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Project
                                        </Typography>
                                    }
                                />
                            }
                        />

                        <TextField
                            required
                            label="Description"
                            value={state.form.description}
                            name="description"
                            onChange={onChangeHandeler}
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                        />

                        <FormControlLabel control={<Checkbox checked={state.form.completed}
                        name="completed"
                        onChange={onChangeHandeler}
                        />} label="Completed" />

                    </Grid>

                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default AddUpdate