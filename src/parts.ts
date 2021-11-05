import { DATA_FIELD_TYPE } from './index';
import { AssetDecimals, Long, Base64string } from './common';
import { InvokeScriptPayment } from './invoke';

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

export type TStateChanges = {
    data: DataTransactionEntry[];
    transfers: {
        address: string;
        amount: Long;
        asset: string | null;
    }[];
    issues: {
        assetId: string;
        name: string;
        description: string;
        quantity: Long;
        decimals: AssetDecimals;
        isReissuable: boolean;
        compiledScript: null | string;
        nonce: Long;
    }[];
    reissues: {
        assetId: string;
        isReissuable: boolean;
        quantity: Long;
    }[];
    burns: {
        assetId: string;
        quantity: Long;
    }[];
    sponsorFees: {
        assetId: string;
        minSponsoredAssetFee: Long;
    }[];
    leases: {
        leaseId: string;
        recipient: string;
        amount: Long;
    }[];
    leaseCancels: { leaseId: string }[];
    invokes: {
        dApp: string;
        call: {
            function: string;
            args: { type: string; value: string }[];
        };
        payment: InvokeScriptPayment[];
        stateChanges: TStateChanges;
    }[];
    error?: {
        code: number;
        text: string;
    };
};
