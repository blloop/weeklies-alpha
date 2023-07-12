import React, { useState } from 'react';
import { pageOne, pageTwo, pageThree } from './Info';
import { pageFour, pageFive, pageSix } from './Info';

const InfoDialog = props => {
    const [page, setPage] = useState(1);
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
                            (page === 4 ? pageFour() : 
                                page === 5 ? pageFive() :
                                    pageSix()
                            )
                        )
                    )
                }
                <div className='page-row'>
                    {page > 1 ?
                        <button 
                            onClick={() => setPage(page - 1)}>
                            &lt;
                        </button> :
                        <button className='nil'></button>
                    }
                    {page}
                    {page < 6 ? 
                        <button 
                            onClick={() => setPage(page + 1)}>
                            &gt;
                        </button> :
                        <button className='nil'></button>
                    }
                </div>
            </div>
        </>
    );
};


export default InfoDialog;