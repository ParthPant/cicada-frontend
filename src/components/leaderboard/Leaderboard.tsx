import * as React from 'react'
import {useParams} from 'react-router-dom';
import axiosInstance from '../../axios'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Leaderboard (){
    let {id} = useParams<any>(); 
    const [leaderboard, setLeaderboard] = React.useState([])
    const classes = useStyles();

    React.useEffect(()=>{
        let mounted = true;
        axiosInstance.get(`quiz/${id}/leaderboard/`)
            .then(res => {
                if (mounted){
                    console.log(res.data);
                    setLeaderboard(res.data);
                }
            });
        console.log(id);
        return (()=>{mounted = false})
    },[])
    

    return(
        <>
        { leaderboard.length > 0 && (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {leaderboard.map((user, i) => (
                    <TableRow key={i+1}>
                        <TableCell component="th" scope="row">
                        {i+1}
                        </TableCell>
                    <TableCell>{user.user_name}</TableCell>
                    <TableCell align="right">{user.score}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        )}


        {leaderboard.length == 0 && (
        <Typography>
            Be the first to take the quiz
        </Typography>
        )}
        </>
    )
}
