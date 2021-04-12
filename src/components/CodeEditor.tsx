import MonacoEditor, { EditorDidMount, monaco } from "@monaco-editor/react";
import React, { FC, useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./CodeEditor.css";
import "./syntax.css";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initValue: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initValue, onChange }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    const unformated = editorRef.current.getModel().getValue();
    const formated = prettier.format(unformated, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
    });
    editorRef.current.setValue(formated);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initValue}
        theme="dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;