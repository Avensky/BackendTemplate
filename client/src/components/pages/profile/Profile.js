import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Link from './Link/Link';
import classes from '../Pages.module.scss';
import myClasses from './Profile.module.scss';
import * as actions from '../../../store/actions/index';

const Login = (props) =>{
    let local, facebook, twitter, google = '';
    // const { isLoggedIn } = props;
    // const [count, setCount] = useState(0);
    // 
    // useEffect(()=> {
    //     const fetchData = async () => {
    //         props.onFetchUser()
    //     };
    //     if ( !isLoggedIn && count){
    //         fetchData()
    //     }
    // }, [count])

        local = (
            <Link 
                link="Local"
                userLink={true}
                icon="fa-user"
                mystyle="auth-btn"
                provider='/connectlocal' 
                providerUnlink='/unlink/local' 
                
            />)
        
        facebook = (
            <Link
                link="Facebook"
                userLink={true}
                icon="fa-facebook"
                mystyle="btn-primary"
                provider='/connect/facebook'
                providerUnlink='/unlink/facebook'
            />)

        twitter = (
            <Link
                link="Twitter"
                userLink={true}
                icon="fa-twitter"
                mystyle="btn-info"
                provider='/connect/twitter'
                providerUnlink='/unlink/twitter'
            />)
        
        google = (
            <Link
                link="Google"
                userLink={true}
                icon="fa-google-plus"
                mystyle="btn-danger"
                provider='/connect/google'
                providerUnlink='/unlink/google'
            />)

        if (props.payload['local']) {
            local = (
                <Link
                    id={props.payload['local'].id}
                    link="Local"
                    userLink={false}
                    email={props.payload['local'].email}
                    token={props.payload['local'].token}
                    name={props.payload['local'].name}
                    icon="fa-user"
                    mystyle="auth-btn"
                    provider='/authentication' 
                    providerUnlink='/unlink/local' 
                />)
        }
        
        if (props.payload['facebook']) {
            facebook = (
                <Link
                    id={props.payload['facebook'].id}
                    link="Facebook"
                    userLink={false}
                    email={props.payload['facebook'].email}
                    token={props.payload['facebook'].token}
                    name={props.payload['facebook'].name}
                    icon="fa-facebook"
                    mystyle="btn-primary"
                    provider='/connect/facebook' 
                    providerUnlink='/unlink/facebook' 
            />)
        }

        if (props.payload['twitter']) {
            twitter = (
                <Link
                    id={props.payload['twitter'].id}
                    link="Twitter"
                    userLink={false}
                    displayName={props.payload['twitter'].displayName}
                    //token       = "token"
                    username={props.payload['twitter'].username}
                    token={props.payload['twitter'].token}
                    icon="fa-twitter"
                    mystyle="btn-info"
                    provider='/connect/twitter' 
                    providerUnlink='/unlink/twitter' 
            />)
        }

        if (props.payload['google']) {
            google = (
                <Link
                    id={props.payload['google'].id}
                    link="Google"
                    userLink={false}
                    email={props.payload['google'].email}
                    token={props.payload['google'].token}
                    name={props.payload['google'].name}
                    icon="fa-google-plus"
                    mystyle="btn-danger"
                    provider='/connect/google'
                    providerUnlink='/unlink/google'
            />)
        }

        let body = (
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                        <h2><span className="fa fa-anchor"></span> Profile Page</h2>

                    </div>
                </div>
                <div className={[classes.Card, myClasses.Profile].join(' ')}>
                    {local}
                    {facebook}
                    {twitter}
                    {google}

                </div>
            </Auxiliary>
        )

        return (
            <Auxiliary>
                {body}
            </Auxiliary>
        )
    
}

const mapStateToProps = state => {
    return {
        payload: state.auth.payload,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);