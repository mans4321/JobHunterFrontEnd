import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import classes from './JobDescription.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';


const JobDescription = (props) => {
    return ( 
        <Aux>
            <Backdrop show clicked={props.modalClosed} />
      
            <div className={classes.Content}>
                <div className={classes.highlight}>
                    <div className={classes.Close} onClick={props.modalClosed} >
                        <FontAwesomeIcon  icon={faWindowClose} color="red"  />
                    </div>

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

                    <div className={classes.Apply}  >
                        <Button btnType="Success" clicked={() => window.open(props.description.url,'_blank')}>Apply</Button>
                    </div>
                </div>
                
                    <div
                        className={classes.Modal}
                        style={{
                            transform: 'translateY(0)' ,
                            opacity: '1'
                        }}>
                    
                        <div dangerouslySetInnerHTML={{ __html: props.description.jobDescription }} />
                    </div>
            </div>
     
        </Aux>
    );
}
 
export default JobDescription;