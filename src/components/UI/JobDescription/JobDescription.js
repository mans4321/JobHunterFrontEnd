import React from 'react';

import classes from './JobDescription.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const JobDescription = (props) => {
    return ( 
        <Aux>
            <Backdrop show clicked={props.modalClosed} />
      
            <div className={classes.Content}>
                <div className={classes.highlight}>
                            <div className={classes.logo}>
                                <FontAwesomeIcon  icon={faMapMarkerAlt} />
                                <b>{props.description.city}</b>
                            </div>
                            <div className={classes.logo}>
                                <FontAwesomeIcon  icon={faUserTie} /> 
                                <b>{props.description.title}</b>
                            </div>
                            <div className={classes.logo}>
                                <FontAwesomeIcon  icon={faBuilding} /> 
                                <b>{props.description.company}</b>
                            </div>
                            <div className={classes.logo}>
                                <FontAwesomeIcon  icon={faLink} /> 
                                <b>{props.description.website}</b>
                            </div>
                    </div>
                
                    <div
                        className={classes.Modal}
                        style={{
                            transform: 'translateY(0)' ,
                            opacity: '1'
                        }}>
                    
                        <div dangerouslySetInnerHTML={{ __html: props.description.description }} />
                    </div>
            </div>
     
        </Aux>
    );
}
 
export default JobDescription;