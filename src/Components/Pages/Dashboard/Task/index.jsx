import { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { gridSpacing } from '../../../../store/constant';
import TableList from './TableList'
import { taskApiContext , taskDeleteApiContext} from '../../../../ContextApi/Auth';

const Dashboard = ({loader, setLoader}) => {
  const context = useContext(taskApiContext)
  const deleteContext = useContext(taskDeleteApiContext)
  
  const [state, setState] = useState({
    data:{
      next:null,
      previous:null,
      count:0,
      results : []
    }
  })

  async function loadData(){
    await context().then(resp=>{
      if (resp.status){
        setState({data:resp.data})
      }
      return
    })
  }

  function removeState(id){
    console.log(id)
    let {data} = state
    let index = data.results.findIndex((i)=>i.id===id)
    data.results.splice(index, 1)
    setState({data})
  }

  async function deleteFunction(id){
    await deleteContext(id).then(resp=>{
      if (resp.status){
        removeState(id)
      }
    })

   
   
  }

  useEffect (()=>{
    loadData()
  }, [])



  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <TableList data={state.data.results} deleteFunction={deleteFunction}/>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
