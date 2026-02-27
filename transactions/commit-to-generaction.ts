import {
    Long,
    SignedTransaction,
    WithApiMixin,
    WithApplicationStatus,
    WithId,
    WithVersion,
} from '../src';
import type { BaseTransaction } from './index';

export type CommitToGeneractionTransactionFields<LONG = Long> = {
    generationPeriodStart: number;
    endorserPublicKey: string;
    commitmentSignature: string;
};

export type CommitToGeneractionTransactionV1<LONG> = WithVersion<
    CommitToGeneractionTransactionFields & BaseTransaction<LONG, 19>,
    1
>;

export type CommitToGeneractionTransactionMap<LONG = Long> = {
    1: CommitToGeneractionTransactionV1<LONG>;
};

export type CommitToGeneractionTransaction<LONG = Long> =
    CommitToGeneractionTransactionV1<LONG>;

export type CommitToGeneractionTransactionFromNode<LONG = Long> = SignedTransaction<
    CommitToGeneractionTransaction<LONG>
> &
    WithId &
    WithApplicationStatus &
    WithApiMixin & {
        feeAssetId: null;
    };


