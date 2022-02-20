import { Button, Col, Container, Row } from 'reactstrap';
import { useState } from 'react';
import { NewRecipeInput } from '../components/NewRecipeInput';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { IoReturnUpBack, IoTrashOutline } from 'react-icons/io5';
import { GoPlusSmall } from 'react-icons/go';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import uuid from "./../utils/uuid";

export function NewRecipePage() {
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [servingCount, setServingCount] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [directions, setDirections] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    setIngredients([...ingredients, fillIngredient()]);
    clearInputs();
  };

  function clearInputs() {
    document.getElementById('ingredientName').value = '';
    document.getElementById('ingredientAmount').value = '';
    document.getElementById('ingredientAmountUnit').value = '';
    document.getElementById('isGroup').value = '';
  }

  const removeIngredient = (id) => {
    console.log(id);
    const index = ingredients.indexOf(
      ingredients.find((item) => item.id === id),
    );
    ingredients.splice(index, 1)
    setIngredients([ingredients]);
  };

  function saveRecipe() {
    api
      .post(`/recipes`, recipe)
      .then(() => window.location.reload())
      .then(() => alert('Váš recept byl uložen.'));
  }

  const ingredientLine = ingredients?.map(
    ({ id, name, amount, unit }) => {
      return (
        <li key={id}>
          {amount} {unit} {name}{' '}
          <IoTrashOutline
            type="button"
            size="20"
            color="crimson"
            onClick={() => {
              removeIngredient(id);
            }}
          />
        </li>
      );
    },
  );
  
function generateUUID() {

}

  function createIngredient({amount,unit,name,isGroup}) {
    return {
      id: uuid(),
      amount,
      unit,
      name,
      isGroup
    }
  }

  function fillIngredient() {
    return createIngredient({
    amount: parseInt(ingredientAmount),
    unit: ingredientAmountUnit,
    name: ingredientName,
    isGroup: isGroup,
    })
  }

  const recipe = {
    title: title,
    preparationTime: parseInt(preparationTime),
    servingCount: parseInt(servingCount),
    sideDish: sideDish,
    directions: directions,
    ingredients: ingredients,
  };

  return (
    <Container>
      <h1 className="mb-4">Nový Recept </h1>
      <p className="mb-1">
        <strong>Název pokrmu:</strong>
      </p>
      <NewRecipeInput
        className="mb-4"
        name="title"
        value={title}
        setValue={setTitle}
        placeholder="Název je povinný"
      />
      <Row xs="4" className="mb-4">
        <Col>
          <strong>Doba přípravy:</strong>
          <NewRecipeInput
            value={preparationTime}
            setValue={setPreparationTime}
            placeholder="minut"
          />
        </Col>
        <Col>
          <strong>Počet porcí:</strong>
          <NewRecipeInput value={servingCount} setValue={setServingCount} />
        </Col>
        <Col>
          <strong>Příloha:</strong>
          <NewRecipeInput value={sideDish} setValue={setSideDish} />
        </Col>
      </Row>
      <p className="mb-0">
        <strong>Suroviny: </strong>
      </p>
      <Row xs="5" className="mb-4">
        <Col>
          <NewRecipeInput
            id="ingredientName"
            value={ingredientName}
            setValue={setIngredientName}
            placeholder="Název"
          />
        </Col>
        <Col>
          <NewRecipeInput
            id="ingredientAmount"
            value={ingredientAmount}
            setValue={setIngredientAmount}
            placeholder="Množství"
          />
        </Col>
        <Col>
          <NewRecipeInput
            id="ingredientAmountUnit"
            value={ingredientAmountUnit}
            setValue={setIngredientAmountUnit}
            placeholder="Jednotky"
          />
        </Col>
        <Col>
          <NewRecipeInput
            id="isGroup"
            value={isGroup}
            setValue={setIsGroup}
            placeholder="Skupina"
          />
        </Col>
        <Col>
          <Button color="primary" type="submit" onClick={addIngredient}>
            <GoPlusSmall size="20" /> Přidat
          </Button>
        </Col>
      </Row>
      <ul id="ingredientList">{ingredientLine}</ul>
      <p className="mb-1">
        <strong>Postup přípravy:</strong>
      </p>
      <NewRecipeInput
        type="textarea"
        className="mb-4"
        rows="10"
        name="directions"
        value={directions}
        setValue={setDirections}
        placeholder=""
      />
      <Row className="mb-4">
        <Col>
          <Button
            color="primary"
            size="s"
            type="submit"
            outline
            onClick={saveRecipe}
          >
            <GiForkKnifeSpoon size="20" color="black" /> Uložit Recept
          </Button>{' '}
          <Link to="/">
            <Button color="primary" size="s" type="submit">
              <IoReturnUpBack size="20" /> Zpět
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
