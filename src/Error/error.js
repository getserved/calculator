import React from 'react';
import { Redirect } from 'react-router-dom';
class MyErrorHandler extends React.Component {
    render(){
        let errorInfo = this.props.errorInfo;
        let errorPath = this.props.errorPath;
        if(errorInfo){
            alert(errorInfo)
        }
        if(errorPath){
            return <Redirect push to={errorPath} />;
        }
    }
}
export default MyErrorHandler;
