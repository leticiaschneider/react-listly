
import './Menu.css'
import React from 'react'

import { NavLink } from 'react-router-dom';

import { MdDashboard } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { RiInboxLine } from "react-icons/ri";

const Menu = props => (
    <div className="menuWeb sidebar shadow">
        <h1 className="title">Listly</h1>
        <aside className="menu">
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName="active" exact to="/"><MdDashboard className="icon" />Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/mytasks"><BsListTask className="icon" />My Tasks</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/projects"><RiInboxLine className="icon" />Projects</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/report"><VscGraph className="icon" />Reports</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
)

export default Menu;