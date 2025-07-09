import { FC } from "react";
import { Avatar, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import { useAuth } from "@src/context/auth";
import useIsSmallScreen from "@src/hooks/useIsSmallScreen";

interface Props {
  collapsed?: boolean;
}

const { useBreakpoint } = Grid;

const RowHeader: FC<Props> = ({ collapsed }) => {
  const { userFirebase } = useAuth();
  const isSmall = useIsSmallScreen();

  return (
    <Row
      justify="center"
      style={
        isSmall ?
          { textAlign: "center" } :
          {
            textAlign: "center",
            margin: 10,
            paddingTop: 20,
            paddingBottom: 10,
            backgroundColor: "white",
            borderRadius: 10
          }
      }
    >
      <Avatar style={{ backgroundColor: "var(--color-secondary)" }} size={collapsed ? 48 : 64} icon={<UserOutlined />} />
      {
        !collapsed && <div>
          <div style={{ margin: 10 }}>
            <b
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "var(--color-text-secondary)"
              }}
            >
              {userFirebase?.email}
            </b>
          </div>
        </div>
      }
    </Row>
  );
};

export default RowHeader;