import { range, dayList, dayAbbrevList } from "./Data";

const EventColumn = props => (
    <div className={'column' +
        (props.numDay === props.monoDay ?
            '' : ' mono-hide')
    }>
        <p className='subtitle'>{dayAbbrevList[props.numDay]}</p>
        <hr></hr>
        {props.events.map((event) => {
            return (
                <div
                    style={{
                        top: 60 +
                            (event.start * 25),
                        height:
                            (event.end - event.start) * 25
                    }}
                    className={'event'}
                    onClick={() => props.editUpcoming(event.id)}
                    key={event.id}>
                    <p> {event.title.length > 25 ?
                        event.title.slice(0, 25) + '...' :
                        event.title}
                    </p>
                </div>
            );
        })}
        {range(48).map(num => (
            <div
                key={num}
                onClick={() =>
                    props.addUpcoming(
                        dayList[props.numDay], num
                    )
                }
                className='selection'
                style={{ top: 60 + (num * 25) }}>
            </div >
        ))}
    </div>
);

export default EventColumn;