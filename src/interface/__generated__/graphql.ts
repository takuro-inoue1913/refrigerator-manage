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
  timestamptz: { input: any; output: any; }
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

/** 肉類のマスターデータ */
export type Meat_Master = {
  __typename?: 'meat_master';
  meat_id: Scalars['Int']['output'];
  /** An object relationship */
  meat_master_meat_stocks?: Maybe<Meet_Stocks>;
  /** An object relationship */
  meat_master_unit_master?: Maybe<Unit_Master>;
  meat_name: Scalars['String']['output'];
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
  meat_id?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "meat_master". All fields are combined with a logical 'AND'. */
export type Meat_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Meat_Master_Bool_Exp>>;
  _not?: InputMaybe<Meat_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Meat_Master_Bool_Exp>>;
  meat_id?: InputMaybe<Int_Comparison_Exp>;
  meat_master_meat_stocks?: InputMaybe<Meet_Stocks_Bool_Exp>;
  meat_master_unit_master?: InputMaybe<Unit_Master_Bool_Exp>;
  meat_name?: InputMaybe<String_Comparison_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "meat_master" */
export enum Meat_Master_Constraint {
  /** unique or primary key constraint on columns "meat_id" */
  MeatMasterPkey = 'meat_master_pkey'
}

/** input type for incrementing numeric columns in table "meat_master" */
export type Meat_Master_Inc_Input = {
  meat_id?: InputMaybe<Scalars['Int']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "meat_master" */
export type Meat_Master_Insert_Input = {
  meat_id?: InputMaybe<Scalars['Int']['input']>;
  meat_master_meat_stocks?: InputMaybe<Meet_Stocks_Obj_Rel_Insert_Input>;
  meat_master_unit_master?: InputMaybe<Unit_Master_Obj_Rel_Insert_Input>;
  meat_name?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Meat_Master_Max_Fields = {
  __typename?: 'meat_master_max_fields';
  meat_id?: Maybe<Scalars['Int']['output']>;
  meat_name?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Meat_Master_Min_Fields = {
  __typename?: 'meat_master_min_fields';
  meat_id?: Maybe<Scalars['Int']['output']>;
  meat_name?: Maybe<Scalars['String']['output']>;
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
  meat_id?: InputMaybe<Order_By>;
  meat_master_meat_stocks?: InputMaybe<Meet_Stocks_Order_By>;
  meat_master_unit_master?: InputMaybe<Unit_Master_Order_By>;
  meat_name?: InputMaybe<Order_By>;
  unit_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meat_master */
export type Meat_Master_Pk_Columns_Input = {
  meat_id: Scalars['Int']['input'];
};

/** select columns of table "meat_master" */
export enum Meat_Master_Select_Column {
  /** column name */
  MeatId = 'meat_id',
  /** column name */
  MeatName = 'meat_name',
  /** column name */
  UnitId = 'unit_id'
}

/** input type for updating data in table "meat_master" */
export type Meat_Master_Set_Input = {
  meat_id?: InputMaybe<Scalars['Int']['input']>;
  meat_name?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Meat_Master_Stddev_Fields = {
  __typename?: 'meat_master_stddev_fields';
  meat_id?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Meat_Master_Stddev_Pop_Fields = {
  __typename?: 'meat_master_stddev_pop_fields';
  meat_id?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Meat_Master_Stddev_Samp_Fields = {
  __typename?: 'meat_master_stddev_samp_fields';
  meat_id?: Maybe<Scalars['Float']['output']>;
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
  meat_id?: InputMaybe<Scalars['Int']['input']>;
  meat_name?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Meat_Master_Sum_Fields = {
  __typename?: 'meat_master_sum_fields';
  meat_id?: Maybe<Scalars['Int']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "meat_master" */
export enum Meat_Master_Update_Column {
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
  meat_id?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Meat_Master_Var_Samp_Fields = {
  __typename?: 'meat_master_var_samp_fields';
  meat_id?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Meat_Master_Variance_Fields = {
  __typename?: 'meat_master_variance_fields';
  meat_id?: Maybe<Scalars['Float']['output']>;
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** ユーザーごとの肉類のストック */
export type Meet_Stocks = {
  __typename?: 'meet_stocks';
  meet_id: Scalars['Int']['output'];
  /** An object relationship */
  meet_stocks_meet_master?: Maybe<Meat_Master>;
  /** An object relationship */
  meet_stocks_users?: Maybe<Users>;
  quantity: Scalars['Int']['output'];
  stock_id: Scalars['Int']['output'];
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "meet_stocks" */
export type Meet_Stocks_Aggregate = {
  __typename?: 'meet_stocks_aggregate';
  aggregate?: Maybe<Meet_Stocks_Aggregate_Fields>;
  nodes: Array<Meet_Stocks>;
};

export type Meet_Stocks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Meet_Stocks_Aggregate_Bool_Exp_Count>;
};

export type Meet_Stocks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Meet_Stocks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "meet_stocks" */
export type Meet_Stocks_Aggregate_Fields = {
  __typename?: 'meet_stocks_aggregate_fields';
  avg?: Maybe<Meet_Stocks_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Meet_Stocks_Max_Fields>;
  min?: Maybe<Meet_Stocks_Min_Fields>;
  stddev?: Maybe<Meet_Stocks_Stddev_Fields>;
  stddev_pop?: Maybe<Meet_Stocks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Meet_Stocks_Stddev_Samp_Fields>;
  sum?: Maybe<Meet_Stocks_Sum_Fields>;
  var_pop?: Maybe<Meet_Stocks_Var_Pop_Fields>;
  var_samp?: Maybe<Meet_Stocks_Var_Samp_Fields>;
  variance?: Maybe<Meet_Stocks_Variance_Fields>;
};


/** aggregate fields of "meet_stocks" */
export type Meet_Stocks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "meet_stocks" */
export type Meet_Stocks_Aggregate_Order_By = {
  avg?: InputMaybe<Meet_Stocks_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Meet_Stocks_Max_Order_By>;
  min?: InputMaybe<Meet_Stocks_Min_Order_By>;
  stddev?: InputMaybe<Meet_Stocks_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Meet_Stocks_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Meet_Stocks_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Meet_Stocks_Sum_Order_By>;
  var_pop?: InputMaybe<Meet_Stocks_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Meet_Stocks_Var_Samp_Order_By>;
  variance?: InputMaybe<Meet_Stocks_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "meet_stocks" */
export type Meet_Stocks_Arr_Rel_Insert_Input = {
  data: Array<Meet_Stocks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Meet_Stocks_On_Conflict>;
};

/** aggregate avg on columns */
export type Meet_Stocks_Avg_Fields = {
  __typename?: 'meet_stocks_avg_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "meet_stocks" */
export type Meet_Stocks_Avg_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "meet_stocks". All fields are combined with a logical 'AND'. */
export type Meet_Stocks_Bool_Exp = {
  _and?: InputMaybe<Array<Meet_Stocks_Bool_Exp>>;
  _not?: InputMaybe<Meet_Stocks_Bool_Exp>;
  _or?: InputMaybe<Array<Meet_Stocks_Bool_Exp>>;
  meet_id?: InputMaybe<Int_Comparison_Exp>;
  meet_stocks_meet_master?: InputMaybe<Meat_Master_Bool_Exp>;
  meet_stocks_users?: InputMaybe<Users_Bool_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  stock_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "meet_stocks" */
export enum Meet_Stocks_Constraint {
  /** unique or primary key constraint on columns "stock_id" */
  MeetStocksPkey = 'meet_stocks_pkey'
}

/** input type for incrementing numeric columns in table "meet_stocks" */
export type Meet_Stocks_Inc_Input = {
  meet_id?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "meet_stocks" */
export type Meet_Stocks_Insert_Input = {
  meet_id?: InputMaybe<Scalars['Int']['input']>;
  meet_stocks_meet_master?: InputMaybe<Meat_Master_Obj_Rel_Insert_Input>;
  meet_stocks_users?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Meet_Stocks_Max_Fields = {
  __typename?: 'meet_stocks_max_fields';
  meet_id?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  stock_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "meet_stocks" */
export type Meet_Stocks_Max_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Meet_Stocks_Min_Fields = {
  __typename?: 'meet_stocks_min_fields';
  meet_id?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  stock_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "meet_stocks" */
export type Meet_Stocks_Min_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "meet_stocks" */
export type Meet_Stocks_Mutation_Response = {
  __typename?: 'meet_stocks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Meet_Stocks>;
};

/** input type for inserting object relation for remote table "meet_stocks" */
export type Meet_Stocks_Obj_Rel_Insert_Input = {
  data: Meet_Stocks_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Meet_Stocks_On_Conflict>;
};

/** on_conflict condition type for table "meet_stocks" */
export type Meet_Stocks_On_Conflict = {
  constraint: Meet_Stocks_Constraint;
  update_columns?: Array<Meet_Stocks_Update_Column>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};

/** Ordering options when selecting data from "meet_stocks". */
export type Meet_Stocks_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  meet_stocks_meet_master?: InputMaybe<Meat_Master_Order_By>;
  meet_stocks_users?: InputMaybe<Users_Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: meet_stocks */
export type Meet_Stocks_Pk_Columns_Input = {
  stock_id: Scalars['Int']['input'];
};

/** select columns of table "meet_stocks" */
export enum Meet_Stocks_Select_Column {
  /** column name */
  MeetId = 'meet_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "meet_stocks" */
export type Meet_Stocks_Set_Input = {
  meet_id?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Meet_Stocks_Stddev_Fields = {
  __typename?: 'meet_stocks_stddev_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "meet_stocks" */
export type Meet_Stocks_Stddev_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Meet_Stocks_Stddev_Pop_Fields = {
  __typename?: 'meet_stocks_stddev_pop_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "meet_stocks" */
export type Meet_Stocks_Stddev_Pop_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Meet_Stocks_Stddev_Samp_Fields = {
  __typename?: 'meet_stocks_stddev_samp_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "meet_stocks" */
export type Meet_Stocks_Stddev_Samp_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "meet_stocks" */
export type Meet_Stocks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Meet_Stocks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Meet_Stocks_Stream_Cursor_Value_Input = {
  meet_id?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Meet_Stocks_Sum_Fields = {
  __typename?: 'meet_stocks_sum_fields';
  meet_id?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  stock_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "meet_stocks" */
export type Meet_Stocks_Sum_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** update columns of table "meet_stocks" */
export enum Meet_Stocks_Update_Column {
  /** column name */
  MeetId = 'meet_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id'
}

export type Meet_Stocks_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Meet_Stocks_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Meet_Stocks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Meet_Stocks_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Meet_Stocks_Var_Pop_Fields = {
  __typename?: 'meet_stocks_var_pop_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "meet_stocks" */
export type Meet_Stocks_Var_Pop_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Meet_Stocks_Var_Samp_Fields = {
  __typename?: 'meet_stocks_var_samp_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "meet_stocks" */
export type Meet_Stocks_Var_Samp_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Meet_Stocks_Variance_Fields = {
  __typename?: 'meet_stocks_variance_fields';
  meet_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "meet_stocks" */
export type Meet_Stocks_Variance_Order_By = {
  meet_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "meat_master" */
  delete_meat_master?: Maybe<Meat_Master_Mutation_Response>;
  /** delete single row from the table: "meat_master" */
  delete_meat_master_by_pk?: Maybe<Meat_Master>;
  /** delete data from the table: "meet_stocks" */
  delete_meet_stocks?: Maybe<Meet_Stocks_Mutation_Response>;
  /** delete single row from the table: "meet_stocks" */
  delete_meet_stocks_by_pk?: Maybe<Meet_Stocks>;
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
  /** insert data into the table: "meat_master" */
  insert_meat_master?: Maybe<Meat_Master_Mutation_Response>;
  /** insert a single row into the table: "meat_master" */
  insert_meat_master_one?: Maybe<Meat_Master>;
  /** insert data into the table: "meet_stocks" */
  insert_meet_stocks?: Maybe<Meet_Stocks_Mutation_Response>;
  /** insert a single row into the table: "meet_stocks" */
  insert_meet_stocks_one?: Maybe<Meet_Stocks>;
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
  /** update data of the table: "meat_master" */
  update_meat_master?: Maybe<Meat_Master_Mutation_Response>;
  /** update single row of the table: "meat_master" */
  update_meat_master_by_pk?: Maybe<Meat_Master>;
  /** update multiples rows of table: "meat_master" */
  update_meat_master_many?: Maybe<Array<Maybe<Meat_Master_Mutation_Response>>>;
  /** update data of the table: "meet_stocks" */
  update_meet_stocks?: Maybe<Meet_Stocks_Mutation_Response>;
  /** update single row of the table: "meet_stocks" */
  update_meet_stocks_by_pk?: Maybe<Meet_Stocks>;
  /** update multiples rows of table: "meet_stocks" */
  update_meet_stocks_many?: Maybe<Array<Maybe<Meet_Stocks_Mutation_Response>>>;
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
export type Mutation_RootDelete_Meat_MasterArgs = {
  where: Meat_Master_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meat_Master_By_PkArgs = {
  meat_id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Meet_StocksArgs = {
  where: Meet_Stocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Meet_Stocks_By_PkArgs = {
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
  vegetable_id: Scalars['Int']['input'];
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
export type Mutation_RootInsert_Meet_StocksArgs = {
  objects: Array<Meet_Stocks_Insert_Input>;
  on_conflict?: InputMaybe<Meet_Stocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Meet_Stocks_OneArgs = {
  object: Meet_Stocks_Insert_Input;
  on_conflict?: InputMaybe<Meet_Stocks_On_Conflict>;
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
export type Mutation_RootUpdate_Meet_StocksArgs = {
  _inc?: InputMaybe<Meet_Stocks_Inc_Input>;
  _set?: InputMaybe<Meet_Stocks_Set_Input>;
  where: Meet_Stocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Meet_Stocks_By_PkArgs = {
  _inc?: InputMaybe<Meet_Stocks_Inc_Input>;
  _set?: InputMaybe<Meet_Stocks_Set_Input>;
  pk_columns: Meet_Stocks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Meet_Stocks_ManyArgs = {
  updates: Array<Meet_Stocks_Updates>;
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
  /** fetch data from the table: "meat_master" */
  meat_master: Array<Meat_Master>;
  /** fetch aggregated fields from the table: "meat_master" */
  meat_master_aggregate: Meat_Master_Aggregate;
  /** fetch data from the table: "meat_master" using primary key columns */
  meat_master_by_pk?: Maybe<Meat_Master>;
  /** fetch data from the table: "meet_stocks" */
  meet_stocks: Array<Meet_Stocks>;
  /** fetch aggregated fields from the table: "meet_stocks" */
  meet_stocks_aggregate: Meet_Stocks_Aggregate;
  /** fetch data from the table: "meet_stocks" using primary key columns */
  meet_stocks_by_pk?: Maybe<Meet_Stocks>;
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
  meat_id: Scalars['Int']['input'];
};


export type Query_RootMeet_StocksArgs = {
  distinct_on?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meet_Stocks_Order_By>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};


export type Query_RootMeet_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meet_Stocks_Order_By>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};


export type Query_RootMeet_Stocks_By_PkArgs = {
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
  vegetable_id: Scalars['Int']['input'];
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
  /** fetch data from the table: "meat_master" */
  meat_master: Array<Meat_Master>;
  /** fetch aggregated fields from the table: "meat_master" */
  meat_master_aggregate: Meat_Master_Aggregate;
  /** fetch data from the table: "meat_master" using primary key columns */
  meat_master_by_pk?: Maybe<Meat_Master>;
  /** fetch data from the table in a streaming manner: "meat_master" */
  meat_master_stream: Array<Meat_Master>;
  /** fetch data from the table: "meet_stocks" */
  meet_stocks: Array<Meet_Stocks>;
  /** fetch aggregated fields from the table: "meet_stocks" */
  meet_stocks_aggregate: Meet_Stocks_Aggregate;
  /** fetch data from the table: "meet_stocks" using primary key columns */
  meet_stocks_by_pk?: Maybe<Meet_Stocks>;
  /** fetch data from the table in a streaming manner: "meet_stocks" */
  meet_stocks_stream: Array<Meet_Stocks>;
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
  meat_id: Scalars['Int']['input'];
};


export type Subscription_RootMeat_Master_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Meat_Master_Stream_Cursor_Input>>;
  where?: InputMaybe<Meat_Master_Bool_Exp>;
};


export type Subscription_RootMeet_StocksArgs = {
  distinct_on?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meet_Stocks_Order_By>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};


export type Subscription_RootMeet_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meet_Stocks_Order_By>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};


export type Subscription_RootMeet_Stocks_By_PkArgs = {
  stock_id: Scalars['Int']['input'];
};


export type Subscription_RootMeet_Stocks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Meet_Stocks_Stream_Cursor_Input>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
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
  vegetable_id: Scalars['Int']['input'];
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
  unit_id: Scalars['Int']['output'];
  /** An object relationship */
  unit_master_meat_master?: Maybe<Meat_Master>;
  /** An object relationship */
  unit_master_vegetable_master?: Maybe<Vegetable_Master>;
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
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "unit_master". All fields are combined with a logical 'AND'. */
export type Unit_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Unit_Master_Bool_Exp>>;
  _not?: InputMaybe<Unit_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Unit_Master_Bool_Exp>>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
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
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "unit_master" */
export type Unit_Master_Insert_Input = {
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  unit_master_meat_master?: InputMaybe<Meat_Master_Obj_Rel_Insert_Input>;
  unit_master_vegetable_master?: InputMaybe<Vegetable_Master_Obj_Rel_Insert_Input>;
  unit_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Unit_Master_Max_Fields = {
  __typename?: 'unit_master_max_fields';
  unit_id?: Maybe<Scalars['Int']['output']>;
  unit_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Unit_Master_Min_Fields = {
  __typename?: 'unit_master_min_fields';
  unit_id?: Maybe<Scalars['Int']['output']>;
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
  unit_master_meat_master?: InputMaybe<Meat_Master_Order_By>;
  unit_master_vegetable_master?: InputMaybe<Vegetable_Master_Order_By>;
  unit_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: unit_master */
export type Unit_Master_Pk_Columns_Input = {
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
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  unit_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Unit_Master_Stddev_Fields = {
  __typename?: 'unit_master_stddev_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Unit_Master_Stddev_Pop_Fields = {
  __typename?: 'unit_master_stddev_pop_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Unit_Master_Stddev_Samp_Fields = {
  __typename?: 'unit_master_stddev_samp_fields';
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
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  unit_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Unit_Master_Sum_Fields = {
  __typename?: 'unit_master_sum_fields';
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
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Unit_Master_Var_Samp_Fields = {
  __typename?: 'unit_master_var_samp_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Unit_Master_Variance_Fields = {
  __typename?: 'unit_master_variance_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An array relationship */
  users_meat_stocks: Array<Meet_Stocks>;
  /** An aggregate relationship */
  users_meat_stocks_aggregate: Meet_Stocks_Aggregate;
  /** An array relationship */
  users_vegetable_stocks: Array<Vegetable_Stocks>;
  /** An aggregate relationship */
  users_vegetable_stocks_aggregate: Vegetable_Stocks_Aggregate;
};


/** columns and relationships of "users" */
export type UsersUsers_Meat_StocksArgs = {
  distinct_on?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meet_Stocks_Order_By>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUsers_Meat_Stocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Meet_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Meet_Stocks_Order_By>>;
  where?: InputMaybe<Meet_Stocks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUsers_Vegetable_StocksArgs = {
  distinct_on?: InputMaybe<Array<Vegetable_Stocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vegetable_Stocks_Order_By>>;
  where?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
};


/** columns and relationships of "users" */
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
  users_meat_stocks?: InputMaybe<Meet_Stocks_Bool_Exp>;
  users_meat_stocks_aggregate?: InputMaybe<Meet_Stocks_Aggregate_Bool_Exp>;
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
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  users_meat_stocks?: InputMaybe<Meet_Stocks_Arr_Rel_Insert_Input>;
  users_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
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
  users_meat_stocks_aggregate?: InputMaybe<Meet_Stocks_Aggregate_Order_By>;
  users_vegetable_stocks_aggregate?: InputMaybe<Vegetable_Stocks_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
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
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
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
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
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

/** 野菜のマスタデータ */
export type Vegetable_Master = {
  __typename?: 'vegetable_master';
  display_name: Scalars['String']['output'];
  image_uri: Scalars['String']['output'];
  unit_id: Scalars['Int']['output'];
  vegetable_id: Scalars['Int']['output'];
  /** An object relationship */
  vegetable_master_unit_master?: Maybe<Unit_Master>;
  /** An object relationship */
  vegetable_master_vegetable_stocks?: Maybe<Vegetable_Stocks>;
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
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "vegetable_master". All fields are combined with a logical 'AND'. */
export type Vegetable_Master_Bool_Exp = {
  _and?: InputMaybe<Array<Vegetable_Master_Bool_Exp>>;
  _not?: InputMaybe<Vegetable_Master_Bool_Exp>;
  _or?: InputMaybe<Array<Vegetable_Master_Bool_Exp>>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  image_uri?: InputMaybe<String_Comparison_Exp>;
  unit_id?: InputMaybe<Int_Comparison_Exp>;
  vegetable_id?: InputMaybe<Int_Comparison_Exp>;
  vegetable_master_unit_master?: InputMaybe<Unit_Master_Bool_Exp>;
  vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  vegetable_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vegetable_master" */
export enum Vegetable_Master_Constraint {
  /** unique or primary key constraint on columns "image_uri" */
  VegetableMasterImageUriKey = 'vegetable_master_image_uri_key',
  /** unique or primary key constraint on columns "vegetable_id" */
  VegetableMasterPkey = 'vegetable_master_pkey',
  /** unique or primary key constraint on columns "vegetable_name" */
  VegetableMasterVegetableNameKey = 'vegetable_master_vegetable_name_key'
}

/** input type for incrementing numeric columns in table "vegetable_master" */
export type Vegetable_Master_Inc_Input = {
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "vegetable_master" */
export type Vegetable_Master_Insert_Input = {
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_master_unit_master?: InputMaybe<Unit_Master_Obj_Rel_Insert_Input>;
  vegetable_master_vegetable_stocks?: InputMaybe<Vegetable_Stocks_Obj_Rel_Insert_Input>;
  vegetable_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Vegetable_Master_Max_Fields = {
  __typename?: 'vegetable_master_max_fields';
  display_name?: Maybe<Scalars['String']['output']>;
  image_uri?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
  vegetable_id?: Maybe<Scalars['Int']['output']>;
  vegetable_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Vegetable_Master_Min_Fields = {
  __typename?: 'vegetable_master_min_fields';
  display_name?: Maybe<Scalars['String']['output']>;
  image_uri?: Maybe<Scalars['String']['output']>;
  unit_id?: Maybe<Scalars['Int']['output']>;
  vegetable_id?: Maybe<Scalars['Int']['output']>;
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
  vegetable_id: Scalars['Int']['input'];
};

/** select columns of table "vegetable_master" */
export enum Vegetable_Master_Select_Column {
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
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Vegetable_Master_Stddev_Fields = {
  __typename?: 'vegetable_master_stddev_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vegetable_Master_Stddev_Pop_Fields = {
  __typename?: 'vegetable_master_stddev_pop_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vegetable_Master_Stddev_Samp_Fields = {
  __typename?: 'vegetable_master_stddev_samp_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
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
  display_name?: InputMaybe<Scalars['String']['input']>;
  image_uri?: InputMaybe<Scalars['String']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Vegetable_Master_Sum_Fields = {
  __typename?: 'vegetable_master_sum_fields';
  unit_id?: Maybe<Scalars['Int']['output']>;
  vegetable_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "vegetable_master" */
export enum Vegetable_Master_Update_Column {
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
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vegetable_Master_Var_Samp_Fields = {
  __typename?: 'vegetable_master_var_samp_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vegetable_Master_Variance_Fields = {
  __typename?: 'vegetable_master_variance_fields';
  unit_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** ユーザーごとの野菜ストック */
export type Vegetable_Stocks = {
  __typename?: 'vegetable_stocks';
  quantity: Scalars['Int']['output'];
  stock_id: Scalars['Int']['output'];
  user_id: Scalars['String']['output'];
  vegetable_id: Scalars['Int']['output'];
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
  count?: InputMaybe<Vegetable_Stocks_Aggregate_Bool_Exp_Count>;
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
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Avg_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "vegetable_stocks". All fields are combined with a logical 'AND'. */
export type Vegetable_Stocks_Bool_Exp = {
  _and?: InputMaybe<Array<Vegetable_Stocks_Bool_Exp>>;
  _not?: InputMaybe<Vegetable_Stocks_Bool_Exp>;
  _or?: InputMaybe<Array<Vegetable_Stocks_Bool_Exp>>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  stock_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  vegetable_id?: InputMaybe<Int_Comparison_Exp>;
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
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "vegetable_stocks" */
export type Vegetable_Stocks_Insert_Input = {
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
  vegetable_stocks_users?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  vegetable_stocks_vegetable_master?: InputMaybe<Vegetable_Master_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Vegetable_Stocks_Max_Fields = {
  __typename?: 'vegetable_stocks_max_fields';
  quantity?: Maybe<Scalars['Int']['output']>;
  stock_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  vegetable_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Max_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Vegetable_Stocks_Min_Fields = {
  __typename?: 'vegetable_stocks_min_fields';
  quantity?: Maybe<Scalars['Int']['output']>;
  stock_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  vegetable_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Min_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
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
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
  vegetable_stocks_users?: InputMaybe<Users_Order_By>;
  vegetable_stocks_vegetable_master?: InputMaybe<Vegetable_Master_Order_By>;
};

/** primary key columns input for table: vegetable_stocks */
export type Vegetable_Stocks_Pk_Columns_Input = {
  stock_id: Scalars['Int']['input'];
};

/** select columns of table "vegetable_stocks" */
export enum Vegetable_Stocks_Select_Column {
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StockId = 'stock_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VegetableId = 'vegetable_id'
}

/** input type for updating data in table "vegetable_stocks" */
export type Vegetable_Stocks_Set_Input = {
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Vegetable_Stocks_Stddev_Fields = {
  __typename?: 'vegetable_stocks_stddev_fields';
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Stddev_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Vegetable_Stocks_Stddev_Pop_Fields = {
  __typename?: 'vegetable_stocks_stddev_pop_fields';
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Stddev_Pop_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Vegetable_Stocks_Stddev_Samp_Fields = {
  __typename?: 'vegetable_stocks_stddev_samp_fields';
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Stddev_Samp_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
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
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  vegetable_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Vegetable_Stocks_Sum_Fields = {
  __typename?: 'vegetable_stocks_sum_fields';
  quantity?: Maybe<Scalars['Int']['output']>;
  stock_id?: Maybe<Scalars['Int']['output']>;
  vegetable_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Sum_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** update columns of table "vegetable_stocks" */
export enum Vegetable_Stocks_Update_Column {
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
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Var_Pop_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Vegetable_Stocks_Var_Samp_Fields = {
  __typename?: 'vegetable_stocks_var_samp_fields';
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Var_Samp_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Vegetable_Stocks_Variance_Fields = {
  __typename?: 'vegetable_stocks_variance_fields';
  quantity?: Maybe<Scalars['Float']['output']>;
  stock_id?: Maybe<Scalars['Float']['output']>;
  vegetable_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "vegetable_stocks" */
export type Vegetable_Stocks_Variance_Order_By = {
  quantity?: InputMaybe<Order_By>;
  stock_id?: InputMaybe<Order_By>;
  vegetable_id?: InputMaybe<Order_By>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: string, email: string, created_at: any }> };


export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;