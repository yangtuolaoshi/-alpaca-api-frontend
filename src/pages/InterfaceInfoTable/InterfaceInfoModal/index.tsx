import {Descriptions, DescriptionsProps, Modal} from "antd";
import MonacoEditor from "react-monaco-editor";
import React from "react";

const InterfaceInfoModal = ({interfaceInfo, interfaceInfoModalOpen, onClose}: {
    interfaceInfo: any,
    interfaceInfoModalOpen: boolean,
    onClose: () => void,
}) => {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '标题',
            children: interfaceInfo?.title,
            span: 3,
        },
        {
            key: '2',
            label: '描述',
            children: interfaceInfo?.description,
            span: 3,
        },
        {
            key: '3',
            label: '累计请求次数',
            children: interfaceInfo?.invokeNum,
            span: 3,
        },
        {
            key: '4',
            label: '状态',
            children: interfaceInfo?.status === 1 ? "启用" : "禁用",
            span: 3,
        },
        {
            key: '5',
            label: '请求方式',
            children: interfaceInfo?.method,
            span: 3,
        },
        {
            key: '6',
            label: '请求地址',
            children: interfaceInfo?.url,
            span: 3,
        },
        {
            key: '7',
            label: '请求头',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.requestHeader}
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
            key: '8',
            label: '请求参数',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.requestParams}
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
            key: '9',
            label: '请求体',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.requestBody}
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
            key: '10',
            label: '请求示例',
            children: interfaceInfo?.requestExample,
            span: 3,
        },
        {
            key: '11',
            label: '请求头示例',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.requestHeaderExample}
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
            key: '12',
            label: '请求体示例',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.requestBodyExample}
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
            key: '13',
            label: '响应头',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.responseHeader}
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
            key: '14',
            label: '响应示例',
            children: (
                <MonacoEditor
                    width="400"
                    height="100"
                    language="json"
                    theme="vs-dark"
                    value={interfaceInfo?.responseBodyExample}
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
            key: '15',
            label: '创建时间',
            children: interfaceInfo?.createTime,
            span: 3,
        },
        {
            key: '16',
            label: '更新时间',
            children: interfaceInfo?.updateTime,
            span: 3,
        },
    ];

    return (
        <Modal
            title="接口详情"
            open={interfaceInfoModalOpen}
            okText="确认"
            cancelText="取消"
            onOk={onClose}
            onCancel={onClose}
        >
            <Descriptions items={items} size="small" />
        </Modal>
    );
}

export default InterfaceInfoModal;
