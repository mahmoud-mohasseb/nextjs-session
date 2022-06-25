import { useRef, useState, useEffect, useCallback } from "react";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import { SketchPicker } from "react-color";
import CanvasDraw from "react-canvas-draw";
import Tools from "../utilities/tools";
import useWindowSize from "../hooks/usewindows";

const Paint = () => {
  const size = useWindowSize();
  const [brushColor, setBrusholor] = useState("#444");
  const [lastPenColor, setLastPenColor] = useState("#444");
  const [canvasImage, setCanvassImage] = useState("");
  const [brushRadius, setBrushRadius] = useState(30);
  const canvasRef = useRef(null);

  const handleColorChange = useCallback((color) => {
    const {
      rgb: { r, g, b, a },
    } = color;
    console.log(color.hex);
    setBrusholor(`rgba(${r}, ${g}, ${b},${a})`);
    setLastPenColor(`rgba(${r}, ${g}, ${b},${a})`);
  }, []);

  const toolChange = useCallback(
    (tool, size) => {
      if (tool === "eraser") {
        setBrusholor("#ffffff");
      }
      if (tool === "pen") {
        setBrusholor(lastPenColor);
      }
    },
    [lastPenColor]
  );
  console.log(lastPenColor);
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      justifyContent="center"
      overflow={"scroll"}
      p={5}
      top={0}
      m={20}
    >
      <Flex>
        <SketchPicker
          width="250px"
          // height="250px"
          onChangeComplete={handleColorChange}
          color={brushColor}
        />
        <CanvasDraw
          ref={canvasRef}
          brushColor={brushColor}
          brushRadius={brushRadius}
          lazyRadius={5}
          saveData=""
          // imgSrc="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          canvasWidth={size.width}
          // canvasHeight={size.height}
          canvasHeight={size.height}
        />
        <Tools
          setBrushRadius={setBrushRadius}
          handleToolChange={toolChange}
          canvasRef={canvasRef}
          brushRadius={brushRadius}
        />
      </Flex>
    </Box>
  );
};
export default Paint;
