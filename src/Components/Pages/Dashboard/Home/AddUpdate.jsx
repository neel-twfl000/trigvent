import React, {useState, useEffect, useContext} from 'react';
import { Grid, TextField, Button, Container } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectRetriveApiContext, addUpdateProjectApiContext } from '../../../../ContextApi/Auth';

const AddUpdate = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const retriveContext = useContext(projectRetriveApiContext)

    const addUpdateContext = useContext(addUpdateProjectApiContext)

    const [state, setState] = useState({
        form:{
            name:"",
            description:""
        }
    })

    function onChangeHandeler(e){
        let {name, value} = e.target
        let {form} = state
        form[name] = value
        setState({form})
    }

    async function onSubmitHandeler(e){
        e.preventDefault()

        if (!id){
            await addUpdateContext({payload:state.form, method:"post"}).then(resp=>{
                if (resp.status){
                    return navigate('/')
                }
            })
        }
        else{
            await addUpdateContext({payload:state.form, method:"patch", id:id}).then(resp=>{
                if (resp.status){
                    return navigate('/')
                }
            })

        }
    }

    async function loadData(){
        let {form} = state
        await retriveContext(id).then(resp=>{
            if (resp.status){
                form.name = resp.data.name
                form.description = resp.data.description
                setState({form})
                return
            }

            navigate("/")
            
        })
    }

    useEffect(()=>{
        if (id){
            loadData()
        }
        
    }, [id])



    return (
        <Container>
            {!id?
            <h1>Add Project</h1>
            :
            <h1>Project ID: {id}</h1>
            }
            <form onSubmit={onSubmitHandeler}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            required
                            value={state.form.name}
                            variant="outlined"
                            onChange={onChangeHandeler}
                            fullWidth
                            name="name"
                            margin="normal"
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