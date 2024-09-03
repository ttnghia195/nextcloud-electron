import { CheckCircleFilled } from "@ant-design/icons";
import { Flex, Progress, UploadFile } from "antd";
import { styled } from "styled-components";

export interface FileProps extends UploadFile {
  uploaded: number;
}

interface FileItemProps {
  file: FileProps;
}

export const FileItem = (props: FileItemProps) => {
  return (
    <FileItemWrapper>
      <div>{props.file.name}</div>
      {
        // Show progress only if the file is not uploaded
        props.file.uploaded !== 100 && (
          <Progress
            percent={props.file.uploaded}
            type={"circle"}
            size={16}
            showInfo={false}
          />
        )
      }
      {
        // Show check mark if the file is uploaded
        props.file.uploaded === 100 && (
          <CheckCircleFilled
            style={{
              color: "#52c41a",
              fontSize: 16,
            }}
          />
        )
      }
    </FileItemWrapper>
  );
};

const FileItemWrapper = styled(Flex)`
  padding: 8px;
  border-radius: 6px;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 8px;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;
