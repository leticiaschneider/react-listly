import React, { useState, useEffect } from 'react';
import './FormTask.css';

import TextareaAutosize from 'react-textarea-autosize';
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

import { createTask, updateTask, formEditTask } from '../data/actions/TodoActions';
import { createTaskProject, updateTaskProject, openformToEditProject } from '../data/actions/ProjectActions';
import { connect } from "react-redux";

function FormTask(props) {

    const [tagsList, setTagsList] = useState({
        tagName: ''
    });

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        tags: []
    });

    const saveNewTask = (e) => {
        if (newTask.date !== '') {
            setNewTask({ ...newTask, time: '' });
        }

        if (props.isProject) {
            props.createTaskProject(props.project.key, newTask);
        }
        else {
            props.createTask(newTask);
        }

        props.openTaskForm(true);
        e.preventDefault();
    }

    const handleChange = (e) => {
        if (e.target.name === 'description' && e.target.value.length > 350) return
        if (e.target.name === 'title' && e.target.value.length > 105) return

        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    }

    const handleChangeTags = (e) => {
        setTagsList({ ...tagsList, tagName: e.target.value });
    }

    const clearDate = (value) => {
        setNewTask({ ...newTask, [value]: '' });
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && e.target.name === 'tags') {
            addTag(e);
        }
        else if (e.key === 'Enter') {

            if (!props.isEdit) {
                saveNewTask(e);
            }
            else {
                updateTask(newTask);
            }

            setNewTask({ ...newTask, title: '', description: '', date: '', time: '', tags: [] });

        } else if (e.key === 'Escape') {
            closeForm();
        }
    }

    const addTag = (e) => {
        let key = Math.random();

        let newTasks = newTask;
        newTasks.tags.push({ id: key, tagName: tagsList.tagName });

        setTagsList({ ...tagsList, tagName: '' });
        setNewTask({ ...newTask });

        e.preventDefault();
    }

    const removeTag = (id) => {
        const index = newTask.tags.findIndex(elem => elem.id === id);
        let list = newTask;
        list.tags.splice(index, 1);
        setNewTask({ ...newTask, tags: list.tags });
    }

    const closeForm = () => {
        if (props.isEdit) {
            if (props.isProject) {
                props.editItemProject(props.projectKey, props.element.key);
            }
            else {
                props.editItemTask(props.element.key);
            }
        }
        else {
            props.openTaskForm(true);
        }
    }

    const updateTask = (tasks) => {
        if (props.isProject) {
            props.updateTaskProject(props.projectKey, tasks);
        }
        else {
            props.updateNewTask(tasks);
        }
    }

    useEffect(() => {
        if (props.element !== undefined) {
            setNewTask({
                key: props.element.key,
                title: props.element.title,
                description: props.element.description,
                date: props.element.date,
                time: props.element.time,
                tags: props.element.tags
            });
        }
    }, [props.element]);

    return (
        <>
            <div className="containerAddTasks">
                <input className="title-newTask" type="text" value={newTask.title} name="title" placeholder="Task name" onChange={handleChange} onKeyDown={handleKey} />
                <TextareaAutosize className="description-newTask" value={newTask.description} name="description" placeholder="Description" onChange={handleChange} onKeyDown={handleKey} />
                <span className="limit">Total description character: {newTask.description.length}/350</span>

                <div className="d-flex mt-15">
                    {
                        newTask.tags.length > 0 ?
                            newTask.tags.map(element =>
                                <div key={element.id.toString()} className="tags-border"> {element.tagName} <IoCloseCircleSharp className="clearDateIcon" onClick={() => removeTag(element.id)} /> </div>
                            )
                            :
                            ''
                    }

                    {
                        newTask.tags.length <= 2 ?
                            <>
                                <input className="input-tag" type="text" value={tagsList.tagName} name="tags" placeholder="Press enter to add new tag" onChange={handleChangeTags} onKeyDown={handleKey} />
                                <button className="btn btn-primary mr-5 icon plus" onClick={addTag}>
                                    <span> <AiOutlinePlus/> </span>
                                </button>
                            </>
                            : <span>Limit 3/3</span>
                    }
                </div>
            </div>


            <div className="d-flex">
                <input className="input-date" type="date" name="date" placeholder="Schedule" id="date-local" value={newTask.date} onChange={handleChange} onKeyDown={handleKey} />
                {newTask.date !== '' ?

                    <div className="tooltip"><IoCloseCircleSharp className="clearDateIcon" onClick={() => clearDate('date')} />
                        <span className="tooltiptext">clear date</span>
                    </div>
                    : ''}

                {newTask.date !== '' ?
                    <>
                        <input className="input-date" type="time" name="time" placeholder="Schedule" id="time-local" value={newTask.time} onChange={handleChange} onKeyDown={handleKey} />
                        {newTask.time !== '' ?
                            <div className="tooltip"><IoCloseCircleSharp className="clearDateIcon" onClick={() => clearDate('time')} />
                                <span className="tooltiptext">clear time</span>
                            </div>
                            : ''}
                    </>
                    :
                    ''
                }
            </div>

            <div className="d-flex mt-10 mb-15">
                {
                    !props.isEdit ?
                        <button className="btn btn-primary mr-5" onClick={saveNewTask}>
                            <span>Add task</span>
                        </button>
                        :
                        <button className="btn btn-primary mr-5" onClick={() => updateTask(newTask)}>
                            <span>Save</span>
                        </button>
                }

                <button className="btn btn-cancel" onClick={closeForm}>
                    <span>Cancel</span>
                </button>
            </div>
        </>
    );
}


function mapDispatchToProp(dispatch) {
    return {
        createTask(newTask) {
            const action = createTask(newTask);
            dispatch(action);
        },
        editItemTask(key) {
            const action = formEditTask(key);
            dispatch(action);
        },
        updateNewTask(item) {
            const action = updateTask(item);
            dispatch(action);
        },
        createTaskProject(projectKey, tasks) {
            const action = createTaskProject(projectKey, tasks);
            dispatch(action);
        },
        updateTaskProject(projectKey, item) {
            const action = updateTaskProject(projectKey, item);
            dispatch(action);
        },
        editItemProject(projectKey, keyTask) {
            const action = openformToEditProject(projectKey, keyTask);
            dispatch(action);
        },
    };
}

export default connect(null, mapDispatchToProp)(FormTask);