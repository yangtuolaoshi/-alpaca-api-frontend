import {Form, Input, message, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import MonacoEditor from "react-monaco-editor";
import React, {useState} from "react";
import {addInterfaceInfo} from "../../../apis/InterfaceInfo";

const AddInterfaceInfoModal = (
    {
        addQuestModalOpen,
        onSuccess,
        onCancel,
    }: {
        addQuestModalOpen: boolean,
        onSuccess: () => void,
        onCancel: () => void,
    }
) => {
    const [addInterfaceForm] = Form.useForm();

    // 一堆代码输入框
    const [requestHeader, setRequestHeader] = useState("");
    const [requestParams, setRequestParams] = useState("");
    const [requestBody, setRequestBody] = useState("");
    const [requestHeaderExample, setRequestHeaderExample] = useState("");
    const [requestBodyExample, setRequestBodyExample] = useState("");
    const [responseHeader, setResponseHeader] = useState("");
    const [responseBodyExample, setResponseBodyExample] = useState("");

    const onOk = async () => {
        const values = await addInterfaceForm.validateFields();
        values.requestHeader = requestHeader;
        values.requestParams = requestParams;
        values.requestBody = requestBody;
        values.requestHeaderExample = requestHeaderExample;
        values.requestBodyExample = requestBodyExample;
        values.responseHeader = responseHeader;
        values.responseBodyExample = responseBodyExample;
        const resp = await addInterfaceInfo(values);
        if (resp.code === 200) {
            message.success("添加接口成功...");
            onSuccess();
        } else {
            message.error(resp.msg);
        }
    }

    return (
        <Modal
            title="添加任务"
            open={addQuestModalOpen}
            okText="确认"
            cancelText="取消"
            onCancel={() => {
                onCancel();
            }}
            onOk={onOk}
        >
            <Form name="addInterfaceInfoForm" form={addInterfaceForm}>
                <Form.Item label="标题" name="title" required>
                    <Input placeholder="请输入接口标题..."/>
                </Form.Item>
                <Form.Item label="描述" name="description" required>
                    <TextArea rows={4} placeholder="请输入接口描述..." />
                </Form.Item>
                <Form.Item label="请求方式" name="method" required>
                    <Input placeholder="请输入请求方式..."/>
                </Form.Item>
                <Form.Item label="请求地址" name="url" required>
                    <Input placeholder="请输入请求地址..."/>
                </Form.Item>
                <Form.Item label="请求头" name="requestHeader">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="json"
                        theme="vs-dark"
                        onChange={(value) => {
                            setRequestHeader(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
                <Form.Item label="请求参数" name="requestParams">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="json"
                        theme="vs-dark"
                        onChange={(value) => {
                            setRequestParams(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
                <Form.Item label="请求体" name="requestBody">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="json"
                        theme="vs-dark"
                        onChange={(value) => {
                            setRequestBody(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
                <Form.Item label="示例请求" name="requestExample">
                    <Input placeholder="请输入示例请求..."/>
                </Form.Item>
                <Form.Item label="请求头示例" name="requestHeaderExample">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="text"
                        theme="vs-dark"
                        onChange={(value) => {
                            setRequestHeaderExample(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
                <Form.Item label="请求体示例" name="requestBodyExample">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="json"
                        theme="vs-dark"
                        onChange={(value) => {
                            setRequestBodyExample(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
                <Form.Item label="响应头" name="responseHeader">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="json"
                        theme="vs-dark"
                        onChange={(value) => {
                            setResponseHeader(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
                <Form.Item label="结果示例" name="responseBodyExample">
                    <MonacoEditor
                        width="400"
                        height="100"
                        language="json"
                        theme="vs-dark"
                        onChange={(value) => {
                            setResponseBodyExample(value);
                        }}
                        options={{
                            selectOnLineNumbers: true,
                            roundedSelection: false,
                            readOnly: false,
                            cursorStyle: 'line',
                            automaticLayout: false,
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddInterfaceInfoModal;
