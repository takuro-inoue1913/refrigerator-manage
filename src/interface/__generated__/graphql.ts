/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  date: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** ユーザごとに追加される肉類マスタ */
export type Custom_Meat_Master = {
  __typename?: 'custom_meat_master';
  custom_meat_id: Scalars['uuid']['output'];
  /** An object relationship */
  custom_meat_master_meat_stocks?: Maybe<Meat_Stocks>;
  /** An object relationship */
  custom_meat_master_unit_master?: Maybe<Unit_Master>;
  /** An object relationship */
  custom_meat_master_users?: Maybe<Users>;
  custom_meat_name: Scalars['String']['output'];
  default_expiration_period: Scalars['Int']['output'];
  display_name: Scalars['String']['output'];
  image_uri: Scalars['String']['output'];
  unit_id: Scalars['Int']['output'];
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "custom_meat_master" */
export type Custom_Meat_Master_Aggregate = {
  __typename?: 'custom_meat_master_aggregate';
  aggregate?: Maybe<Custom_Meat_Master_Aggregate_Fields>;
  nodes: Array<Custom_Meat_Master>;
};

export type Custom_Meat_Master_Aggregate_Bool_Exp = {
  count?: InputMaybe<Custom_Meat_Master_Aggregate_Bool_Exp_Count>;
};

export type Custom_Meat_Master_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "custom_meat_master" */
export type Custom_Meat_Master_Aggregate_Fields = {
  __typename?: 'custom_meat_master_aggregate_fields';
  avg?: Maybe<Custom_Meat_Master_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Custom_Meat_Master_Max_Fields>;
  min?: Maybe<Custom_Meat_Master_Min_Fields>;
  stddev?: Maybe<Custom_Meat_Master_Stddev_Fields>;
  stddev_pop?: Maybe<Custom_Meat_Master_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Custom_Meat_Master_Stddev_Samp_Fields>;
  sum?: Maybe<Custom_Meat_Master_Sum_Fields>;
  var_pop?: Maybe<Custom_Meat_Master_Var_Pop_Fields>;
  var_samp?: Maybe<Custom_Meat_Master_Var_Samp_Fields>;
  variance?: Maybe<Custom_Meat_Master_Variance_Fields>;
};


/** aggregate fields of "custom_meat_master" */
export type Custom_Meat_Master_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "custom_meat_master" */
export type Custom_Meat_Master_Aggregate_Order_By = {
  avg?: InputMaybe<Custom_Meat_Master_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Custom_Meat_Master_Max_Order_By>;
  min?: InputMaybe<Custom_Meat_Master_Min_Order_By>;
  stddev?: InputMaybe<Custom_Meat_Master_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Custom_Meat_Master_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Custom_Meat_Master_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Custom_Meat_Master_Sum_Order_By>;
  var_pop?: InputMaybe<Custom_Meat_Master_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Custom_Meat_Master_Var_Samp_Order_By>;
  variance?: InputMaybe<Custom_Meat_Master_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "custom_meat_master" */
export type Custom_Meat_Master_Arr_Rel_Insert_Input = {
  data: Array<Custom_Meat_Master_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Custom_Meat_Master_On_Conflict>;
};

/** aggregate avg on columns */
export type Custom_Meat_Master_Avg_Fields = {
  __typename?: 'custom_meat_master_avg_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Avg_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "custom_meat_master". All fields are combined with a logical 'AND'. */
export type Custom_Meat_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Custom_Meat_Master_Bool_Exp>>;
  _not?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Custom_Meat_Master_Bool_Exp>>;
  custom_meat_id?: InputMaybe<Uuid_Comparison_Exp>;
  custom_meat_master_meat_stocks?: InputMaybe<Meat_Stocks_Bool_Exp>;
  custom_meat_master_unit_master?: InputMaybe<Unit_Master_Bool_Exp>;
  custom_meat_master_users?: InputMaybe<Users_Bool_Exp>;
  custom_meat_name?: InputMaybe<String_Comparison_Exp>;
  default_expiration_period?: InputMaybe<Int_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  image_uri?: InputMaybe<String_Comparison_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "custom_meat_master" */
export enum Custom_Meat_Master_Constraint {
  /** unique or primary key constraint on columns "display_name" */
  CustomMeatMasterDisplayNameKey = 'custom_meat_master_display_name_key',
  /** unique or primary key constraint on columns "image_uri" */
  CustomMeatMasterImageUriKey = 'custom_meat_master_image_uri_key',
  /** unique or primary key constraint on columns "custom_meat_id" */
  CustomMeatMasterPkey = 'custom_meat_master_pkey'
}

/** input type for incrementing numeric columns in table "custom_meat_master" */
export type Custom_Meat_Master_Inc_Input = {
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "custom_meat_master" */
export type Custom_Meat_Master_Insert_Input = {
  custom_meat_id?: InputMaybe<Scalars['uuid']['input']>;
  custom_meat_master_meat_stocks?: InputMaybe<Meat_Stocks_Obj_Rel_Insert_Input>;
  custom_meat_master_unit_master?: InputMaybe<Unit_Master_Obj_Rel_Insert_Input>;
  custom_meat_master_users?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  custom_meat_name?: InputMaybe<Scalars['String']['input']>;
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Custom_Meat_Master_Max_Fields = {
  __typename?: 'custom_meat_master_max_fields';
  custom_meat_id?: Maybe<Scalars['uuid']['output']>;
  custom_meat_name?: Maybe<Scalars['String']['output']>;
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  image_uri?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Max_Order_By = {
  custom_meat_id?: InputMaybe<Order_By>;
  custom_meat_name?: InputMaybe<Order_By>;
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Custom_Meat_Master_Min_Fields = {
  __typename?: 'custom_meat_master_min_fields';
  custom_meat_id?: Maybe<Scalars['uuid']['output']>;
  custom_meat_name?: Maybe<Scalars['String']['output']>;
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  image_uri?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Min_Order_By = {
  custom_meat_id?: InputMaybe<Order_By>;
  custom_meat_name?: InputMaybe<Order_By>;
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "custom_meat_master" */
export type Custom_Meat_Master_Mutation_Response = {
  __typename?: 'custom_meat_master_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Custom_Meat_Master>;
};

/** input type for inserting object relation for remote table "custom_meat_master" */
export type Custom_Meat_Master_Obj_Rel_Insert_Input = {
  data: Custom_Meat_Master_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Custom_Meat_Master_On_Conflict>;
};

/** on_conflict condition type for table "custom_meat_master" */
export type Custom_Meat_Master_On_Conflict = {
  constraint: Custom_Meat_Master_Constraint;
  update_columns?: Array<Custom_Meat_Master_Update_Column>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};

/** Ordering options when selecting data from "custom_meat_master". */
export type Custom_Meat_Master_Order_By = {
  custom_meat_id?: InputMaybe<Order_By>;
  custom_meat_master_meat_stocks?: InputMaybe<Meat_Stocks_Order_By>;
  custom_meat_master_unit_master?: InputMaybe<Unit_Master_Order_By>;
  custom_meat_master_users?: InputMaybe<Users_Order_By>;
  custom_meat_name?: InputMaybe<Order_By>;
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: custom_meat_master */
export type Custom_Meat_Master_Pk_Columns_Input = {
  custom_meat_id: Scalars['uuid']['input'];
};

/** select columns of table "custom_meat_master" */
export enum Custom_Meat_Master_Select_Column {
  /** column name */
  CustomMeatId = 'custom_meat_id',
  /** column name */
  CustomMeatName = 'custom_meat_name',
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "custom_meat_master" */
export type Custom_Meat_Master_Set_Input = {
  custom_meat_id?: InputMaybe<Scalars['uuid']['input']>;
  custom_meat_name?: InputMaybe<Scalars['String']['input']>;
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Custom_Meat_Master_Stddev_Fields = {
  __typename?: 'custom_meat_master_stddev_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Stddev_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Custom_Meat_Master_Stddev_Pop_Fields = {
  __typename?: 'custom_meat_master_stddev_pop_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Stddev_Pop_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Custom_Meat_Master_Stddev_Samp_Fields = {
  __typename?: 'custom_meat_master_stddev_samp_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Stddev_Samp_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "custom_meat_master" */
export type Custom_Meat_Master_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Custom_Meat_Master_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Custom_Meat_Master_Stream_Cursor_Value_Input = {
  custom_meat_id?: InputMaybe<Scalars['uuid']['input']>;
  custom_meat_name?: InputMaybe<Scalars['String']['input']>;
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Custom_Meat_Master_Sum_Fields = {
  __typename?: 'custom_meat_master_sum_fields';
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Sum_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** update columns of table "custom_meat_master" */
export enum Custom_Meat_Master_Update_Column {
  /** column name */
  CustomMeatId = 'custom_meat_id',
  /** column name */
  CustomMeatName = 'custom_meat_name',
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  UserId = 'user_id'
}

export type Custom_Meat_Master_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Custom_Meat_Master_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Custom_Meat_Master_Set_Input>;
  /** filter the rows which have to be updated */
  where: Custom_Meat_Master_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Custom_Meat_Master_Var_Pop_Fields = {
  __typename?: 'custom_meat_master_var_pop_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Var_Pop_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Custom_Meat_Master_Var_Samp_Fields = {
  __typename?: 'custom_meat_master_var_samp_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Var_Samp_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Custom_Meat_Master_Variance_Fields = {
  __typename?: 'custom_meat_master_variance_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "custom_meat_master" */
export type Custom_Meat_Master_Variance_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** ユーザごとに追加される野菜類マスタ */
export type Custom_Vegetable_Master = {
  __typename?: 'custom_vegetable_master';
  custom_vegetable_id: Scalars['uuid']['output'];
  /** An object relationship */
  custom_vegetable_master_uint_master?: Maybe<Unit_Master>;
  /** An object relationship */
  custom_vegetable_master_users?: Maybe<Users>;
  /** An object relationship */
  custom_vegetable_master_vegetable_stocks?: Maybe<Vegetable_Stocks>;
  custom_vegetable_name: Scalars['String']['output'];
  default_expiration_period: Scalars['Int']['output'];
  display_name: Scalars['String']['output'];
  image_uri: Scalars['String']['output'];
  unit_id: Scalars['Int']['output'];
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "custom_vegetable_master" */
export type Custom_Vegetable_Master_Aggregate = {
  __typename?: 'custom_vegetable_master_aggregate';
  aggregate?: Maybe<Custom_Vegetable_Master_Aggregate_Fields>;
  nodes: Array<Custom_Vegetable_Master>;
};

export type Custom_Vegetable_Master_Aggregate_Bool_Exp = {
  count?: InputMaybe<Custom_Vegetable_Master_Aggregate_Bool_Exp_Count>;
};

export type Custom_Vegetable_Master_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "custom_vegetable_master" */
export type Custom_Vegetable_Master_Aggregate_Fields = {
  __typename?: 'custom_vegetable_master_aggregate_fields';
  avg?: Maybe<Custom_Vegetable_Master_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Custom_Vegetable_Master_Max_Fields>;
  min?: Maybe<Custom_Vegetable_Master_Min_Fields>;
  stddev?: Maybe<Custom_Vegetable_Master_Stddev_Fields>;
  stddev_pop?: Maybe<Custom_Vegetable_Master_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Custom_Vegetable_Master_Stddev_Samp_Fields>;
  sum?: Maybe<Custom_Vegetable_Master_Sum_Fields>;
  var_pop?: Maybe<Custom_Vegetable_Master_Var_Pop_Fields>;
  var_samp?: Maybe<Custom_Vegetable_Master_Var_Samp_Fields>;
  variance?: Maybe<Custom_Vegetable_Master_Variance_Fields>;
};


/** aggregate fields of "custom_vegetable_master" */
export type Custom_Vegetable_Master_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Aggregate_Order_By = {
  avg?: InputMaybe<Custom_Vegetable_Master_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Custom_Vegetable_Master_Max_Order_By>;
  min?: InputMaybe<Custom_Vegetable_Master_Min_Order_By>;
  stddev?: InputMaybe<Custom_Vegetable_Master_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Custom_Vegetable_Master_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Custom_Vegetable_Master_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Custom_Vegetable_Master_Sum_Order_By>;
  var_pop?: InputMaybe<Custom_Vegetable_Master_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Custom_Vegetable_Master_Var_Samp_Order_By>;
  variance?: InputMaybe<Custom_Vegetable_Master_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Arr_Rel_Insert_Input = {
  data: Array<Custom_Vegetable_Master_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Custom_Vegetable_Master_On_Conflict>;
};

/** aggregate avg on columns */
export type Custom_Vegetable_Master_Avg_Fields = {
  __typename?: 'custom_vegetable_master_avg_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Avg_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "custom_vegetable_master". All fields are combined with a logical 'AND'. */
export type Custom_Vegetable_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Custom_Vegetable_Master_Bool_Exp>>;
  _not?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Custom_Vegetable_Master_Bool_Exp>>;
  custom_vegetable_id?: InputMaybe<Uuid_Comparison_Exp>;
  custom_vegetable_master_uint_master?: InputMaybe<Unit_Master_Bool_Exp>;
  custom_vegetable_master_users?: InputMaybe<Users_Bool_Exp>;
  custom_vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  custom_vegetable_name?: InputMaybe<String_Comparison_Exp>;
  default_expiration_period?: InputMaybe<Int_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  image_uri?: InputMaybe<String_Comparison_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "custom_vegetable_master" */
export enum Custom_Vegetable_Master_Constraint {
  /** unique or primary key constraint on columns "image_uri" */
  CustomVegetableMasterImageUriKey = 'custom_vegetable_master_image_uri_key',
  /** unique or primary key constraint on columns "custom_vegetable_id" */
  CustomVegetableMasterPkey = 'custom_vegetable_master_pkey'
}

/** input type for incrementing numeric columns in table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Inc_Input = {
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Insert_Input = {
  custom_vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  custom_vegetable_master_uint_master?: InputMaybe<Unit_Master_Obj_Rel_Insert_Input>;
  custom_vegetable_master_users?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  custom_vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Obj_Rel_Insert_Input>;
  custom_vegetable_name?: InputMaybe<Scalars['String']['input']>;
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Custom_Vegetable_Master_Max_Fields = {
  __typename?: 'custom_vegetable_master_max_fields';
  custom_vegetable_id?: Maybe<Scalars['uuid']['output']>;
  custom_vegetable_name?: Maybe<Scalars['String']['output']>;
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  image_uri?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Max_Order_By = {
  custom_vegetable_id?: InputMaybe<Order_By>;
  custom_vegetable_name?: InputMaybe<Order_By>;
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Custom_Vegetable_Master_Min_Fields = {
  __typename?: 'custom_vegetable_master_min_fields';
  custom_vegetable_id?: Maybe<Scalars['uuid']['output']>;
  custom_vegetable_name?: Maybe<Scalars['String']['output']>;
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  image_uri?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Min_Order_By = {
  custom_vegetable_id?: InputMaybe<Order_By>;
  custom_vegetable_name?: InputMaybe<Order_By>;
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Mutation_Response = {
  __typename?: 'custom_vegetable_master_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Custom_Vegetable_Master>;
};

/** input type for inserting object relation for remote table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Obj_Rel_Insert_Input = {
  data: Custom_Vegetable_Master_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Custom_Vegetable_Master_On_Conflict>;
};

/** on_conflict condition type for table "custom_vegetable_master" */
export type Custom_Vegetable_Master_On_Conflict = {
  constraint: Custom_Vegetable_Master_Constraint;
  update_columns?: Array<Custom_Vegetable_Master_Update_Column>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};

/** Ordering options when selecting data from "custom_vegetable_master". */
export type Custom_Vegetable_Master_Order_By = {
  custom_vegetable_id?: InputMaybe<Order_By>;
  custom_vegetable_master_uint_master?: InputMaybe<Unit_Master_Order_By>;
  custom_vegetable_master_users?: InputMaybe<Users_Order_By>;
  custom_vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Order_By>;
  custom_vegetable_name?: InputMaybe<Order_By>;
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: custom_vegetable_master */
export type Custom_Vegetable_Master_Pk_Columns_Input = {
  custom_vegetable_id: Scalars['uuid']['input'];
};

/** select columns of table "custom_vegetable_master" */
export enum Custom_Vegetable_Master_Select_Column {
  /** column name */
  CustomVegetableId = 'custom_vegetable_id',
  /** column name */
  CustomVegetableName = 'custom_vegetable_name',
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Set_Input = {
  custom_vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  custom_vegetable_name?: InputMaybe<Scalars['String']['input']>;
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Custom_Vegetable_Master_Stddev_Fields = {
  __typename?: 'custom_vegetable_master_stddev_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Stddev_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Custom_Vegetable_Master_Stddev_Pop_Fields = {
  __typename?: 'custom_vegetable_master_stddev_pop_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Stddev_Pop_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Custom_Vegetable_Master_Stddev_Samp_Fields = {
  __typename?: 'custom_vegetable_master_stddev_samp_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Stddev_Samp_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Custom_Vegetable_Master_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Custom_Vegetable_Master_Stream_Cursor_Value_Input = {
  custom_vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  custom_vegetable_name?: InputMaybe<Scalars['String']['input']>;
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Custom_Vegetable_Master_Sum_Fields = {
  __typename?: 'custom_vegetable_master_sum_fields';
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Sum_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** update columns of table "custom_vegetable_master" */
export enum Custom_Vegetable_Master_Update_Column {
  /** column name */
  CustomVegetableId = 'custom_vegetable_id',
  /** column name */
  CustomVegetableName = 'custom_vegetable_name',
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  UserId = 'user_id'
}

export type Custom_Vegetable_Master_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Custom_Vegetable_Master_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Custom_Vegetable_Master_Set_Input>;
  /** filter the rows which have to be updated */
  where: Custom_Vegetable_Master_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Custom_Vegetable_Master_Var_Pop_Fields = {
  __typename?: 'custom_vegetable_master_var_pop_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Var_Pop_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Custom_Vegetable_Master_Var_Samp_Fields = {
  __typename?: 'custom_vegetable_master_var_samp_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Var_Samp_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Custom_Vegetable_Master_Variance_Fields = {
  __typename?: 'custom_vegetable_master_variance_fields';
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "custom_vegetable_master" */
export type Custom_Vegetable_Master_Variance_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** 肉類のマスターデータ */
export type Meat_Master = {
  __typename?: 'meat_master';
  /** 賞味期限の標準期間 */
  default_expiration_period: Scalars['Int']['output'];
  /** 表示名 */
  display_name: Scalars['String']['output'];
  /** 画像URI */
  image_uri: Scalars['String']['output'];
  meat_id: Scalars['uuid']['output'];
  /** An object relationship */
  meat_master_meat_stocks?: Maybe<Meat_Stocks>;
  /** An object relationship */
  meat_master_unit_master?: Maybe<Unit_Master>;
  /** 肉名（ひらがな） */
  meat_name: Scalars['String']['output'];
  /** 単位ID */
  unit_id: Scalars['Int']['output'];
};

/** aggregated selection of "meat_master" */
export type Meat_Master_Aggregate = {
  __typename?: 'meat_master_aggregate';
  aggregate?: Maybe<Meat_Master_Aggregate_Fields>;
  nodes: Array<Meat_Master>;
};

/** aggregate fields of "meat_master" */
export type Meat_Master_Aggregate_Fields = {
  __typename?: 'meat_master_aggregate_fields';
  avg?: Maybe<Meat_Master_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Meat_Master_Max_Fields>;
  min?: Maybe<Meat_Master_Min_Fields>;
  stddev?: Maybe<Meat_Master_Stddev_Fields>;
  stddev_pop?: Maybe<Meat_Master_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Meat_Master_Stddev_Samp_Fields>;
  sum?: Maybe<Meat_Master_Sum_Fields>;
  var_pop?: Maybe<Meat_Master_Var_Pop_Fields>;
  var_samp?: Maybe<Meat_Master_Var_Samp_Fields>;
  variance?: Maybe<Meat_Master_Variance_Fields>;
};


/** aggregate fields of "meat_master" */
export type Meat_Master_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meat_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Meat_Master_Avg_Fields = {
  __typename?: 'meat_master_avg_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "meat_master". All fields are combined with a logical 'AND'. */
export type Meat_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Meat_Master_Bool_Exp>>;
  _not?: InputMaybe<Meat_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Meat_Master_Bool_Exp>>;
  default_expiration_period?: InputMaybe<Int_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  image_uri?: InputMaybe<String_Comparison_Exp>;
  meat_id?: InputMaybe<Uuid_Comparison_Exp>;
  meat_master_meat_stocks?: InputMaybe<Meat_Stocks_Bool_Exp>;
  meat_master_unit_master?: InputMaybe<Unit_Master_Bool_Exp>;
  meat_name?: InputMaybe<String_Comparison_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "meat_master" */
export enum Meat_Master_Constraint {
  /** unique or primary key constraint on columns "display_name" */
  MeatMasterDisplayNameKey = 'meat_master_display_name_key',
  /** unique or primary key constraint on columns "image_uri" */
  MeatMasterImageUriKey = 'meat_master_image_uri_key',
  /** unique or primary key constraint on columns "meat_name" */
  MeatMasterMeatNameKey = 'meat_master_meat_name_key',
  /** unique or primary key constraint on columns "meat_id" */
  MeatMasterPkey = 'meat_master_pkey'
}

/** input type for incrementing numeric columns in table "meat_master" */
export type Meat_Master_Inc_Input = {
  /** 賞味期限の標準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "meat_master" */
export type Meat_Master_Insert_Input = {
  /** 賞味期限の標準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 表示名 */
  display_name?: InputMaybe<Scalars['String']['input']>;
  /** 画像URI */
  image_uri?: InputMaybe<Scalars['String']['input']>;
  meat_id?: InputMaybe<Scalars['uuid']['input']>;
  meat_master_meat_stocks?: InputMaybe<Meat_Stocks_Obj_Rel_Insert_Input>;
  meat_master_unit_master?: InputMaybe<Unit_Master_Obj_Rel_Insert_Input>;
  /** 肉名（ひらがな） */
  meat_name?: InputMaybe<Scalars['String']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Meat_Master_Max_Fields = {
  __typename?: 'meat_master_max_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  /** 表示名 */
  display_name?: Maybe<Scalars['String']['output']>;
  /** 画像URI */
  image_uri?: Maybe<Scalars['String']['output']>;
  meat_id?: Maybe<Scalars['uuid']['output']>;
  /** 肉名（ひらがな） */
  meat_name?: Maybe<Scalars['String']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Meat_Master_Min_Fields = {
  __typename?: 'meat_master_min_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  /** 表示名 */
  display_name?: Maybe<Scalars['String']['output']>;
  /** 画像URI */
  image_uri?: Maybe<Scalars['String']['output']>;
  meat_id?: Maybe<Scalars['uuid']['output']>;
  /** 肉名（ひらがな） */
  meat_name?: Maybe<Scalars['String']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "meat_master" */
export type Meat_Master_Mutation_Response = {
  __typename?: 'meat_master_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Meat_Master>;
};

/** input type for inserting object relation for remote table "meat_master" */
export type Meat_Master_Obj_Rel_Insert_Input = {
  data: Meat_Master_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Meat_Master_On_Conflict>;
};

/** on_conflict condition type for table "meat_master" */
export type Meat_Master_On_Conflict = {
  constraint: Meat_Master_Constraint;
  update_columns?: Array<Meat_Master_Update_Column>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};

/** Ordering options when selecting data from "meat_master". */
export type Meat_Master_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  meat_id?: InputMaybe<Order_By>;
  meat_master_meat_stocks?: InputMaybe<Meat_Stocks_Order_By>;
  meat_master_unit_master?: InputMaybe<Unit_Master_Order_By>;
  meat_name?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meat_master */
export type Meat_Master_Pk_Columns_Input = {
  meat_id: Scalars['uuid']['input'];
};

/** select columns of table "meat_master" */
export enum Meat_Master_Select_Column {
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  MeatId = 'meat_id',
  /** column name */
  MeatName = 'meat_name',
  /** column name */
  UnitId = 'unit_id'
}

/** input type for updating data in table "meat_master" */
export type Meat_Master_Set_Input = {
  /** 賞味期限の標準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 表示名 */
  display_name?: InputMaybe<Scalars['String']['input']>;
  /** 画像URI */
  image_uri?: InputMaybe<Scalars['String']['input']>;
  meat_id?: InputMaybe<Scalars['uuid']['input']>;
  /** 肉名（ひらがな） */
  meat_name?: InputMaybe<Scalars['String']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Meat_Master_Stddev_Fields = {
  __typename?: 'meat_master_stddev_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Meat_Master_Stddev_Pop_Fields = {
  __typename?: 'meat_master_stddev_pop_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Meat_Master_Stddev_Samp_Fields = {
  __typename?: 'meat_master_stddev_samp_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "meat_master" */
export type Meat_Master_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meat_Master_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meat_Master_Stream_Cursor_Value_Input = {
  /** 賞味期限の標準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 表示名 */
  display_name?: InputMaybe<Scalars['String']['input']>;
  /** 画像URI */
  image_uri?: InputMaybe<Scalars['String']['input']>;
  meat_id?: InputMaybe<Scalars['uuid']['input']>;
  /** 肉名（ひらがな） */
  meat_name?: InputMaybe<Scalars['String']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Meat_Master_Sum_Fields = {
  __typename?: 'meat_master_sum_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "meat_master" */
export enum Meat_Master_Update_Column {
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  MeatId = 'meat_id',
  /** column name */
  MeatName = 'meat_name',
  /** column name */
  UnitId = 'unit_id'
}

export type Meat_Master_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Meat_Master_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meat_Master_Set_Input>;
  /** filter the rows which have to be updated */
  where: Meat_Master_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Meat_Master_Var_Pop_Fields = {
  __typename?: 'meat_master_var_pop_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Meat_Master_Var_Samp_Fields = {
  __typename?: 'meat_master_var_samp_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Meat_Master_Variance_Fields = {
  __typename?: 'meat_master_variance_fields';
  /** 賞味期限の標準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** ユーザーごとの肉ストック */
export type Meat_Stocks = {
  __typename?: 'meat_stocks';
  /** 賞味期限日 */
  expiration_date: Scalars['date']['output'];
  /** 増減単位 */
  incremental_unit: Scalars['Int']['output'];
  /** お気に入りフラグ */
  is_favorite: Scalars['Boolean']['output'];
  meat_id: Scalars['uuid']['output'];
  /** An object relationship */
  meat_stocks_custom_meat_master?: Maybe<Custom_Meat_Master>;
  /** An object relationship */
  meat_stocks_meat_master?: Maybe<Meat_Master>;
  /** An object relationship */
  meat_stocks_users?: Maybe<Users>;
  /** メモ */
  memo: Scalars['String']['output'];
  /** 在庫数 */
  quantity: Scalars['Int']['output'];
  /** ストックID */
  stock_id: Scalars['Int']['output'];
  /** ユーザーID */
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "meat_stocks" */
export type Meat_Stocks_Aggregate = {
  __typename?: 'meat_stocks_aggregate';
  aggregate?: Maybe<Meat_Stocks_Aggregate_Fields>;
  nodes: Array<Meat_Stocks>;
};

export type Meat_Stocks_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Meat_Stocks_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Meat_Stocks_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Meat_Stocks_Aggregate_Bool_Exp_Count>;
};

export type Meat_Stocks_Aggregate_Bool_Exp_Bool_And = {
  arguments: Meat_Stocks_Select_Column_Meat_Stocks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Meat_Stocks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meat_Stocks_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Meat_Stocks_Select_Column_Meat_Stocks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Meat_Stocks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Meat_Stocks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Meat_Stocks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "meat_stocks" */
export type Meat_Stocks_Aggregate_Fields = {
  __typename?: 'meat_stocks_aggregate_fields';
  avg?: Maybe<Meat_Stocks_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Meat_Stocks_Max_Fields>;
  min?: Maybe<Meat_Stocks_Min_Fields>;
  stddev?: Maybe<Meat_Stocks_Stddev_Fields>;
  stddev_pop?: Maybe<Meat_Stocks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Meat_Stocks_Stddev_Samp_Fields>;
  sum?: Maybe<Meat_Stocks_Sum_Fields>;
  var_pop?: Maybe<Meat_Stocks_Var_Pop_Fields>;
  var_samp?: Maybe<Meat_Stocks_Var_Samp_Fields>;
  variance?: Maybe<Meat_Stocks_Variance_Fields>;
};


/** aggregate fields of "meat_stocks" */
export type Meat_Stocks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "meat_stocks" */
export type Meat_Stocks_Aggregate_Order_By = {
  avg?: InputMaybe<Meat_Stocks_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meat_Stocks_Max_Order_By>;
  min?: InputMaybe<Meat_Stocks_Min_Order_By>;
  stddev?: InputMaybe<Meat_Stocks_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Meat_Stocks_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Meat_Stocks_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Meat_Stocks_Sum_Order_By>;
  var_pop?: InputMaybe<Meat_Stocks_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Meat_Stocks_Var_Samp_Order_By>;
  variance?: InputMaybe<Meat_Stocks_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "meat_stocks" */
export type Meat_Stocks_Arr_Rel_Insert_Input = {
  data: Array<Meat_Stocks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meat_Stocks_On_Conflict>;
};

/** aggregate avg on columns */
export type Meat_Stocks_Avg_Fields = {
  __typename?: 'meat_stocks_avg_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "meat_stocks" */
export type Meat_Stocks_Avg_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "meat_stocks". All fields are combined with a logical 'AND'. */
export type Meat_Stocks_Bool_Exp = {
  _and?: InputMaybe<Array<Meat_Stocks_Bool_Exp>>;
  _not?: InputMaybe<Meat_Stocks_Bool_Exp>;
  _or?: InputMaybe<Array<Meat_Stocks_Bool_Exp>>;
  expiration_date?: InputMaybe<Date_Comparison_Exp>;
  incremental_unit?: InputMaybe<Int_Comparison_Exp>;
  is_favorite?: InputMaybe<Boolean_Comparison_Exp>;
  meat_id?: InputMaybe<Uuid_Comparison_Exp>;
  meat_stocks_custom_meat_master?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
  meat_stocks_meat_master?: InputMaybe<Meat_Master_Bool_Exp>;
  meat_stocks_users?: InputMaybe<Users_Bool_Exp>;
  memo?: InputMaybe<String_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  stock_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "meat_stocks" */
export enum Meat_Stocks_Constraint {
  /** unique or primary key constraint on columns "stock_id" */
  MeatStocksPkey = 'meat_stocks_pkey'
}

/** input type for incrementing numeric columns in table "meat_stocks" */
export type Meat_Stocks_Inc_Input = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "meat_stocks" */
export type Meat_Stocks_Insert_Input = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Scalars['date']['input']>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** お気に入りフラグ */
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  meat_id?: InputMaybe<Scalars['uuid']['input']>;
  meat_stocks_custom_meat_master?: InputMaybe<Custom_Meat_Master_Obj_Rel_Insert_Input>;
  meat_stocks_meat_master?: InputMaybe<Meat_Master_Obj_Rel_Insert_Input>;
  meat_stocks_users?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  /** メモ */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  /** ユーザーID */
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Meat_Stocks_Max_Fields = {
  __typename?: 'meat_stocks_max_fields';
  /** 賞味期限日 */
  expiration_date?: Maybe<Scalars['date']['output']>;
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Int']['output']>;
  meat_id?: Maybe<Scalars['uuid']['output']>;
  /** メモ */
  memo?: Maybe<Scalars['String']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Int']['output']>;
  /** ユーザーID */
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "meat_stocks" */
export type Meat_Stocks_Max_Order_By = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Order_By>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  meat_id?: InputMaybe<Order_By>;
  /** メモ */
  memo?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
  /** ユーザーID */
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meat_Stocks_Min_Fields = {
  __typename?: 'meat_stocks_min_fields';
  /** 賞味期限日 */
  expiration_date?: Maybe<Scalars['date']['output']>;
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Int']['output']>;
  meat_id?: Maybe<Scalars['uuid']['output']>;
  /** メモ */
  memo?: Maybe<Scalars['String']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Int']['output']>;
  /** ユーザーID */
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "meat_stocks" */
export type Meat_Stocks_Min_Order_By = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Order_By>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  meat_id?: InputMaybe<Order_By>;
  /** メモ */
  memo?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
  /** ユーザーID */
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "meat_stocks" */
export type Meat_Stocks_Mutation_Response = {
  __typename?: 'meat_stocks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Meat_Stocks>;
};

/** input type for inserting object relation for remote table "meat_stocks" */
export type Meat_Stocks_Obj_Rel_Insert_Input = {
  data: Meat_Stocks_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Meat_Stocks_On_Conflict>;
};

/** on_conflict condition type for table "meat_stocks" */
export type Meat_Stocks_On_Conflict = {
  constraint: Meat_Stocks_Constraint;
  update_columns?: Array<Meat_Stocks_Update_Column>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};

/** Ordering options when selecting data from "meat_stocks". */
export type Meat_Stocks_Order_By = {
  expiration_date?: InputMaybe<Order_By>;
  incremental_unit?: InputMaybe<Order_By>;
  is_favorite?: InputMaybe<Order_By>;
  meat_id?: InputMaybe<Order_By>;
  meat_stocks_custom_meat_master?: InputMaybe<Custom_Meat_Master_Order_By>;
  meat_stocks_meat_master?: InputMaybe<Meat_Master_Order_By>;
  meat_stocks_users?: InputMaybe<Users_Order_By>;
  memo?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meat_stocks */
export type Meat_Stocks_Pk_Columns_Input = {
  /** ストックID */
  stock_id: Scalars['Int']['input'];
};

/** select columns of table "meat_stocks" */
export enum Meat_Stocks_Select_Column {
  /** column name */
  ExpirationDate = 'expiration_date',
  /** column name */
  IncrementalUnit = 'incremental_unit',
  /** column name */
  IsFavorite = 'is_favorite',
  /** column name */
  MeatId = 'meat_id',
  /** column name */
  Memo = 'memo',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id'
}

/** select "meat_stocks_aggregate_bool_exp_bool_and_arguments_columns" columns of table "meat_stocks" */
export enum Meat_Stocks_Select_Column_Meat_Stocks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsFavorite = 'is_favorite'
}

/** select "meat_stocks_aggregate_bool_exp_bool_or_arguments_columns" columns of table "meat_stocks" */
export enum Meat_Stocks_Select_Column_Meat_Stocks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsFavorite = 'is_favorite'
}

/** input type for updating data in table "meat_stocks" */
export type Meat_Stocks_Set_Input = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Scalars['date']['input']>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** お気に入りフラグ */
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  meat_id?: InputMaybe<Scalars['uuid']['input']>;
  /** メモ */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  /** ユーザーID */
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Meat_Stocks_Stddev_Fields = {
  __typename?: 'meat_stocks_stddev_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "meat_stocks" */
export type Meat_Stocks_Stddev_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Meat_Stocks_Stddev_Pop_Fields = {
  __typename?: 'meat_stocks_stddev_pop_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "meat_stocks" */
export type Meat_Stocks_Stddev_Pop_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Meat_Stocks_Stddev_Samp_Fields = {
  __typename?: 'meat_stocks_stddev_samp_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "meat_stocks" */
export type Meat_Stocks_Stddev_Samp_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "meat_stocks" */
export type Meat_Stocks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meat_Stocks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meat_Stocks_Stream_Cursor_Value_Input = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Scalars['date']['input']>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** お気に入りフラグ */
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  meat_id?: InputMaybe<Scalars['uuid']['input']>;
  /** メモ */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  /** ユーザーID */
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Meat_Stocks_Sum_Fields = {
  __typename?: 'meat_stocks_sum_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Int']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "meat_stocks" */
export type Meat_Stocks_Sum_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** update columns of table "meat_stocks" */
export enum Meat_Stocks_Update_Column {
  /** column name */
  ExpirationDate = 'expiration_date',
  /** column name */
  IncrementalUnit = 'incremental_unit',
  /** column name */
  IsFavorite = 'is_favorite',
  /** column name */
  MeatId = 'meat_id',
  /** column name */
  Memo = 'memo',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id'
}

export type Meat_Stocks_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Meat_Stocks_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meat_Stocks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Meat_Stocks_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Meat_Stocks_Var_Pop_Fields = {
  __typename?: 'meat_stocks_var_pop_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "meat_stocks" */
export type Meat_Stocks_Var_Pop_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Meat_Stocks_Var_Samp_Fields = {
  __typename?: 'meat_stocks_var_samp_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "meat_stocks" */
export type Meat_Stocks_Var_Samp_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Meat_Stocks_Variance_Fields = {
  __typename?: 'meat_stocks_variance_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "meat_stocks" */
export type Meat_Stocks_Variance_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "custom_meat_master" */
  delete_custom_meat_master?: Maybe<Custom_Meat_Master_Mutation_Response>;
  /** delete single row from the table: "custom_meat_master" */
  delete_custom_meat_master_by_pk?: Maybe<Custom_Meat_Master>;
  /** delete data from the table: "custom_vegetable_master" */
  delete_custom_vegetable_master?: Maybe<Custom_Vegetable_Master_Mutation_Response>;
  /** delete single row from the table: "custom_vegetable_master" */
  delete_custom_vegetable_master_by_pk?: Maybe<Custom_Vegetable_Master>;
  /** delete data from the table: "meat_master" */
  delete_meat_master?: Maybe<Meat_Master_Mutation_Response>;
  /** delete single row from the table: "meat_master" */
  delete_meat_master_by_pk?: Maybe<Meat_Master>;
  /** delete data from the table: "meat_stocks" */
  delete_meat_stocks?: Maybe<Meat_Stocks_Mutation_Response>;
  /** delete single row from the table: "meat_stocks" */
  delete_meat_stocks_by_pk?: Maybe<Meat_Stocks>;
  /** delete data from the table: "unit_master" */
  delete_unit_master?: Maybe<Unit_Master_Mutation_Response>;
  /** delete single row from the table: "unit_master" */
  delete_unit_master_by_pk?: Maybe<Unit_Master>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "vegetable_master" */
  delete_vegetable_master?: Maybe<Vegetable_Master_Mutation_Response>;
  /** delete single row from the table: "vegetable_master" */
  delete_vegetable_master_by_pk?: Maybe<Vegetable_Master>;
  /** delete data from the table: "vegetable_stocks" */
  delete_vegetable_stocks?: Maybe<Vegetable_Stocks_Mutation_Response>;
  /** delete single row from the table: "vegetable_stocks" */
  delete_vegetable_stocks_by_pk?: Maybe<Vegetable_Stocks>;
  /** insert data into the table: "custom_meat_master" */
  insert_custom_meat_master?: Maybe<Custom_Meat_Master_Mutation_Response>;
  /** insert a single row into the table: "custom_meat_master" */
  insert_custom_meat_master_one?: Maybe<Custom_Meat_Master>;
  /** insert data into the table: "custom_vegetable_master" */
  insert_custom_vegetable_master?: Maybe<Custom_Vegetable_Master_Mutation_Response>;
  /** insert a single row into the table: "custom_vegetable_master" */
  insert_custom_vegetable_master_one?: Maybe<Custom_Vegetable_Master>;
  /** insert data into the table: "meat_master" */
  insert_meat_master?: Maybe<Meat_Master_Mutation_Response>;
  /** insert a single row into the table: "meat_master" */
  insert_meat_master_one?: Maybe<Meat_Master>;
  /** insert data into the table: "meat_stocks" */
  insert_meat_stocks?: Maybe<Meat_Stocks_Mutation_Response>;
  /** insert a single row into the table: "meat_stocks" */
  insert_meat_stocks_one?: Maybe<Meat_Stocks>;
  /** insert data into the table: "unit_master" */
  insert_unit_master?: Maybe<Unit_Master_Mutation_Response>;
  /** insert a single row into the table: "unit_master" */
  insert_unit_master_one?: Maybe<Unit_Master>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "vegetable_master" */
  insert_vegetable_master?: Maybe<Vegetable_Master_Mutation_Response>;
  /** insert a single row into the table: "vegetable_master" */
  insert_vegetable_master_one?: Maybe<Vegetable_Master>;
  /** insert data into the table: "vegetable_stocks" */
  insert_vegetable_stocks?: Maybe<Vegetable_Stocks_Mutation_Response>;
  /** insert a single row into the table: "vegetable_stocks" */
  insert_vegetable_stocks_one?: Maybe<Vegetable_Stocks>;
  /** update data of the table: "custom_meat_master" */
  update_custom_meat_master?: Maybe<Custom_Meat_Master_Mutation_Response>;
  /** update single row of the table: "custom_meat_master" */
  update_custom_meat_master_by_pk?: Maybe<Custom_Meat_Master>;
  /** update multiples rows of table: "custom_meat_master" */
  update_custom_meat_master_many?: Maybe<Array<Maybe<Custom_Meat_Master_Mutation_Response>>>;
  /** update data of the table: "custom_vegetable_master" */
  update_custom_vegetable_master?: Maybe<Custom_Vegetable_Master_Mutation_Response>;
  /** update single row of the table: "custom_vegetable_master" */
  update_custom_vegetable_master_by_pk?: Maybe<Custom_Vegetable_Master>;
  /** update multiples rows of table: "custom_vegetable_master" */
  update_custom_vegetable_master_many?: Maybe<Array<Maybe<Custom_Vegetable_Master_Mutation_Response>>>;
  /** update data of the table: "meat_master" */
  update_meat_master?: Maybe<Meat_Master_Mutation_Response>;
  /** update single row of the table: "meat_master" */
  update_meat_master_by_pk?: Maybe<Meat_Master>;
  /** update multiples rows of table: "meat_master" */
  update_meat_master_many?: Maybe<Array<Maybe<Meat_Master_Mutation_Response>>>;
  /** update data of the table: "meat_stocks" */
  update_meat_stocks?: Maybe<Meat_Stocks_Mutation_Response>;
  /** update single row of the table: "meat_stocks" */
  update_meat_stocks_by_pk?: Maybe<Meat_Stocks>;
  /** update multiples rows of table: "meat_stocks" */
  update_meat_stocks_many?: Maybe<Array<Maybe<Meat_Stocks_Mutation_Response>>>;
  /** update data of the table: "unit_master" */
  update_unit_master?: Maybe<Unit_Master_Mutation_Response>;
  /** update single row of the table: "unit_master" */
  update_unit_master_by_pk?: Maybe<Unit_Master>;
  /** update multiples rows of table: "unit_master" */
  update_unit_master_many?: Maybe<Array<Maybe<Unit_Master_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update data of the table: "vegetable_master" */
  update_vegetable_master?: Maybe<Vegetable_Master_Mutation_Response>;
  /** update single row of the table: "vegetable_master" */
  update_vegetable_master_by_pk?: Maybe<Vegetable_Master>;
  /** update multiples rows of table: "vegetable_master" */
  update_vegetable_master_many?: Maybe<Array<Maybe<Vegetable_Master_Mutation_Response>>>;
  /** update data of the table: "vegetable_stocks" */
  update_vegetable_stocks?: Maybe<Vegetable_Stocks_Mutation_Response>;
  /** update single row of the table: "vegetable_stocks" */
  update_vegetable_stocks_by_pk?: Maybe<Vegetable_Stocks>;
  /** update multiples rows of table: "vegetable_stocks" */
  update_vegetable_stocks_many?: Maybe<Array<Maybe<Vegetable_Stocks_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Custom_Meat_MasterArgs = {
  where: Custom_Meat_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Custom_Meat_Master_By_PkArgs = {
  custom_meat_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Custom_Vegetable_MasterArgs = {
  where: Custom_Vegetable_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Custom_Vegetable_Master_By_PkArgs = {
  custom_vegetable_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Meat_MasterArgs = {
  where: Meat_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meat_Master_By_PkArgs = {
  meat_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Meat_StocksArgs = {
  where: Meat_Stocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meat_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Unit_MasterArgs = {
  where: Unit_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Unit_Master_By_PkArgs = {
  unit_id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Vegetable_MasterArgs = {
  where: Vegetable_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vegetable_Master_By_PkArgs = {
  vegetable_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Vegetable_StocksArgs = {
  where: Vegetable_Stocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vegetable_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Custom_Meat_MasterArgs = {
  objects: Array<Custom_Meat_Master_Insert_Input>;
  on_conflict?: InputMaybe<Custom_Meat_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Custom_Meat_Master_OneArgs = {
  object: Custom_Meat_Master_Insert_Input;
  on_conflict?: InputMaybe<Custom_Meat_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Custom_Vegetable_MasterArgs = {
  objects: Array<Custom_Vegetable_Master_Insert_Input>;
  on_conflict?: InputMaybe<Custom_Vegetable_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Custom_Vegetable_Master_OneArgs = {
  object: Custom_Vegetable_Master_Insert_Input;
  on_conflict?: InputMaybe<Custom_Vegetable_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meat_MasterArgs = {
  objects: Array<Meat_Master_Insert_Input>;
  on_conflict?: InputMaybe<Meat_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meat_Master_OneArgs = {
  object: Meat_Master_Insert_Input;
  on_conflict?: InputMaybe<Meat_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meat_StocksArgs = {
  objects: Array<Meat_Stocks_Insert_Input>;
  on_conflict?: InputMaybe<Meat_Stocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meat_Stocks_OneArgs = {
  object: Meat_Stocks_Insert_Input;
  on_conflict?: InputMaybe<Meat_Stocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Unit_MasterArgs = {
  objects: Array<Unit_Master_Insert_Input>;
  on_conflict?: InputMaybe<Unit_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Unit_Master_OneArgs = {
  object: Unit_Master_Insert_Input;
  on_conflict?: InputMaybe<Unit_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vegetable_MasterArgs = {
  objects: Array<Vegetable_Master_Insert_Input>;
  on_conflict?: InputMaybe<Vegetable_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vegetable_Master_OneArgs = {
  object: Vegetable_Master_Insert_Input;
  on_conflict?: InputMaybe<Vegetable_Master_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vegetable_StocksArgs = {
  objects: Array<Vegetable_Stocks_Insert_Input>;
  on_conflict?: InputMaybe<Vegetable_Stocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vegetable_Stocks_OneArgs = {
  object: Vegetable_Stocks_Insert_Input;
  on_conflict?: InputMaybe<Vegetable_Stocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Custom_Meat_MasterArgs = {
  _inc?: InputMaybe<Custom_Meat_Master_Inc_Input>;
  _set?: InputMaybe<Custom_Meat_Master_Set_Input>;
  where: Custom_Meat_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Custom_Meat_Master_By_PkArgs = {
  _inc?: InputMaybe<Custom_Meat_Master_Inc_Input>;
  _set?: InputMaybe<Custom_Meat_Master_Set_Input>;
  pk_columns: Custom_Meat_Master_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Custom_Meat_Master_ManyArgs = {
  updates: Array<Custom_Meat_Master_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Custom_Vegetable_MasterArgs = {
  _inc?: InputMaybe<Custom_Vegetable_Master_Inc_Input>;
  _set?: InputMaybe<Custom_Vegetable_Master_Set_Input>;
  where: Custom_Vegetable_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Custom_Vegetable_Master_By_PkArgs = {
  _inc?: InputMaybe<Custom_Vegetable_Master_Inc_Input>;
  _set?: InputMaybe<Custom_Vegetable_Master_Set_Input>;
  pk_columns: Custom_Vegetable_Master_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Custom_Vegetable_Master_ManyArgs = {
  updates: Array<Custom_Vegetable_Master_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Meat_MasterArgs = {
  _inc?: InputMaybe<Meat_Master_Inc_Input>;
  _set?: InputMaybe<Meat_Master_Set_Input>;
  where: Meat_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meat_Master_By_PkArgs = {
  _inc?: InputMaybe<Meat_Master_Inc_Input>;
  _set?: InputMaybe<Meat_Master_Set_Input>;
  pk_columns: Meat_Master_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meat_Master_ManyArgs = {
  updates: Array<Meat_Master_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Meat_StocksArgs = {
  _inc?: InputMaybe<Meat_Stocks_Inc_Input>;
  _set?: InputMaybe<Meat_Stocks_Set_Input>;
  where: Meat_Stocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meat_Stocks_By_PkArgs = {
  _inc?: InputMaybe<Meat_Stocks_Inc_Input>;
  _set?: InputMaybe<Meat_Stocks_Set_Input>;
  pk_columns: Meat_Stocks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meat_Stocks_ManyArgs = {
  updates: Array<Meat_Stocks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Unit_MasterArgs = {
  _inc?: InputMaybe<Unit_Master_Inc_Input>;
  _set?: InputMaybe<Unit_Master_Set_Input>;
  where: Unit_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Unit_Master_By_PkArgs = {
  _inc?: InputMaybe<Unit_Master_Inc_Input>;
  _set?: InputMaybe<Unit_Master_Set_Input>;
  pk_columns: Unit_Master_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Unit_Master_ManyArgs = {
  updates: Array<Unit_Master_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Vegetable_MasterArgs = {
  _inc?: InputMaybe<Vegetable_Master_Inc_Input>;
  _set?: InputMaybe<Vegetable_Master_Set_Input>;
  where: Vegetable_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vegetable_Master_By_PkArgs = {
  _inc?: InputMaybe<Vegetable_Master_Inc_Input>;
  _set?: InputMaybe<Vegetable_Master_Set_Input>;
  pk_columns: Vegetable_Master_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vegetable_Master_ManyArgs = {
  updates: Array<Vegetable_Master_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Vegetable_StocksArgs = {
  _inc?: InputMaybe<Vegetable_Stocks_Inc_Input>;
  _set?: InputMaybe<Vegetable_Stocks_Set_Input>;
  where: Vegetable_Stocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vegetable_Stocks_By_PkArgs = {
  _inc?: InputMaybe<Vegetable_Stocks_Inc_Input>;
  _set?: InputMaybe<Vegetable_Stocks_Set_Input>;
  pk_columns: Vegetable_Stocks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vegetable_Stocks_ManyArgs = {
  updates: Array<Vegetable_Stocks_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "custom_meat_master" */
  custom_meat_master: Array<Custom_Meat_Master>;
  /** fetch aggregated fields from the table: "custom_meat_master" */
  custom_meat_master_aggregate: Custom_Meat_Master_Aggregate;
  /** fetch data from the table: "custom_meat_master" using primary key columns */
  custom_meat_master_by_pk?: Maybe<Custom_Meat_Master>;
  /** fetch data from the table: "custom_vegetable_master" */
  custom_vegetable_master: Array<Custom_Vegetable_Master>;
  /** fetch aggregated fields from the table: "custom_vegetable_master" */
  custom_vegetable_master_aggregate: Custom_Vegetable_Master_Aggregate;
  /** fetch data from the table: "custom_vegetable_master" using primary key columns */
  custom_vegetable_master_by_pk?: Maybe<Custom_Vegetable_Master>;
  /** fetch data from the table: "meat_master" */
  meat_master: Array<Meat_Master>;
  /** fetch aggregated fields from the table: "meat_master" */
  meat_master_aggregate: Meat_Master_Aggregate;
  /** fetch data from the table: "meat_master" using primary key columns */
  meat_master_by_pk?: Maybe<Meat_Master>;
  /** fetch data from the table: "meat_stocks" */
  meat_stocks: Array<Meat_Stocks>;
  /** fetch aggregated fields from the table: "meat_stocks" */
  meat_stocks_aggregate: Meat_Stocks_Aggregate;
  /** fetch data from the table: "meat_stocks" using primary key columns */
  meat_stocks_by_pk?: Maybe<Meat_Stocks>;
  /** fetch data from the table: "unit_master" */
  unit_master: Array<Unit_Master>;
  /** fetch aggregated fields from the table: "unit_master" */
  unit_master_aggregate: Unit_Master_Aggregate;
  /** fetch data from the table: "unit_master" using primary key columns */
  unit_master_by_pk?: Maybe<Unit_Master>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "vegetable_master" */
  vegetable_master: Array<Vegetable_Master>;
  /** fetch aggregated fields from the table: "vegetable_master" */
  vegetable_master_aggregate: Vegetable_Master_Aggregate;
  /** fetch data from the table: "vegetable_master" using primary key columns */
  vegetable_master_by_pk?: Maybe<Vegetable_Master>;
  /** fetch data from the table: "vegetable_stocks" */
  vegetable_stocks: Array<Vegetable_Stocks>;
  /** fetch aggregated fields from the table: "vegetable_stocks" */
  vegetable_stocks_aggregate: Vegetable_Stocks_Aggregate;
  /** fetch data from the table: "vegetable_stocks" using primary key columns */
  vegetable_stocks_by_pk?: Maybe<Vegetable_Stocks>;
};


export type Query_RootCustom_Meat_MasterArgs = {
  distinct_on?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Meat_Master_Order_By>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


export type Query_RootCustom_Meat_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Meat_Master_Order_By>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


export type Query_RootCustom_Meat_Master_By_PkArgs = {
  custom_meat_id: Scalars['uuid']['input'];
};


export type Query_RootCustom_Vegetable_MasterArgs = {
  distinct_on?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Vegetable_Master_Order_By>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


export type Query_RootCustom_Vegetable_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Vegetable_Master_Order_By>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


export type Query_RootCustom_Vegetable_Master_By_PkArgs = {
  custom_vegetable_id: Scalars['uuid']['input'];
};


export type Query_RootMeat_MasterArgs = {
  distinct_on?: InputMaybe<Array<Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Master_Order_By>>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};


export type Query_RootMeat_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Master_Order_By>>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};


export type Query_RootMeat_Master_By_PkArgs = {
  meat_id: Scalars['uuid']['input'];
};


export type Query_RootMeat_StocksArgs = {
  distinct_on?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Stocks_Order_By>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


export type Query_RootMeat_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Stocks_Order_By>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


export type Query_RootMeat_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};


export type Query_RootUnit_MasterArgs = {
  distinct_on?: InputMaybe<Array<Unit_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Unit_Master_Order_By>>;
  where?: InputMaybe<Unit_Master_Bool_Exp>;
};


export type Query_RootUnit_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Unit_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Unit_Master_Order_By>>;
  where?: InputMaybe<Unit_Master_Bool_Exp>;
};


export type Query_RootUnit_Master_By_PkArgs = {
  unit_id: Scalars['Int']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootVegetable_MasterArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Master_Order_By>>;
  where?: InputMaybe<Vegetable_Master_Bool_Exp>;
};


export type Query_RootVegetable_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Master_Order_By>>;
  where?: InputMaybe<Vegetable_Master_Bool_Exp>;
};


export type Query_RootVegetable_Master_By_PkArgs = {
  vegetable_id: Scalars['uuid']['input'];
};


export type Query_RootVegetable_StocksArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};


export type Query_RootVegetable_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};


export type Query_RootVegetable_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "custom_meat_master" */
  custom_meat_master: Array<Custom_Meat_Master>;
  /** fetch aggregated fields from the table: "custom_meat_master" */
  custom_meat_master_aggregate: Custom_Meat_Master_Aggregate;
  /** fetch data from the table: "custom_meat_master" using primary key columns */
  custom_meat_master_by_pk?: Maybe<Custom_Meat_Master>;
  /** fetch data from the table in a streaming manner: "custom_meat_master" */
  custom_meat_master_stream: Array<Custom_Meat_Master>;
  /** fetch data from the table: "custom_vegetable_master" */
  custom_vegetable_master: Array<Custom_Vegetable_Master>;
  /** fetch aggregated fields from the table: "custom_vegetable_master" */
  custom_vegetable_master_aggregate: Custom_Vegetable_Master_Aggregate;
  /** fetch data from the table: "custom_vegetable_master" using primary key columns */
  custom_vegetable_master_by_pk?: Maybe<Custom_Vegetable_Master>;
  /** fetch data from the table in a streaming manner: "custom_vegetable_master" */
  custom_vegetable_master_stream: Array<Custom_Vegetable_Master>;
  /** fetch data from the table: "meat_master" */
  meat_master: Array<Meat_Master>;
  /** fetch aggregated fields from the table: "meat_master" */
  meat_master_aggregate: Meat_Master_Aggregate;
  /** fetch data from the table: "meat_master" using primary key columns */
  meat_master_by_pk?: Maybe<Meat_Master>;
  /** fetch data from the table in a streaming manner: "meat_master" */
  meat_master_stream: Array<Meat_Master>;
  /** fetch data from the table: "meat_stocks" */
  meat_stocks: Array<Meat_Stocks>;
  /** fetch aggregated fields from the table: "meat_stocks" */
  meat_stocks_aggregate: Meat_Stocks_Aggregate;
  /** fetch data from the table: "meat_stocks" using primary key columns */
  meat_stocks_by_pk?: Maybe<Meat_Stocks>;
  /** fetch data from the table in a streaming manner: "meat_stocks" */
  meat_stocks_stream: Array<Meat_Stocks>;
  /** fetch data from the table: "unit_master" */
  unit_master: Array<Unit_Master>;
  /** fetch aggregated fields from the table: "unit_master" */
  unit_master_aggregate: Unit_Master_Aggregate;
  /** fetch data from the table: "unit_master" using primary key columns */
  unit_master_by_pk?: Maybe<Unit_Master>;
  /** fetch data from the table in a streaming manner: "unit_master" */
  unit_master_stream: Array<Unit_Master>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
  /** fetch data from the table: "vegetable_master" */
  vegetable_master: Array<Vegetable_Master>;
  /** fetch aggregated fields from the table: "vegetable_master" */
  vegetable_master_aggregate: Vegetable_Master_Aggregate;
  /** fetch data from the table: "vegetable_master" using primary key columns */
  vegetable_master_by_pk?: Maybe<Vegetable_Master>;
  /** fetch data from the table in a streaming manner: "vegetable_master" */
  vegetable_master_stream: Array<Vegetable_Master>;
  /** fetch data from the table: "vegetable_stocks" */
  vegetable_stocks: Array<Vegetable_Stocks>;
  /** fetch aggregated fields from the table: "vegetable_stocks" */
  vegetable_stocks_aggregate: Vegetable_Stocks_Aggregate;
  /** fetch data from the table: "vegetable_stocks" using primary key columns */
  vegetable_stocks_by_pk?: Maybe<Vegetable_Stocks>;
  /** fetch data from the table in a streaming manner: "vegetable_stocks" */
  vegetable_stocks_stream: Array<Vegetable_Stocks>;
};


export type Subscription_RootCustom_Meat_MasterArgs = {
  distinct_on?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Meat_Master_Order_By>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


export type Subscription_RootCustom_Meat_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Meat_Master_Order_By>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


export type Subscription_RootCustom_Meat_Master_By_PkArgs = {
  custom_meat_id: Scalars['uuid']['input'];
};


export type Subscription_RootCustom_Meat_Master_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Custom_Meat_Master_Stream_Cursor_Input>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


export type Subscription_RootCustom_Vegetable_MasterArgs = {
  distinct_on?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Vegetable_Master_Order_By>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


export type Subscription_RootCustom_Vegetable_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Vegetable_Master_Order_By>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


export type Subscription_RootCustom_Vegetable_Master_By_PkArgs = {
  custom_vegetable_id: Scalars['uuid']['input'];
};


export type Subscription_RootCustom_Vegetable_Master_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Custom_Vegetable_Master_Stream_Cursor_Input>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


export type Subscription_RootMeat_MasterArgs = {
  distinct_on?: InputMaybe<Array<Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Master_Order_By>>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};


export type Subscription_RootMeat_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Master_Order_By>>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};


export type Subscription_RootMeat_Master_By_PkArgs = {
  meat_id: Scalars['uuid']['input'];
};


export type Subscription_RootMeat_Master_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Meat_Master_Stream_Cursor_Input>>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};


export type Subscription_RootMeat_StocksArgs = {
  distinct_on?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Stocks_Order_By>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


export type Subscription_RootMeat_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Stocks_Order_By>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


export type Subscription_RootMeat_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};


export type Subscription_RootMeat_Stocks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Meat_Stocks_Stream_Cursor_Input>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


export type Subscription_RootUnit_MasterArgs = {
  distinct_on?: InputMaybe<Array<Unit_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Unit_Master_Order_By>>;
  where?: InputMaybe<Unit_Master_Bool_Exp>;
};


export type Subscription_RootUnit_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Unit_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Unit_Master_Order_By>>;
  where?: InputMaybe<Unit_Master_Bool_Exp>;
};


export type Subscription_RootUnit_Master_By_PkArgs = {
  unit_id: Scalars['Int']['input'];
};


export type Subscription_RootUnit_Master_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Unit_Master_Stream_Cursor_Input>>;
  where?: InputMaybe<Unit_Master_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootVegetable_MasterArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Master_Order_By>>;
  where?: InputMaybe<Vegetable_Master_Bool_Exp>;
};


export type Subscription_RootVegetable_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Master_Order_By>>;
  where?: InputMaybe<Vegetable_Master_Bool_Exp>;
};


export type Subscription_RootVegetable_Master_By_PkArgs = {
  vegetable_id: Scalars['uuid']['input'];
};


export type Subscription_RootVegetable_Master_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vegetable_Master_Stream_Cursor_Input>>;
  where?: InputMaybe<Vegetable_Master_Bool_Exp>;
};


export type Subscription_RootVegetable_StocksArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};


export type Subscription_RootVegetable_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};


export type Subscription_RootVegetable_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};


export type Subscription_RootVegetable_Stocks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vegetable_Stocks_Stream_Cursor_Input>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** 単位のマスタデータ */
export type Unit_Master = {
  __typename?: 'unit_master';
  /** 単位ID */
  unit_id: Scalars['Int']['output'];
  /** An object relationship */
  unit_master_custom_meat_master?: Maybe<Custom_Meat_Master>;
  /** An object relationship */
  unit_master_custom_vegetable_master?: Maybe<Custom_Vegetable_Master>;
  /** An object relationship */
  unit_master_meat_master?: Maybe<Meat_Master>;
  /** An object relationship */
  unit_master_vegetable_master?: Maybe<Vegetable_Master>;
  /** 単位名 */
  unit_name: Scalars['String']['output'];
};

/** aggregated selection of "unit_master" */
export type Unit_Master_Aggregate = {
  __typename?: 'unit_master_aggregate';
  aggregate?: Maybe<Unit_Master_Aggregate_Fields>;
  nodes: Array<Unit_Master>;
};

/** aggregate fields of "unit_master" */
export type Unit_Master_Aggregate_Fields = {
  __typename?: 'unit_master_aggregate_fields';
  avg?: Maybe<Unit_Master_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Unit_Master_Max_Fields>;
  min?: Maybe<Unit_Master_Min_Fields>;
  stddev?: Maybe<Unit_Master_Stddev_Fields>;
  stddev_pop?: Maybe<Unit_Master_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Unit_Master_Stddev_Samp_Fields>;
  sum?: Maybe<Unit_Master_Sum_Fields>;
  var_pop?: Maybe<Unit_Master_Var_Pop_Fields>;
  var_samp?: Maybe<Unit_Master_Var_Samp_Fields>;
  variance?: Maybe<Unit_Master_Variance_Fields>;
};


/** aggregate fields of "unit_master" */
export type Unit_Master_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Unit_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Unit_Master_Avg_Fields = {
  __typename?: 'unit_master_avg_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "unit_master". All fields are combined with a logical 'AND'. */
export type Unit_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Unit_Master_Bool_Exp>>;
  _not?: InputMaybe<Unit_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Unit_Master_Bool_Exp>>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
  unit_master_custom_meat_master?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
  unit_master_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
  unit_master_meat_master?: InputMaybe<Meat_Master_Bool_Exp>;
  unit_master_vegetable_master?: InputMaybe<Vegetable_Master_Bool_Exp>;
  unit_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "unit_master" */
export enum Unit_Master_Constraint {
  /** unique or primary key constraint on columns "unit_id" */
  UnitMasterPkey = 'unit_master_pkey'
}

/** input type for incrementing numeric columns in table "unit_master" */
export type Unit_Master_Inc_Input = {
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "unit_master" */
export type Unit_Master_Insert_Input = {
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  unit_master_custom_meat_master?: InputMaybe<Custom_Meat_Master_Obj_Rel_Insert_Input>;
  unit_master_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Obj_Rel_Insert_Input>;
  unit_master_meat_master?: InputMaybe<Meat_Master_Obj_Rel_Insert_Input>;
  unit_master_vegetable_master?: InputMaybe<Vegetable_Master_Obj_Rel_Insert_Input>;
  /** 単位名 */
  unit_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Unit_Master_Max_Fields = {
  __typename?: 'unit_master_max_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
  /** 単位名 */
  unit_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Unit_Master_Min_Fields = {
  __typename?: 'unit_master_min_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
  /** 単位名 */
  unit_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "unit_master" */
export type Unit_Master_Mutation_Response = {
  __typename?: 'unit_master_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Unit_Master>;
};

/** input type for inserting object relation for remote table "unit_master" */
export type Unit_Master_Obj_Rel_Insert_Input = {
  data: Unit_Master_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Unit_Master_On_Conflict>;
};

/** on_conflict condition type for table "unit_master" */
export type Unit_Master_On_Conflict = {
  constraint: Unit_Master_Constraint;
  update_columns?: Array<Unit_Master_Update_Column>;
  where?: InputMaybe<Unit_Master_Bool_Exp>;
};

/** Ordering options when selecting data from "unit_master". */
export type Unit_Master_Order_By = {
  unit_id?: InputMaybe<Order_By>;
  unit_master_custom_meat_master?: InputMaybe<Custom_Meat_Master_Order_By>;
  unit_master_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Order_By>;
  unit_master_meat_master?: InputMaybe<Meat_Master_Order_By>;
  unit_master_vegetable_master?: InputMaybe<Vegetable_Master_Order_By>;
  unit_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: unit_master */
export type Unit_Master_Pk_Columns_Input = {
  /** 単位ID */
  unit_id: Scalars['Int']['input'];
};

/** select columns of table "unit_master" */
export enum Unit_Master_Select_Column {
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  UnitName = 'unit_name'
}

/** input type for updating data in table "unit_master" */
export type Unit_Master_Set_Input = {
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  /** 単位名 */
  unit_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Unit_Master_Stddev_Fields = {
  __typename?: 'unit_master_stddev_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Unit_Master_Stddev_Pop_Fields = {
  __typename?: 'unit_master_stddev_pop_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Unit_Master_Stddev_Samp_Fields = {
  __typename?: 'unit_master_stddev_samp_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "unit_master" */
export type Unit_Master_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Unit_Master_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Unit_Master_Stream_Cursor_Value_Input = {
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  /** 単位名 */
  unit_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Unit_Master_Sum_Fields = {
  __typename?: 'unit_master_sum_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "unit_master" */
export enum Unit_Master_Update_Column {
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  UnitName = 'unit_name'
}

export type Unit_Master_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Unit_Master_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Unit_Master_Set_Input>;
  /** filter the rows which have to be updated */
  where: Unit_Master_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Unit_Master_Var_Pop_Fields = {
  __typename?: 'unit_master_var_pop_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Unit_Master_Var_Samp_Fields = {
  __typename?: 'unit_master_var_samp_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Unit_Master_Variance_Fields = {
  __typename?: 'unit_master_variance_fields';
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** frimane ユーザー */
export type Users = {
  __typename?: 'users';
  /** アカウント作成日 */
  created_at: Scalars['timestamptz']['output'];
  /** Emailアドレス */
  email: Scalars['String']['output'];
  /** ユーザーID */
  id: Scalars['String']['output'];
  /** An array relationship */
  user_meat_stocks: Array<Meat_Stocks>;
  /** An aggregate relationship */
  user_meat_stocks_aggregate: Meat_Stocks_Aggregate;
  /** An array relationship */
  users_custom_meat_master: Array<Custom_Meat_Master>;
  /** An aggregate relationship */
  users_custom_meat_master_aggregate: Custom_Meat_Master_Aggregate;
  /** An array relationship */
  users_custom_vegetable_master: Array<Custom_Vegetable_Master>;
  /** An aggregate relationship */
  users_custom_vegetable_master_aggregate: Custom_Vegetable_Master_Aggregate;
  /** An array relationship */
  users_vegetable_stocks: Array<Vegetable_Stocks>;
  /** An aggregate relationship */
  users_vegetable_stocks_aggregate: Vegetable_Stocks_Aggregate;
};


/** frimane ユーザー */
export type UsersUser_Meat_StocksArgs = {
  distinct_on?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Stocks_Order_By>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUser_Meat_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meat_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meat_Stocks_Order_By>>;
  where?: InputMaybe<Meat_Stocks_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUsers_Custom_Meat_MasterArgs = {
  distinct_on?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Meat_Master_Order_By>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUsers_Custom_Meat_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Custom_Meat_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Meat_Master_Order_By>>;
  where?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUsers_Custom_Vegetable_MasterArgs = {
  distinct_on?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Vegetable_Master_Order_By>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUsers_Custom_Vegetable_Master_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Custom_Vegetable_Master_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Custom_Vegetable_Master_Order_By>>;
  where?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUsers_Vegetable_StocksArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};


/** frimane ユーザー */
export type UsersUsers_Vegetable_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  user_meat_stocks?: InputMaybe<Meat_Stocks_Bool_Exp>;
  user_meat_stocks_aggregate?: InputMaybe<Meat_Stocks_Aggregate_Bool_Exp>;
  users_custom_meat_master?: InputMaybe<Custom_Meat_Master_Bool_Exp>;
  users_custom_meat_master_aggregate?: InputMaybe<Custom_Meat_Master_Aggregate_Bool_Exp>;
  users_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
  users_custom_vegetable_master_aggregate?: InputMaybe<Custom_Vegetable_Master_Aggregate_Bool_Exp>;
  users_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  users_vegetable_stocks_aggregate?: InputMaybe<Vegetable_Stocks_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  /** アカウント作成日 */
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Emailアドレス */
  email?: InputMaybe<Scalars['String']['input']>;
  /** ユーザーID */
  id?: InputMaybe<Scalars['String']['input']>;
  user_meat_stocks?: InputMaybe<Meat_Stocks_Arr_Rel_Insert_Input>;
  users_custom_meat_master?: InputMaybe<Custom_Meat_Master_Arr_Rel_Insert_Input>;
  users_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Arr_Rel_Insert_Input>;
  users_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  /** アカウント作成日 */
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** Emailアドレス */
  email?: Maybe<Scalars['String']['output']>;
  /** ユーザーID */
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  /** アカウント作成日 */
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** Emailアドレス */
  email?: Maybe<Scalars['String']['output']>;
  /** ユーザーID */
  id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_meat_stocks_aggregate?: InputMaybe<Meat_Stocks_Aggregate_Order_By>;
  users_custom_meat_master_aggregate?: InputMaybe<Custom_Meat_Master_Aggregate_Order_By>;
  users_custom_vegetable_master_aggregate?: InputMaybe<Custom_Vegetable_Master_Aggregate_Order_By>;
  users_vegetable_stocks_aggregate?: InputMaybe<Vegetable_Stocks_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  /** ユーザーID */
  id: Scalars['String']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  /** アカウント作成日 */
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Emailアドレス */
  email?: InputMaybe<Scalars['String']['input']>;
  /** ユーザーID */
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  /** アカウント作成日 */
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  /** Emailアドレス */
  email?: InputMaybe<Scalars['String']['input']>;
  /** ユーザーID */
  id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** 野菜のマスタデータ */
export type Vegetable_Master = {
  __typename?: 'vegetable_master';
  /** 賞味期限の基準期間 */
  default_expiration_period: Scalars['Int']['output'];
  /** 表示名 */
  display_name: Scalars['String']['output'];
  /** 画像URI */
  image_uri: Scalars['String']['output'];
  /** 単位ID */
  unit_id: Scalars['Int']['output'];
  vegetable_id: Scalars['uuid']['output'];
  /** An object relationship */
  vegetable_master_unit_master?: Maybe<Unit_Master>;
  /** An object relationship */
  vegetable_master_vegetable_stocks?: Maybe<Vegetable_Stocks>;
  /** 野菜名（ひらがな） */
  vegetable_name: Scalars['String']['output'];
};

/** aggregated selection of "vegetable_master" */
export type Vegetable_Master_Aggregate = {
  __typename?: 'vegetable_master_aggregate';
  aggregate?: Maybe<Vegetable_Master_Aggregate_Fields>;
  nodes: Array<Vegetable_Master>;
};

/** aggregate fields of "vegetable_master" */
export type Vegetable_Master_Aggregate_Fields = {
  __typename?: 'vegetable_master_aggregate_fields';
  avg?: Maybe<Vegetable_Master_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vegetable_Master_Max_Fields>;
  min?: Maybe<Vegetable_Master_Min_Fields>;
  stddev?: Maybe<Vegetable_Master_Stddev_Fields>;
  stddev_pop?: Maybe<Vegetable_Master_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vegetable_Master_Stddev_Samp_Fields>;
  sum?: Maybe<Vegetable_Master_Sum_Fields>;
  var_pop?: Maybe<Vegetable_Master_Var_Pop_Fields>;
  var_samp?: Maybe<Vegetable_Master_Var_Samp_Fields>;
  variance?: Maybe<Vegetable_Master_Variance_Fields>;
};


/** aggregate fields of "vegetable_master" */
export type Vegetable_Master_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vegetable_Master_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Vegetable_Master_Avg_Fields = {
  __typename?: 'vegetable_master_avg_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "vegetable_master". All fields are combined with a logical 'AND'. */
export type Vegetable_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Vegetable_Master_Bool_Exp>>;
  _not?: InputMaybe<Vegetable_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Vegetable_Master_Bool_Exp>>;
  default_expiration_period?: InputMaybe<Int_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  image_uri?: InputMaybe<String_Comparison_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
  vegetable_id?: InputMaybe<Uuid_Comparison_Exp>;
  vegetable_master_unit_master?: InputMaybe<Unit_Master_Bool_Exp>;
  vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  vegetable_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vegetable_master" */
export enum Vegetable_Master_Constraint {
  /** unique or primary key constraint on columns "display_name" */
  VegetableMasterDisplayNameKey = 'vegetable_master_display_name_key',
  /** unique or primary key constraint on columns "image_uri" */
  VegetableMasterImageUriKey = 'vegetable_master_image_uri_key',
  /** unique or primary key constraint on columns "vegetable_id" */
  VegetableMasterPkey = 'vegetable_master_pkey',
  /** unique or primary key constraint on columns "vegetable_name" */
  VegetableMasterVegetableNameKey = 'vegetable_master_vegetable_name_key'
}

/** input type for incrementing numeric columns in table "vegetable_master" */
export type Vegetable_Master_Inc_Input = {
  /** 賞味期限の基準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "vegetable_master" */
export type Vegetable_Master_Insert_Input = {
  /** 賞味期限の基準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 表示名 */
  display_name?: InputMaybe<Scalars['String']['input']>;
  /** 画像URI */
  image_uri?: InputMaybe<Scalars['String']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  vegetable_master_unit_master?: InputMaybe<Unit_Master_Obj_Rel_Insert_Input>;
  vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Obj_Rel_Insert_Input>;
  /** 野菜名（ひらがな） */
  vegetable_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vegetable_Master_Max_Fields = {
  __typename?: 'vegetable_master_max_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  /** 表示名 */
  display_name?: Maybe<Scalars['String']['output']>;
  /** 画像URI */
  image_uri?: Maybe<Scalars['String']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
  vegetable_id?: Maybe<Scalars['uuid']['output']>;
  /** 野菜名（ひらがな） */
  vegetable_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vegetable_Master_Min_Fields = {
  __typename?: 'vegetable_master_min_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  /** 表示名 */
  display_name?: Maybe<Scalars['String']['output']>;
  /** 画像URI */
  image_uri?: Maybe<Scalars['String']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
  vegetable_id?: Maybe<Scalars['uuid']['output']>;
  /** 野菜名（ひらがな） */
  vegetable_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "vegetable_master" */
export type Vegetable_Master_Mutation_Response = {
  __typename?: 'vegetable_master_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vegetable_Master>;
};

/** input type for inserting object relation for remote table "vegetable_master" */
export type Vegetable_Master_Obj_Rel_Insert_Input = {
  data: Vegetable_Master_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vegetable_Master_On_Conflict>;
};

/** on_conflict condition type for table "vegetable_master" */
export type Vegetable_Master_On_Conflict = {
  constraint: Vegetable_Master_Constraint;
  update_columns?: Array<Vegetable_Master_Update_Column>;
  where?: InputMaybe<Vegetable_Master_Bool_Exp>;
};

/** Ordering options when selecting data from "vegetable_master". */
export type Vegetable_Master_Order_By = {
  default_expiration_period?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  image_uri?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
  vegetable_master_unit_master?: InputMaybe<Unit_Master_Order_By>;
  vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Order_By>;
  vegetable_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vegetable_master */
export type Vegetable_Master_Pk_Columns_Input = {
  vegetable_id: Scalars['uuid']['input'];
};

/** select columns of table "vegetable_master" */
export enum Vegetable_Master_Select_Column {
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  VegetableId = 'vegetable_id',
  /** column name */
  VegetableName = 'vegetable_name'
}

/** input type for updating data in table "vegetable_master" */
export type Vegetable_Master_Set_Input = {
  /** 賞味期限の基準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 表示名 */
  display_name?: InputMaybe<Scalars['String']['input']>;
  /** 画像URI */
  image_uri?: InputMaybe<Scalars['String']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  /** 野菜名（ひらがな） */
  vegetable_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Vegetable_Master_Stddev_Fields = {
  __typename?: 'vegetable_master_stddev_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vegetable_Master_Stddev_Pop_Fields = {
  __typename?: 'vegetable_master_stddev_pop_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vegetable_Master_Stddev_Samp_Fields = {
  __typename?: 'vegetable_master_stddev_samp_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "vegetable_master" */
export type Vegetable_Master_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vegetable_Master_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vegetable_Master_Stream_Cursor_Value_Input = {
  /** 賞味期限の基準期間 */
  default_expiration_period?: InputMaybe<Scalars['Int']['input']>;
  /** 表示名 */
  display_name?: InputMaybe<Scalars['String']['input']>;
  /** 画像URI */
  image_uri?: InputMaybe<Scalars['String']['input']>;
  /** 単位ID */
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  /** 野菜名（ひらがな） */
  vegetable_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Vegetable_Master_Sum_Fields = {
  __typename?: 'vegetable_master_sum_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Int']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "vegetable_master" */
export enum Vegetable_Master_Update_Column {
  /** column name */
  DefaultExpirationPeriod = 'default_expiration_period',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  ImageUri = 'image_uri',
  /** column name */
  UnitId = 'unit_id',
  /** column name */
  VegetableId = 'vegetable_id',
  /** column name */
  VegetableName = 'vegetable_name'
}

export type Vegetable_Master_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Vegetable_Master_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vegetable_Master_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vegetable_Master_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Vegetable_Master_Var_Pop_Fields = {
  __typename?: 'vegetable_master_var_pop_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vegetable_Master_Var_Samp_Fields = {
  __typename?: 'vegetable_master_var_samp_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vegetable_Master_Variance_Fields = {
  __typename?: 'vegetable_master_variance_fields';
  /** 賞味期限の基準期間 */
  default_expiration_period?: Maybe<Scalars['Float']['output']>;
  /** 単位ID */
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** ユーザーごとの野菜ストック */
export type Vegetable_Stocks = {
  __typename?: 'vegetable_stocks';
  /** 賞味期限日 */
  expiration_date: Scalars['date']['output'];
  /** 増減単位 */
  incremental_unit: Scalars['Int']['output'];
  /** お気に入りフラグ */
  is_favorite: Scalars['Boolean']['output'];
  /** メモ */
  memo: Scalars['String']['output'];
  /** 在庫数 */
  quantity: Scalars['Int']['output'];
  /** ストックID */
  stock_id: Scalars['Int']['output'];
  /** ユーザーID */
  user_id: Scalars['String']['output'];
  vegetable_id: Scalars['uuid']['output'];
  /** An object relationship */
  vegetable_stocks_custom_vegetable_master?: Maybe<Custom_Vegetable_Master>;
  /** An object relationship */
  vegetable_stocks_users?: Maybe<Users>;
  /** An object relationship */
  vegetable_stocks_vegetable_master?: Maybe<Vegetable_Master>;
};

/** aggregated selection of "vegetable_stocks" */
export type Vegetable_Stocks_Aggregate = {
  __typename?: 'vegetable_stocks_aggregate';
  aggregate?: Maybe<Vegetable_Stocks_Aggregate_Fields>;
  nodes: Array<Vegetable_Stocks>;
};

export type Vegetable_Stocks_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Vegetable_Stocks_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Vegetable_Stocks_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Vegetable_Stocks_Aggregate_Bool_Exp_Count>;
};

export type Vegetable_Stocks_Aggregate_Bool_Exp_Bool_And = {
  arguments: Vegetable_Stocks_Select_Column_Vegetable_Stocks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Vegetable_Stocks_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Vegetable_Stocks_Select_Column_Vegetable_Stocks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Vegetable_Stocks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "vegetable_stocks" */
export type Vegetable_Stocks_Aggregate_Fields = {
  __typename?: 'vegetable_stocks_aggregate_fields';
  avg?: Maybe<Vegetable_Stocks_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vegetable_Stocks_Max_Fields>;
  min?: Maybe<Vegetable_Stocks_Min_Fields>;
  stddev?: Maybe<Vegetable_Stocks_Stddev_Fields>;
  stddev_pop?: Maybe<Vegetable_Stocks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vegetable_Stocks_Stddev_Samp_Fields>;
  sum?: Maybe<Vegetable_Stocks_Sum_Fields>;
  var_pop?: Maybe<Vegetable_Stocks_Var_Pop_Fields>;
  var_samp?: Maybe<Vegetable_Stocks_Var_Samp_Fields>;
  variance?: Maybe<Vegetable_Stocks_Variance_Fields>;
};


/** aggregate fields of "vegetable_stocks" */
export type Vegetable_Stocks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "vegetable_stocks" */
export type Vegetable_Stocks_Aggregate_Order_By = {
  avg?: InputMaybe<Vegetable_Stocks_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Vegetable_Stocks_Max_Order_By>;
  min?: InputMaybe<Vegetable_Stocks_Min_Order_By>;
  stddev?: InputMaybe<Vegetable_Stocks_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Vegetable_Stocks_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Vegetable_Stocks_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Vegetable_Stocks_Sum_Order_By>;
  var_pop?: InputMaybe<Vegetable_Stocks_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Vegetable_Stocks_Var_Samp_Order_By>;
  variance?: InputMaybe<Vegetable_Stocks_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "vegetable_stocks" */
export type Vegetable_Stocks_Arr_Rel_Insert_Input = {
  data: Array<Vegetable_Stocks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Vegetable_Stocks_On_Conflict>;
};

/** aggregate avg on columns */
export type Vegetable_Stocks_Avg_Fields = {
  __typename?: 'vegetable_stocks_avg_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Avg_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "vegetable_stocks". All fields are combined with a logical 'AND'. */
export type Vegetable_Stocks_Bool_Exp = {
  _and?: InputMaybe<Array<Vegetable_Stocks_Bool_Exp>>;
  _not?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  _or?: InputMaybe<Array<Vegetable_Stocks_Bool_Exp>>;
  expiration_date?: InputMaybe<Date_Comparison_Exp>;
  incremental_unit?: InputMaybe<Int_Comparison_Exp>;
  is_favorite?: InputMaybe<Boolean_Comparison_Exp>;
  memo?: InputMaybe<String_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  stock_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  vegetable_id?: InputMaybe<Uuid_Comparison_Exp>;
  vegetable_stocks_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Bool_Exp>;
  vegetable_stocks_users?: InputMaybe<Users_Bool_Exp>;
  vegetable_stocks_vegetable_master?: InputMaybe<Vegetable_Master_Bool_Exp>;
};

/** unique or primary key constraints on table "vegetable_stocks" */
export enum Vegetable_Stocks_Constraint {
  /** unique or primary key constraint on columns "stock_id" */
  VegetableStocksPkey = 'vegetable_stocks_pkey'
}

/** input type for incrementing numeric columns in table "vegetable_stocks" */
export type Vegetable_Stocks_Inc_Input = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "vegetable_stocks" */
export type Vegetable_Stocks_Insert_Input = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Scalars['date']['input']>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** お気に入りフラグ */
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  /** メモ */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  /** ユーザーID */
  user_id?: InputMaybe<Scalars['String']['input']>;
  vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
  vegetable_stocks_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Obj_Rel_Insert_Input>;
  vegetable_stocks_users?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  vegetable_stocks_vegetable_master?: InputMaybe<Vegetable_Master_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Vegetable_Stocks_Max_Fields = {
  __typename?: 'vegetable_stocks_max_fields';
  /** 賞味期限日 */
  expiration_date?: Maybe<Scalars['date']['output']>;
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Int']['output']>;
  /** メモ */
  memo?: Maybe<Scalars['String']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Int']['output']>;
  /** ユーザーID */
  user_id?: Maybe<Scalars['String']['output']>;
  vegetable_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Max_Order_By = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Order_By>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** メモ */
  memo?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
  /** ユーザーID */
  user_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Vegetable_Stocks_Min_Fields = {
  __typename?: 'vegetable_stocks_min_fields';
  /** 賞味期限日 */
  expiration_date?: Maybe<Scalars['date']['output']>;
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Int']['output']>;
  /** メモ */
  memo?: Maybe<Scalars['String']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Int']['output']>;
  /** ユーザーID */
  user_id?: Maybe<Scalars['String']['output']>;
  vegetable_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Min_Order_By = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Order_By>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** メモ */
  memo?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
  /** ユーザーID */
  user_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vegetable_stocks" */
export type Vegetable_Stocks_Mutation_Response = {
  __typename?: 'vegetable_stocks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Vegetable_Stocks>;
};

/** input type for inserting object relation for remote table "vegetable_stocks" */
export type Vegetable_Stocks_Obj_Rel_Insert_Input = {
  data: Vegetable_Stocks_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vegetable_Stocks_On_Conflict>;
};

/** on_conflict condition type for table "vegetable_stocks" */
export type Vegetable_Stocks_On_Conflict = {
  constraint: Vegetable_Stocks_Constraint;
  update_columns?: Array<Vegetable_Stocks_Update_Column>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};

/** Ordering options when selecting data from "vegetable_stocks". */
export type Vegetable_Stocks_Order_By = {
  expiration_date?: InputMaybe<Order_By>;
  incremental_unit?: InputMaybe<Order_By>;
  is_favorite?: InputMaybe<Order_By>;
  memo?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
  vegetable_stocks_custom_vegetable_master?: InputMaybe<Custom_Vegetable_Master_Order_By>;
  vegetable_stocks_users?: InputMaybe<Users_Order_By>;
  vegetable_stocks_vegetable_master?: InputMaybe<Vegetable_Master_Order_By>;
};

/** primary key columns input for table: vegetable_stocks */
export type Vegetable_Stocks_Pk_Columns_Input = {
  /** ストックID */
  stock_id: Scalars['Int']['input'];
};

/** select columns of table "vegetable_stocks" */
export enum Vegetable_Stocks_Select_Column {
  /** column name */
  ExpirationDate = 'expiration_date',
  /** column name */
  IncrementalUnit = 'incremental_unit',
  /** column name */
  IsFavorite = 'is_favorite',
  /** column name */
  Memo = 'memo',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VegetableId = 'vegetable_id'
}

/** select "vegetable_stocks_aggregate_bool_exp_bool_and_arguments_columns" columns of table "vegetable_stocks" */
export enum Vegetable_Stocks_Select_Column_Vegetable_Stocks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsFavorite = 'is_favorite'
}

/** select "vegetable_stocks_aggregate_bool_exp_bool_or_arguments_columns" columns of table "vegetable_stocks" */
export enum Vegetable_Stocks_Select_Column_Vegetable_Stocks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsFavorite = 'is_favorite'
}

/** input type for updating data in table "vegetable_stocks" */
export type Vegetable_Stocks_Set_Input = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Scalars['date']['input']>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** お気に入りフラグ */
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  /** メモ */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  /** ユーザーID */
  user_id?: InputMaybe<Scalars['String']['input']>;
  vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Vegetable_Stocks_Stddev_Fields = {
  __typename?: 'vegetable_stocks_stddev_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Stddev_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Vegetable_Stocks_Stddev_Pop_Fields = {
  __typename?: 'vegetable_stocks_stddev_pop_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Stddev_Pop_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Vegetable_Stocks_Stddev_Samp_Fields = {
  __typename?: 'vegetable_stocks_stddev_samp_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Stddev_Samp_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "vegetable_stocks" */
export type Vegetable_Stocks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vegetable_Stocks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vegetable_Stocks_Stream_Cursor_Value_Input = {
  /** 賞味期限日 */
  expiration_date?: InputMaybe<Scalars['date']['input']>;
  /** 増減単位 */
  incremental_unit?: InputMaybe<Scalars['Int']['input']>;
  /** お気に入りフラグ */
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  /** メモ */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 在庫数 */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** ストックID */
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  /** ユーザーID */
  user_id?: InputMaybe<Scalars['String']['input']>;
  vegetable_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Vegetable_Stocks_Sum_Fields = {
  __typename?: 'vegetable_stocks_sum_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Int']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Sum_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** update columns of table "vegetable_stocks" */
export enum Vegetable_Stocks_Update_Column {
  /** column name */
  ExpirationDate = 'expiration_date',
  /** column name */
  IncrementalUnit = 'incremental_unit',
  /** column name */
  IsFavorite = 'is_favorite',
  /** column name */
  Memo = 'memo',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VegetableId = 'vegetable_id'
}

export type Vegetable_Stocks_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Vegetable_Stocks_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Vegetable_Stocks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Vegetable_Stocks_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Vegetable_Stocks_Var_Pop_Fields = {
  __typename?: 'vegetable_stocks_var_pop_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Var_Pop_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Vegetable_Stocks_Var_Samp_Fields = {
  __typename?: 'vegetable_stocks_var_samp_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Var_Samp_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Vegetable_Stocks_Variance_Fields = {
  __typename?: 'vegetable_stocks_variance_fields';
  /** 増減単位 */
  incremental_unit?: Maybe<Scalars['Float']['output']>;
  /** 在庫数 */
  quantity?: Maybe<Scalars['Float']['output']>;
  /** ストックID */
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Variance_Order_By = {
  /** 増減単位 */
  incremental_unit?: InputMaybe<Order_By>;
  /** 在庫数 */
  quantity?: InputMaybe<Order_By>;
  /** ストックID */
  stock_id?: InputMaybe<Order_By>;
};

export type GetAllMeatMasterAndUnitAndStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMeatMasterAndUnitAndStocksQuery = { __typename?: 'query_root', GetMeatMasterAndUnitAndStocks: Array<{ __typename?: 'meat_master', meat_id: any, display_name: string, meat_name: string, image_uri: string, default_expiration_period: number, meat_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, meat_master_meat_stocks?: { __typename?: 'meat_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }>, GetCustomMeatMasterAndUnitAndStocks: Array<{ __typename?: 'custom_meat_master', display_name: string, image_uri: string, default_expiration_period: number, meat_id: any, meat_name: string, meat_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, meat_master_meat_stocks?: { __typename?: 'meat_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }> };

export type GetMeatMasterAndUnitAndStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeatMasterAndUnitAndStocksQuery = { __typename?: 'query_root', meat_master: Array<{ __typename?: 'meat_master', meat_id: any, display_name: string, meat_name: string, image_uri: string, default_expiration_period: number, meat_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, meat_master_meat_stocks?: { __typename?: 'meat_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }> };

export type GetCustomMeatMasterAndUnitAndStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomMeatMasterAndUnitAndStocksQuery = { __typename?: 'query_root', custom_meat_master: Array<{ __typename?: 'custom_meat_master', display_name: string, image_uri: string, default_expiration_period: number, meat_id: any, meat_name: string, meat_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, meat_master_meat_stocks?: { __typename?: 'meat_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }> };

export type GetMeatStockByUserIdAndMeatIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  meatId: Scalars['uuid']['input'];
}>;


export type GetMeatStockByUserIdAndMeatIdQuery = { __typename?: 'query_root', meat_stocks: Array<{ __typename?: 'meat_stocks', stock_id: number, user_id: string, meat_id: any, quantity: number, expiration_date: any, memo: string, is_favorite: boolean }> };

export type InsertMeatStockMutationVariables = Exact<{
  object: Meat_Stocks_Insert_Input;
}>;


export type InsertMeatStockMutation = { __typename?: 'mutation_root', insert_meat_stocks_one?: { __typename?: 'meat_stocks', quantity: number, stock_id: number, user_id: string, meat_id: any, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null };

export type UpdateMeatStockQuantityMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  meatId: Scalars['uuid']['input'];
  quantity: Scalars['Int']['input'];
  expirationDate?: InputMaybe<Scalars['date']['input']>;
}>;


export type UpdateMeatStockQuantityMutation = { __typename?: 'mutation_root', update_meat_stocks?: { __typename?: 'meat_stocks_mutation_response', returning: Array<{ __typename?: 'meat_stocks', stock_id: number, user_id: string, meat_id: any, quantity: number, expiration_date: any }> } | null };

export type UpdateMeatStockIsFavoriteMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  meatId: Scalars['uuid']['input'];
  isFavorite: Scalars['Boolean']['input'];
}>;


export type UpdateMeatStockIsFavoriteMutation = { __typename?: 'mutation_root', update_meat_stocks?: { __typename?: 'meat_stocks_mutation_response', returning: Array<{ __typename?: 'meat_stocks', stock_id: number, user_id: string, meat_id: any, is_favorite: boolean }> } | null };

export type UpdateMeatStockDetailMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  meatId: Scalars['uuid']['input'];
  quantity: Scalars['Int']['input'];
  incrementalUnit: Scalars['Int']['input'];
  expirationDate: Scalars['date']['input'];
  memo: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
}>;


export type UpdateMeatStockDetailMutation = { __typename?: 'mutation_root', update_meat_stocks?: { __typename?: 'meat_stocks_mutation_response', returning: Array<{ __typename?: 'meat_stocks', stock_id: number, user_id: string, meat_id: any, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean }> } | null };

export type InsertCustomMeatMasterMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  meatName: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  imageUri: Scalars['String']['input'];
  defaultExpirationPeriod: Scalars['Int']['input'];
  unitId: Scalars['Int']['input'];
}>;


export type InsertCustomMeatMasterMutation = { __typename?: 'mutation_root', insert_custom_meat_master_one?: { __typename?: 'custom_meat_master', custom_meat_id: any, user_id: string, custom_meat_name: string, display_name: string, image_uri: string, default_expiration_period: number, unit_id: number } | null };

export type GetUnitMasterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitMasterQuery = { __typename?: 'query_root', unit_master: Array<{ __typename?: 'unit_master', unit_id: number, unit_name: string }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: string, email: string, created_at: any }> };

export type GetAllVegetableMasterAndUnitAndStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVegetableMasterAndUnitAndStocksQuery = { __typename?: 'query_root', GetVegetableMasterAndUnitAndStocks: Array<{ __typename?: 'vegetable_master', vegetable_id: any, display_name: string, vegetable_name: string, image_uri: string, default_expiration_period: number, vegetable_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, vegetable_master_vegetable_stocks?: { __typename?: 'vegetable_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }>, GetCustomVegetableMasterAndUnitAndStocks: Array<{ __typename?: 'custom_vegetable_master', display_name: string, image_uri: string, default_expiration_period: number, vegetable_id: any, vegetable_name: string, vegetable_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, vegetable_master_vegetable_stocks?: { __typename?: 'vegetable_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }> };

export type GetVegetableMasterAndUnitAndStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVegetableMasterAndUnitAndStocksQuery = { __typename?: 'query_root', vegetable_master: Array<{ __typename?: 'vegetable_master', vegetable_id: any, display_name: string, vegetable_name: string, image_uri: string, default_expiration_period: number, vegetable_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, vegetable_master_vegetable_stocks?: { __typename?: 'vegetable_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }> };

export type GetCustomVegetableMasterAndUnitAndStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomVegetableMasterAndUnitAndStocksQuery = { __typename?: 'query_root', custom_vegetable_master: Array<{ __typename?: 'custom_vegetable_master', display_name: string, image_uri: string, default_expiration_period: number, vegetable_id: any, vegetable_name: string, vegetable_master_unit_master?: { __typename?: 'unit_master', unit_id: number, unit_name: string } | null, vegetable_master_vegetable_stocks?: { __typename?: 'vegetable_stocks', stock_id: number, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null }> };

export type GetVegetableStockByUserIdAndVegetableIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  vegetableId: Scalars['uuid']['input'];
}>;


export type GetVegetableStockByUserIdAndVegetableIdQuery = { __typename?: 'query_root', vegetable_stocks: Array<{ __typename?: 'vegetable_stocks', stock_id: number, user_id: string, vegetable_id: any, quantity: number, expiration_date: any, memo: string, is_favorite: boolean }> };

export type InsertVegetableStockMutationVariables = Exact<{
  object: Vegetable_Stocks_Insert_Input;
}>;


export type InsertVegetableStockMutation = { __typename?: 'mutation_root', insert_vegetable_stocks_one?: { __typename?: 'vegetable_stocks', quantity: number, stock_id: number, user_id: string, vegetable_id: any, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean } | null };

export type UpdateVegetableStockQuantityMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  vegetableId: Scalars['uuid']['input'];
  quantity: Scalars['Int']['input'];
  expirationDate?: InputMaybe<Scalars['date']['input']>;
}>;


export type UpdateVegetableStockQuantityMutation = { __typename?: 'mutation_root', update_vegetable_stocks?: { __typename?: 'vegetable_stocks_mutation_response', returning: Array<{ __typename?: 'vegetable_stocks', stock_id: number, user_id: string, vegetable_id: any, quantity: number, expiration_date: any }> } | null };

export type UpdateVegetableStockIsFavoriteMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  vegetableId: Scalars['uuid']['input'];
  isFavorite: Scalars['Boolean']['input'];
}>;


export type UpdateVegetableStockIsFavoriteMutation = { __typename?: 'mutation_root', update_vegetable_stocks?: { __typename?: 'vegetable_stocks_mutation_response', returning: Array<{ __typename?: 'vegetable_stocks', stock_id: number, user_id: string, vegetable_id: any, is_favorite: boolean }> } | null };

export type UpdateVegetableStockDetailMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  vegetableId: Scalars['uuid']['input'];
  quantity: Scalars['Int']['input'];
  incrementalUnit: Scalars['Int']['input'];
  expirationDate: Scalars['date']['input'];
  memo: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
}>;


export type UpdateVegetableStockDetailMutation = { __typename?: 'mutation_root', update_vegetable_stocks?: { __typename?: 'vegetable_stocks_mutation_response', returning: Array<{ __typename?: 'vegetable_stocks', stock_id: number, user_id: string, vegetable_id: any, quantity: number, incremental_unit: number, expiration_date: any, memo: string, is_favorite: boolean }> } | null };

export type InsertCustomVegetableMasterMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  vegetableName: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  imageUri: Scalars['String']['input'];
  defaultExpirationPeriod: Scalars['Int']['input'];
  unitId: Scalars['Int']['input'];
}>;


export type InsertCustomVegetableMasterMutation = { __typename?: 'mutation_root', insert_custom_vegetable_master_one?: { __typename?: 'custom_vegetable_master', custom_vegetable_id: any, user_id: string, custom_vegetable_name: string, display_name: string, image_uri: string, default_expiration_period: number, unit_id: number } | null };


export const GetAllMeatMasterAndUnitAndStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllMeatMasterAndUnitAndStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"GetMeatMasterAndUnitAndStocks"},"name":{"kind":"Name","value":"meat_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"meat_master_meat_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"meat_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","name":{"kind":"Name","value":"meat_master_unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meat_master_meat_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"GetCustomMeatMasterAndUnitAndStocks"},"name":{"kind":"Name","value":"custom_meat_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"custom_meat_master_meat_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"meat_id"},"name":{"kind":"Name","value":"custom_meat_id"}},{"kind":"Field","alias":{"kind":"Name","value":"meat_name"},"name":{"kind":"Name","value":"custom_meat_name"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","alias":{"kind":"Name","value":"meat_master_unit_master"},"name":{"kind":"Name","value":"custom_meat_master_unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"meat_master_meat_stocks"},"name":{"kind":"Name","value":"custom_meat_master_meat_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllMeatMasterAndUnitAndStocksQuery, GetAllMeatMasterAndUnitAndStocksQueryVariables>;
export const GetMeatMasterAndUnitAndStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeatMasterAndUnitAndStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meat_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"meat_master_meat_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"meat_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","name":{"kind":"Name","value":"meat_master_unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meat_master_meat_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeatMasterAndUnitAndStocksQuery, GetMeatMasterAndUnitAndStocksQueryVariables>;
export const GetCustomMeatMasterAndUnitAndStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomMeatMasterAndUnitAndStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"custom_meat_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"custom_meat_master_meat_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"meat_id"},"name":{"kind":"Name","value":"custom_meat_id"}},{"kind":"Field","alias":{"kind":"Name","value":"meat_name"},"name":{"kind":"Name","value":"custom_meat_name"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","alias":{"kind":"Name","value":"meat_master_unit_master"},"name":{"kind":"Name","value":"custom_meat_master_unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"meat_master_meat_stocks"},"name":{"kind":"Name","value":"custom_meat_master_meat_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomMeatMasterAndUnitAndStocksQuery, GetCustomMeatMasterAndUnitAndStocksQueryVariables>;
export const GetMeatStockByUserIdAndMeatIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeatStockByUserIdAndMeatId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meat_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"meat_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]} as unknown as DocumentNode<GetMeatStockByUserIdAndMeatIdQuery, GetMeatStockByUserIdAndMeatIdQueryVariables>;
export const InsertMeatStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertMeatStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"meat_stocks_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_meat_stocks_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]} as unknown as DocumentNode<InsertMeatStockMutation, InsertMeatStockMutationVariables>;
export const UpdateMeatStockQuantityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeatStockQuantity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_meat_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"meat_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"expiration_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMeatStockQuantityMutation, UpdateMeatStockQuantityMutationVariables>;
export const UpdateMeatStockIsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeatStockIsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_meat_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"meat_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMeatStockIsFavoriteMutation, UpdateMeatStockIsFavoriteMutationVariables>;
export const UpdateMeatStockDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeatStockDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"incrementalUnit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_meat_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"meat_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meatId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"incremental_unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"incrementalUnit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"expiration_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"memo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memo"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMeatStockDetailMutation, UpdateMeatStockDetailMutationVariables>;
export const InsertCustomMeatMasterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertCustomMeatMaster"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meatName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUri"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"defaultExpirationPeriod"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_custom_meat_master_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_meat_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meatName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"display_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image_uri"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUri"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"default_expiration_period"},"value":{"kind":"Variable","name":{"kind":"Name","value":"defaultExpirationPeriod"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"unit_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"custom_meat_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"custom_meat_name"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}}]}}]}}]} as unknown as DocumentNode<InsertCustomMeatMasterMutation, InsertCustomMeatMasterMutationVariables>;
export const GetUnitMasterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnitMaster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}}]}}]} as unknown as DocumentNode<GetUnitMasterQuery, GetUnitMasterQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetAllVegetableMasterAndUnitAndStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllVegetableMasterAndUnitAndStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"GetVegetableMasterAndUnitAndStocks"},"name":{"kind":"Name","value":"vegetable_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vegetable_master_vegetable_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_master_unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_master_vegetable_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"GetCustomVegetableMasterAndUnitAndStocks"},"name":{"kind":"Name","value":"custom_vegetable_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"custom_vegetable_master_vegetable_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"vegetable_id"},"name":{"kind":"Name","value":"custom_vegetable_id"}},{"kind":"Field","alias":{"kind":"Name","value":"vegetable_name"},"name":{"kind":"Name","value":"custom_vegetable_name"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","alias":{"kind":"Name","value":"vegetable_master_unit_master"},"name":{"kind":"Name","value":"custom_vegetable_master_uint_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"vegetable_master_vegetable_stocks"},"name":{"kind":"Name","value":"custom_vegetable_master_vegetable_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllVegetableMasterAndUnitAndStocksQuery, GetAllVegetableMasterAndUnitAndStocksQueryVariables>;
export const GetVegetableMasterAndUnitAndStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVegetableMasterAndUnitAndStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vegetable_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vegetable_master_vegetable_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_master_unit_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_master_vegetable_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetVegetableMasterAndUnitAndStocksQuery, GetVegetableMasterAndUnitAndStocksQueryVariables>;
export const GetCustomVegetableMasterAndUnitAndStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomVegetableMasterAndUnitAndStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"custom_vegetable_master"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"custom_vegetable_master_vegetable_stocks"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"EnumValue","value":"desc_nulls_last"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"vegetable_id"},"name":{"kind":"Name","value":"custom_vegetable_id"}},{"kind":"Field","alias":{"kind":"Name","value":"vegetable_name"},"name":{"kind":"Name","value":"custom_vegetable_name"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","alias":{"kind":"Name","value":"vegetable_master_unit_master"},"name":{"kind":"Name","value":"custom_vegetable_master_uint_master"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit_id"}},{"kind":"Field","name":{"kind":"Name","value":"unit_name"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"vegetable_master_vegetable_stocks"},"name":{"kind":"Name","value":"custom_vegetable_master_vegetable_stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomVegetableMasterAndUnitAndStocksQuery, GetCustomVegetableMasterAndUnitAndStocksQueryVariables>;
export const GetVegetableStockByUserIdAndVegetableIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVegetableStockByUserIdAndVegetableId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vegetable_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"vegetable_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]} as unknown as DocumentNode<GetVegetableStockByUserIdAndVegetableIdQuery, GetVegetableStockByUserIdAndVegetableIdQueryVariables>;
export const InsertVegetableStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertVegetableStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"vegetable_stocks_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_vegetable_stocks_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]} as unknown as DocumentNode<InsertVegetableStockMutation, InsertVegetableStockMutationVariables>;
export const UpdateVegetableStockQuantityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVegetableStockQuantity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_vegetable_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"vegetable_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"expiration_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVegetableStockQuantityMutation, UpdateVegetableStockQuantityMutationVariables>;
export const UpdateVegetableStockIsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVegetableStockIsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_vegetable_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"vegetable_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVegetableStockIsFavoriteMutation, UpdateVegetableStockIsFavoriteMutationVariables>;
export const UpdateVegetableStockDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVegetableStockDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"incrementalUnit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_vegetable_stocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"vegetable_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vegetableId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"incremental_unit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"incrementalUnit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"expiration_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expirationDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"memo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memo"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"is_favorite"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFavorite"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"incremental_unit"}},{"kind":"Field","name":{"kind":"Name","value":"expiration_date"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"is_favorite"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVegetableStockDetailMutation, UpdateVegetableStockDetailMutationVariables>;
export const InsertCustomVegetableMasterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertCustomVegetableMaster"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vegetableName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUri"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"defaultExpirationPeriod"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_custom_vegetable_master_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_vegetable_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vegetableName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"display_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image_uri"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUri"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"default_expiration_period"},"value":{"kind":"Variable","name":{"kind":"Name","value":"defaultExpirationPeriod"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"unit_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"custom_vegetable_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"custom_vegetable_name"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"image_uri"}},{"kind":"Field","name":{"kind":"Name","value":"default_expiration_period"}},{"kind":"Field","name":{"kind":"Name","value":"unit_id"}}]}}]}}]} as unknown as DocumentNode<InsertCustomVegetableMasterMutation, InsertCustomVegetableMasterMutationVariables>;