import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { recipeRepository } from '@src/interface/repositories/recipeRepository';
import { useQuery } from '@tanstack/react-query';
import { generateRecipes } from '@src/interface/logics/generate/generateRecipes';
import { recipesState } from '@src/states/recipe';
import { fridgeMasterState } from '@src/states/fridge';

export const useRequestGetAllRecipes = () => {
  const idToken = useRecoilValue(idTokenState);
  const [recipes, setRecipes] = useRecoilState(recipesState);
  const fridgeMaster = useRecoilValue(fridgeMasterState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'all', 'recipes'],
    queryFn: async () => {
      const data = await recipeRepository.getAll({ idToken });
      if (fridgeMaster.length > 0) {
        const _recipes = generateRecipes(data, fridgeMaster);
        setRecipes(_recipes);
      }
      return data;
    },
    enabled: fridgeMaster.length > 0,
  });

  return {
    isFetching,
    recipes,
    refetch,
  };
};
