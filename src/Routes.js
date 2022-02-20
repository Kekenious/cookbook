import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { NewRecipePage } from './pages/NewRecipePage';
import { EditRecipePage } from './pages/EditRecipePage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="/new-recipe" element={<NewRecipePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/recipe/:slug/edit-recipe" element={<EditRecipePage />} />
    </RouterRoutes>
  );
}
