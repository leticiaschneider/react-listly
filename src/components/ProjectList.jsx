import React from 'react';
import './ProjectList.css';

import { connect } from "react-redux";
import { remove } from '../data/actions/ProjectActions';

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

function ProjectList(props) {

    const projectsList = props.projectsList;

    return (
        <>
            {
                projectsList.map(element =>

                    <div className="project-created" key={element.key.toString()} >

                        <div className="d-flex">
                            <p className="p-title">{element.name.length > 100 ? element.name.substring(0, 100) + '...' : element.name}</p>

                        </div>

                        <p className="p-description">{element.description.length > 200 ? element.description.substring(0, 200) + '...' : element.description}</p>

                        <div className="category-list d-flex">
                            {
                                element.category.map(element =>
                                    <span key={element.id.toString()}> {element.categoryName}</span>
                                )
                            }
                        </div>
                        
                        <p className="p-pertenge">{element.completed}%</p>
                        <div className="progress-bar">
                            <span className="bar">
                                <span className="progress" style={{ width: element.completed + '%' }}></span>
                            </span>
                        </div>

                        <div className="d-flex project-buttons">
                            <button className="btn btn-icon" onClick={() => props.removeProject(element.key)}> <AiFillDelete /></button>
                            <button className="btn btn-icon" onClick={() => props.openCreateProject(true, element)} > <FiEdit /></button>
                            <button className="btn btn-primary" onClick={() => props.openProject(element)}>Open Project</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}


const mapStateToProps = state => ({
    projectsList: state.projects
});

function mapDispatchToProp(dispatch) {
    return {
        removeProject(projectKey) {
            const action = remove(projectKey);
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(ProjectList);