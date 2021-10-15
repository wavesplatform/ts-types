import { Base64string, Long } from './common';

export enum EInvokeArgumentType {
    INTEGER = 'integer',
    STRING = 'string',
    BOOLEAN = 'boolean',
    BINARY = 'binary',
    UNION = 'union',
}

export type InvokeScriptCall<LONG = Long> = {
    function: string;
    args: Array<InvokeScriptCallArgument<LONG>>;
};

export type InvokeScriptPayment<LONG = Long> = {
    assetId: string | null;
    amount: LONG;
};

export type InvokeScriptCallArgument<LONG = Long> =
    | InvokeScriptCallStringArgument
    | InvokeScriptCallBinaryArgument
    | InvokeScriptCallBooleanArgument
    | InvokeScriptCallIntegerArgument<LONG>
    | InvokeScriptCallUnionArgument
    | InvokeScriptCallListArgument<
          LONG,
          | InvokeScriptCallStringArgument
          | InvokeScriptCallBinaryArgument
          | InvokeScriptCallBooleanArgument
          | InvokeScriptCallIntegerArgument
      >;

export type InvokeScriptCallArgumentGeneric<Type, Value> = {
    type: Type;
    value: Value;
};

export type InvokeScriptCallStringArgument = InvokeScriptCallArgumentGeneric<
    EInvokeArgumentType.STRING,
    string
>;
export type InvokeScriptCallBinaryArgument = InvokeScriptCallArgumentGeneric<
    EInvokeArgumentType.BINARY,
    Base64string
>;
export type InvokeScriptCallBooleanArgument = InvokeScriptCallArgumentGeneric<
    EInvokeArgumentType.BOOLEAN,
    boolean
>;
export type InvokeScriptCallIntegerArgument<
    LONG = Long
> = InvokeScriptCallArgumentGeneric<EInvokeArgumentType.INTEGER, LONG>;
export type InvokeScriptCallUnionArgument = InvokeScriptCallArgumentGeneric<
    EInvokeArgumentType.UNION,
    boolean | string | Base64string | Long
> & {
    valueType: EInvokeArgumentType.BINARY 
             | EInvokeArgumentType.BOOLEAN
             | EInvokeArgumentType.INTEGER
             | EInvokeArgumentType.STRING
};
export type InvokeScriptCallListArgument<
    LONG,
    ITEMS extends
        | InvokeScriptCallStringArgument
        | InvokeScriptCallBinaryArgument
        | InvokeScriptCallBooleanArgument
        | InvokeScriptCallIntegerArgument
        | InvokeScriptCallUnionArgument
> = InvokeScriptCallArgumentGeneric<'list', Array<ITEMS>>;
