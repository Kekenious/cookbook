import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import { api } from '../api';
import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { FaUtensilSpoon } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { IoTrashOutline } from 'react-icons/io5';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const _id = recipe._id;

  const ingredients = recipe.ingredients?.map(
    ({ _id, name, amount, amountUnit }) => {
      return (
        <li key={_id}>
          {amount} {amountUnit} {name}
        </li>
      );
    },
  );

  useEffect(() => {
    api.get(`/recipes/${slug}`).then((response) => setRecipe(response.data));
  }, [slug]);

  function deleteRecipe() {
    api.delete(`/recipes/${_id}`).then(() => alert('Recept byl smazán.'));
  }

  return (
    <Container>
      <div className="mb-4">
        <h1 className="mb-4">{recipe.title}</h1>
        <p className="mb-1">
          <FiClock color="blue" size="20" />
          <strong> {recipe.preparationTime} min</strong>
          {recipe.sideDish ? (
            <strong>
              <BsDot size="25" /> <FaUtensilSpoon color="blue" size="15" />{' '}
              {recipe.sideDish}
            </strong>
          ) : null}
        </p>
        <p>
          {recipe.servingCount ? (
            <strong>Počet porcí: {recipe.servingCount}</strong>
          ) : null}
        </p>
      </div>
      <Row className="mb-5">
        <Col xs="3">
          <h5 className="mb-2">Suroviny:</h5>
          <p>{ingredients}</p>
        </Col>
        <Col>
          <h5 className="mb-2">Postup přípravy: </h5>
          <p style={{ whiteSpace: 'pre-line' }}>{recipe.directions}</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Link to={`/recipe/${slug}/edit-recipe`}>
            <Button color="primary" size="s" type="submit" outline>
              <HiOutlineAdjustments color="black" size="20" /> Upravit recept
            </Button>
          </Link>{' '}
          <Link to="/">
            <Button
              color="danger"
              size="s"
              type="submit"
              onClick={deleteRecipe}
            >
              <IoTrashOutline size="20" /> Smazat recept
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
