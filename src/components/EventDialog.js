import React, { useState } from 'react';
import TimeRow from './TimeRow';
import ConfirmDialog from './ConfirmDialog';
import { tagList, dayList } from './Data';

const EventDialog = props => {
    const [menu, setMenu] = useState('');
    const [confirm, setConfirm] = useState(false);
    const toggleMenu = (name) => {
        setMenu(menu === name ? '' : name);
    }
    const confirmDel = () => {
        setConfirm(false);
        props.deleteEvent();
    }

    return ( <>
        {props.isOpen && <>
            <div
                className='modal-bg'
                style={{ zIndex: 12 }}
                onClick={() => props.setDialog('')}/>
            <div className='addevents overlay'>
                <p className='header'>
                    {props.type === 'add' ?
                        'Add Event' :
                        'Edit Event'
                    }
                </p>
                <button
                    // TODO: Close all menus when dialog closes
                    onClick={() => props.setDialog('')}
                    className='close-button'>
                    &#10005;
                </button>
                <div className='text-container'>
                    <p> Name of Event: </p>
                    <input onChange={(event) => 
                        props.setUpcoming({
                            ...props.tempEvent,
                            title: event.target.value
                        })}
                        value={props.tempEvent.title}>
                    </input>
                </div>
                <div className='row-items'>
                    <button
                        className='drop-box top-button square'
                        onClick={() => toggleMenu('day')}>
                        {props.tempEvent.day}
                    </button>
                    {menu === 'day' && (
                        <ul className='dropdown scroll'> 
                            {dayList.map((day) =>
                                <button
                                    hidden={day === 
                                        props.tempEvent.day
                                    }
                                    key={day}
                                    className='drop-box square'
                                    onClick={() => {
                                        toggleMenu('day');
                                        props.setUpcoming({
                                            ...props.tempEvent,
                                            day: day
                                        });
                                    }}>
                                {day}
                                </button>
                            )}
                        </ul>
                    )}
                    <TimeRow
                        field={'start'}
                        menu={menu}
                        hour={
                            props.tempEvent.start -
                            (props.tempEvent.start % 2)
                        }
                        setMenu={setMenu}
                        setUpcoming={props.setUpcoming}
                        tempEvent={props.tempEvent}
                        format={props.format}
                    />
                </div>
                <div className='row-items'>
                    <button
                        className={
                            `drop-box top-button square tag-${
                                props.tempEvent.tag
                            }`
                        }
                        onClick={() => toggleMenu('tag')}>
                        {tagList[props.tempEvent.tag]}
                    </button>
                    {menu === 'tag' && (
                        <ul className='dropdown scroll'> 
                            {tagList.map((tag, i) =>
                                <button
                                    hidden={i === 
                                        props.tempEvent.tag
                                    }
                                    key={i}
                                    className={
                                        `drop-box square tag-${i}`
                                    }
                                    onClick={() => {
                                        toggleMenu('tag');
                                        props.setUpcoming({
                                            ...props.tempEvent,
                                            tag: i
                                        });
                                    }}>
                                {tagList[i]}
                                </button>
                            )}
                        </ul>
                    )}
                    <TimeRow
                        field={'end'}
                        menu={menu}
                        hour={
                            props.tempEvent.end -
                            (props.tempEvent.end % 2)
                        }
                        setMenu={setMenu}
                        setUpcoming={props.setUpcoming}
                        tempEvent={props.tempEvent}
                        format={props.format}
                    />
                </div>
                { props.type === 'add' ?
                    <button
                        className='contrast-light thin-button'
                        onClick={props.addEvent}>
                        Add Event
                    </button> :
                    <>
                        <button
                            className='contrast-light thin-button'
                            onClick={props.editEvent}>
                            Edit Event
                        </button>
                        <button
                            className='contrast thin-button'
                            onClick={() => setConfirm(true)}>
                            Delete Event
                        </button>
                    </>
                }
            </div>
            <ConfirmDialog
                allEvents={false}
                isOpen={confirm}
                close={() => setConfirm(false)}
                clickEvent={confirmDel}/>
        </>}
    </>
    );
}

export default EventDialog;