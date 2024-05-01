'use client'
import  { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';


interface Color {
  id: string;
  value: string;
}

const initialColors: Color[] = [
  { id: '1', value: '#FF5733' },
  { id: '2', value: '#FFBD33' },
  { id: '3', value: '#33FF77' },
  { id: '4', value: '#3377FF' },
  { id: '5', value: '#FF33EC' },
  { id: '6', value: '#33FFEC' },
  { id: '7', value: '#EC33FF' },
  { id: '8', value: '#FF3385' },
];

const ColorPalette: React.FC = () => {
  const [colors, setColors] = useState<Color[]>(initialColors);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(colors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setColors(items);
  };

  const handleColorChange = (id: string, newValue: string) => {
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, value: newValue } : color
    );
    setColors(updatedColors);
  };

  return (
    <html>
      <body>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="colors">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {colors.map((color, index) => (
              <Draggable key={color.id} draggableId={color.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: color.value,
                      width: '100px',
                      height: '100px',
                      margin: '8px',
                      display: 'inline-block',
                    }}
                  >
                    <input
                      type="color"
                      value={color.value}
                      onChange={(e) => handleColorChange(color.id, e.target.value)}
                      style={{ width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </body>
    </html>

  );
};

export default ColorPalette;
