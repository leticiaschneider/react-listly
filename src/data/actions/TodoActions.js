
export const TODO_LIST = 'TODO_LIST';
export const TODO_CREATE = 'TODO_CREATE';
export const TODO_UPDATE = 'TODO_UPDATE';
export const TODO_REMOVE = 'TODO_REMOVE';
export const TODO_CHECK = 'TODO_CHECK';
export const TODO_SHOW_POPUP = 'TODO_SHOW_POPUP';
export const TODO_FORM_EDIT = 'TODO_FORM_EDIT';

export const list = () => {
    return {
        type: TODO_LIST,
    }
}

export const createTask = (newItem) => {
    return {
        type: TODO_CREATE,
        newItem
    }
}

export const updateTask = (item) => {
    return {
        type: TODO_UPDATE,
        item
    }
}

export const removeTask = (key) => {
    return {
        type: TODO_REMOVE,
        key
    }
}

export const checkTask = (key) => {
    return {
        type: TODO_CHECK,
        key
    }
}

export const moreActions = (key) => {
    return {
        type: TODO_SHOW_POPUP,
        key
    }
}

export const formEditTask = (key) => {
    return {
        type: TODO_FORM_EDIT,
        key
    }
}