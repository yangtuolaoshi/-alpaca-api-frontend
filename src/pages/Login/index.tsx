import React from 'react';
import "./styles.css"
import {Button, Checkbox, Form, Input, message, Watermark} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/modules/UserStore";
import {userLogin} from "../../apis/User";

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loginForm] = Form.useForm();

    const onClick = async () => {
        const values = await loginForm.validateFields();
        const resp = await userLogin(values);
        if (resp.code === 200) {
            dispatch(setUser(resp.data));
            message.success("登陆成功！");
            navigate("/");
        } else {
            message.error(resp.msg);
        }
    };

    return (
        <Watermark content={["羊驼老师开放平台", "bilibili@是羊驼老师嗷"]} gap={[150, 150]}>
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="title">羊驼老师开放平台</div>
                    {/*<div className="menu">管理平台</div>*/}
                    <Form name="loginForm" form={loginForm}>
                        <Form.Item name="username">
                            <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
                        </Form.Item>
                        <div className="extraMenu">
                            <Checkbox>自动登录</Checkbox>
                            <Button type="link" onClick={() => {
                                navigate("/register");
                            }}>没有账号？立即注册！</Button>
                        </div>
                        <Form.Item>
                            <Button type="primary" block onClick={onClick}>登录</Button>
                        </Form.Item>
                    </Form>
                    <div className="tail">- 羊驼老师开放平台 -</div>
                </div>
            </div>
        </Watermark>
    );
};

export default Login;
