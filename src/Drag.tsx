import { motion } from "framer-motion";
import {
  Dispatch,
  FC,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
export interface DragStateProps {
  id: number;
}
interface DragProps {
  val: DragStateProps;
  items: DragStateProps[];
  setItems: Dispatch<SetStateAction<DragStateProps[]>>;
  point: number;
  setPoint: Dispatch<SetStateAction<number>>;
  constraintsRef: MutableRefObject<null>;
  endRef: RefObject<HTMLDivElement>;
}
export const Drag: FC<DragProps> = ({
  val,
  items,
  setItems,
  point,
  setPoint,
  constraintsRef,
  endRef,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const onCheck = () => {
    if (!dragRef.current) return;
    const style = window.getComputedStyle(dragRef.current as HTMLElement);
    const matrix = new WebKitCSSMatrix(style.transform);
    console.log(matrix.m41);
    console.log(matrix.m42);

    if (endRef.current) {
      // 要素の位置座標を取得
      const clientRect = endRef.current.getBoundingClientRect();

      // 画面の左端から、要素の左端までの距離
      const x = clientRect.left;

      // 画面の上端から、要素の上端までの距離
      const y = clientRect.top;

      console.log(x, y);

      if (matrix.m41 === x && matrix.m42 === y) {
        console.log("ok");
        const newItems = items
          .filter((item) => item.id !== val.id)
          
        console.log(newItems);
        setItems(newItems);
        setPoint(point + 1)
      }
    }
  };
  return (
    <motion.div
      ref={dragRef}
      dragConstraints={constraintsRef}
      drag
      style={{
        width: "120px",
        height: "120px",
        background: "#000",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        position: "absolute",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [50, 0] }}
      exit={{ opacity: 0, y: [50, 0] }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onDrag={(event, info) => {
        console.log(info);
      }}
      onDragEnd={(event, info) => {
        console.log(info);
      }}
      onDragTransitionEnd={() => {
        console.log("Drag transition complete");
        onCheck();
      }}
    >
      Drag{val.id}
    </motion.div>
  );
};