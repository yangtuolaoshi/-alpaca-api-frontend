import React from 'react';
import {Content, Header} from "antd/es/layout/layout";
import {Button, Descriptions, DescriptionsProps, Divider, Input, Layout, message, Tag} from "antd";
import {useEffect, useState} from "react";
import {getInterfaceInfoById, onlineInvoke} from "../../apis/InterfaceInfo";
import MonacoEditor from 'react-monaco-editor';

const InterfaceInfoPage = () => {
    const [id, setId] = useState<any>();

    const [data, setData] = useState({
        title: "test",
        description: "test",
        method: "test",
        url: "test",
        requestBody: "test",
        requestHeader: "test",
        requestExample: "test",
        requestHeaderExample: "test",
        requestBodyExample: "test",
        responseHeader: "test",
        responseBodyExample: "test",
    });

    const descriptionItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '描述',
            children: data?.description,
            span: 3,
        },
    ];

    const requestStructureItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '请求地址',
            children: data?.url,
            span: 3,
        },
        {
            key: '2',
            label: '请求方式',
            children: data?.method,
            span: 3,
        },
        {
            key: '3',
            label: '请求头',
            children: (
                <MonacoEditor
                    width="600"
                    height="200"
                    language="json"
                    theme="vs-dark"
                    value={data.requestHeader}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />
            ),
            span: 3,
        },
        {
            key: '4',
            label: '请求体',
            children: (
                <MonacoEditor
                    width="600"
                    height="200"
                    language="json"
                    theme="vs-dark"
                    value={data.requestBody}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />
            ),
            span: 3,
        },
    ];

    const requestExampleItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '示例地址（包括请求参数）',
            children: data?.requestExample,
            span: 3,
        },
        {
            key: '3',
            label: '示例请求头',
            children: (
                <MonacoEditor
                    width="600"
                    height="200"
                    language="json"
                    theme="vs-dark"
                    value={data.requestHeaderExample}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />
            ),
            span: 3,
        },
        {
            key: '3',
            label: '示例请求体',
            children: (
                <MonacoEditor
                    width="600"
                    height="200"
                    language="json"
                    theme="vs-dark"
                    value={data.requestBodyExample}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />
            ),
            span: 3,
        },
    ]

    const responseStructureItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '响应头',
            children: (
                <MonacoEditor
                    width="600"
                    height="200"
                    language="json"
                    theme="vs-dark"
                    value={data.responseHeader}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />
            ),
            span: 3,
        },
    ];

    const responseExampleItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '示例结果',
            children: (
                <MonacoEditor
                    width="600"
                    height="200"
                    language="json"
                    theme="vs-dark"
                    value={data.responseBodyExample}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />
            ),
            span: 3,
        },
    ];

    const getInterfaceInfo = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        setId(id);
        const resp = await getInterfaceInfoById(id);
        if (resp.code === 200) {
            setData(resp.data);
        } else {
            message.error(resp.msg);
        }
    }

    useEffect(() => {
        getInterfaceInfo();
    }, []);

    const [inputParams, setInputParams] = useState("");

    const [inputBody, setInputBody] = useState("");

    const [result, setResult] = useState("")

    const onSendClick = async () => {
        const reqBody = {
            id: id,
            body: inputBody,
        };
        const resp = await onlineInvoke(reqBody, inputParams);
        if (resp.code === 200) {
            setResult(resp.data);
        } else {
            message.error(resp.msg);
        }
    }

    const getResult = () => {
        if (result) {
            if (0) {
                // TODO 解析图片或者更多类型的返回值
            } else {
                return <MonacoEditor
                    width="800"
                    height="300"
                    language="json"
                    theme="vs-dark"
                    value={result}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: true,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                />;
            }
        }
    }

    return <Layout>
        {/*顶部*/}
        <Header style={headerStyle}>
            羊驼老师开放平台
        </Header>
        <Content style={{width: "100%", backgroundColor: "white"}}>
            <div style={interfaceInfoStyles}>
                <Descriptions title={data?.title} items={descriptionItems} />
                <Divider />
                {/*TODO 这里可以解析成列表*/}
                <Descriptions title="请求结构" items={requestStructureItems} />
                <Divider />
                <Descriptions title="示例请求" items={requestExampleItems} />
                <Divider />
                <Descriptions title="返回结果" items={responseStructureItems} />
                <Divider />
                <Descriptions title="示例响应" items={responseExampleItems} />
                <Divider />
                <Descriptions title="在线调用" items={[]} />
                <div style={{marginBottom: 16}}>
                    <Tag bordered={false} color="magenta">请求参数（只写拼接到地址后面的部分，比如 ?id=10&name=zhangsan）</Tag>
                </div>
                <Input
                    onChange={(e) => {
                        setInputParams(e.target.value);
                    }}
                    style={{marginBottom: 16}}
                    width={"80%"}
                    defaultValue="?"
                />
                <div style={{marginBottom: 16}}>
                    <Tag bordered={false} color="cyan">请求体</Tag>
                </div>
                <MonacoEditor
                    width="800"
                    height="300"
                    language="json"
                    theme="vs-dark"
                    value={inputBody}
                    options={{
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: false,
                        cursorStyle: 'line',
                        automaticLayout: false,
                    }}
                    onChange={(value) => {
                        setInputBody(value);
                    }}
                />
                <Button
                    style={{marginTop: 16}}
                    type="primary"
                    onClick={onSendClick}
                >发送请求</Button>
                <Divider />
                <Descriptions title="返回结果" items={[]} />
                {getResult()}
            </div>
        </Content>
    </Layout>
}

// 顶部导航栏样式
const headerStyle: React.CSSProperties = {
    marginBottom: 16,
    backgroundColor: '#c6e6e8',
    fontSize: 32,
    letterSpacing: 8,
};

const interfaceInfoStyles: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    width: "80%",
    margin: "auto",
    marginTop: 16,
    marginBottom: 32,
};

export default InterfaceInfoPage;
