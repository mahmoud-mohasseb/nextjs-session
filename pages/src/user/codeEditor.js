import Webcam from "react-webcam";
import { Button, Box, useColorModeValue } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import useWindowSize from "../hooks/usewindows";
import files from "./files";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const { size, windowSize } = useWindowSize();
  const [posesString, setPosesString] = useState([]);
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("script.js");
  const file = files[fileName];
  //   console.log(file.value);
  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      justifyContent="center"
      p={5}
      top={0}
      m={10}
    >
      <Button
        disabled={fileName === "script.js"}
        onClick={() => setFileName("script.js")}
      >
        script.js
      </Button>

      <Button
        disabled={fileName === "style.css"}
        onClick={() => setFileName("style.css")}
      >
        style.css
      </Button>

      <Button
        disabled={fileName === "index.html"}
        onClick={() => setFileName("index.html")}
      >
        index.html
      </Button>

      <Editor
        height="60vh"
        // width="100vh"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </Box>
  );
}
