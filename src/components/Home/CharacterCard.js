import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

const CharacterCard = ({ name, id }) => {
  const navigate = useNavigate();
  return (
    <Card style={{ cursor: "pointer" }} onClick={() => navigate(`/character/${id}`)}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
