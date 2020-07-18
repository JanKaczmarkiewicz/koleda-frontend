import React from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { ListItem, ListItemText } from "@material-ui/core";
import { Day_day_pastoralVisits_entrances as Entrance } from "../../../../generated/Day";

interface Props {
  entrance: Entrance;
  index: number;
}

const Item: React.FC<Props> = ({ entrance, index }) => {
  const { id, comment, house } = entrance;
  if (!house) return null;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          style={getStyle(provided.draggableProps?.style, snapshot)}
        >
          <ListItemText primary={house.number} secondary={comment} />
        </ListItem>
      )}
    </Draggable>
  );
};

//to prevent default rbd element animation
export function getStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDragging) return {};
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    transitionDuration: `0.001s`,
  };
}

export default Item;