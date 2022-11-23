import React, { useEffect, useState, useCallback } from "react";
import { TextEditorWrapper } from "./TextEditor.styles";
import { Editor, EditorProps, RawDraftContentState } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import debounce from "lodash/debounce";

export interface IEditorComponentProps extends EditorProps {
  type?: "compact";
  htmlString?: string;
  options?: (
    | "inline"
    | "blockType"
    | "fontSize"
    | "fontFamily"
    | "list"
    | "textAlign"
    | "colorPicker"
    | "link"
    | "embedded"
    | "emoji"
    | "image"
    | "remove"
    | "history"
  )[];
  onEditorChange?: (htmlString: string) => void;
  debounceTimeout?: number;
  placeholder?: string;
  className?: string;
}

const DEFAULT_OPTIONS = [
  "inline",
  "blockType",
  "fontSize",
  // "fontFamily",
  "list",
  "textAlign",
  "colorPicker",
  "link",
  "embedded",
  "emoji",
  "image",
  "remove",
  "history",
];

export default function TextEditor({
  type,
  htmlString = "",
  onEditorChange,
  debounceTimeout = 100,
  options = [],
  placeholder,
  ...rest
}: IEditorComponentProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [localDraftContent, setLocalDraftContent] = useState("");
  const debounceSet = useCallback(
    debounce(onEditorStateChange, debounceTimeout),
    [],
  );

  useEffect(() => {
    if (htmlString !== localDraftContent) {
      const blocksFromHTML = htmlToDraft(htmlString);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );

      debounceSet(EditorState.createWithContent(content));
    }
  }, [htmlString, localDraftContent]);

  return (
    <TextEditorWrapper type={type}>
      <Editor
        editorState={editorState}
        toolbarClassName="wysiwyg__toolbar"
        wrapperClassName="wysiwyg"
        editorClassName="wysiwyg__editor"
        onEditorStateChange={onEditorStateChange}
        handlePastedText={() => false}
        toolbar={{
          options: options?.length ? options : DEFAULT_OPTIONS,
        }}
        placeholder={placeholder}
        {...rest}
      />
    </TextEditorWrapper>
  );

  function onEditorStateChange(newState: EditorState) {
    const currentContent = convertToRaw(newState.getCurrentContent());
    let draftContent = draftToHtml(currentContent);

    if (draftContent.trim() === "<p></p>") draftContent = "";

    setEditorState(newState);
    onEditorChange?.(draftContent);
    setLocalDraftContent(draftContent);
  }
}
