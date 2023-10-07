import React from 'react';
import ghLogo from '../img/github-mark.svg';
import gearLogo from '../img/gear.svg';
import infoLogo from '../img/info.svg';
import imLogo from '../img/upload.svg';
import exLogo from '../img/download.svg';

const NavBar = props => (
    <div className='navbar'>
        <div className='subbar left'>
            <button
                type='button'
                className='info-use'
                onClick={() => 
                    props.setDialog('info')
                }>
                <img src={infoLogo} alt={'Site Info'}/>
            </button>
            <button
                type='button'
                className='json-move'
                onClick={() => 
                    props.import()
                }>
                <img src={imLogo} alt={'Import JSON'}/>              
            </button>
            <button
                type='button'
                className='json-move'
                onClick={() => 
                    props.export()
                }>
                <img src={exLogo} alt={'Export JSON'}/>  
            </button>
        </div>
        <p className='title'> Weeklies </p>
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
                onClick={() => 
                    props.setDialog('settings')
                }>
                <img
                    src={gearLogo}
                    alt='Settings Button'>
                </img>
            </button>
        </div>
    </div>
);

export default NavBar;