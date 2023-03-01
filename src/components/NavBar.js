import React from 'react';
import ghLogo from '../img/github-mark.svg';
import gearLogo from '../img/gear.svg';

const NavBar = props => (
    <div className='navbar' >
        <button
            type='button'
            className='accent'
            onClick={() => props.setDialog('add')}>
            Add Event
        </button>
        <p className='title rounded'> Weeklies </p>
        <div className='subbar'>
            <a
                href='https://github.com/blloop/weeklies'
                target='_blank'
                rel='noopener noreferrer'>
                <img
                    src={ghLogo}
                    alt='GitHub Link'
                    className='logo'>
                </img>
            </a>
            <button
                type='button'
                className='contrast settings-button'
                onClick={() => props.setDialog('settings')}>
                <img
                    src={gearLogo}
                    alt='Settings Button'>
                </img>
            </button>
        </div>
    </div>
);

export default NavBar;