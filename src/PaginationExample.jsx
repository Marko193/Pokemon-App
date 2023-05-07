import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

function createData(events, dates) {
    return { events, dates };
}

const rows = [
    createData('Technical Scripter', '13 October'),
    createData('Gate Mock', '5 November'),
    createData('Bi Wizard', '26 November'),
    createData('Job-A-Thon14', '21 October'),
    createData('GFG Hiring', '15 October'),
    createData('TechnicalScripter', '13 October'),
    createData('Gate Mock Exam', '5 November'),
    createData('Bi Wizard School', '26 November'),
    createData('Job-A-Thon 14', '21 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
];

export default function PaginationExample() {
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    return (
        <Paper>
            <h1 style={{ textAlign: 'center', color: 'green' }}>
                GeeksForGeeks
            </h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(pg * rpg, pg * rpg + rpg).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.events}
                                </TableCell>
                                <TableCell align="right">{row.dates}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
