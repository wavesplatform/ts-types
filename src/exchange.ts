import { ExchangeTransaction } from './index';
import { ExchangeTransactionOrderType, Long } from './common';

export type ExchangeTransactionOrderData<LONG> = {
    version: number;
    orderType: ExchangeTransactionOrderType;
    assetPair: {
        amountAsset: string | null;
        priceAsset: string | null;
    };
    price: LONG;
    amount: LONG;
    timestamp: number;
    expiration: number;
    matcherFee: LONG;
    matcherPublicKey: string;
    senderPublicKey: string;
};

export type WithVersion<
    Target extends Record<string, any>,
    Version extends number
> = Target & {
    version: Version;
};

type ExchangeOrderWithCustomFee<Long> = ExchangeTransactionOrderData<Long> & {
    matcherFeeAssetId: string | null;
};

export type ExchangeTransactionOrderV1<LONG = Long> = WithVersion<
    ExchangeTransactionOrderData<LONG>,
    1
>;
export type ExchangeTransactionOrderV2<LONG = Long> = WithVersion<
    ExchangeTransactionOrderData<LONG>,
    2
>;
export type ExchangeTransactionOrderV3<LONG = Long> = WithVersion<
    ExchangeOrderWithCustomFee<LONG>,
    3
>;
export type ExchangeTransactionOrderV4<LONG = Long> = WithVersion<
    ExchangeOrderWithCustomFee<LONG>,
    4
>;

export type ExchangeTransactionOrder<LONG = Long> =
    | ExchangeTransactionOrderV1<LONG>
    | ExchangeTransactionOrderV2<LONG>
    | ExchangeTransactionOrderV3<LONG>
    | ExchangeTransactionOrderV4<LONG>;

export type SignedIExchangeTransactionOrder<
    ORDER extends ExchangeTransactionOrder<any>
> = ORDER &
    (ORDER extends { version: 1 }
        ? { signature: string }
        : { proofs: Array<string> });

export type ExchangeTransactionOrderMap<LONG = Long> = {
    1: ExchangeTransactionOrderV1<LONG>;
    2: ExchangeTransactionOrderV2<LONG>;
    3: ExchangeTransactionOrderV3<LONG>;
    4: ExchangeTransactionOrderV4<LONG>;
};

export type ExchangeTransactionOrderByTx<
    TX extends ExchangeTransaction
> = TX extends { version: 1 }
    ? ExchangeTransactionOrderMap[1]
    : TX extends { version: 2 }
    ? ExchangeTransactionOrderMap[1 | 2 | 3]
    : ExchangeTransactionOrder;
