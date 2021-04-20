import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { FC, useEffect, useState } from "react";
import "./resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  console.log("haha");
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth((w) => window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.25, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      height: Infinity,
      width: width,
      onResizeStop: (event, data) => {
        // console.log(width);
        console.log(data.size.width);
        setWidth((width) => data.size.width);
        console.log(width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 35],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
      height: 100,
      width: Infinity,
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
