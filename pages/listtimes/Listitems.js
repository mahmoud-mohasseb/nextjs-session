import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd-next";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Feature,
  Image,
  Center,
  Container,
} from "@chakra-ui/react";
import { uuid } from "uuidv4";

const itemsFromBackend = [
  { id: uuid(), content: "Plan Money", image: "https://bit.ly/2Z4KKcF" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    // items: [{ id: uuid(), content: "First task" }],
  },
  [uuid()]: {
    name: "In Progress",
    // items: [{ id: uuid(), content: "First task" }],
  },
  [uuid()]: {
    name: "Done",
    items: [{ id: uuid(), content: "First task" }],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  //   if (!result.destination) return;
  //   const { source, destination } = result;
  //   if (source.droppableId !== destination.droppableId) {
  //     const sourceColumn = columns[source.droppableId];
  //     const destColumn = columns[destination.droppableId];
  //     const sourceItems = [...sourceColumn.items];
  //     const destItems = [...destColumn.items];
  //     const [removed] = sourceItems.splice(source.index, 1);
  //     destItems.splice(destination.index, 0, removed);
  //     setColumns({
  //       ...columns,
  //       [source.droppableId]: {
  //         ...sourceColumn,
  //         items: sourceItems,
  //       },
  //       [destination.droppableId]: {
  //         ...destColumn,
  //         items: destItems,
  //       },
  //     });
  //   } else {
  //     const column = columns[source.droppableId];
  //     const copiedItems = [...column.items];
  //     const [removed] = copiedItems.splice(source.index, 1);
  //     copiedItems.splice(destination.index, 0, removed);
  //     setColumns({
  //       ...columns,
  //       [source.droppableId]: {
  //         ...column,
  //         items: copiedItems,
  //       },
  //     });
  //   }
};

function ListItem() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Flex>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Box
              maxW="sm"
              //   borderWidth="1px"
              borderRadius="lg"
              //   overflow="hidden"
              //   style={{
              //     display: "flex",
              //     flexDirection: "column",
              //     alignItems: "center",
              //   }}
              key={columnId}
            >
              <Text>{column.name}</Text>
              <Container m={8}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <Box
                        rounded={"3xl"}
                        bg={snapshot.isDraggingOver ? "gray.700" : "white"}
                        boxShadow={"lg"}
                        boxShadowColor={"gray.300"}
                        p={8}
                        w={250}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // style={{
                        //   background: snapshot.isDraggingOver
                        //     ? "lightblue"
                        //     : "lightgrey",
                        //   padding: 4,
                        //   width: 250,
                        //   minHeight: 500,
                        // }}
                      >
                        {column.items?.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    boxShadow={"lg"}
                                    bg={
                                      snapshot.isDragging ? "gray.700" : "white"
                                    }
                                    boxShadowColor={"gray.300"}
                                    p={16}
                                    marginTop={2}
                                    rounded={"3xl"}
                                    h={50}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    color={{
                                      ...provided.draggableProps.style,
                                    }}
                                    // style={{
                                    //   userSelect: "none",
                                    //   padding: 16,
                                    //   margin: "0 0 8px 0",
                                    //   minHeight: "50px",
                                    //   backgroundColor: snapshot.isDragging
                                    //     ? "#263B4A"
                                    //     : "#456C86",
                                    //   color: "white",
                                    //   ...provided.draggableProps.style,
                                    // }}
                                  >
                                    {item.content}
                                    {/* <Text color="gray.300">{item.content}</Text> */}
                                  </Box>
                                );
                              }}
                            </Draggable>
                          );
                        })}

                        {provided.placeholder}
                      </Box>
                    );
                  }}
                </Droppable>
              </Container>
            </Box>
          );
        })}
      </DragDropContext>
    </Flex>
  );
}

export default ListItem;
