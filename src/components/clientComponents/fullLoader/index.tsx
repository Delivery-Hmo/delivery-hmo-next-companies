import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FullLoader = () => {
  return <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "86vh",
  }}>
    <Spin indicator={antIcon} style={{ color: "#3498DB" }} />
  </div>;
};

export default FullLoader;
