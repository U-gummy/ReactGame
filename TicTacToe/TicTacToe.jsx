import React, { useState ,useReducer, useCallback, useEffect } from 'react'
import Table from './Component/Table'

const initialState = {
    winner : '',
    turn : 'O',
    tableData : [['','',''],['','',''],['','','']],
    recentCell: [-1,-1]
}
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
        return {
            ...state,
            winner : action.winner,
        };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell : [action.row, action.cell]
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn : 'O',
                tableData : [['','',''],['','',''],['','','']],
                recentCell: [-1,-1]
            };
        }
        default :
            return state;
    };
};

function TicTacToe() {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        const [row, cell] = state.recentCell;
        if(row < 0) return;
        let win = false;
        // 가로줄
        if(state.tableData[row][0] === state.turn && state.tableData[row][1] === state.turn && state.tableData[row][2] === state.turn) {
            win = true;
        //세로줄
        } else if(state.tableData[0][cell] === state.turn && state.tableData[1][cell] === state.turn && state.tableData[2][cell] === state.turn) {
            win = true;
        //대각선
        } else if(state.tableData[0][0] === state.turn && state.tableData[1][1] === state.turn && state.tableData[2][2] === state.turn) {
            win = true;
            //대각선
        } else if(state.tableData[0][2] === state.turn && state.tableData[1][1] === state.turn && state.tableData[2][0] === state.turn) {
            win = true;
        }

        if(win) {// 승리시
            dispatch({type:SET_WINNER, winner: state.turn});
            dispatch({type:RESET_GAME})
        }else {
            let all = true; // all이 true면 무승부

            state.tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell) {
                        all = false;
                    }
                })
            })
            if(all) { // 무승부
                dispatch({type:RESET_GAME})
                dispatch({type:SET_WINNER, winner: '--'});
            } else{
                dispatch({type:CHANGE_TURN});
            }
        }

    }, [state.recentCell])
    
    return (
        <>
            <Table tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe
