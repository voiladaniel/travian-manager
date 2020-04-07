import React, {useState} from 'react';
import {Navigation} from './Navigation.js'
export const MyLayout = (props) =>{

    const [expanded, setExpanded] = useState(false);

    const onToggle = (e) => {
        setExpanded(e);
    };
    return(
        <>
            <Navigation onToggle={onToggle}/>
            <div className={expanded ? 'expanded' : 'not-expanded'}>
                <header className='App-header'>
                    Manager
                </header>
                <div className='App-body container-fluid wrapper'>
                    {props.children}
                </div>
            </div>
        </>
    )
}