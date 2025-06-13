import { useDynamicForm } from "@src/context/dynamicForm";
import { Button } from "antd";
import React from 'react';

const SubmitButton = () => {
  const { form } = useDynamicForm();

  return (
    <Button
      color="primary"
      variant="solid"
      onClick={() => {
        form.submit();
      }}
    >
      SCHEDULE INSPECTION
    </Button>
  );
};

export default SubmitButton;