import React from 'react';
import './TaskList.css'
import moment from 'moment';
import FormTask from './FormTask';

// Icons ---
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import { checkTask, moreActions, formEditTask, removeTask } from '../data/actions/TodoActions';
import { checkTodoProject, moreActionsProjectTask, openformToEditProject, removeTaskProject } from '../data/actions/ProjectActions';

import { connect } from "react-redux";


function TaskList(props) {

    const taskList = props.isProject ? props.projectsList[props.project.key].todos : props.todoList;

    const showTaskCompleted = props.showTaskCompleted;

    const editItem = (keyTask) => {
        if (props.isProject) {
            props.editItemProject(props.project.key, keyTask);
        }
        else {
            props.editItem(keyTask);
        }

        props.openTaskForm(true);
    }

    const checkTodoList = (key, isChecked) => {
        if (props.isProject) {
            props.checkTodoListProject(props.project.key, key, isChecked);
        }
        else {
            props.checkTodoList(key);
        }
    }

    const openActions = (key) => {
        if (props.isProject) {
            props.showMoreActionsProject(props.project.key, key);
        }
        else {
            props.showMoreActions(key);
        }
    }

    const removeItemSelect = (key) => {
        if (props.isProject) {
            props.removeTaskProject(props.project.key, key);
        }
        else {
            props.removeItem(key);
        }
    }

    return (
        <>
            {
                taskList.map(element => (
                    showTaskCompleted === element.checked ?

                        element.editSelected === false ?
                            <li className="taskCreated" key={element.key.toString()}>
                                <div className="d-flex" onClick={() => checkTodoList(element.key, element.checked)}>

                                    <div className="iconsTask">
                                        {element.checked ? <AiFillCheckCircle className="iconCheck" /> : <AiOutlineCheckCircle className="iconCheck" />}
                                    </div>

                                    <div className="taskInformation">
                                        <span className={(element.checked ? 'taskTextChecked' : '')}>{element.title.length > 100 ? element.title.substring(0, 100) + '...' : element.title}</span>
                                        <span className="taskDescription">{element.description.length > 75 ? element.description.substring(0, 75) + '...' : element.description}</span>
                                    </div>

                                </div>
                                <div className="d-flex p-relative">
                                    {
                                        element.date !== "" ? <div className="date-border"> {moment(element.date).format('DD/MM/YYYY')} </div> : ''
                                    }

                                    {
                                        element.tags.map(tagElement =>
                                            <div key={tagElement.id.toString()} className="tags-border"> {tagElement.tagName}</div>
                                        )
                                    }

                                    <FiMoreVertical className="moreAction" onClick={() => openActions(element.key, element.actionOpen)} />

                                    {
                                        element.actionOpen ?

                                            <div className="popupMoreContainer">
                                                <div className="listItens">
                                                    {
                                                        !element.checked ?
                                                            <button className="item" onClick={() => editItem(element.key)}> <AiOutlineEdit /> Edit</button>
                                                            :
                                                            ''
                                                    }
                                                    <button className="item" onClick={() => removeItemSelect(element.key)}> <AiFillDelete /> Delete</button>
                                                </div>
                                            </div>
                                            :
                                            ''
                                    }
                                </div>
                            </li>
                            :
                            <li className="formOpen" key={element.key.toString()}>
                                <FormTask isEdit={true} isProject={props.isProject} element={element} projectKey={props.project?.key} />
                            </li>
                        :
                        ''
                ))
            }
        </>
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
        },
        showMoreActions(key) {
            const action = moreActions(key);
            dispatch(action);
        },
        editItem(key) {
            const action = formEditTask(key);
            dispatch(action);
        },
        removeItem(key) {
            const action = removeTask(key);
            dispatch(action);
        },
        checkTodoListProject(projectKey, key, isChecked) {
            const action = checkTodoProject(projectKey, key, isChecked);
            dispatch(action);
        },
        showMoreActionsProject(projectKey, key) {
            const action = moreActionsProjectTask(projectKey, key);
            dispatch(action);
        },
        editItemProject(projectKey, key) {
            const action = openformToEditProject(projectKey, key);
            dispatch(action);
        },
        removeTaskProject(projectKey, key) {
            const action = removeTaskProject(projectKey, key);
            dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(TaskList);