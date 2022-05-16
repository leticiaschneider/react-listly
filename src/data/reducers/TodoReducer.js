import * as TodoConstants from '../actions/TodoActions';
import moment from 'moment';

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.key, maxId), -1);
    return maxId + 1;
}

const TodoReducer = (todoList = [], action) => {
    switch (action.type) {
        case TodoConstants.TODO_LIST:
            return action.todoList;

        case TodoConstants.TODO_CREATE:
            return [
                ...todoList,
                {
                    key: nextTodoId(todoList),
                    title: action.newItem.title,
                    description: action.newItem.description,
                    date: action.newItem.date,
                    time: action.newItem.time,
                    tags: action.newItem.tags,
                    dateTaskCompleted: null,
                    dateTaskCreated: moment(),
                    actionOpen: false,
                    editSelected: false,
                    checked: false,
                },
            ]

        case TodoConstants.TODO_REMOVE:
            const itemIndex = todoList.findIndex(item => item.key === action.key);
            return [...todoList.slice(0, itemIndex), ...todoList.slice(itemIndex + 1)];

        case TodoConstants.TODO_UPDATE:
            return todoList.map(item => {
                if (item.key === action.item.key) {
                    return {
                        ...action.item,
                        key: item.key,
                        dateTaskCompleted: item.dateTaskCompleted,
                        dateTaskCreated: item.dateTaskCreated,
                        actionOpen: false,
                        editSelected: false,
                        checked: false,
                    };
                }
                return item;
            })

        case TodoConstants.TODO_CHECK:
            return todoList.map((item) => (
                item.key === action.key ?
                    {
                        ...item,
                        checked: !item.checked,
                        actionOpen: false,
                        dateTaskCompleted: !item.checked ? moment() : ''
                    }
                    :
                    {
                        ...item,
                        actionOpen: false
                    }
            ))

        case TodoConstants.TODO_SHOW_POPUP:
            return todoList.map((item) => (
                item.key === action.key ? { ...item, actionOpen: !item.actionOpen } : { ...item, actionOpen: false }
            ))

        case TodoConstants.TODO_FORM_EDIT:
            return todoList.map((item) => (
                item.key === action.key ? { ...item, editSelected: !item.editSelected, actionOpen: false } : { ...item, editSelected: false, actionOpen: false }
            ))


        default: return todoList;
    }
}

export default TodoReducer;