import React, { useEffect, useState } from "react";
import { getAllCharacters, getFilms, getSpecies } from "../../utils/Api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CharacterCard from "./CharacterCard";
import Pagination from "../../utils/Pagination";
import Loader from "../../utils/Loader";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const Home = () => {
  const [characters, setCharacters] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [species, setSpecies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  const fetchCharacters = async () => {
    setLoading(true);
    const data = await getAllCharacters();
    if (data) {
      setCharacters(data);
      setPageCount(Math.round(data.count / 10));
      setLoading(false);
    }
  };
  const fetchFilms = async () => {
    setLoading(true);
    const data = await getFilms();
    setEpisodes(data);
    setLoading(false);
  };
  const fetchSpecies = async () => {
    setLoading(true);
    const data = await getSpecies();
    setSpecies(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCharacters();
    fetchFilms();
    fetchSpecies();
  }, []);

  const handleMovieChange = (e) => {
    const value = e.target.value;
    setSelectedMovie(e.target.value);
    let filteredMovies = [];
    for (const obj in characters) {
      const arr = characters[obj];
      for (const character of arr) {
        if (character?.films?.includes(value)) {
          filteredMovies.push(character);
        }
      }
    }
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
  };
  const ReArrangeCharacters = characters && characters[currentPage];
  return (
    <Container fluid>
      {loading ? <Loader /> : null}
      <Container>
        <h1>Star Wars Characters</h1>
        <Row>
          <Col lg={8}>
            <Row>
              {characters &&
                ReArrangeCharacters?.map((character, index) => (
                  <Col key={index} lg={3} md={3} sm={6} xs={12} className="my-2">
                    <CharacterCard name={character?.name} id={character?.url?.match(/\/(\d+)\//)[1]} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col lg={4}>
            <h4>Filter</h4>
            <label htmlFor="movie">Movies</label>
            <Form.Select id="movie" value={selectedMovie} onChange={handleMovieChange} className="my-2">
              <option value="" disabled>
                All Movies
              </option>
              {episodes?.map((movie, index) => (
                <option value={movie?.url} key={index}>
                  {movie?.title}
                </option>
              ))}
            </Form.Select>
            <label htmlFor="species">Species</label>
            <Form.Select id="species" value={selectedSpecies} onChange={handleSpeciesChange} className="my-2">
              <option value="" disabled>
                All Species
              </option>
              {species?.map((specie, index) => (
                <option value={specie?.url} key={index}>
                  {specie?.name}
                </option>
              ))}
            </Form.Select>
            <Button variant="secondary" className="px-4">
              Filter
            </Button>
          </Col>
        </Row>

        {characters ? <Pagination characters={characters} currentPage={currentPage} setCurrentPage={(page) => setCurrentPage(page)} /> : null}
      </Container>
    </Container>
  );
};

export default Home;
