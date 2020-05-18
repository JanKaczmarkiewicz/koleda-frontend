import React from "react";
import RowOptions, { Props as RowOptionsProps } from "./RowOptions";
import { Delete, Edit, Done } from "@material-ui/icons";
import { TableRow, TableCell } from "@material-ui/core";
import { Config } from "../EditableDataTable";
import { getKeys } from "../util";

export interface Props<T> {
  data: T;
  config: Config<T>;
  isFormOpen: boolean;
  startEditItem: () => void;
  onFormClose: () => void;
  deleteItem?: DeleteHandler;
  updateItem?: UpdateHandler<T>;
}

function TRow<T>({
  startEditItem,
  isFormOpen,
  onFormClose,
  updateItem,
  deleteItem,
  data,
  config,
}: Props<T>) {
  const cellsContent = getKeys(data)
    .sort((prevKey, nextKey) => config[prevKey].index - config[nextKey].index)
    .map((key) => {
      const fieldConfig = config[key];
      const fieldData = data[key];

      if (isFormOpen && updateItem && fieldConfig.renderInput)
        return fieldConfig.renderInput({
          value: fieldData,
          name: key,
          onChange: updateItem,
        });

      if (fieldConfig.displayValue) return fieldConfig.displayValue(fieldData);

      return fieldData;
    });

  let rowOptionsProps: RowOptionsProps = {};

  if (updateItem) {
    if (isFormOpen) {
      rowOptionsProps.closeForm = {
        renderIcon: () => <Done />,
        handler: onFormClose,
      };
    } else {
      rowOptionsProps.openForm = {
        renderIcon: () => <Edit />,
        handler: startEditItem,
      };
    }
  }
  if (deleteItem && !isFormOpen) {
    rowOptionsProps.delete = {
      renderIcon: () => <Delete />,
      handler: deleteItem,
    };
  }

  const rowOptions = <RowOptions {...rowOptionsProps} />;

  const cells = cellsContent.map(renderCell);

  return (
    <TableRow>
      {cells}
      {rowOptions}
    </TableRow>
  );
}
export default TRow;

const renderCell = (el: React.ReactNode) => <TableCell>{el}</TableCell>;

export interface FieldConfig<T, P> {
  label: string;
  index: number;
  displayValue?: (data: T) => string | React.ReactNode;
  renderInput?: (props: P) => React.ReactNode;
}

export type PassUpdate<T> = (update: Partial<T>) => void;

export interface InputProps<T, A, N> {
  value: T;
  name: N;
  onChange: PassUpdate<A>;
}

export type DeleteHandler = () => void;
export type UpdateHandler<T> = (update: Partial<T>) => void;