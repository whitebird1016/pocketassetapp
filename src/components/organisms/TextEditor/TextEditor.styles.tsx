import styled from "styled-components";

export const TextEditorWrapper = styled.div<{
  type?: "compact";
}>`
  .wysiwyg {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin-bottom: 0;
    border-bottom: 0;

    display: flex;
    flex-direction: column-reverse;

    &__toolbar {
      border-radius: 4px;
      padding: 10px;

      .rdw {
        &-inline-wrapper {
          div {
            &:nth-child(n + 5) {
              display: none;
            }
          }
        }

        &-list-wrapper {
          div {
            &:nth-child(n + 3) {
              display: none;
            }
          }
        }

        &-text-align-wrapper {
          display: none;
        }

        &-colorpicker-wrapper {
          display: none;
        }

        &-embedded-wrapper {
          display: none;
        }

        &-image-wrapper {
          display: none;
        }

        &-remove-wrapper {
          display: none;
        }
      }
      > * {
        color: #000;
      }
    }

    &__editor {
      border: 1px solid transparent;
      margin-bottom: 10px;
      

      background-color: #f2f2f2;
      padding: 0 20px;
      border-radius: 5px;
      min-height: 197px;
      max-height: 350px;

      ${({ type }) =>
        type === "compact" &&
        `
          border-left: 1px solid blue;
          border-right: 1px solid blue;
          border-top: 1px solid blue;
          border-bottom: 0px;
          border-radius: 4px 4px 0px 0px;
          margin-bottom: 0px;
          `}
    }
    ${({ type }) =>
      type === "compact" &&
      `
        border-radius: 0px 0px 4px 4px;
    `}
  }
`;
