import { Col, Input, Row } from "antd";
import { useState } from "react";
import { findUN } from "../DB/profiles";
import { useNavigate } from "react-router-dom";

export function LogIn() {

    const [userName, setUserName] = useState<string>('');
    const [passWord, setPassWord] = useState<string>('');
    const [failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate()

    const handleLogIn = (username: string, password: string) => {
        
        const profile=findUN(username);
        if (profile===false) {
            setFailedLogin(true);
            return
        }
        if (profile.login.password===password) {
            navigate(`/profile/${profile.id}`);
        }
    };

    return(
        <Row>
            <Col style={{justifyContent:'center', color:'#F5B800'}}>
                {failedLogin&&<Row> Not Valid Log In Credentials</Row>}
                <Row>
                    Username
                </Row>
                <Row>
                    <Input
                        size="large" 
                        style={{ width: '350px', color: '#F5B800', borderColor: '#333333', backgroundColor: '#333333', fontSize:'22px', marginTop:'15px', marginBottom:'15px'}}
                        className="custom-input"
                        onChange={(e)=>{setUserName(e.target.value)}}/>
                </Row>
                <Row>
                    Password
                </Row>
                <Row>
                    <Input
                        size="large" 
                        style={{ width: '350px', color: '#F5B800', borderColor: '#333333', backgroundColor: '#333333', fontSize:'22px', marginTop:'15px', marginBottom:'15px'}}
                        className="custom-input"
                        onChange={(e)=>{setPassWord(e.target.value)}}
                        onPressEnter={()=>{handleLogIn(userName,passWord)}}/>
                </Row>
                <Row>
                    <div 
                        style={{borderRadius:'5px', color:'#333333', backgroundColor:'#F5B800'}}
                        onClick={()=>{handleLogIn(userName,passWord)}}>Log In</div>
                </Row>
            </Col>
        </Row>
    )
}