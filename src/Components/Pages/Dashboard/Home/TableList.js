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


export default function StickyHeadTable({ data = [], deleteFunction }) {
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
        <MainCard title="Project List" >
            <DeleteModal
                open={open} setOpen={setOpen}
                deleteItem={deleteItem.data} deleteFunction={innerDelete} />
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell> # </TableCell>
                            <TableCell> Name </TableCell>
                            <TableCell> Description </TableCell>
                            <TableCell> Total Task </TableCell>
                            <TableCell> Created At </TableCell>
                            <TableCell> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {data.map((i, id) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                                <TableCell > {id + 1} </TableCell>
                                <TableCell >
                                    <Link to={"/project/view/" + i.id}>
                                        {i.name}
                                    </Link>
                                </TableCell>
                                <TableCell > {i.description.slice(0, 20)} </TableCell>
                                <TableCell > {i.total_task} </TableCell>
                                <TableCell > {i.created_at} </TableCell>
                                <TableCell >
                                    <Stack direction="row" spacing={2}>
                                        <Button component={Link}
                                            to={"/project/edit/" + i.id} variant="outlined" color='primary'>Edit</Button>
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
