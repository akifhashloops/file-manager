import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCharacterById } from "../../utils/Api";
import { Card, Button, Container } from "react-bootstrap";

const Index = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const getCharacter = async () => {
    const response = await getCharacterById(id);
    if (response) {
      setCharacter(response);
    }
  };
  useEffect(() => {
    getCharacter();
  }, []);
  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: "25rem" }} className="mt-5">
        <Card.Body>
          <Card.Title>{character?.name}</Card.Title>

          <Card.Text>Species:</Card.Text>
          <ul>
            {character?.species?.map((movie) => (
              <li key={movie.name}>{movie.name}</li>
            ))}
          </ul>
          <Card.Text>Movies:</Card.Text>
          <ul>
            {character?.films?.map((movie) => (
              <li key={movie.title}>{movie.title}</li>
            ))}
          </ul>
          <Card.Text>Spaceships:</Card.Text>
          <ul>
            {character?.starships?.map((ship) => (
              <li key={ship.name}>{ship.name}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Index;
