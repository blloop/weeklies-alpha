const pageOne = () => ( <>
  <p> Add an event </p>
  <hr/>
  <div className="info-row">
    <p> Select a time cell </p>
    <div className='sel'></div>
  </div>
  <div className="info-row">
    <p> Enter the event details </p>
    <input readOnly value={'Meeting'}/>
  </div>
  <div className="info-row">
    <p> Add the event </p>
    <button
        className='add contrast-light thin-button'>
        Add Event
    </button>
  </div>
</> );

const pageTwo = () => ( <>
  <p> Edit an event </p>
  <hr/>
  <div className="info-row">
    <p> Select an event </p>
    <div className='event-sel'> Meeting </div>
  </div>
  <div className="info-row">
    <p> Edit the event details </p>
    <input readOnly value={'Naptime'}/>
  </div>
  <div className="info-row">
    <p> Edit the event </p>
    <button
        className='add contrast-light thin-button'>
        Edit Event
    </button>
  </div>
</> );

const pageThree = () => ( <>
  <p> Delete an event </p>
  <hr/>
  <div className="info-row">
    <p> Select an event </p>
    <div className='event-sel'> Naptime </div>
  </div>
  <div className="info-row">
    <p> Delete the event </p>
    <button
        className='add contrast thin-button'>
        Delete Event
    </button>
  </div>
  <div className="info-row">
    <p> Confirm Deletion </p>
    <button
        className='add contrast thin-button'>
        Confirm
    </button>
  </div>
</> );

const pageFour = () => ( <>
  <p> Set Start Time </p>
  <hr/>
  <div className="info-row">
    <p> Drag the start slider </p>
    <div className='sel'></div>
  </div>
  <div className="info-row">
    <p> Drag the start... </p>
    <button
        className='add contrast thin-button'>
        Confirm
    </button>
  </div>
  <div className="info-row">
    <p> Drag the start... </p>
    <button
        className='add contrast thin-button'>
        Confirm
    </button>
  </div>
</> );

const pageFive = () => ( <>
  <p> Set End Time </p>
  <hr/>
  <div className="info-row">
    <p> Drag the end slider </p>
    <div className='sel'></div>
  </div>
  <div className="info-row">
    <p> Drag the end... </p>
    <button
        className='add contrast thin-button'>
        Confirm
    </button>
  </div>
  <div className="info-row">
    <p> Drag the end... </p>
    <button
        className='add contrast thin-button'>
        Confirm
    </button>
  </div>
</> );

export {
  pageOne, pageTwo, pageThree, pageFour, pageFive
}