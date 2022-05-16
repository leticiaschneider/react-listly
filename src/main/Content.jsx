import './Content.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../views/Dashboard';
import MyTasks from '../views/MyTasks';
import Report from '../views/Report';
import Projects from '../views/Projects';
import NotFound from '../views/NotFound';

const Content = () => (
    <main className="content shadow">
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/mytasks">
                <MyTasks />
            </Route>
            <Route path="/report">
                <Report />
            </Route>
            <Route path="/projects">
                <Projects />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    </main>
)

export default Content;