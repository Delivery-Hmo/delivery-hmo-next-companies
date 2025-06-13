import { Form, Row, Col, Tag } from "antd";
import FormControl from "../formControl";
import { useDynamicForm } from "@src/context/dynamicForm";

const DynamicForm = <T extends {}>() => {
  const { inputs, onPopupScroll, onSearchSelect, form, onFinish, fileList, setFileList } = useDynamicForm<T>();

  return (
    <Form<T>
      form={form}
      onError={(error) => {
        console.log(error);
      }}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
    >
      <Row justify="center" align="middle" gutter={20}>
        {
          inputs.map((input) => {
            return (
              ["id", "uid"].includes(input.name.toString())
                ?
                <FormControl
                  key={input.name.toString()}
                  input={input}
                  onPopupScroll={onPopupScroll}
                  onSearchSelect={onSearchSelect}
                />
                :
                <Col xs={24} md={input.md || 12} key={input.name.toString()}>
                  <div style={input.showTag ? { paddingTop: 22 } : undefined}>
                    <FormControl
                      input={input}
                      onPopupScroll={onPopupScroll}
                      onSearchSelect={onSearchSelect}
                      fileListImage={fileList}
                      setFileListImage={setFileList}
                    />
                  </div>
                  {input.showTag && <Tag {...input.tagProps} />}
                </Col>
            );
          })
        }
      </Row>
    </Form>
  );
};

export default DynamicForm;