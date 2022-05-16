import './MenuMobile.css'
import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { MdDashboard } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { RiInboxLine } from "react-icons/ri";

export default function MenuMobile() {

    const [checked, setChecked] = useState(true);

    return (
        <aside className="menuMobile menu">
            <nav role="navigation">
                <div id="menuToggle">

                    <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <h1 className="title">Listly</h1>
                        <li>
                            <NavLink activeClassName="active" exact to="/" onClick={() => setChecked(false)}><MdDashboard className="icon" />Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/mytasks" onClick={() => setChecked(false)}><BsListTask className="icon" />My Tasks</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/projects" onClick={() => setChecked(false)}><RiInboxLine className="icon" />Projects</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/report" onClick={() => setChecked(false)}><VscGraph className="icon" />Reports</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
}