import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { allFridgeMasterRepository } from '@src/interface/repositories/allFridgeMasterRepository';
import { useQuery } from '@tanstack/react-query';
import { generateFridgeMaster } from '../../logics/generate/generateFridgeMaster';
import { fridgeMasterState } from '@src/states/fridge';

export const useRequestGetAllFridgeMaster = () => {
  const idToken = useRecoilValue(idTokenState);
  const [fridgeMaster, setFridgeMasterState] =
    useRecoilState(fridgeMasterState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'all', 'fridge', 'master'],
    queryFn: async () => {
      const data = await allFridgeMasterRepository.getAll({ idToken });
      const _fridgeMaster = generateFridgeMaster(data);
      setFridgeMasterState(_fridgeMaster);
      return data;
    },
  });

  return {
    isFetching,
    fridgeMaster,
    refetch,
  };
};
