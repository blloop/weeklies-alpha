import React, { useState } from 'react';
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

    const [clicked, setClicked] = useState(false);
    
    return (
        <div className='eventlist'>
            <div className='time-scale scale-left mono-hide'>
                {scaleTime(props.format)}
            </div>
            <div className='shade top'
                style={{height: 25 * props.start}}>
            </div>
            <div className='shade bottom'
                style={{position: 'absolute', bottom: 0, height: 25 * (48 - props.end)}}>
            </div>
            <div className='start-line'
                style={{ top: (25 * props.start) + 56}}>
                <hr/>
                <div 
                    className='drag'
                    onMouseDown={() => setClicked(true)}
                    onMouseUp={() => setClicked(false)}
                    onMouseLeave={() => setClicked(false)}
                    onMouseMove={(event) => {
                        let pos = Math.floor((event.pageY - 185) / 25)
                        if (clicked) props.changeStart(pos > 0 ? pos : 0);
                    }}>
                    <div className='box'></div>
                    <div className='arrow'></div>
                </div>
            </div>
            <div className='start-line'
                style={{ top: (25 * props.end) + 56}}>
                <hr/>
                <div 
                    className='drag'
                    onMouseDown={() => setClicked(true)}
                    onMouseUp={() => setClicked(false)}
                    onMouseLeave={() => setClicked(false)}
                    onMouseMove={(event) => {
                        let pos = Math.floor((event.pageY - 185) / 25)
                        if (clicked) props.changeEnd(pos > 0 ? pos : 0);
                    }}>
                    <div className='box'></div>
                    <div className='arrow'></div>
                </div>
            </div>
            <div className='grid-lines'>
                {range(23).map(num => (
                    <hr key={num}></hr>
                ))}
            </div>
            <div className='column utility mono-show'>
                <button
                    onClick={() =>{
                        props.setMono(
                            props.monoDay === 0 ? 6 :
                            props.monoDay - 1
                        )
                    }
                        
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
}

export default EventList;