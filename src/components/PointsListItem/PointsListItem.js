import React from 'react';

import './PointsListItem.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

const PointsListItem = ({ name, onDeleted }) => {
  return (
    <li className="points-list-item">
      <h4>{name}</h4>
      <button
        className="btn btn-delete"
        onClick={onDeleted}
      >
        <FontAwesomeIcon
          className="icon"
          icon="trash"
          size="2x"
          color="#940000"
        />
      </button>
    </li>
  );
}

export default PointsListItem;