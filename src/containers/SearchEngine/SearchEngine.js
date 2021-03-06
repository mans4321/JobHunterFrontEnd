import React from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../shared/utility';
import Aux from '../../hoc/Aux/Aux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';



class SearchEngine extends React.Component {
    
    state = {
        controls: {
            titles: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job Titles, separate titles by comma'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            cities: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Cities, separate titles by comma'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            experience: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Experience',
                    min:0
                },
                value: '',
                validation: {},
                valid: true,
            },
            skills: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Skills, separate skills by comma'
                },
                value: '',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false
    }

    componentDidMount(){
        if(this.props.userID && !this.props.userInfo){
            this.props.onReadUserInfo(this.props.userID);
        }
        if(this.props.userInfo){
            this.updatedControlsWithpreviousSeachInfo();
        }
    }

    
    componentDidUpdate(prevProps) {
        if(this.props.userID && !this.props.userInfo){
            this.props.onReadUserInfo(this.props.userID);
        }

        if(this.props.userInfo && (prevProps.userInfo !== this.props.userInfo )){
            this.updatedControlsWithpreviousSeachInfo();
        }
    }
    

    updatedControlsWithpreviousSeachInfo = () =>{
        let updatedControls = this.state.controls;
        for(const key in this.props.userInfo){
            updatedControls = updateObject(updatedControls, {
                [key]: updateObject(updatedControls[key], {
                    value: this.props.userInfo[key],
                    valid: true
                })
            });
        }
        this.setState({controls: updatedControls, formIsValid: true});
    }
    

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.controls[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
            touched: true
        });
        const updatedControls = updateObject(this.state.controls, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    searchHandler = (event)=>{
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.controls) {
            formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
        }
        this.props.onFetchJobs(formData, this.props.userID);
        this.props.history.replace('/JobsList');
    }

    render () {
            const formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            let form = (
                <form onSubmit={this.searchHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Search</Button>
                </form>
            );
            return (
                <Aux>
                    <span className="ContentTitle">
                        Future Job
                    </span>
                    {form}
                </Aux>
            );
    }
}

const mapStateToProps = state => {
    return {
        userID : state.auth.userID,
        userInfo: state.search.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchJobs: (userInfo, userID) => dispatch( actions.fetchJobs(userInfo, userID) ),
        onReadUserInfo: (userID) => dispatch( actions.fetchUserData(userID) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(SearchEngine);