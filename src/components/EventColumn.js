import { Component } from "react";
import { dayAbbrevList } from "./Data";

class EventColumn extends Component {

    // Creates hover highlights for column cells
    createSelections = (day) => {
        let outDays = [];
        for (let i = 0; i < 48; i++) {
            outDays.push(
                <div
                    key={i}
                    onClick={() => this.props.openAdder(day, i)}
                    className='selection'
                    style={{ top: 60 + (i * 25) }}>
                </div>);
        }
        return outDays;
    }

    render() {

        let outSelect = this.createSelections(this.props.dayNum);

        return (
            <div className={'column' +
                (this.props.currDay === this.props.dayNum ?
                    '' : ' mono-hide')
            }>
                <p className='subtitle'>{dayAbbrevList[this.props.dayNum]}</p>
                <hr></hr>
                {this.props.eList.map((event) => {
                    return (this.props.formatEvent(event));
                })}
                {outSelect}
            </div>
        );
    }
}

export default EventColumn;