import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainCard from '../../../../Mui/ui-component/cards/MainCard';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import DeleteModal from '../../../Parts/Dashboard/DeleteModel'


export default function StickyHeadTable({ data = [], deleteFunction, project = null }) {
    const [open, setOpen] = React.useState(false);

    const [deleteItem, setDeleteItem] = React.useState({
        data: null
    })

    function innerDelete(id){
        setOpen(false)
        deleteFunction(id)
    }

    function handleOpen(obj) {
        setDeleteItem({ data: obj })
        setOpen(true)

    }

    return (
        <MainCard title="Task List" >
            <DeleteModal
                open={open} setOpen={setOpen}
                deleteItem={deleteItem.data} deleteFunction={innerDelete} />

            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell> # </TableCell>
                            {!project &&
                                <TableCell> Project Name </TableCell>
                            }
                            <TableCell> Task Name </TableCell>
                            <TableCell> Description </TableCell>
                            <TableCell> Completed </TableCell>
                            <TableCell> Created At </TableCell>
                            <TableCell> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {data.map((i, id) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                                <TableCell > {id + 1} </TableCell>
                                {!project &&
                                    <TableCell >
                                        <Link to={"/project/view/" + i.project}>
                                            {i.project_name}
                                        </Link>
                                    </TableCell>
                                }

                                <TableCell >
                                    <Link to={"/task/view/" + i.id}>
                                        {i.title}
                                    </Link>
                                </TableCell>
                                <TableCell > {i.description.slice(0, 20)} </TableCell>
                                <TableCell > <input type='checkbox' checked={i.completed} disabled/> </TableCell>
                                <TableCell > {i.created_at} </TableCell>
                                <TableCell >
                                    <Stack direction="row" spacing={2}>
                                        <Button component={Link}
                                            to={"/task/edit/" + i.id} variant="outlined" color='primary'>Edit</Button>
                                        <Button color='error' variant="outlined"
                                            onClick={() => handleOpen(i)}
                                        >Delete</Button>
                                    </Stack>
                                </TableCell>

                            </TableRow>
                        ))}

                        {data.length === 0 &&
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell > No Data found! </TableCell>
                            </TableRow>
                        }





                    </TableBody>
                </Table>
            </TableContainer>


        </MainCard>
    );
}
