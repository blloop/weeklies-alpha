let Nav = () => {
    return <>
        <div className='navbar' >
            <button
                type='button'
                className='accent'
                onClick={this.openAddEvent}>
                Add Event
            </button>
            <p className='title rounded'> Weeklies </p>
            <div className='subbar'>
                <a
                    href='https://github.com/blloop/weeklies'
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                        src={ghLogo}
                        alt='GitHub Link'
                        className='logo'>
                    </img>
                </a>
                <button
                    type='button'
                    className='contrast settings-button'
                    onClick={this.openSettings}>
                    <img
                        src={gearLogo}
                        alt='Settings Button'>
                    </img>
                </button>
            </div>
        </>
}