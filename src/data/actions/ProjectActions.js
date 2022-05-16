
export const PROJECT_LIST = 'PROJECT_LIST';
export const PROJECT_CREATE = 'PROJECT_CREATE';
export const PROJECT_UPDATE = 'PROJECT_UPDATE';
export const PROJECT_REMOVE = 'PROJECT_REMOVE';
export const PROJECT_CHECK = 'PROJECT_CHECK';
export const PROJECT_ACTIONS_POPUP = 'PROJECT_ACTIONS_POPUP';
export const PROJECT_OPEN_FORM_EDIT = 'PROJECT_OPEN_FORM_EDIT';
export const PROJECT_CREATE_TASK = 'PROJECT_CREATE_TASK';
export const PROJECT_TASK_REMOVE = 'PROJECT_TASK_REMOVE';
export const PROJECT_UPDATE_TASK = 'PROJECT_UPDATE_TASK'
export const PROJECT_ACTIONS_POPUP_TASK = 'PROJECT_ACTIONS_POPUP_TASK';

export const list = () => {
    return {
        type: PROJECT_LIST,
    }
}

export const create = (newItem) => {
    return {
        type: PROJECT_CREATE,
        newItem
    }
}

export const update = (keyProject, item) => {
    return {
        type: PROJECT_UPDATE,
        keyProject,
        item
    }
}

export const remove = (key) => {
    return {
        type: PROJECT_REMOVE,
        key
    }
}

export const createTaskProject = (keyProject, task) => {
    return {
        type: PROJECT_CREATE_TASK,
        keyProject,
        task
    }
}

export const checkTodoProject = (keyProject, keyTask, currentIsChecked) => {
    return {
        type: PROJECT_CHECK,
        keyProject,
        keyTask,
        currentIsChecked
    }
}

export const moreActionsProjectTask = (keyProject, keyTask) => {
    return {
        type: PROJECT_ACTIONS_POPUP_TASK,
        keyProject,
        keyTask
    }
}

export const openformToEditProject = (keyProject, keyTask) => {
    return {
        type: PROJECT_OPEN_FORM_EDIT,
        keyProject,
        keyTask
    }
}

export const removeTaskProject = (keyProject, key) => {
    return {
        type: PROJECT_TASK_REMOVE,
        keyProject,
        key
    }
}


export const updateTaskProject = (keyProject, item) => {
    return {
        type: PROJECT_UPDATE_TASK,
        keyProject,
        item
    }
}
