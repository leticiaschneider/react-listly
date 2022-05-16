import React, { useState } from 'react';
import './TaskList.css'

// Icons ---
import { IoChevronBackSharp } from "react-icons/io5";
import { GoPlusSmall } from "react-icons/go";

import FormTask from './FormTask';
import TaskList from './TaskList';

function ProjectView(props) {

    const projectItem = props.project;

    const [showAddTaskContainer, setShowAddTaskContainer] = useState(false);

    const openTaskForm = (value) => {
        setShowAddTaskContainer(!value);
    }

    return (
        <>
            <div className="d-flex d-flex-justify-between">
                <h2> <IoChevronBackSharp className="icon back" onClick={() => props.closeProject([])} /> {projectItem.name}</h2>
            </div>

            <div className="scroll" >
                <TaskList showTaskCompleted={false} openTaskForm={openTaskForm} isProject={true} project={projectItem} />

                {
                    !showAddTaskContainer ?
                        <li className="d-flex newTaskAdd" onClick={() => openTaskForm(showAddTaskContainer)}> <GoPlusSmall className="addTaskIcon" /> Adicionar task</li>
                        :
                        <FormTask isProject={true} isEdit={false} openTaskForm={openTaskForm} project={projectItem} />
                }

                <TaskList showTaskCompleted={true} isProject={true} project={projectItem} />
            </div>
        </>
    );
}


export default ProjectView;