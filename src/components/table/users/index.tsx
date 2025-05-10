import { ColumnDef } from "@tanstack/react-table";
import CustomTable from "..";
import { IUsers } from "../../../interfaces";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { EyeOutlined, MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface Props {
  data: IUsers[];
}

export default function UsersTable({ data }: Props) {
  const { t } = useTranslation();
  const columns: ColumnDef<IUsers>[] = [
    {
      header: t("name"),
      accessorKey: "name",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: t("username"),
      accessorKey: "username",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: t("email"),
      accessorKey: "email",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: t("address"),
      accessorKey: "address",
      cell: (info) => {
        const address = info.row.original.address;
        return (
          <span>
            {address.suite}, {address.street}, {address.city}
          </span>
        );
      },
    },
    {
      header: t("phone"),
      accessorKey: "phone",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: t("website"),
      accessorKey: "website",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: t("company"),
      accessorKey: "company",
      cell: (info) => {
        const company = info.row.original.company;
        return <span>{company.name}</span>;
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
              <div className="flex gap-2 hover:text-[#8c640c] w-full">
                <Link
                  to={`/users/${rowId}`}
                  className="hover:text-[#8c640c] w-full"
                >
                  <EyeOutlined /> {t("viewUser")}
                </Link>
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

  return <CustomTable<IUsers> columns={columns} initialData={data} />;
}
