import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';

export const TargetTemplate = ({ planData }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.PlanAttacker,
        drop: () => ({ name: 'All Plan', targetID: -1 }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop} >
            {planData.name}
        </div>
    );
};

