import React from 'react';

import { Pie, Doughnut, Bar, Radar } from 'react-chartjs-2';
import { connect } from "react-redux";

function Report(props) {
    const taskList = props.todoList;
    const projectList = props.projectsList;


    let categoryUsedbyTask = taskList.map(item => {
        return item.tags.map(item => {
            return item.tagName;
        })
    })

    var transformArrayTask = categoryUsedbyTask.toString().split(',').filter(item => item);

    let countCategoryUsedTask = {};
    transformArrayTask.forEach(function (i) { countCategoryUsedTask[i] = (countCategoryUsedTask[i] || 0) + 1; });

    transformArrayTask = transformArrayTask.filter(function (item, pos) {
        return transformArrayTask.indexOf(item) === pos && item !== "";
    });

    let countCategoryTask = [];
    transformArrayTask.forEach(function (elem) {
        countCategoryTask.push(countCategoryUsedTask[elem]);
    });

    const radarChartData = {
        labels: transformArrayTask,
        datasets: [{
            label: "Categories used",
            data: countCategoryTask,
            fill: true,
            backgroundColor: '#d1b1b280',
            borderColor: '#b3999973',
            pointBackgroundColor: '#ebd6d6',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ebd6d6'
        }]
    };

    const pieChartData = {
        labels: ['Tasks Completed', 'Tasks Incomplete'],
        datasets: [
            {
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

    const barChartData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: "All tasks created per week",
                data: [
                    taskList.filter((value) => value.dateTaskCreated.day() === 0).length,
                    taskList.filter((value) => value.dateTaskCreated.day() === 1).length,
                    taskList.filter((value) => value.dateTaskCreated.day() === 2).length,
                    taskList.filter((value) => value.dateTaskCreated.day() === 3).length,
                    taskList.filter((value) => value.dateTaskCreated.day() === 4).length,
                    taskList.filter((value) => value.dateTaskCreated.day() === 5).length,
                    taskList.filter((value) => value.dateTaskCreated.day() === 6).length
                ],
                fill: false,
                backgroundColor: "#d1b1b2",
                borderColor: "#d1b1b2"
            },
            {
                label: "Completed tasks",
                data: [
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 0).length,
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 1).length,
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 2).length,
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 3).length,
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 4).length,
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 5).length,
                    taskList.filter((value) => value.checked === true && value.dateTaskCompleted.day() === 6).length
                ],
                fill: false,
                backgroundColor: "#f0e8e5",
                borderColor: "#f0e8e5"
            }
        ]
    };


    let categoryUsedByProject = projectList.map(item => {
        return item.category.map(item => {
            return item.categoryName;
        })
    })

    var transformArray = categoryUsedByProject.toString().split(',').filter(item => item);

    let countCategoryUsed = {};
    transformArray.forEach(function (i) { countCategoryUsed[i] = (countCategoryUsed[i] || 0) + 1; });

    transformArray = transformArray.filter(function (item, pos) {
        return transformArray.indexOf(item) === pos && item !== "";
    });

    let countCategory = [];
    transformArray.forEach(function (elem) {
        countCategory.push(countCategoryUsed[elem]);
    });

    const doughnutChartData = {
        labels: transformArray,
        datasets: [
            {
                backgroundColor: [
                    '#273454',
                    '#a6abb1',
                    '#c2b8b7',
                    '#d1b1b2',
                    '#f0e8e5',
                    '#273454',
                    '#a6abb1',
                    '#c2b8b7',
                    '#d1b1b2',
                    '#f0e8e5',
                    '#273454',
                    '#a6abb1',
                    '#c2b8b7',
                    '#d1b1b2',
                    '#f0e8e5'
                ],
                hoverBackgroundColor: [
                    '#435a91',
                    '#c4c6c9',
                    '#d5cccc',
                    '#dfc7c8',
                    '#f7efec',
                    '#435a91',
                    '#c4c6c9',
                    '#d5cccc',
                    '#dfc7c8',
                    '#f7efec',
                    '#435a91',
                    '#c4c6c9',
                    '#d5cccc',
                    '#dfc7c8',
                    '#f7efec'
                ],
                data: countCategory
            }
        ]
    }

    return (
        <div className="p-25">
            <h2>Report</h2>

            <div className="d-flex d-flex-wrap scroll" style={{ height: '75vh' }}>

                <div className="border-line">
                    <h3>Number of categories used in each tasks</h3>
                    <Radar data={radarChartData}
                        width={500}
                        height={500}
                        option={{
                            maintainAspectRatio: false
                        }} />
                </div>

                <div className="d-flex d-flex-align-stretch">
                    <div className="border-line">
                        <h3>Total tasks completed</h3>
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

                    <div className="border-line">
                        <h3>Total tasks completed per week</h3>
                        <Bar
                            data={barChartData}
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
                
                <div className="border-line">
                    <h3>Number of categories used in each project</h3>
                    <Doughnut
                        data={doughnutChartData}
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

        </div>
    );
}

const mapStateToProps = state => ({
    todoList: state.todos,
    projectsList: state.projects
});

export default connect(mapStateToProps)(Report);