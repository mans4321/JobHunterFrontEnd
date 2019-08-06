import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

class ForgetPassword extends React.Component {
    
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        showedMessage: false
    }
    
    componentDidUpdate(){
        this.props.OnResetPasswordInit();
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
        this.props.onResetPassword(this.state.controls.email.value);
    }

    notify = () => {
        if(!this.state.showedMessage){
            toast.error(this.props.error.message);
            this.setState({showedMessage: true});
        }
    }

    render() {
        if(this.props.error)
            this.notify()

        if(this.props.loading){
            return <Spinner />
        }
        if(this.props.emailSent){
            toast.info('check your email please');
            return <Redirect to='/' />
        }

        const formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            let form = (
                <form style={{margin:'auto', width:'70%'}} onSubmit={this.searchHandler}>
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
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Send</Button>
                </form>
            );

        return ( 
            <Aux>
                <span className="ContentTitle">
                    Forgot Password?
                </span>
                <div className='text-center'>
                    <FontAwesomeIcon  icon={faLock} color=" #a64bf4"size="4x"/>
                    <br/>
                    <br/>
                    <p>You can reset your password here.</p> 
                </div>
                {form}
            </Aux>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.resetError,
        emailSent: state.auth.emailSent,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (email) => dispatch(actions.resstPassword(email)),
        OnResetPasswordInit: () => dispatch(actions.resetPasswordInit())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ForgetPassword );