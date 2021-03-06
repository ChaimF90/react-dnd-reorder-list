import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export default ({ card, index, swapCards }) => {
    const ref = useRef(null);
    const [{ handlerId, isOver }, drop] = useDrop({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                isOver: monitor.isOver()
            };
        },
        drop(item, monitor) {
            const dragIndex = item.index;
            console.log(index);
            const hoverIndex = index;
            swapCards(dragIndex, hoverIndex);
        },
        // hover(item, monitor) {
        //     if (!ref.current) {
        //         return;
        //     }
        //     const dragIndex = item.index;
        //     const hoverIndex = index;
        //     // Don't replace items with themselves
        //     if (dragIndex === hoverIndex) {
        //         return;
        //     }
        //     // Determine rectangle on screen
        //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
        //     // Get vertical middle
        //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        //     // Determine mouse position
        //     const clientOffset = monitor.getClientOffset();
        //     // Get pixels to the top
        //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        //     // Only perform the move when the mouse has crossed half of the items height
        //     // When dragging downwards, only move when the cursor is below 50%
        //     // When dragging upwards, only move when the cursor is above 50%
        //     // Dragging downwards
        //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //         return;
        //     }
        //     // Dragging upwards
        //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //         return;
        //     }
        //     // Time to actually perform the action
        //     swapCards(dragIndex, hoverIndex);
        //     // Note: we're mutating the monitor item here!
        //     // Generally it's better to avoid mutations,
        //     // but it's good here for the sake of performance
        //     // to avoid expensive index searches.
        //     item.index = hoverIndex;
        // },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
            return { id: card.id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isOver || isDragging ? 0 : 1;
    drag(drop(ref));
    return (<div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
			{card.text}
		</div>);
};
