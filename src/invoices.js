import React, { Component } from 'react';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import axios from 'axios';  



export class InvoicesTable extends Component {  

  constructor(props) {  

    super(props)  

    this.state = {  
      ProductData: []  
     }

  }  
  componentDidMount() {  
    axios.get('http://bakermckenzie.localtest.me:3001/api/invoices.json?client_id=79bf9d9b-ff8f-4637-bb65-c539b3e16ee9&auth_token=bakermckenzie-fiona.paterson@bakermckenzie.com').then(response => {  
      console.log(response.data);  
      this.setState({  
        ProductData: response.data.data  
      });  
    });  
  }  
  render() {  
    console.log(this.state.ProductData);  
    return (  
      <TableContainer component={Paper}>  
        <Table stickyHeader  aria-label="sticky table">  
          <TableHead>  
            <TableRow>  
              <TableCell align="center">Invoice Number</TableCell>  
              <TableCell align="center">Invoice Date</TableCell>  
              <TableCell align="center">Invoice State</TableCell>  
              <TableCell align="center">Created Date</TableCell>  
            </TableRow>  
          </TableHead>  
          <TableBody>  
            {  
              this.state.ProductData.map((p, index) => {  
                return <TableRow key={index}>  
                  <TableCell align="center">{p.invoice_number}</TableCell>  
                  <TableCell align="center">{p.invoice_date}</TableCell>
                  <TableCell align="center">{p.invoice_state}</TableCell>
                  <TableCell align="center">{p.created_at}</TableCell>
                </TableRow>
              })
            }  
          </TableBody>
        </Table>
      </TableContainer>
    );
  }  
}  
  

export default InvoicesTable 