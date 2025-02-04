import {Layout, Menu, MenuProps, Result} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import InterfaceInfoTable from "../InterfaceInfoTable";
import InterfaceInfoList from "../InterfaceInfoList";

const Home = () => {
    const navigate = useNavigate();
    const { id } = useSelector((state: any) => state.user);
    const { role } = useSelector((state: any) => state.user);

    const getMenuItems = () => {
        let items = [];
        if (role === 1) {
            items.push({key: 'management', label: 'API管理'});
        }
        items.push({key: 'APIS', label: 'API列表'});
        return items;
    }

    // 菜单栏选项
    const menuItems: MenuProps['items'] = getMenuItems();

    useEffect(() => {
        if (id === null || id === undefined || id === "") {
            navigate("/login");
        }
    }, [id]);

    // 菜单选中状态
    const [key, setKey] = useState('');

    const onMenuSelected = (menuProps: any) => {
        setKey(menuProps.key);
    }

    const getContent = () => {
        switch (key) {
            case 'management':
                return <InterfaceInfoTable />;
            case "APIS":
                return <InterfaceInfoList />;
            default:
                return <Result title="未选择页面"/>;
        }
    }

    return (
        <Layout>
            {/*顶部*/}
            <Header style={headerStyle}>
                羊驼老师开放平台
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
