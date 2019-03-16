import React from 'react';

import './PointsList.scss';
import { Draggable } from 'react-beautiful-dnd';
import PointsListItem from '../PointsListItem';

const PointsList = ({pointsList, onDeleted}) => {
  const points = pointsList.map(({id, name}, index) => {
    return (
      <Draggable key={id} draggableId={String(id)} index={index} >

        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <PointsListItem
              key={id}
              name={name}
              onDeleted={() => onDeleted(id)}
            />
          </div>
        )}
      </Draggable>

    );
  });
  return (
    <ul className="point-list">
      {points}
    </ul>
  );
}

export default PointsList;