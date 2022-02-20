import { Button, Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import { SearchInput } from '../components/SearchInput';
import { RecipesList } from '../components/RecipesList';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { GiForkKnifeSpoon } from 'react-icons/gi';

export function RecipeListPage() {
  const [filter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);

  const filterredRecipes = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    api.get('/recipes').then((response) => setRecipes(response.data));
  }, []);

  return (
    <Container>
      <h1 className="mb-4">Recepty</h1>
      <SearchInput
        value={filter}
        setValue={setFilter}
        placeholder="Vyhledat recepty..."
        className="mb-2"
      />
      <Link to="/new-recipe">
        <Button color="primary" size="sm" className="mb-4">
          <GiForkKnifeSpoon size="20" /> Nový Recept
        </Button>
      </Link>
      <RecipesList recipes={filterredRecipes} />
    </Container>
  );
}
