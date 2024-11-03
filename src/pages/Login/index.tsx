import React from 'react';
import "./styles.css"
import {Button, Checkbox, Form, Input, message, Watermark} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {coladminLogin} from "../../apis/coladmin/Coladmin";
import {setColadmin} from "../../store/modules/ColadminStore";

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loginForm] = Form.useForm();

    const onClick = async () => {
        const values = await loginForm.validateFields();
        const resp = await coladminLogin(values);
        if (resp.code === 200) {
            dispatch(setColadmin(resp.data));
            message.success("登陆成功！");
            navigate("/");
        } else {
            message.error(resp.msg);
        }
    };

    return (
        <Watermark content={["融创软通", "bilibili@是羊驼老师嗷"]} gap={[150, 150]}>
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="title">新苗同学</div>
                    <div className="menu">校方管理平台</div>
                    <Form name="loginForm" form={loginForm}>
                        <Form.Item name="username">
                            <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item name="remember">
                            <Checkbox>自动登录</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block onClick={onClick}>登录</Button>
                        </Form.Item>
                    </Form>
                    <div className="tail">- 大学新生智慧迎新平台 -</div>
                </div>
            </div>
        </Watermark>
    );
};

export default Login;
