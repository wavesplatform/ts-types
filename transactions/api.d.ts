import {
    IMassTransferItem,
    ITransaction,
    IWithId,
    IWithProofs,
    IWithSignature,
    IWithSender,
    IWithVersion,
    TDataTransactionEntry,
    IExchangeTransactionOrder,
    TRANSACTION_TYPE
} from '..';
import {
    IIssueTransaction,
    ITransferTransaction,
    IReissueTransaction,
    IBurnTransaction,
    ILeaseTransaction,
    ICancelLeaseTransaction,
    IAliasTransaction,
    IMassTransferTransaction,
    IDataTransaction,
    ISetScriptTransaction,
    ISponsorship,
    IExchangeTransaction
} from './general';

export namespace api {

    export type TExchangeTransactionOrder<LONG> =
        IExchangeTransactionOrder<LONG>
        & IWithId
        & IWithSender
        & IWithProofs
        & IWithSignature
        & IWithVersion;

    export type TBaseAPITransaction<LONG> = ITransaction<LONG> &
        IWithId &
        IWithSender &
        IWithProofs &
        IWithSignature &
        IWithVersion;

    export type TTransaction<LONG> =
        TIssueTransaction<LONG> |
        TTransferTransaction<LONG> |
        TReissueTransaction<LONG> |
        TBurnTransaction<LONG> |
        TLeaseTransaction<LONG> |
        TCancelLeaseTransaction<LONG> |
        TAliasTransaction<LONG> |
        TMassTransferTransaction<LONG> |
        TDataTransaction<LONG> |
        TSetScriptTransaction<LONG> |
        TSponsorship<LONG> |
        TExchangeTransaction<LONG>;

    export type TTransactionMap<LONG> = {
        [TRANSACTION_TYPE.ISSUE]: TIssueTransaction<LONG>,
        [TRANSACTION_TYPE.TRANSFER]: TTransferTransaction<LONG>,
        [TRANSACTION_TYPE.REISSUE]: TReissueTransaction<LONG>,
        [TRANSACTION_TYPE.BURN]: TBurnTransaction<LONG>,
        [TRANSACTION_TYPE.LEASE]: TLeaseTransaction<LONG>,
        [TRANSACTION_TYPE.CANCEL_LEASE]: TCancelLeaseTransaction<LONG>,
        [TRANSACTION_TYPE.ALIAS]: TAliasTransaction<LONG>,
        [TRANSACTION_TYPE.MASS_TRANSFER]: TMassTransferTransaction<LONG>,
        [TRANSACTION_TYPE.DATA]: TDataTransaction<LONG>,
        [TRANSACTION_TYPE.SET_SCRIPT]: TSetScriptTransaction<LONG>,
        [TRANSACTION_TYPE.SPONSORSHIP]: TSponsorship<LONG>,
        [TRANSACTION_TYPE.EXCHANGE]: TExchangeTransaction<LONG>
    };

    export type TIssueTransaction<LONG> = TBaseAPITransaction<LONG> & IIssueTransaction<LONG>;

    export type TTransferTransaction<LONG> = TBaseAPITransaction<LONG> & ITransferTransaction<LONG>;

    export type TReissueTransaction<LONG> = TBaseAPITransaction<LONG> & IReissueTransaction<LONG>;

    export type TBurnTransaction<LONG> = TBaseAPITransaction<LONG> & IBurnTransaction<LONG>;

    export type TExchangeTransaction<LONG> = TBaseAPITransaction<LONG> & IExchangeTransaction<LONG> & {
        order1: TExchangeTransactionOrder<LONG>;
        order2: TExchangeTransactionOrder<LONG>;
    }

    export type TLeaseTransaction<LONG> = TBaseAPITransaction<LONG> & ILeaseTransaction<LONG>;

    export type TCancelLeaseTransaction<LONG> = TBaseAPITransaction<LONG> & ICancelLeaseTransaction<LONG>;

    export type TAliasTransaction<LONG> = TBaseAPITransaction<LONG> & IAliasTransaction<LONG>;

    export type TMassTransferTransaction<LONG> = TBaseAPITransaction<LONG> & IMassTransferTransaction<LONG>;

    export type TDataTransaction<LONG> = TBaseAPITransaction<LONG> & IDataTransaction<LONG>;

    export type TSetScriptTransaction<LONG> = TBaseAPITransaction<LONG> & ISetScriptTransaction<LONG>;

    export type TSponsorship<LONG> = TBaseAPITransaction<LONG> & ISponsorship<LONG>;
}