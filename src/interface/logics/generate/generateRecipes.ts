import { GetAllRecipesQuery } from '@src/interface/__generated__/graphql';
import { FridgeMaster } from '@src/states/fridge';
import { Recipes } from '@src/states/recipe';

const getFridgeMaster = (fridgeMaster: FridgeMaster[], masterId: string) => {
  const _fridgeMaster = fridgeMaster.find((j) => j.id === masterId);
  if (!_fridgeMaster) {
    throw new Error('fridgeMaster is not found');
  }
  return _fridgeMaster;
};

export const generateRecipes = (
  data: GetAllRecipesQuery,
  fridgeMaster: FridgeMaster[],
): Recipes => {
  const ids = data.recipes.map((i) => i.recipe_id);
  const _recipes: Recipes['byId'] = {};

  data.recipes.forEach((i) => {
    _recipes[i.recipe_id] = {
      id: i.recipe_id,
      name: i.recipe_name,
      imageUri: i.recipe_image,
      materials: i.recipes_recipe_materials.map((j) => {
        const _fridgeMaster = getFridgeMaster(fridgeMaster, j.master_id);
        return {
          id: j.recipe_material_id,
          masterId: j.master_id,
          fridgeType: _fridgeMaster.fridgeType,
          fridgeName: _fridgeMaster.name,
          quantity: j.quantity,
        };
      }),
      descriptions: i.recipes_recipe_steps.map((j) => j.description),
    };
  });

  return {
    ids,
    byId: _recipes,
  };
};
