import { ColumnDef } from "@tanstack/react-table";
import type { MenuProps } from "antd";
import { Button, Dropdown, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import CustomTable from "..";
import { IComment } from "../../../interfaces";
import { DeleteFilled, EyeOutlined, MenuOutlined } from "@ant-design/icons";
import { useComments } from "../../../hooks";
import Loader from "../../loader";
import { useTranslation } from "react-i18next";
interface Props {
  data: IComment[];
}

export default function CommentsTable({ data }: Props) {
  const { handleDeleteComment, removingComment } = useComments();
  const { t } = useTranslation();

  const columns: ColumnDef<IComment>[] = [
    {
      header: t("name"),
      accessorKey: "name",
      cell: (info) => {
        const name = info.row.original.name;
        return <span className="w-[20%]">{name.substring(0, 24)}</span>;
      },
    },
    {
      header: t("email"),
      accessorKey: "email",

      cell: (info) => {
        return <span className="w-[20%]">{info.getValue() as string}</span>;
      },
    },
    {
      header: t("body"),
      accessorKey: "body",
      cell: (info) => {
        const body = info.row.original.body;

        return <span className="w-[50%]">{body.substring(0, 50)}....</span>;
      },
    },
    {
      header: "",
      accessorKey: "actions",
      cell: (info) => {
        const rowId = info.row.original.id;

        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <div className="flex gap-2 hover:text-[#8c640c]">
                <Link
                  to={`/comments/${rowId}`}
                  className="hover:text-[#8c640c]"
                >
                  <EyeOutlined /> {t("viewComment")}
                </Link>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div className="flex flex-col gap-2">
                <Popconfirm
                  placement="left"
                  title={"Delete Comment"}
                  description={"Are you sure you want to delete comments"}
                  okText="Yes"
                  onConfirm={() => handleDeleteComment(rowId)}
                  cancelText="No"
                >
                  <div className="flex gap-2 hover:text-[#8c640c] w-full">
                    <DeleteFilled />
                    {t("deleteComment")}
                  </div>
                </Popconfirm>
              </div>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
            <Button>
              <MenuOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  if (removingComment) {
    <Loader />;
  }
  return <CustomTable<IComment> columns={columns} initialData={data} />;
}
