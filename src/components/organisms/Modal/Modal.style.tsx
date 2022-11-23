import styled from "styled-components";

export const ComponentWrapper = styled.div`
  max-height: 100%;
  overflow: auto;
  padding: 1.5rem 1.2rem;
  width: fit-content;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  min-width: 15rem;
  border-radius: 20px;
`;

export const ModalHeader = styled.div<{ title: string | undefined }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px 20px 10px;

  ${(props) =>
    !props.title
      ? `
    justify-content: flex-end;
    align-items: flex-end;
    margin: 0px 10px 0px;
  `
      : ""}
`;

export const ModalTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
`;

export const ModalCloseButton = styled.div`
  cursor: pointer;
`;

export const ModalBody = styled.div`
  padding: 0px 10px 10px 10px;
`;
