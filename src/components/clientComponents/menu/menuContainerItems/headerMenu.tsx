import { FC } from "react";
import { Avatar, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import { useAuth } from "@src/context/auth";

interface Props {
  collapsed?: boolean;
}

const { useBreakpoint } = Grid;

const RowHeader: FC<Props> = ({ collapsed }) => {
  const { userFirebase } = useAuth();
  const screens = useBreakpoint();

  return (
    <Row
      justify="center"
      style={
        screens.xs ?
          { textAlign: "center" } :
          { textAlign: "center", backgroundColor: "#304878", margin: 5, paddingTop: 20, paddingBottom: 10, borderRadius: "8px" }
      }
    >
      <Avatar style={{ backgroundColor: "#87D068" }} size={collapsed ? 48 : 64} icon={<UserOutlined />} />
      {
        !collapsed && <div style={screens.xs ? { color: "black" } : { color: "white" }}>
          <div style={{ margin: 10 }}>
            <b>{userFirebase?.email}</b>
          </div>
        </div>
      }
    </Row>
  );
};

export default RowHeader;