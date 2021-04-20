import "./actionBar.css";
import React, { FC } from "react";
import { useAction } from "../../hooks/useActions";

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useAction();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>

      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times" />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
