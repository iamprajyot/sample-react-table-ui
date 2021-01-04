import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';  
import axios from 'axios';    
import { useState, useEffect } from 'react';   

const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight: 'auto',
	},
	tableCell: {
		color: 'white',
		backgroundColor: '#1f60a0',
	},
	pagination: {
		backgroundColor: '#e1dada'
	}
});  
  
export default function InvoicesTable() {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  useEffect(() => {    
        const GetData = async () => {    
          const result = await axios('http://bakermckenzie.localtest.me:3001/api/invoices.json?client_id=79bf9d9b-ff8f-4637-bb65-c539b3e16ee9&auth_token=bakermckenzie-fiona.paterson@bakermckenzie.com');    
          setData(result.data.data);    
        }  
        GetData();    
        console.log(data);  
}, []);   
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  
  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };  
  
  return (  
    <Paper className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky" data={data} >
        <TableHead>  
            <TableRow>  
              <TableCell align="center" className={classes.tableCell}><strong>Invoice Number</strong></TableCell>  
              <TableCell align="center" className={classes.tableCell}><strong>Invoice Date</strong></TableCell>  
              <TableCell align="center" className={classes.tableCell}><strong>Invoice State</strong></TableCell>  
              <TableCell align="center" className={classes.tableCell}><strong>Created Date</strong></TableCell>   
            </TableRow>  
          </TableHead>  
          <TableBody>  
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  
           <TableRow >  
                <TableCell align="center">{row.invoice_number}</TableCell>  
                  <TableCell align="center">{row.invoice_date}</TableCell>
                  <TableCell align="center">{row.invoice_state}</TableCell>
                  <TableCell align="center">{row.created_at}</TableCell>  
              </TableRow>  
                 
              );  
            })}  
          </TableBody>  
        </Table>  
      </TableContainer>  
      <TablePagination  
        rowsPerPageOptions={[5, 10, 15]}  
        component="div"  
        count={data.length}  
        rowsPerPage={rowsPerPage}  
        page={page}  
        onChangePage={handleChangePage}  
				onChangeRowsPerPage={handleChangeRowsPerPage}  
				className={classes.pagination}
      />  
    </Paper>  
  );  
} 