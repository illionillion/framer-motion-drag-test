import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { Drag, DragStateProps } from "./Drag";

function App() {
  const constraintsRef = useRef(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [itemCount, setItemCount] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const [items, setItems] = useState<DragStateProps[]>([]);
  const onClick = () => {
    setItemCount(itemCount + 1);
  };
  useEffect(() => {
    if (itemCount === 0) return;
    setItems([...items, { id: itemCount }]);
  }, [itemCount]);
  return (
    <div>
      <motion.div
        ref={constraintsRef}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Center
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          flexDirection="column"
          zIndex={2}
        >
          <Text
            css={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "gray",
            }}
          >
            point:{" "}
            <Text as="span" fontSize="2xl" color="floralwhite">
              {point}
            </Text>
          </Text>
          <Button onClick={onClick}>+</Button>
        </Center>
        <div
          style={{
            width: "120px",
            height: "120px",
            background: "gray",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          START
        </div>
        <div
          style={{
            width: "120px",
            height: "120px",
            background: "gray",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          ref={endRef}
        >
          GOAL
        </div>
        {items.map((val, key) => (
          <Drag
            key={key}
            val={val}
            items={items}
            point={point}
            setPoint={setPoint}
            setItems={setItems}
            constraintsRef={constraintsRef}
            endRef={endRef}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default App;
