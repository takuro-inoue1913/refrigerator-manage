import {
  CreateRecipeDocument,
  GetAllRecipesDocument,
  CreateRecipeStepsDocument,
  CreateRecipeMaterialsDocument,
  UpdateRecipeDocument,
  UpdateRecipeMaterialsDocument,
  UpdateRecipeStepsDocument,
} from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

export const recipeRepository = {
  getAll: async ({ idToken }: { idToken: string | null }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(GetAllRecipesDocument);
    return data;
  },
  insert: async ({
    idToken,
    recipeName,
    userId,
    recipeImage,
  }: {
    idToken: string | null;
    recipeName: string;
    userId: string;
    recipeImage: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(CreateRecipeDocument, {
      recipeName,
      userId,
      recipeImage,
    });
    return data.insert_recipes_one;
  },
  insertMaterials: async ({
    idToken,
    recipeId,
    args,
  }: {
    idToken: string | null;
    recipeId: string;
    args: {
      masterId: string;
      quantity: number;
    }[];
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(CreateRecipeMaterialsDocument, {
      materials: args.map((arg) => ({
        recipe_id: recipeId,
        master_id: arg.masterId,
        quantity: arg.quantity,
      })),
    });
    return data.insert_recipe_materials;
  },
  insertSteps: async ({
    idToken,
    recipeId,
    args,
  }: {
    idToken: string | null;
    recipeId: string;
    args: {
      description: string;
    }[];
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(CreateRecipeStepsDocument, {
      steps: args.map((arg) => ({
        recipe_id: recipeId,
        description: arg.description,
      })),
    });
    return data.insert_recipe_steps;
  },
  update: async ({
    idToken,
    recipeId,
    recipeName,
    recipeImage,
  }: {
    idToken: string | null;
    recipeId: string;
    recipeName: string;
    recipeImage: string;
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateRecipeDocument, {
      recipeId,
      recipeName,
      recipeImage,
    });

    return data.update_recipes_by_pk;
  },
  updateMaterials: async ({
    idToken,
    recipeId,
    args,
  }: {
    idToken: string | null;
    recipeId: string;
    args: {
      masterId: string;
      quantity: number;
    }[];
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateRecipeMaterialsDocument, {
      recipeId,
      materials: args.map((arg) => ({
        recipe_id: recipeId,
        master_id: arg.masterId,
        quantity: arg.quantity,
      })),
    });
    return data.insert_recipe_materials;
  },
  updateSteps: async ({
    idToken,
    recipeId,
    args,
  }: {
    idToken: string | null;
    recipeId: string;
    args: {
      description: string;
    }[];
  }) => {
    const client = buildGraphQLUserClient(idToken);

    const data = await client.request(UpdateRecipeStepsDocument, {
      recipeId,
      steps: args.map((arg) => ({
        recipe_id: recipeId,
        description: arg.description,
      })),
    });
    return data.insert_recipe_steps;
  },
};
