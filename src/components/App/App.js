import React, { Component } from 'react';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';

import '../../fonts/roboto.css';
import './App.scss';

import PointAddForm from '../PointAddForm';
import PointsList from '../PointsList';
import MapBlock from '../MapBlock';

export default class App extends Component {

  id = 0;

  state = {
    ymaps: null,
    mapCenter: [55.76, 37.64],
    pointsList: []
  };

  // Вспомогательная функция для dnd
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = this.onDragEnd.bind(this);

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const pointsList = this.reorder(
      this.state.pointsList,
      result.source.index,
      result.destination.index
    );

    this.setState({
      pointsList
    });
  }

  setYmaps = (ymaps) => {
    this.setState({ymaps});
  }
  setMapCenter = (mapCenter) => {
    this.setState({mapCenter});
  }

  addPoint = (name) => {
    this.setState(({pointsList, mapCenter}) => {
      //Проверка на повтор адреса
      const isDuplicate = pointsList.some(item => item.name === name);
      if (isDuplicate) {
        alert('point with this name is already in list');
        return;
      }

      pointsList.push({ id: this.id++, name, coord: mapCenter });
      return ({
        pointsList: pointsList
      });
    });
  }

  deletePoint = (id) => {
    this.setState(({pointsList}) => {
      return {
        pointsList: pointsList.filter(item => item.id !== id)
      }
    });
  }

  movePoint = (id, coord) => {
    this.setState(({pointsList}) => {
      const idx     = pointsList.findIndex(item => item.id === id),
            oldItem = pointsList[idx],
            newItem = { ...oldItem, coord},
            newArr  = [
              ...pointsList.slice(0, idx),
              newItem,
              ...pointsList.slice(idx + 1)
            ];

      return {
        pointsList: newArr
      }
    });
  }

  render() {
    const { pointsList } = this.state;

    return (
      <div className="app">
        <div className="point-form">
          <PointAddForm onPointAdded={(name) => this.addPoint(name)} />

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <PointsList
                    pointsList={pointsList}
                    onDeleted={this.deletePoint}
                  />

                  {provided.placeholder}
                </div>
              )}

            </Droppable>
          </DragDropContext>
        </div>

        <MapBlock
          pointsList={pointsList}
          onYmapsLoad={this.setYmaps}
          mapCenter={this.setMapCenter}
          onPlacemarkDragend={this.movePoint}
        />
      </div>
    );
  }
}
