export enum DEFAULT_INCOME_TYPE {
  SALARY,
}

export enum DEFAULT_EXPENDITURE_TYPE {
  FOOD,
  RENT,
}

function getStringValuesFromEnum<T>(myEnum: T): (keyof T)[] {
  return Object.keys(myEnum).filter(
    (k) => typeof (myEnum as any)[k] === "number"
  ) as any;
}

export const ARRAY_OF_DEFAULT_INCOME_TYPE = getStringValuesFromEnum(
  DEFAULT_INCOME_TYPE
);

export const ARRAY_OF_DEFAULT_EXPENDITURE_TYPE = getStringValuesFromEnum(
  DEFAULT_EXPENDITURE_TYPE
);

export enum TRANSACTION_TYPE {
  INCOME = "income",
  EXPENDITURE = "expenditure",
}
