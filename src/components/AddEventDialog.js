import React from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import Modal from './Modal';
import WarningDialog from './WarningDialog';
import ToggleAM from './ToggleAM';

{/* <AddEventDialog
    addEvent={this.addEvent}
    tempEvent={this.state.upcoming}
    isOpen={this.state.openDialog === 'add'}
    setDialog={this.setDialog}
    useMilitary={this.state.useMilitary}>
</AddEventDialog> */}

const AddEventDialog = props => (
    <>
        {props.isOpen &&
            <div className='addevents overlay rounded'>
                <Modal
                    setDialog={props.setDialog}>
                </Modal>
                <p className='header rounded'> Add Event </p>
                <button
                    onClick={() => props.setDialog(null)}
                    className='close-button'>
                    &#10005;
                </button>
                <div className='text-container'>
                    <p> Name of Event: </p>
                    <input
                        onChange={(event) => props.editUpcoming({
                            ...props.tempEvent,
                            title: event.target.value
                        })}
                        value={props.tempEvent.title}>
                    </input>
                </div>
                <div className='row-items'>
                    <DayDropdown
                        changeDay={(day) => props.editUpcoming({
                            ...props.tempEvent,
                            day: day
                        })}
                        dayValue={props.tempEvent.day}>
                    </DayDropdown>
                    <div className='time-items'>
                        <HourDropdown
                            changeHour={this.changeHour}
                            isAM={this.props.newEvent.newHour < 12}
                            newHour={this.props.newEvent.newHour}
                            useMilitary={this.props.useMilitary}>
                        </HourDropdown>
                        <MinDropdown
                            isZero={this.props.newEvent.isZero}
                            changeMin={this.changeMin}>
                        </MinDropdown>
                        <ToggleAM
                            changeAM={this.changeAM}
                            isAM={this.props.newEvent.newHour < 12}
                            useMilitary={this.props.useMilitary}>
                        </ToggleAM>
                    </div>
                </div>
                <div className='time-items'>
                    <HourDropdown
                        changeHour={this.changeHour2}
                        isAM={this.props.newEvent.newHour2 < 12}
                        newHour={this.props.newEvent.newHour2}
                        useMilitary={this.props.useMilitary}>
                    </HourDropdown>
                    <MinDropdown
                        isZero={this.props.newEvent.isZero2}
                        changeMin={this.changeMin2}>
                    </MinDropdown>
                    <ToggleAM
                        changeAM={this.changeAM2}
                        isAM={this.props.newEvent.newHour2 < 12}
                        useMilitary={this.props.useMilitary}>
                    </ToggleAM>
                </div>
                <button
                    className='contrast-light thin-button'
                    onClick={this.addByName}>
                    Add Event
                </button>
            </div>
        }
    </>
);

export default AddEventDialog;

// class AddEventDialog extends Component {

//     // Add an event to dialog
//     // Sends request to top level component
//     addToList = () => {
//         let eventID =
//             (dayList.indexOf(this.props.newEvent.dayOfWeek) * 48) +
//             this.props.newEvent.newHour * 2 +
//             (this.props.newEvent.isZero ? 0 : 1);
//         let newEvent = {
//             id: eventID,
//             title: this.props.newEvent.inputText,
//             day: this.props.newEvent.dayOfWeek,
//             hour: this.props.newEvent.newHour,
//             min: (this.props.newEvent.isZero ? 0 : 30),
//             hour2: (
//                 (this.props.newEvent.newHour2 === 0
//                     && this.props.newEvent.newHour > this.props.newEvent.newHour2
//                     && this.props.newEvent.isZero2) ?
//                     24 :
//                     this.props.newEvent.newHour2
//             ),
//             min2: (this.props.newEvent.isZero2 ? 0 : 30)
//         };
//         this.props.addEvent(newEvent);
//     }

//     addByName = () => {
//         this.props.addByName(this.state.inputText);
//     }

//     // Updates value of text field
//     // and stores as part of state
//     updateText = (event) => {
//         let newState = {
//             inputText: event.target.value
//         };
//         this.setState(newState);
//     }

//     // Set event to specified day of week
//     changeDay = (day) => {
//         let newDefault = {
//             ...this.props.newEvent,
//             dayOfWeek: day
//         };
//         this.props.updateDefault(newDefault);
//     }

//     // Sets current hour of event start time
//     changeHour = (hour) => {
//         let newDefault = {
//             ...this.props.newEvent,
//             newHour: hour
//         };
//         this.props.updateDefault(newDefault);
//     }

//     // Sets current minute of event start time
//     // Intervals of 0:30, represented by bool
//     changeMin = () => {
//         let newDefault = {
//             ...this.props.newEvent,
//             isZero: !this.props.newEvent.isZero
//         };
//         this.props.updateDefault(newDefault);
//     }

//     // Sets current state of the hour (AM/PM)
//     // for the event start time
//     // Only valid if 24 hour time is not in use
//     changeAM = () => {
//         let newDefault = {
//             ...this.props.newEvent,
//             newHour: (this.props.newEvent.newHour < 12 ?
//                 this.props.newEvent.newHour + 12 :
//                 this.props.newEvent.newHour - 12
//             )
//         };
//         this.props.updateDefault(newDefault);
//     }


//     // Sets current hour of event end time
//     changeHour2 = (hour) => {
//         let newDefault = {
//             ...this.props.newEvent,
//             newHour2: hour
//         };
//         this.props.updateDefault(newDefault);
//     }

//     // Sets current minute of event end time
//     // Intervals of 0:30, represented by bool
//     changeMin2 = () => {
//         let newDefault = {
//             ...this.props.newEvent,
//             isZero2: !this.props.newEvent.isZero2
//         };
//         this.props.updateDefault(newDefault);
//     }

//     // Sets current state of the hour (AM/PM)
//     // for the event end time
//     // Only valid if 24 hour time is not in use
//     changeAM2 = () => {
//         let newDefault = {
//             ...this.props.newEvent,
//             newHour2: (this.props.newEvent.newHour2 < 12 ?
//                 this.props.newEvent.newHour2 + 12 :
//                 this.props.newEvent.newHour2 - 12
//             )
//         };
//         this.props.updateDefault(newDefault);
//     }

//     render() {
//         return (
            
//         );
//     }

// }
