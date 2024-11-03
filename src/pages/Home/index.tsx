import {Layout, Menu, MenuProps, Result} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import User from "../../components/tables/User";
import Clazz from "../../components/tables/Clazz";
import Dept from "../../components/tables/Dept";
import Quest from "../../components/tables/Quest";
import Reward from "../../components/tables/Reward";
import Monitor from "../../components/Monitor";
import ExchangeLog from "../../components/tables/ExchangeLog";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Home = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state: any) => state.coladmin);

    useEffect(() => {
        if (token === null || token === undefined || token === "") {
            navigate("/login");
        }
    }, [token]);

    // 菜单选中状态
    const [key, setKey] = useState('');

    // 信息系统选项
    const baseSystemMenuItems: MenuProps['items'] = [
        {key: 'Dept', label: '院系管理'},
        {key: 'Clazz', label: '班级管理'},
        {key: 'User', label: '学生管理'},
    ];

    // 任务系统选项
    const questSystemMenuItems: MenuProps['items'] = [
        {key: 'Quest', label: '任务管理'},
        {key: 'QuestVerify', label: '任务审核'},
        {key: 'CustomQuestVerify', label: '自定义任务审核'},
    ];

    // 奖励系统选项
    const rewardSystemMenuItems: MenuProps['items'] = [
        {key: 'Reward', label: '奖品管理'},
        {key: 'ExchangeLog', label: '兑换记录'},
    ];

    // 菜单栏选项
    const menuItems: MenuProps['items'] = [
        {key: 'BaseSystem', label: '信息系统', children: baseSystemMenuItems},
        {key: 'QuestSystem', label: '任务系统', children: questSystemMenuItems},
        {key: 'RewardSystem', label: '奖品系统', children: rewardSystemMenuItems},
        {key: 'AdSystem', label: '广告系统'},
        {key: 'DataSystem', label: '数据中心'},
    ];

    const onMenuSelected = (menuProps: any) => {
        setKey(menuProps.key);
    }

    const getContent = () => {
        switch (key) {
            case 'Dept':
                return <Dept/>;
            case 'Clazz':
                return <Clazz/>;
            case 'User':
                return <User/>;
            case 'Quest':
                return <Quest/>;
            case 'Reward':
                return <Reward/>;
            case 'ExchangeLog':
                return <ExchangeLog/>;
            case 'DataSystem':
                return <Monitor/>;
            default:
                return <Result
                    title="未选择页面"
                />
        }
    }

    return (
        <Layout>
            {/*顶部*/}
            <Header style={headerStyle}>
                新苗同学—校方管理平台
            </Header>
            <Content>
                <Layout>
                    {/*侧边菜单栏*/}
                    <Sider style={siderStyle}>
                        <Menu
                            mode='inline'
                            items={menuItems}
                            defaultSelectedKeys={['BaseSystem', key]}
                            onSelect={onMenuSelected}
                        />
                    </Sider>
                    {/*主要内容*/}
                    <Content>
                        {getContent()}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};

// 顶部导航栏样式
const headerStyle = {
    marginBottom: 16,
    backgroundColor: '#c6e6e8',
    fontSize: 32,
    letterSpacing: 8,
};

// 侧边栏样式
const siderStyle = {
    backgroundColor: 'white',
    height: '90vh',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
}

export default Home;
