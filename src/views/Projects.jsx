import React, { useState, useRef } from 'react';
import './Projects.css'

import ProjectView from '../components/ProjectView';
import CreateProject from '../components/CreateProject';
import ProjectList from '../components/ProjectList';

import { BsPlusCircle } from "react-icons/bs";

function Projects() {

  const myRef = useRef(null)

  const [openedProject, setOpenedProject] = useState(false);
  const [elementSelected, setElementSelected] = useState([]);
  const [openedCreteProject, setCreteProject] = useState(false);
  const [elementEdit, setElementEdit] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const openProject = (element) => {
    setOpenedProject(!openedProject);
    setElementSelected(element);
  }

  const openCreateProject = (value, element) => {
    setCreteProject(value);
    setIsEdit(false);

    if (element) {
      myRef.current.scrollIntoView({ behavior: 'smooth' })
      setIsEdit(true);
      setElementEdit(element);
    }
    else {
      setElementEdit(null);
    }
  }

  return (
    <div className="p-25" style={{ height: '75vh' }} ref={myRef}>

      {
        !openedProject ?
          <>
            <div className="d-flex">
              <h2>Projects</h2>
            </div>

            {
              openedCreteProject ?
                <CreateProject openCreateProject={openCreateProject} isEdit={isEdit} projectElement={elementEdit} />
                :
                ''
            }

            {
              !openedCreteProject ?
                <button className="projects new-project" onClick={() => openCreateProject(!openedCreteProject)}>
                  <BsPlusCircle className="icon-create-project" /> Create new project
                </button>
                :
                ''
            }

            <div className="d-grid list-projects">
              <ProjectList openProject={openProject} openCreateProject={openCreateProject} />
            </div>

          </>
          :
          <ProjectView project={elementSelected} closeProject={openProject} />
      }
    </div>
  );
}


export default Projects;
