import React from 'react';
import { dayList } from './Data';

const DayDropdown = props => (
    <>
        <button
            className='drop-box top-button square'
            onClick={props.toggleMenu}>
            {props.day}
        </button>
        {
            props.isOpen && (
                <ul className='dropdown'>
                    {dayList.map((day) =>
                        <div
                            key={day} 
                            onClick={props.toggleMenu}>
                            <button
                                className='drop-box square'
                                onClick={() => props.changeDay(day)}>
                                {day}
                            </button>
                        </div>
                    )}
                </ul>
            )
        }
    </>
);

export default DayDropdown;