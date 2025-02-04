import React from 'react';
import "./styles.css"
import {Button, Checkbox, Form, Input, message, Watermark} from "antd";
import {LockOutlined, RobotOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/modules/UserStore";
import {userRegister} from "../../apis/User";

const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loginForm] = Form.useForm();

    const onClick = async () => {
        const values = await loginForm.validateFields();
        const resp = await userRegister(values);
        if (resp.code === 200) {
            message.success("注册成功，返回登录页！");
            navigate("/login");
        } else {
            message.error(resp.msg);
        }
    };

    return (
        <Watermark content={["羊驼老师开放平台", "bilibili@是羊驼老师嗷"]} gap={[150, 150]}>
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="title">羊驼老师开放平台</div>
                    <Form name="loginForm" form={loginForm}>
                        <Form.Item name="username" required>
                            <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item name="password" required>
                            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item name="repeatPassword">
                            <Input.Password placeholder="请再次输入密码" prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item name="nickname" required>
                            <Input placeholder="请输入昵称" prefix={<RobotOutlined />}/>
                        </Form.Item>
                        <div className="extraMenu" style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "right"
                        }}>
                            <Button type="link" onClick={() => {
                                navigate("/login");
                            }}>已有账号？立即登录！</Button>
                        </div>
                        <Form.Item>
                            <Button type="primary" block onClick={onClick}>注册</Button>
                        </Form.Item>
                    </Form>
                    <div className="tail">- 羊驼老师开放平台 -</div>
                </div>
            </div>
        </Watermark>
    );
};

export default Register;
