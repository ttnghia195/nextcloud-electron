import { Button, Col, Flex, Row } from "antd";
import { UploadButton, UploadButtonProps } from "./components/UploadButton";
import React, { useState } from "react";
import { FileItem, FileProps } from "./components/FileItem";
import { UploadChangeParam } from "antd/es/upload";

// Constants
const chunkSize = 1024 * 1024; // 1MB

const props: UploadButtonProps = {
  name: "file",
  multiple: true,
  showUploadList: false,
};

export const App = () => {
  const [fileList, setFileList] = useState<FileProps[]>([]);

  const beforeUpload = () => {
    return false;
  };

  const onFileChange = ({ fileList: files }: UploadChangeParam<FileProps>) => {
    const newFiles = files.filter(
      (file) => fileList.findIndex((f) => f.name === file.name) === -1
    );

    const newFileList = [...fileList, ...newFiles].map((file) => ({
      ...file,
      uploaded: 0,
    }));

    setFileList(newFileList);
  };

  const handleUpload = () => {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      const chunks = Math.ceil(file.size / chunkSize);

      for (let j = 0; j < chunks; j++) {
        // Simulate upload
        setTimeout(() => {
          const uploaded = ((j + 1) / chunks) * 100;
          setUploading(i, uploaded);
        }, 1000 * j);
      }
    }
  };

  const setUploading = (index: number, uploaded: number) => {
    const newUploaded = [...fileList];
    newUploaded[index].uploaded = uploaded;
    setFileList(newUploaded);
  };

  return (
    <Flex
      flex={1}
      gap={16}
      style={{
        padding: 16,
      }}
    >
      <Col style={appStyle.column}>
        <Row
          justify={"space-between"}
          style={{
            columnGap: 16,
            marginBottom: 16,
          }}
        >
          <UploadButton
            title="Upload File"
            beforeUpload={beforeUpload}
            onChange={onFileChange}
            {...props}
          />
          <UploadButton
            title="Upload Directory"
            beforeUpload={beforeUpload}
            onChange={onFileChange}
            directory
            {...props}
          />
        </Row>
        <div style={appStyle.fileList}>
          {fileList.map((file, index) => (
            <FileItem key={index} file={file} />
          ))}
        </div>
      </Col>
      <Col style={appStyle.column}>
        <Button type="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Col>
    </Flex>
  );
};

interface AppStyle {
  [key: string]: React.CSSProperties;
}

const appStyle: AppStyle = {
  column: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    maxWidth: "50vw",
    overflow: "hidden",
  },
  uploadButton: {
    display: "flex",
    flex: 1,
  },
  fileList: {
    flex: 1,
    overflowY: "auto",
    border: "2px dashed #d9d9d9",
    borderRadius: 6,
    padding: 8,
  },
};
