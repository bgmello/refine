import { useForm, useSelect } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { Button, Form, Select, Space } from "antd";

import { Task } from "@interfaces";

type Props = {
    initialValues: {
        userIds?: { label: string; value: string }[];
    };
    cancelForm: () => void;
};

export const UsersForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm<Task, HttpError, Task>({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        onMutationSuccess: () => {
            cancelForm();
        },
    });

    const { selectProps } = useSelect({
        resource: "users",
        meta: {
            fields: ["name", "id"],
        },
        optionLabel: "name",
    });

    return (
        <div
            style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                gap: "12px",
            }}
        >
            <Form
                {...formProps}
                style={{ width: "100%" }}
                initialValues={initialValues}
            >
                <Form.Item noStyle name="userIds">
                    <Select
                        {...selectProps}
                        className="kanban-users-form-select"
                        dropdownStyle={{ padding: "0px" }}
                        style={{ width: "100%" }}
                        mode="multiple"
                    />
                </Form.Item>
            </Form>
            <Space>
                <Button type="default" onClick={cancelForm}>
                    Cancel
                </Button>
                <Button {...saveButtonProps} type="primary">
                    Save
                </Button>
            </Space>
        </div>
    );
};
