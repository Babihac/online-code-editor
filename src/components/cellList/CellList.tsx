import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../addCell/AddCell";
import CellListItem from "../cellListItem/CellListItem";
import "./cellList.css";

const CellList: FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <div className={renderedCells.length == 0 ? "force-visible" : ""}>
        <AddCell prevCellId={null} />
      </div>
      {renderedCells}
    </div>
  );
};

export default CellList;
