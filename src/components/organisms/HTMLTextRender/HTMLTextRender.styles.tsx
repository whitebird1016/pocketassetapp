import styled from "styled-components";

export const HTMLTextRendererWrapper = styled.div`
  .wysiwyg {
    border-radius: 4px;

    &__toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      margin-bottom: 0;
      border-bottom: 0;

      display: flex;
      flex-direction: column-reverse;
    }

    &__editor {
      background-color: transparent;
      padding: 0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      min-height: 10px;
      max-height: 350px;

      .DraftEditor-editorContainer {
        z-index: 0;
      }
    }
  }
`;
