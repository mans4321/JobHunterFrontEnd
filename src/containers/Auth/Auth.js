import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import * as authTypes from '../../shared/authType';
import {updateObject, checkValidity} from '../../shared/utility';
import './Auth.css';
import { toast } from 'react-toastify';


class Auth extends React.Component {
    
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: false,
        showedMessage: false
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { isSignUp: !prevState.isSignUp };
        } );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        if(this.state.isSignUp){
            this.props.onAuth(authTypes.USERNAME_PASSWORD_SIGNUP, {
                email:email,
                password:password
            });
        }else{
            this.props.onAuth(authTypes.USERNAME_PASSWORD_LOGIN, {
                email:email,
                password:password
            });
        }
        this.setState({showedMessage: false});
    }

    notify = () =>{
        if(!this.state.showedMessage){
            toast.error(this.props.error.message);
            this.setState({showedMessage: true});
        }
    }
    
 
    render() {

        if(this.props.isAuth){
            if(this.state.isSignUp)
                toast.info('Welcome Aboard');
            return <Redirect to='/' />
        }
        if(this.props.loading){
            return <Spinner />
        }

        if(this.props.error)
            this.notify()            
        
        
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
                formElementsArray.push( {
                    id: key,
                    config: this.state.controls[key]
                } );
            }

            let form = 
                <form>
                    {formElementsArray.map( formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                    ) )}
                </form>

            return ( 
                        <Aux>
                            <span className="ContentTitle">
                                {this.state.isSignUp? 'SignUp': 'Login'}
                            </span>

                            {form}
                            {this.state.isSignUp? null :
                                    <div className="text-right">
                                        <Link to="/resetPassword">Forgot password?</Link>
                                    </div>
                            }
                            <Button clicked={this.submitHandler} >{this.state.isSignUp ? 'SignUp':'Login'}</Button>
                            
                        
                            {this.state.isSignUp? null :
                                <div>
                                
                                    <div className="txt1 text-center">
                                        <span>
                                            Or Login Using
                                        </span>
                                    </div>
                            
                                    <div className="flex-c-m">
                                        <button 
                                            onClick={() => this.props.onAuth(authTypes.FACEBOOK_LOGIN)}
                                            className="login100-social-item bg1">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                            
                                        </button>
                
                                        <button 
                                            onClick={() => this.props.onAuth(authTypes.TWITTER_LOGIN)} 
                                            className="login100-social-item bg2">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </button>
                
                                        <button 
                                            onClick={() => this.props.onAuth(authTypes.GOOGLE_LOGIN)} 
                                            className="login100-social-item bg3">
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </button>
                                    </div>
                
                                    <div className="flex-col-c">
                                        <span className="txt1">
                                            Or Sign Up Using
                                        </span>
                                    </div>
                                </div>
                            }

                            <div className="flex-col-c">
                                <button className="AuthMode" onClick={this.switchAuthModeHandler}>
                                                {this.state.isSignUp? 'LogIn': 'Sign Up'}
                                </button>
                            </div>
                        </Aux>
                );
        }
    }


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.authError,
        isAuth: state.auth.userID !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( method, payload ) => dispatch( actions.auth( method, payload ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
