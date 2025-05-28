import { Col, Input, Row } from "antd";
import { useState } from "react";
import { findUN } from "../DB/profiles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../Slices/profileIdSlice";
// import { login } from "../Slices/loginSlice";

export function LogIn() {

    const [userName, setUserName] = useState<string>('');
    const [passWord, setPassWord] = useState<string>('');
    const [failedLogin, setFailedLogin] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogIn = (username: string, password: string) => {
        
        const profile=findUN(username);
        if (profile===false) {
            setFailedLogin(true);
            return
        }
        if (profile.login.password===password) {
            dispatch(set(profile.id));
            // dispatch(login());
            navigate(`/profile/${profile.id}`);
        }
    };

    return(
        <Row align='middle' justify='center'>
            <Col style={{color:'#F5B800'}}>
                {failedLogin&&<Row align='middle' justify='center'> Not Valid Log In Credentials</Row>}
                <Row  justify='center' style={{marginTop:'20px', fontSize:'20px'}}>
                    Username
                </Row>
                <Row>
                    <Input
                        size="middle" 
                        style={{ textAlign:'center', width: '330px', color: '#F5B800', borderColor: '#333333', backgroundColor: '#222222', fontSize:'20px', marginTop:'15px', marginBottom:'15px'}}
                        className="custom-input"
                        onChange={(e)=>{setUserName(e.target.value)}}/>
                </Row>
                <Row justify='center' style={{fontSize:'20px'}}>
                    Password
                </Row>
                <Row>
                    <Input
                        size="middle" 
                        style={{ textAlign:'center', width: '330px', color: '#F5B800', borderColor: '#333333', backgroundColor: '#222222', fontSize:'20px', marginTop:'15px', marginBottom:'15px'}}
                        className="custom-input"
                        onChange={(e)=>{setPassWord(e.target.value)}}
                        onPressEnter={()=>{handleLogIn(userName,passWord)}}/>
                </Row>
                <Row align='middle' justify='center'>
                    <div 
                        style={{ marginTop:'10px', textAlign:'center', borderRadius:'5px', color:'#333333', backgroundColor:'#F5B800', fontSize:'18px', width:'70px', height:'30px', fontWeight:'bold', cursor:'pointer'}}
                        onClick={()=>{handleLogIn(userName,passWord)}}>Log In</div>
                </Row>
            </Col>
        </Row>
    )
}