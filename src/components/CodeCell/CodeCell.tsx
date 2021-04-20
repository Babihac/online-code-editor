import { useEffect, FC } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import Resizable from "../Resizable/Resizable";
import { useAction } from "../../hooks/useActions";
import { Cell } from "../../redux/cell";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./codeCell.css";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    let isMounted = true;
    const timer = setTimeout(async () => {
      //stackoverflow: don't know how it works
      if (isMounted) {
        createBundle(cell.id, cumulativeCode);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview error={bundle.error} code={bundle.code} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
