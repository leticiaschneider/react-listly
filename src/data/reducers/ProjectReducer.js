import * as ProjectConstants from '../actions/ProjectActions';
import moment from 'moment';

function nextTodoId(projects) {
    const maxId = projects.reduce((maxId, project) => Math.max(project.key, maxId), -1);
    return maxId + 1;
}

function calculatePercentege(taskItem, currentIsChecked) {
    let totalTasks = taskItem.todos.length;

    let totalChecked = taskItem.todos.filter((value) => value.checked === true).length;
    totalChecked = currentIsChecked ? totalChecked + 1 : totalChecked - 1;

    return (100 * totalChecked) / totalTasks;
}

const TodoReducer = (projectList = [], action) => {
    switch (action.type) {
        case ProjectConstants.PROJECT_LIST:
            return action.projectList;

        case ProjectConstants.PROJECT_CREATE:
            return [
                ...projectList,
                {
                    key: nextTodoId(projectList),
                    name: action.newItem.name,
                    description: action.newItem.description,
                    date: moment(),
                    category: action.newItem.category,
                    todos: [],
                    projectSelected: false,
                    actionOpen: false,
                    editSelected: false,
                    completed: 0
                },
            ]

        case ProjectConstants.PROJECT_REMOVE:
            const itemIndex = projectList.findIndex(item => item.key === action.key);
            return [...projectList.slice(0, itemIndex), ...projectList.slice(itemIndex + 1)];

        case ProjectConstants.PROJECT_UPDATE:
            return projectList.map(item => {
                if (item.key === action.keyProject) {
                    return {
                        ...item,
                        name: action.item.name,
                        description: action.item.description,
                        category: action.item.category,
                        actionOpen: false,
                        editSelected: false,
                        checked: false,
                    };
                }
                return item;
            })

        case ProjectConstants.PROJECT_CREATE_TASK:
            return projectList.map(item => {
                if (item.key === action.keyProject) {
                    return {
                        ...item,
                        todos:
                            [
                                ...item.todos,
                                {
                                    key: nextTodoId(item.todos),
                                    title: action.task.title,
                                    description: action.task.description,
                                    date: action.task.date,
                                    time: action.task.time,
                                    tags: action.task.tags,
                                    actionOpen: false,
                                    editSelected: false,
                                    checked: false,
                                }
                            ]
                    };
                }
                return item;
            })

        case ProjectConstants.PROJECT_CHECK:
            return projectList.map(item => {
                if (item.key === action.keyProject) {
                    return {
                        ...item,
                        todos: item.todos.map(item => item.key === action.keyTask ?
                            { ...item, checked: !item.checked, actionOpen: false, editSelected: false }
                            : { ...item, actionOpen: false, editSelected: false }),
                        completed: calculatePercentege(item, !action.currentIsChecked)
                    };
                }
                return item;
            })


        case ProjectConstants.PROJECT_ACTIONS_POPUP_TASK:
            return projectList.map(item => {
                if (item.key === action.keyProject) {
                    return {
                        ...item,
                        todos: item.todos.map(item => item.key === action.keyTask ? { ...item, actionOpen: !item.actionOpen } : { ...item, actionOpen: false })
                    };
                }
                return item;
            })

        case ProjectConstants.PROJECT_OPEN_FORM_EDIT:
            return projectList.map(item => {
                if (item.key === action.keyProject) {
                    return {
                        ...item,
                        todos: item.todos.map(item => item.key === action.keyTask ? { ...item, editSelected: !item.editSelected, actionOpen: false } : { ...item, editSelected: false, actionOpen: false })
                    };
                }
                return item;
            })

        case ProjectConstants.PROJECT_TASK_REMOVE:
            return projectList.map(item => {
                if (item.key === action.keyProject) {
                    const itemIndex = item.todos.findIndex(item => item.key === action.key);
                    return {
                        ...item,
                        todos: [...item.todos.slice(0, itemIndex), ...item.todos.slice(itemIndex + 1)]
                    };
                }
                return item;
            })

        case ProjectConstants.PROJECT_UPDATE_TASK:
            return projectList.map(item => {
                if (item.key === action.keyProject) {

                    return {
                        ...item,
                        todos: item.todos.map(itemTask => {
                            if (itemTask.key === action.item.key) {
                                return {
                                    ...action.item,
                                    actionOpen: false,
                                    editSelected: false,
                                    checked: false,
                                };
                            }
                            return itemTask;
                        })
                    }

                }
                return item;
            })

        default: return projectList;
    }
}

export default TodoReducer;