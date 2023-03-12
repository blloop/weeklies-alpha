import React from 'react';
import EventColumn from './EventColumn';
import { dayList, range } from './Data';

const EventList = props => {
    const scaleTime = (format) => (
        format ?
            <>
                <p>00:00</p><p>01:00</p><p>02:00</p><p>03:00</p>
                <p>04:00</p><p>05:00</p><p>06:00</p><p>07:00</p>
                <p>08:00</p><p>09:00</p><p>10:00</p><p>11:00</p>
                <p>12:00</p><p>13:00</p><p>14:00</p><p>15:00</p>
                <p>16:00</p><p>17:00</p><p>18:00</p><p>19:00</p>
                <p>20:00</p><p>21:00</p><p>22:00</p><p>23:00</p>
            </> :
            <>
                <p>12:00</p><p>01:00</p><p>02:00</p><p>03:00</p>
                <p>04:00</p><p>05:00</p><p>06:00</p><p>07:00</p>
                <p>08:00</p><p>09:00</p><p>10:00</p><p>11:00</p>
                <p>12:00</p><p>01:00</p><p>02:00</p><p>03:00</p>
                <p>04:00</p><p>05:00</p><p>06:00</p><p>07:00</p>
                <p>08:00</p><p>09:00</p><p>10:00</p><p>11:00</p>
            </>
    );
    
    return (
        <div className='eventlist'>
            <div className='time-scale scale-left mono-hide'>
                {scaleTime(props.format)}
            </div>
            <div className='grid-lines'>
                {range(23).map(num => (
                    <hr key={num}></hr>
                ))}
            </div>
            <div className='column utility mono-show'>
                <button
                    onClick={() =>
                        props.setMono((props.monoDay - 1) % 7)
                    }
                    className='switch move-left'>
                    &lt;
                </button> {/* < */}
                <button
                    onClick={() =>
                        props.setMono((props.monoDay + 1) % 7)
                    }
                    className='switch move-right'>
                    &gt;
                </button> {/* > */}
                <div className='time-scale scale-left'>
                    {scaleTime(props.format)}
                </div>
            </div>
            {range(7).map((num) =>
                <EventColumn
                    key={num}
                    addUpcoming={props.addUpcoming}
                    editUpcoming={props.editUpcoming}
                    monoDay={props.monoDay}
                    numDay={num}
                    events={props.allEvents.filter(
                        event => event.day === dayList[num]
                    )}
                />
            )}
            <div className='time-scale scale-right mono-hide'>
                {scaleTime(props.format)}
            </div>
        </div>
    );
};

export default EventList;