import {Form, List, message, Skeleton, TablePaginationConfig} from "antd";
import {useEffect, useState} from "react";
import {selectInterfaceInfoByPage} from "../../../apis/InterfaceInfo";

const InterfaceInfoList = () => {
    const [data, setData] = useState([{id: 1, title: "蔡徐坤大战三百基佬", description: "蔡徐坤大战三百基佬蔡徐坤大战三百基佬蔡徐坤大战三百基佬", invokeNum: 114514}]);

    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(true);

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
            setData(data);
            setCount(resp.total);
            setLoading(false);
        } else {
            message.error(resp.msg);
        }
    };

    useEffect(() => {
        selectByCondition();
    }, [pagination.current, pagination.pageSize]);

    return <div style={containerStyle}>
        <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={{
                onChange: (page) => {
                    tableChange({
                        current: page,
                        pageSize: 10
                    });
                },
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: count,
            }}
            renderItem={(item, index) => (
                <List.Item>
                    <Skeleton title={false} loading={loading} active>
                        <List.Item.Meta
                            title={<a onClick={() => {
                                const currentUrl = window.location.href;
                                window.open(currentUrl + "info?id=" + item.id, '_blank');
                            }}>{item.title}</a>}
                            description={item.description}
                        />
                        <div>调用次数：{item.invokeNum}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    </div>;
}

const containerStyle = {
    backgroundColor: 'white',
    marginRight: 16,
    padding: 16
};

export default InterfaceInfoList;
