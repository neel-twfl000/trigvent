import React, {useContext, useEffect, useState} from 'react'
import { projectRetriveApiContext, taskDeleteApiContext } from '../../../../ContextApi/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import TaskList from '../Task/TableList'



const View = () => {

    const context = useContext(projectRetriveApiContext)
    const deleteContext = useContext(taskDeleteApiContext)
    const navigate = useNavigate()
    const {id} = useParams()

    const [state, setState] = useState({
        data:null
    })

    async function loadData(){
        let {data} = state
        await context(id).then(resp=>{
            if (resp.status){
                data = resp.data
                setState({data})
                return
            }
            return navigate('/')
        })
    }

    async function deleteFunction(id){
        await deleteContext(id).then(resp=>{
          if (resp.status){
            loadData()
          }
        })   
      }

    useEffect(() =>{
        loadData()
    }, [id])

  return (state.data&&

    <div>
        <h1>{state.data.name}</h1>
        <p>{state.data.description}</p>
        {console.log(state.data)}
        <TaskList  data={state.data.task} project={state.data.id} deleteFunction={deleteFunction}/>
    </div>

  )
}

export default View