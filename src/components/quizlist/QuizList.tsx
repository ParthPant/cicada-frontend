import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axiosInstance from '../../axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function QuizList() {
  const classes = useStyles();
  const [quizzes, setQuizzes] = React.useState([])

  useEffect(()=>{
        let mounted = true
        axiosInstance.get('quiz/list/')
        .then((res)=>{
            if (mounted){
                setQuizzes(res.data);
            }
        })
        .catch(e=>{})
        return () => {mounted = false};
  },[]);

  return (
    <>
        {quizzes.map((quiz)=>
            <Grid container spacing={2}>
                <Grid item xs> 
                    <Card className={classes.root} variant="outlined">
                      <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {quiz.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {quiz.description}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {quiz.num_questions} questions 
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Give Quiz</Button>
                          <Button size="small" component={RouterLink} to={`/${quiz.id}/leaderboard`}>Leaderboard</Button>
                      </CardActions>
                    </Card>
                </Grid>
            </Grid>
        )
        }
    </>
  );
}
