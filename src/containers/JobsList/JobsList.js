import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux'
import JobDescription from '../../components/UI/JobDescription/JobDescription';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './JobsList.module.css';
import {capitalize} from '../../shared/utility';

class JobsList extends React.Component {
    state = { 
        show:false,
        jobDescripton: null
     }

     hideJobDescriptonHandler = () => {
        this.setState( { show: false } );
    }

    showJobDescripton = (jobDescripton, index) => {
         this.props.jobsList[index].viewed = true;   
         this.setState( { show: true,
            jobDescripton: jobDescripton
        })    
    }

    render() {
        
        let table = <Spinner />;
        if(!this.props.loading){
            table = (
                <table className={classes.table}>
                <thead>
                    <tr className={classes.table100Head}>
                        <th className={classes.column1}>Title</th>
                        <th className={classes.column2}>City</th>
                        <th className={classes.column3}>Company</th>
                        <th className={classes.column4}>Score</th>
                    </tr>
                </thead>
                <tbody>

                {this.props.jobsList.map((job, index) => (
                    <tr 
                        className={[index % 2 === 0 ? classes.Even : null ,job.viewed ? classes.Viewed : null].join(' ')} 
                        key={index}
                        onClick={() => this.showJobDescripton(job, index)}>
                        <td className={classes.column1}>{capitalize(job.title)}</td>
                        <td className={classes.column2}>{capitalize(job.city)}</td>
                        <td className={classes.column3}>{capitalize(job.company)}</td>
                        <td className={classes.column4} >{Math.trunc(job.score * 100)} %</td>
                    </tr> 
                )) }
     
                </tbody>
            </table>
            )
        }

        return ( 
            
            <Aux>  
                {this.state.show ?  <JobDescription show={this.state.show} modalClosed={this.hideJobDescriptonHandler} description={this.state.jobDescripton} />
                                    : null}

                {table}
             </Aux>
  
         );
    }
}
 

const mapStateToProps = state => {
    return {
        jobsList: state.search.jobsList,
        loading: state.search.loading
    };
}

export default connect(mapStateToProps)(JobsList);