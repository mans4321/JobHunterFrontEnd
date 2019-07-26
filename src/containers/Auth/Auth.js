import React from 'react';


import Aux from '../../hoc/Aux/Aux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import './Auth.css';

class Auth extends React.Component {
    state = {  }
    render() { 
        return ( 
    
                    <Aux>
                        <span className="ContentTitle">
                            Login
                        </span>
                        
                        <form>
                            <Input elementType="input" type="email" placeholder="email" errorMessage="Please enter your name" />
                            <Input elementType="input" type= "password" placeholder="password" errorMessage="Please enter your name" />
                        </form>

            
                        <div className="text-right">
                            <a href="/">
                                Forgot password?
                            </a>
                        </div>
                        
                        <Button>Login</Button>
    
                        <div className="txt1 text-center">
                            <span>
                                Or Sign Up Using
                            </span>
                        </div>
    
                        <div className="flex-c-m">
                            <a href="/" className="login100-social-item bg1">
                                <FontAwesomeIcon icon={faFacebookF} />
                                
                            </a>
    
                            <a href="/" className="login100-social-item bg2">
                                <FontAwesomeIcon icon={faTwitter} />
                               
                            </a>
    
                            <a href="/" className="login100-social-item bg3">
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                        </div>
    
                        <div className="flex-col-c">
                            <span className="txt1">
                                Or Sign Up Using
                            </span>
    
                            <a href="/">
                                Sign Up
                            </a>
                        </div>
                    </Aux>
 
        
    );
    }
}
 
export default Auth;