import React, { useState, useEffect, useCallback  } from 'react';

import './WeekCalendar.css';
import moment from 'moment';

// Icons ---
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

import { checkTask } from '../data/actions/TodoActions';
import { connect } from "react-redux";

function WeekCalendar(props) {

    const [calendar, setCalendar] = useState([
        { weekDay: 0, day: '', date: '', selected: false },
        { weekDay: 1, day: '', date: '', selected: false },
        { weekDay: 2, day: '', date: '', selected: false },
        { weekDay: 3, day: '', date: '', selected: false },
        { weekDay: 4, day: '', date: '', selected: false },
        { weekDay: 5, day: '', date: '', selected: false },
        { weekDay: 6, day: '', date: '', selected: false }
    ]);

    const [currentDate, setCurrentDate] = useState(moment());

    const [taskOfweek, setTaskOfweek] = useState([]);

    const weekForward = () => {
        setCurrentDate(moment(calendar[6].date).add(7, 'days'));
    }

    const weekBack = () => {
        setCurrentDate(moment(calendar[0].date).add(-7, 'days'));
    }

    const showToday = () => {
        setCurrentDate(moment());
    }

    const showCalendar = useCallback(() => {
        var weekStart = currentDate.clone().startOf('week');

        var days = [];
        var taskOfweek = [];

        for (let index = 0; index <= 6; index++) {

            days.push(
                {
                    weekDay: index,
                    day: moment(weekStart).add(index, 'days').format("D"),
                    date: moment(weekStart).add(index, 'days'),
                    selected: moment().format('MMMM D, YYYY') === moment(weekStart).add(index, 'days').format('MMMM D, YYYY') ? true : false
                }
            );

            if (props.todoList.length > 0) {
                taskOfweek.push({
                    weekDay: index,
                    date: moment(weekStart).add(index, 'days'),
                    tasks: props.todoList.filter(itemTask => moment(itemTask.date).format('MMMM Do YYYY') === moment(weekStart).add(index, 'days').format('MMMM Do YYYY'))
                });
            }
        };

        setTaskOfweek(taskOfweek);
        setCalendar(days);
    }, [currentDate, props.todoList]);

    useEffect(() => {
        showCalendar();
    }, [showCalendar]);

    return (
        <>
            <div className="mainInfoDate">

                <p> {moment().format('MMMM Do, YYYY')}</p>

                <button className="btn btn-primary" onClick={showToday}>
                    <span> TODAY</span>
                </button>

            </div>

            <div className="week">

                <div className="days">
                    <div><FaArrowCircleLeft className="icon-arrow" onClick={weekBack} /></div>
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div><FaArrowCircleRight className="icon-arrow" onClick={weekForward} /></div>
                </div>

                <div className="days" style={{ marginTop: 10 }}>
                    <div></div>
                    {
                        calendar.map(element =>
                            <div key={element.weekDay.toString()} className={element.selected ? 'selectedDay' : ''}>{element.day}</div>
                        )
                    }
                    <div></div>
                </div>
            </div>

            <div>
                {
                    taskOfweek.map(element =>

                        element.tasks.length > 0 ?
                            <>
                                <p className="dateList">{moment(element.date).format('Do - MMMM YYYY')}</p>
                                {
                                    element.tasks.map(task =>
                                        <div className="divisoria" key={task.key.toString()} onClick={() => props.checkTodoList(task.key, task.checked)}>
                                            {task.checked ? <AiFillCheckCircle className="iconCheck" /> : <AiOutlineCheckCircle className="iconCheck" />}
                                            <span className={(task.checked ? 'taskTextChecked' : '')}> {task.title}</span>
                                            <span> {task.time}</span>
                                        </div>
                                    )
                                }
                            </>
                            :
                            ''

                    )
                }
            </div>
        </>
    );
}


const mapStateToProps = state => ({
    todoList: state.todos
});

function mapDispatchToProp(dispatch) {
    return {
        checkTodoList(key) {
            const action = checkTask(key);
            dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(WeekCalendar);