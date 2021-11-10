import React from "react"
import { Router, Switch } from "react-router-dom"
import history from "../history"
import BoardsListPage from "../components/BoardsListPage"
import BoardPage from "../components/BoardPage"
import PublicRoute from "./PublicRoute"


const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={BoardsListPage} exact={true}/>
                <PublicRoute path="/boards" component={BoardsListPage} exact={true}/>
                <PublicRoute path="/boards/:id" component={BoardPage}/>
            </Switch>
        </div>
    </Router>
)

export default AppRouter