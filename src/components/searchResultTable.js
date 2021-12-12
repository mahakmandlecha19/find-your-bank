import React, { useMemo } from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import { COLUMNS } from './columns';
import { Table,Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
//import './BankTable.css';
import { CategoryFilter } from './categoryFilter';

export const SearchResultTable = ({ data, setSelectedRow,category}) => {
    const columns = useMemo(() => COLUMNS, []);
    const defaultColumn = useMemo(() => {
        return {
            Filter: CategoryFilter

        }
    }, []);
    

    const history = useHistory();
    const handleRowClick = (row) => {
        history.push(`/bank_details/${row.values.ifsc}`);
      } 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        setPageSize,
        prepareRow
      } = useTable({
        columns,
        data,
        defaultColumn
    }, 
    useFilters,
    usePagination)

    const { pageIndex, pageSize } = state;
    return(
        <>
        <div>
            {headerGroups.map(headerGroup => (
                    headerGroup.headers.map(column => (
                        <th>
                            
                            <div>
                                {column.render('Header')==category ? column.render('Filter') :null}
                            </div>
                        </th>
                    ))
                   
                ))}
        </div>
        <div class="fixTableHead">
        <Table bordered hover responsive style={{width:'600px'},{tableLayout: 'fixed'}} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th>
                        {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={()=> {
                            handleRowClick(row);
                            setSelectedRow(row.values)}}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
        <div>
            <div class="paginationDiv , text-center" style={{marginTop:"20px"}}>
                <span class="paginationItems" style={{AlignItems:"left"}}>
                    Page {' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong> {' '}
                </span>
                <span class="paginationItems"  style={{ marginRight:"10px", lineHeight:"28px" }}>
                    | Go to page: {' '}
                    <input type='number' style={{ height:"60px" }} defaultValue={pageIndex + 1}
                    onChange = { e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(pageNumber)
                    }} 
                    style ={{width: '50px'}}/>
                </span>
                
                
                <Button style={{backgroundColor:"#00d09c", marginRight:"10px" }} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Prev
                </Button>
                <Button style={{backgroundColor:"#00d09c" }}onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>
               
                <select class="paginationItems"  style={{marginLeft:"20px", height:"35px"}} value={pageSize} onChange={e=>{
                    setPageSize(Number(e.target.value))
                }}>
                    {[10, 20, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize} 
                        </option>
                    ))}
                </select>
            </div>
            </div>
        </>
    )
};