import { DATA_FIELD_TYPE } from './index';
import { Long, Base64string } from './common';

export interface WithId {
    id: string;
}

export type WithApiMixin = WithId & {
    sender: string;
    height: number;
};

export type MassTransferItem<LONG = Long> = {
    recipient: string;
    amount: LONG;
};

export type DataTransactionEntryGeneric<Type, Value> = {
    key: string;
    type: Type;
    value: Value;
};

export type DataTransactionEntryInteger<LONG> = DataTransactionEntryGeneric<
    typeof DATA_FIELD_TYPE.INTEGER,
    LONG
>;
export type DataTransactionEntryString = DataTransactionEntryGeneric<
    typeof DATA_FIELD_TYPE.STRING,
    string
>;
export type DataTransactionEntryBinary = DataTransactionEntryGeneric<
    typeof DATA_FIELD_TYPE.BINARY,
    Base64string
>;
export type DataTransactionEntryBoolean = DataTransactionEntryGeneric<
    typeof DATA_FIELD_TYPE.BOOLEAN,
    boolean
>;

export type DataTransactionEntry<LONG = Long> =
    | DataTransactionEntryInteger<LONG>
    | DataTransactionEntryString
    | DataTransactionEntryBinary
    | DataTransactionEntryBoolean
    | DataTransactionDeleteRequest;

export type DataTransactionDeleteRequest = {
    type: undefined;
    value: undefined;
    key: string;
};
