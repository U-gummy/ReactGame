import React, { useContext, memo } from 'react'
import { TableContext } from '../MineSearch'
import Tr from './tr'

const Table = memo(() => {
    const { tableData } = useContext(TableContext)
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr,i) => <Tr key={i} rowIndex={i}/>)}
            </tbody>
        </table>
    )
});

export default Table
