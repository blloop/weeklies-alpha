import React from "react";
import { useState } from "react";

const InfoDialog = props => {
    const [page, setPage] = useState(1);
    const pageOne = () => ( <>
            <p> Select a time cell </p>
            <div className='sel'></div>
            <p> Enter the event details </p>
            <input readOnly value={'Meeting'}/>
            <p> Click the add event button</p>
            <button
                className='add contrast-light thin-button'>
                Add Event
            </button>
    </> );
    const pageTwo = () => (
        <div></div>
    )
    const pageThree = () => (
        <div></div>
    )
    const pageFour = () => (
        <div></div>
    )
    return ( props.isOpen &&
        <>
            <div
                className='modal-bg'
                style={{ zIndex: 14 }}
                onClick={() => props.setDialog('')}/>
            <div className='dialog overlay info'>
                <button
                    onClick={() => props.setDialog('')}
                    className='close-button'>
                    &#10005;
                </button>
                <p className='header'> How to use this app </p>
                {page === 1 ? pageOne() :
                    (page === 2 ? pageTwo() :
                        (page === 3 ? pageThree() : 
                            pageFour()
                        )
                    )
                }
                <div className="page-row">
                    {page > 1 ?
                        <button 
                            onClick={() => setPage(page - 1)}>
                            &lt;
                        </button> :
                        <button className="nil"></button>
                    }
                    {page}
                    {page < 4 ? 
                        <button 
                            onClick={() => setPage(page + 1)}>
                            &gt;
                        </button> :
                        <button className="nil"></button>
                    }
                </div>
            </div>
        </>
    );
};


export default InfoDialog;