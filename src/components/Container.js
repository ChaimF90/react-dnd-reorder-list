import { useState } from "react";
import styled from "styled-components";
import immer from "immer";
import Card from "./Card";

const CardsContainer = styled.div`
    display: flex;
    width: 500px;
    height: 500px;
    margin: auto;
    margin-top: 25px;
    flex-direction: column;
`;

function Container(props) {

    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            text: '???',
        },
        {
            id: 7,
            text: 'PROFIT',
        },
    ]);

    function swapCards(dragIndex, hoverIndex) {
        const hoveredCard = cards[hoverIndex];
        const draggedCard = cards[dragIndex];
        const cardsCopy = immer(cards, draft => {
            draft[hoverIndex] = draggedCard;
            draft[dragIndex] = hoveredCard;
        });

        setCards(cardsCopy);
    }

    return (
        <CardsContainer>
           {cards.map((c, index) => <Card key={c.id} card={c} index={index} swapCards={swapCards} />)}
        </CardsContainer>
    );
};

export default Container;
