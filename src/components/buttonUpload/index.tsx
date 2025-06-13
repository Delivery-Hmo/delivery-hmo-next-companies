import { FC, useMemo } from 'react';
import { Button, UploadFile } from "antd";
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  value: UploadFile<any>[];
  multiple?: boolean;
  maxCount?: number;
}

const ButtonUpload: FC<Props> = ({ value, multiple, maxCount }) => {
  const disabled = useMemo(() => {
    const count = value.length;

    let _maxCount = maxCount || 1;

    return count >= _maxCount;
  }, [value, maxCount]);

  const textButton = useMemo(() => {
    if (multiple) {
      return "Upload";
    }

    return value?.length && maxCount === 1 ? "Change" : "Upload";
  }, [multiple, maxCount, value]);

  return (
    <Button
      style={{ width: "100%" }}
      disabled={Boolean(multiple) && disabled}
      icon={<UploadOutlined />}
    >
      {textButton}
    </Button>
  );
};

export default ButtonUpload;