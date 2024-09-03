import { Button, Flex, Upload, UploadProps } from "antd";

export interface UploadButtonProps extends UploadProps {
  title?: string;
}

export const UploadButton = (props: UploadButtonProps) => {
  return (
    <Flex flex={1}>
      <Upload {...props}>
        <Button
          type="primary"
          style={{
            width: "100%",
          }}
        >
          {props.title || "Upload"}
        </Button>
      </Upload>
    </Flex>
  );
};
