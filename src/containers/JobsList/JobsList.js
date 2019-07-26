import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux'
import JobDescription from '../../components/UI/JobDescription/JobDescription';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './JobsList.module.css';

class JobsList extends React.Component {
    state = { 
        show:false,
        jobDescripton: null
     }

     hideJobDescriptonHandler = () => {
        this.setState( { show: false } );
    }

    showJobDescripton = (jobDescripton) => {
        this.setState( { show: true,
                        jobDescripton: jobDescripton
                    })
                }

    render() {
        
        let table = <Spinner />;
        if(!this.props.loading){
            table = (
                <table>
                <thead>
                    <tr className={classes.table100Head}>
                        <th className={classes.column1}>Title</th>
                        <th className={classes.column2}>City</th>
                        <th className={classes.column3}>Company</th>
                    </tr>
                </thead>
                <tbody>

                {this.props.jobsList.map((job, index) => (
                    <tr key={index} onClick={() => this.showJobDescripton(job)}>
                        <td className={classes.column1}>{job.title}</td>
                        <td className={classes.column2}>{job.city}</td>
                        <td className={classes.column3}>{job.company}</td>
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