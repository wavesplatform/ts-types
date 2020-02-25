export enum TxTypes {
    issue = 3,
    transfer = 4,
    reissue = 5,
    burn = 6,
    exchange = 7,
    lease = 8,
    cancelLease = 9,
    alias = 10,
    massTransfer = 11,
    data = 12,
    setScript = 13,
    sponsorship = 14,
    setAssetScript = 15,
    invoke = 16,
}

export type CommonTxFields = {
    id: string;
    senderPublicKey: string;
    version: number;
    timestamp: number;
    fee: Long;
    proofs: TxProofs;
};

export type IssueTxFields = {
    name: string;
    description: string;
    decimals: number;
    quantity: Long;
    reissuable: boolean;
    chainId: number;
    script: Base64Script | null;
};

export type TransferTxFields = {
    recipient: string;
    amount: Long;
    feeAssetId: string | null;
    assetId: string | null;
    attachment: Base58Bytes;
};

export type ReissueTxFields = {
    assetId: string;
    quantity: Long;
    reissuable: boolean;
    chainId: number;
};

export type BurnTxFields = {
    assetId: string;
    quantity: Long;
    chainId: number;
};

export type ExchangeTxOrder = {
    matcherPublicKey: string;
    version: number;
    assetPair: {
        amountAsset: string;
        priceAsset: string;
    };
    orderType: 'buy' | 'sell';
    price: Long;
    amount: Long;
    timestamp: number;
    expiration: number;
    matcherFee: Long;
    matcherFeeAssetId: string;
    senderPublicKey: string;
    proofs: TxProofs;
};
export type ExchangeTxFields = {
    buyOrder: ExchangeTxOrder;
    sellOrder: ExchangeTxOrder;
    price: Long;
    amount: Long;
    buyMatcherFee: Long;
    sellMatcherFee: Long;
};

export type LeaseTxFields = {
    amount: Long;
    recipient: string;
};

export type CancelLeaseTxFields = {
    leaseId: string;
    chainId: number;
};

export type AliasTxFields = {
    alias: string;
};

export type MassTransferTxTransferListItem = {
    recipient: string;
    amount: Long;
};

export type MassTransferTxFields = {
    transfers: MassTransferTxTransferListItem[];
    assetId: string | null;
    attachment: Base58Bytes;
};

enum DataTxTypes {
    integer = 'integer',
    boolean = 'boolean',
    string = 'string',
    binary = 'binary',
}
type DataTxDataFactory<T, V> = {
    key: string;
    type: T;
    value: V;
};
type IntegerData = DataTxDataFactory<DataTxTypes.integer, Long>;
type BooleanData = DataTxDataFactory<DataTxTypes.boolean, boolean>;
type StringData = DataTxDataFactory<DataTxTypes.string, string>;
type BinaryData = DataTxDataFactory<DataTxTypes.binary, Uint8Array>;

export type DataTxFields = {
    data: (IntegerData | BooleanData | StringData | BinaryData)[];
};

export type SetScriptTxFields = {
    script: Base64Script | null;
    chainId: number;
};

export type SponsorshipTxFields = {
    assetId: string;
    minSponsoredAssetFee: Long;
};

export type SetAssetScriptTxFields = {
    chainId: number;
    assetId: string;
    script: Base64Script;
};

type ArgFactory<T, V> = Array<{
    type: T;
    value: V;
}>;

export type InvokeScriptCall = {
    function: string;
    args:
        | ArgFactory<'string' | 'binary', string>
        | ArgFactory<'boolean', boolean>
        | ArgFactory<'integer', Long>;
};

export type InvokeTxFields = {
    chainId: number;
    dApp: string;
    call: InvokeScriptCall | null | undefined;
    feeAssetId: string | null;
    payment: { assetId: string; amount: Long }[] | null | undefined;
};

type TxFactory<SpecificTxFields, TxType extends TxTypes> = CommonTxFields &
    SpecificTxFields & { type: TxType };

export type IssueTx = TxFactory<IssueTxFields, TxTypes.issue>;
export type TransferTx = TxFactory<TransferTxFields, TxTypes.transfer>;
export type ReissueTx = TxFactory<ReissueTxFields, TxTypes.reissue>;
export type BurnTx = TxFactory<BurnTxFields, TxTypes.burn>;
export type ExchangeTx = TxFactory<ExchangeTxFields, TxTypes.exchange>;
export type LeaseTx = TxFactory<LeaseTxFields, TxTypes.lease>;
export type CancelLeaseTx = TxFactory<CancelLeaseTxFields, TxTypes.cancelLease>;
export type AliasTx = TxFactory<AliasTxFields, TxTypes.alias>;
export type MassTransferTx = TxFactory<
    MassTransferTxFields,
    TxTypes.massTransfer
>;
export type DataTx = TxFactory<DataTxFields, TxTypes.data>;
export type SetScriptTx = TxFactory<SetScriptTxFields, TxTypes.setScript>;
export type SponsorshipTx = TxFactory<SponsorshipTxFields, TxTypes.sponsorship>;
export type SetAssetScriptTx = TxFactory<
    SetAssetScriptTxFields,
    TxTypes.setAssetScript
>;
export type InvokeTx = TxFactory<InvokeTxFields, TxTypes.invoke>;

export type Tx =
    | IssueTx
    | TransferTx
    | ReissueTx
    | BurnTx
    | ExchangeTx
    | ExchangeTx
    | LeaseTx
    | CancelLeaseTx
    | AliasTx
    | MassTransferTx
    | DataTx
    | SetAssetScriptTx
    | SetScriptTx
    | SponsorshipTx
    | InvokeTx;

type BlockchainTxFactory<T extends Tx> = T & {
    sender: string;
    height?: number;
};

export type BlockchainInvokeTx = BlockchainTxFactory<InvokeTx>;
export type BlockchainSetAssetScriptTx = BlockchainTxFactory<SetAssetScriptTx>;
export type BlockchainSponsorshipTx = BlockchainTxFactory<SponsorshipTx>;
export type BlockchainSetScriptTx = BlockchainTxFactory<SetScriptTx>;
export type BlockchainDataTx = BlockchainTxFactory<DataTx>;
export type BlockchainMassTransferTx = BlockchainTxFactory<MassTransferTx>;
export type BlockchainAliasTx = BlockchainTxFactory<AliasTx>;
export type BlockchainCancelLeaseTx = BlockchainTxFactory<CancelLeaseTx>;
export type BlockchainLeaseTx = BlockchainTxFactory<LeaseTx>;
export type BlockchainExchangeTx = BlockchainTxFactory<ExchangeTx>;
export type BlockchainBurnTx = BlockchainTxFactory<BurnTx>;
export type BlockchainReissueTx = BlockchainTxFactory<ReissueTx>;
export type BlockchainTransferTx = BlockchainTxFactory<TransferTx>;
export type BlockchainIssueTx = BlockchainTxFactory<IssueTx>;

export type BlockchainTx =
    | BlockchainIssueTx
    | BlockchainTransferTx
    | BlockchainReissueTx
    | BlockchainBurnTx
    | BlockchainExchangeTx
    | BlockchainLeaseTx
    | BlockchainCancelLeaseTx
    | BlockchainAliasTx
    | BlockchainMassTransferTx
    | BlockchainDataTx
    | BlockchainSetScriptTx
    | BlockchainSponsorshipTx
    | BlockchainSetAssetScriptTx
    | BlockchainInvokeTx;

export type Long = string | number;
export type Base64Script = string;
export type Base58Bytes = string;
export type TxProofs = string[];

/* helpers */

// Делает поля К опциональными у Т
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;
