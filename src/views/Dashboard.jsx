import React from 'react';
import './Dashboard.css';
import { Link } from "react-router-dom";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";

import { Pie } from 'react-chartjs-2';

import { connect } from "react-redux";
import { checkTask } from '../data/actions/TodoActions';

function Dashboard(props) {

    const taskList = props.todoList;
    const projectList = props.projectsList;

    const someTasks = taskList.slice(-7);
    const lastsProject = projectList.slice(-3);

    const pieChartData = {
        labels: ['Tasks Completed', 'Tasks Incomplete'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#d1b1b2',
                    '#c2b8b7'
                ],
                hoverBackgroundColor: [
                    '#ebdedf',
                    '#e5dbd9'
                ],
                data: [taskList.filter((value) => value.checked === true).length, taskList.filter((value) => value.checked === false).length]
            }
        ]
    }

    return (
        <div className="p-25">
            <h2>Dashboard</h2>

            <div className="scroll-dashboard" >
                <div className="content-dashboard">

                    <div className="border">
                        <h3>Some Tasks</h3>
                        {
                            someTasks.length > 0 ?
                                <>
                                    {
                                        someTasks.map(element => (
                                            <div className="d-flex line" onClick={() => props.checkTodoList(element.key)} key={element.key.toString()}>
                                                {element.checked ? <AiFillCheckCircle className="iconCheck" /> : <AiOutlineCheckCircle className="iconCheck" />}
                                                <div className="taskInformation">
                                                    <span className={(element.checked ? 'taskTextChecked' : '')}>{element.title}</span>
                                                    <span className="taskDescription">{element.description}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="txt-center">
                                        <Link to="/mytasks" className="link" >View all tasks</Link>
                                    </div>
                                </>
                                :
                                <p className="txt-center">No tasks available yet</p>
                        }
                    </div>

                    <div>
                        <Pie
                        className="pieChart-dash"
                            data={pieChartData}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Average Rainfall per month',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="border last-project-dash">
                    <h3>Latest projects</h3>

                    {
                        lastsProject.length > 0 ?
                            <>
                                {
                                    lastsProject.map(element => (
                                        <div className="d-flex line" key={element.key.toString()}>
                                            <div className="taskInformation">
                                                <span>Project name: {element.name.length > 100 ? element.name.substring(0, 100) + '...' : element.name}</span>
                                                <span className="taskDescription">Project description: {element.description.length > 200 ? element.description.substring(0, 200) + '...' : element.description}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="txt-center">
                                    <Link to="/projects" className="link" >View all projects</Link>
                                </div>
                            </>
                            :
                            <p className="txt-center">No projects available yet</p>
                    }
                </div>

            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    todoList: state.todos,
    projectsList: state.projects
});

function mapDispatchToProp(dispatch) {
    return {
        checkTodoList(key) {
            const action = checkTask(key);
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);