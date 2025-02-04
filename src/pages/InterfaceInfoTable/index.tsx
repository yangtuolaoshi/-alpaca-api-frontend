import {Button, Form, Input, message, Table, TablePaginationConfig, TableProps} from "antd";
import {useEffect, useState} from "react";
import {offlineInterfaceInfo, publishInterfaceInfo, selectInterfaceInfoByPage} from "../../apis/InterfaceInfo";
import AddInterfaceInfoModal from "./AddInterfaceInfoButton";
import InterfaceInfoModal from "./InterfaceInfoModal";
import DeleteInterfaceInfoButton from "./DeleteInterfaceInfoButton";
import UpdateInterfaceModal from "./UpdateInterfaceModal";

const InterfaceInfoTable = () => {
    const onPublishClick = async (id: number) => {
        const resp = await publishInterfaceInfo(id);
        if (resp.code === 200) {
            message.success("接口发布成功...");
            setSelectCondition({...selectCondition});
        } else {
            message.error(resp.msg);
        }
    }

    const onOfflineClick = async (id: number) => {
        const resp = await offlineInterfaceInfo(id);
        if (resp.code === 200) {
            message.success("接口已下线...");
            setSelectCondition({...selectCondition});
        } else {
            message.error(resp.msg);
        }
    }

    const columns: TableProps['columns'] = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            hidden: true,
        },
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
        },
        {
            title: '启用状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                record.status === 1 ? "启用" : "禁用"
            ),
        },
        {
            title: '请求方式',
            dataIndex: 'method',
            key: 'method',
            align: 'center',
        },
        {
            title: '请求地址',
            dataIndex: 'url',
            key: 'url',
            align: 'center',
        },
        {
            title: '调用次数',
            dataIndex: 'invokeNum',
            key: 'invokeNum',
            align: 'center',
        },
        {
            title: '操作',
            key: 'options',
            align: 'center',
            width: 300,
            render: (_, record) => (
                <div className="tableBtnContainer">
                    <Button
                        type="primary"
                        className="optionBtn"
                        onClick={() => {
                            setInterfaceInfo(record);
                            setInterfaceInfoModalOpen(true);
                        }}>详情</Button>
                    <Button
                        className="optionBtn"
                        onClick={() => {
                            setUpdateInterfaceModalOpen(true);
                            setInterfaceInfo(record);
                        }}
                    >修改</Button>
                    {record.status === 1 ?
                        <Button
                            onClick={() => {onOfflineClick(record.id)}}
                            danger
                        >禁用</Button>
                        :
                        <Button
                            onClick={() => {onPublishClick(record.id)}}
                            color="primary"
                            variant="outlined"
                        >上线</Button>}
                    <DeleteInterfaceInfoButton
                        id={record.id}
                        onSuccess={() => {
                            setSelectCondition({...selectCondition});
                        }}
                    />
                </div>
            ),
        },
    ];

    const [selectCondition, setSelectCondition] = useState({
        title: ""
    });

    const [data, setData] = useState([]);

    const [count, setCount] = useState(0);

    // 分页条件
    const [pagination, setPagination] = useState<TablePaginationConfig>(
        {
            current: 1,
            pageSize: 10,
            total: count,
            showSizeChanger: true,
            pageSizeOptions: [10, 20]
        }
    );

    function tableChange(newPagination: TablePaginationConfig) {// pagination的信息自动传入参数中
        setPagination(newPagination);
    }

    // TODO 条件查询
    const [conditionForm] = Form.useForm();
    const selectByCondition = async () => {
        const resp = await selectInterfaceInfoByPage(pagination.current, pagination.pageSize);
        if (resp.code === 200) {
            let data: any = resp.data;
            data.map((e: any) => {
                e.key = e.id;
                return e;
            });
            setData(data);
            setCount(resp.total);
        } else {
            message.error(resp.msg);
        }
    };

    useEffect(() => {
        selectByCondition();
    }, [pagination.current, pagination.pageSize, selectCondition]);

    // 详情模态框
    const [interfaceInfo, setInterfaceInfo] = useState<any>();
    const [interfaceInfoModalOpen, setInterfaceInfoModalOpen] = useState<boolean>(false);
    const onInterfaceInfoModalClose = () => {
        setInterfaceInfoModalOpen(false);
        setInterfaceInfo(null);
    }

    // 添加模态框
    const [addInterfaceInfoModalOpen, setAddInterfaceInfoModalOpen] = useState(false);

    // 更新模态框
    const [updateInterfaceModalOpen, setUpdateInterfaceModalOpen] = useState(false);

    return (
        <div>
            <div style={optionMenuStyles}>
                <Form form={conditionForm} name="selectForm" style={selectFormStyles}>
                    <Form.Item label="接口名称" name="title">
                        <Input placeholder="请输入接口名称"/>
                    </Form.Item>
                </Form>
                <div>
                    <Button type="primary" onClick={selectByCondition} disabled>查询（目前不可条件查询）</Button>
                </div>
            </div>
            <Button
                style={{width: "100%"}}
                color="primary"
                variant="outlined"
                onClick={() => {setAddInterfaceInfoModalOpen(true)}}
            >添加</Button>
            <AddInterfaceInfoModal
                addQuestModalOpen={addInterfaceInfoModalOpen}
                onCancel={() => {
                    setAddInterfaceInfoModalOpen(false);
                }}
                onSuccess={() => {
                    setAddInterfaceInfoModalOpen(false);
                    setSelectCondition({...selectCondition});
                }}
            />
            <Table
                className="questTableContainer"
                rowKey="id"
                columns={columns}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: count,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20]
                }}
                onChange={tableChange}
                dataSource={data}
                summary={() => {
                    return <div style={countContainerStyles}>共{count}条数据</div>;
                }}
            />
            <InterfaceInfoModal
                interfaceInfo={interfaceInfo}
                interfaceInfoModalOpen={interfaceInfoModalOpen}
                onClose={onInterfaceInfoModalClose}
            />
            <UpdateInterfaceModal
                updateInterfaceModalOpen={updateInterfaceModalOpen}
                interfaceInfo={interfaceInfo}
                onCancel={() => {
                    // setInterfaceInfo({});
                    setUpdateInterfaceModalOpen(false);
                }}
                onSuccess={() => {
                    // setInterfaceInfo({});
                    setUpdateInterfaceModalOpen(false);
                }}
            />
        </div>
    );
}

const selectFormStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
};

const optionMenuStyles: React.CSSProperties = {
    backgroundColor: 'white',
    marginTop: 12,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
};

const countContainerStyles: React.CSSProperties = {
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
};

export default InterfaceInfoTable;
