import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <div className={classes.ButttonContainer}>
        <div className={classes.ButtonWrap}>
            <div className={classes.Success}></div>
            <button className={classes.Button} 
            disabled={props.disabled} onClick={props.clicked} >
                {props.children}
            </button>
        </div>
    </div>
);

export default button;