import React, { useEffect, useState, useCallback } from "react";
import { HTMLTextRendererWrapper } from "./HTMLTextRender.styles";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";

import htmlToDraft from "html-to-draftjs";

export interface IHTMLTextRendererProps extends EditorProps {
  htmlString?: string;
}

export default function HTMLTextRenderer({
  htmlString = "",
  ...rest
}: IHTMLTextRendererProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (htmlString) {
      const blocksFromHTML = htmlToDraft(htmlString);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );

      setEditorState(EditorState.createWithContent(content));
    }
  }, [htmlString]);

  return (
    <HTMLTextRendererWrapper>
      <Editor
        toolbarHidden
        readOnly
        editorState={editorState}
        toolbarClassName="wysiwyg"
        wrapperClassName="wysiwyg__toolbar"
        editorClassName="wysiwyg__editor"
        {...rest}
      />
    </HTMLTextRendererWrapper>
  );
}
