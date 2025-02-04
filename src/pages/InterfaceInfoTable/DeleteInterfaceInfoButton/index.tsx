import {Alert, Button, message, Popconfirm} from "antd";
import {deleteInterfaceInfoById} from "../../../apis/InterfaceInfo";

const DeleteInterfaceInfoButton = ({id, onSuccess}: {
    id: number,
    onSuccess: () => void,
}) => {
    const deleteOne = async () => {
        const resp = await deleteInterfaceInfoById(id);
        if (resp.code === 200) {
            onSuccess();
            message.success("删除成功！");
        } else {
            message.error(resp.msg);
        }
    };

    return (
        <Popconfirm
            title="你确定要删除这个接口吗？"
            description={() => {
                return (
                    <Alert
                        message="这个接口将会永久消失（真的很久！）"
                        type="warning"
                    />
                );
            }}
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
                deleteOne();
            }}
        >
            <Button type="primary" danger className="optionBtn">删除</Button>
        </Popconfirm>
    );
}

export default DeleteInterfaceInfoButton;
