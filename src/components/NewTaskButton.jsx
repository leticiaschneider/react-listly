import React from 'react';

import { GoPlusSmall } from "react-icons/go";

export default function NewTaskButton(props) {

    return (
        <li className="d-flex newTaskAdd" onClick={() => props.openTaskForm(false)}><GoPlusSmall className="addTaskIcon" /> Adicionar task</li>
    );
}
