import React from 'react'
import Tr from './tr'

function Table({ tableData, dispatch }) {
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i)=>{
                   return <Tr key={i} rowData={tableData[i]} rowIndex={i} dispatch={dispatch}/>
                })}
            </tbody>
        </table>
    )
}

export default Table
