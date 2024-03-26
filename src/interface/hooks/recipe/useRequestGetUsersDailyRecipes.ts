import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { useQuery } from '@tanstack/react-query';
import { generateDailyRecipes } from '@src/interface/logics/generate/generateDailyRecipes';
import { dailyRecipesState } from '@src/states/recipe';
import { dailyRecipeRepository } from '@src/interface/repositories/dailyRecipeRepository';
import { useEffect, useState } from 'react';

export const useRequestGetUsersDailyRecipes = (
  startDate: string,
  endDate: string,
) => {
  const idToken = useRecoilValue(idTokenState);
  const [dailyRecipes, setDailyRecipes] = useRecoilState(dailyRecipesState);
  // 初期レンダリング時のみクエリを実行するかを決定する状態を追加
  const [shouldFetch, setShouldFetch] = useState(true);

  const { isFetching } = useQuery({
    queryKey: ['graphl', 'get', 'users', 'daily', 'recipes'],
    queryFn: async () => {
      const data = await dailyRecipeRepository.getInRange({
        idToken,
        startDate,
        endDate,
      });
      const _dailyRecipes = generateDailyRecipes(data);
      setDailyRecipes(_dailyRecipes);
      setShouldFetch(false);
      return data;
    },
    enabled: shouldFetch,
  });

  const changeDate = async (date: string) => {
    const data = await dailyRecipeRepository.byDate({
      idToken,
      date,
    });
    const _dailyRecipes = generateDailyRecipes(data);
    setDailyRecipes((prev) => {
      return {
        ids: [...prev.ids],
        byId: {
          ...prev.byId,
          ..._dailyRecipes.byId,
        },
      };
    });
  };

  const changeMonth = async (startDate: string, endDate: string) => {
    const data = await dailyRecipeRepository.getInRange({
      idToken,
      startDate,
      endDate,
    });
    const _dailyRecipes = generateDailyRecipes(data);
    setDailyRecipes(_dailyRecipes);
  };

  useEffect(() => {
    return () => {
      setShouldFetch(true);
    };
  }, []);

  return {
    isFetching,
    dailyRecipes,
    changeDate,
    changeMonth,
  };
};
