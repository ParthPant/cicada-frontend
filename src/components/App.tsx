import * as React from "react"
import {
        Switch,
        Route,
        BrowserRouter as Router
    } from 'react-router-dom'

import {Provider} from 'react-redux'

import MenuAppBar from './navbar/Navbar'
import SignIn from './signin/SignIn'
import QuizList from './quizlist/QuizList'
import SignUp from './signup/SignUp'
import Leaderboard from './leaderboard/Leaderboard'

import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import "./style.scss"
import store from '../store'

const theme = createMuiTheme({
});

export const App = () => {

    return(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                <MenuAppBar/>

                <Switch>
                    <Route path="/login">
                        <SignIn/>
                    </Route>
                    <Route path="/list">
                        <QuizList/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/:id/leaderboard">
                        <Leaderboard/>
                    </Route>
                </Switch>

                </Router>
            </ThemeProvider>
        </Provider>
    )
};
