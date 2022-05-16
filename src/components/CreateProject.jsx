import React, { useState, useEffect } from 'react';
import "./CreateProject.css";

import { create, update } from '../data/actions/ProjectActions';
import { connect } from "react-redux";

import { IoCloseCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

import TextareaAutosize from 'react-textarea-autosize';

function CreateProject(props) {

    const [categoryList, setcategoryList] = useState({
        categoryName: ''
    });

    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        category: []
    });

    const handleChange = (e) => {
        if (e.target.name === 'description' && e.target.value.length > 350) return
        if (e.target.name === 'name' && e.target.value.length > 105) return

        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    }

    const handleChangeCategory = (e) => {
        setcategoryList({ ...categoryList, categoryName: e.target.value });
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && e.target.name === 'category') {
            addCategory(e);
        } else if (e.key === 'Enter') {
            if (!props.isEdit) {
                saveProject(e, newProject);
            }
            else {
                updateProject(newProject)
            }

        } else if (e.key === 'Escape') {
            props.openCreateProject(false)
        }
    }

    const addCategory = (e) => {
        let key = Math.random();

        let newCategorys = newProject;
        newCategorys.category.push({ id: key, categoryName: categoryList.categoryName });

        setcategoryList({ ...categoryList, categoryName: '' });
        setNewProject({ ...newCategorys });

        e.preventDefault();
    }

    const removeCategory = (id) => {
        const index = newProject.category.findIndex(elem => elem.id === id);
        let list = newProject;
        list.category.splice(index, 1);
        setNewProject({ ...newProject, tags: list.category });
    }

    const saveProject = (e, newProject) => {
        props.saveNewProject(newProject);
        props.openCreateProject(false);
        e.preventDefault();
    }

    const updateProject = (newProject) => {
        props.updateNewProject(props.projectElement.key, newProject);
        props.openCreateProject(false);
    }

    useEffect(() => {
        if (props.projectElement !== null) {
            setNewProject({
                key: props.projectElement.key,
                name: props.projectElement.name,
                description: props.projectElement.description,
                category: props.projectElement.category
            });
        }
    }, [props.projectElement])


    return (
        <div className="containerAddTasks space-around">

            <div className="d-flex space">
                <h3>Create new project</h3>
            </div>

            <div className="space">
                <div>
                    <p className="label">Name:</p>
                    <input className="input" type="text" name="name" placeholder="White a task" value={newProject.name} onChange={handleChange} onKeyDown={handleKey} />
                </div>

                <div className="mb-35">
                    <p className="label">Description:</p>
                    <TextareaAutosize className="input" value={newProject.description} name="description" placeholder="Description" onChange={handleChange} onKeyDown={handleKey} />
                    <span className="limit">Total description character: {newProject.description.length}/350</span>
                </div>

                <div className="d-flex d-flex-justify-between mt-15">
                    <div className="d-flex">
                        {
                            newProject.category.length > 0 ?
                                newProject.category.map(element =>
                                    <div key={element.id.toString()} className="tags-border"> {element.categoryName} <IoCloseCircleSharp className="clearDateIcon" onClick={() => removeCategory(element.id)} /> </div>
                                )
                                :
                                ''
                        }

                        {
                            newProject.category.length <= 2 ?
                                <>
                                    <input className="input-tag" type="text" value={categoryList.categoryName} name="category" placeholder="Press enter to add new category" onChange={handleChangeCategory} onKeyDown={handleKey} />
                                    <button className="btn btn-primary mr-5 icon plus" onClick={addCategory}>
                                        <span> <AiOutlinePlus /> </span>
                                    </button>
                                </>
                                :
                                <span>Limit 3/3</span>
                        }
                    </div>
                    <div>
                        <button className="btn btn-cancel" onClick={() => props.openCreateProject(false)}>Cancel</button>

                        {
                            !props.isEdit ?
                                <button className="btn btn-primary" onClick={(e) => saveProject(e, newProject)}>
                                    <span>Add</span>
                                </button>
                                :
                                <button className="btn btn-primary" onClick={() => updateProject(newProject)}>
                                    <span>Save</span>
                                </button>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}


function mapDispatchToProp(dispatch) {
    return {
        saveNewProject(newItem) {
            const action = create(newItem);
            dispatch(action);
        },
        updateNewProject(keyProject, newItem) {
            const action = update(keyProject, newItem);
            dispatch(action);
        },
    };
};


export default connect(null, mapDispatchToProp)(CreateProject);