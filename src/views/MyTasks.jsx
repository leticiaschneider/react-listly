import React, { useState } from 'react';
import './MyTasks.css'

import FormTask from '../components/FormTask';
import TaskList from '../components/TaskList';
import WeekCalendar from '../components/WeekCalendar';
import NewTaskButton from '../components/NewTaskButton';

import { formEditTask } from '../data/actions/TodoActions';
import { connect } from "react-redux";

function MyTasks(props) {

    const [showAddTaskContainer, setShowAddTaskContainer] = useState(false);

    const openTaskForm = (value) => {
        setShowAddTaskContainer(!value);

        if (!value) {
            props.editItem(-1);
        }
    }

    return (
        <div className="container">
            <div className="tasks">
                <h2>My Tasks</h2>

                <div className="scroll" >
                    <TaskList showTaskCompleted={false} openTaskForm={openTaskForm} />

                    {
                        !showAddTaskContainer ?
                            <NewTaskButton openTaskForm={openTaskForm} />
                            :
                            <FormTask isEdit={false} openTaskForm={openTaskForm} />
                    }

                    <TaskList showTaskCompleted={true} />
                </div>
            </div>

            <div className="calendar">
                <WeekCalendar />
            </div>

        </div>
    );
}

function mapDispatchToProp(dispatch) {
    return {
        editItem(key) {
            const action = formEditTask(key);
            dispatch(action);
        },
    };
};

export default connect(null, mapDispatchToProp)(MyTasks);