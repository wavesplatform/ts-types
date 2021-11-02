import { Base64string, Long } from './common';

export enum InvokeArgumentType {
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
    | InvokeScriptCallUnionArgument<LONG>
    | InvokeScriptCallListArgument<
          LONG,
          | InvokeScriptCallStringArgument
          | InvokeScriptCallBinaryArgument
          | InvokeScriptCallBooleanArgument
          | InvokeScriptCallIntegerArgument<LONG>
      >;

export type InvokeScriptCallArgumentGeneric<Type, Value> = {
    type: Type;
    value: Value;
};

export type InvokeScriptCallStringArgument = InvokeScriptCallArgumentGeneric<
    InvokeArgumentType.STRING,
    string
>;
export type InvokeScriptCallBinaryArgument = InvokeScriptCallArgumentGeneric<
    InvokeArgumentType.BINARY,
    Base64string
>;
export type InvokeScriptCallBooleanArgument = InvokeScriptCallArgumentGeneric<
    InvokeArgumentType.BOOLEAN,
    boolean
>;
export type InvokeScriptCallIntegerArgument<
    LONG = Long
> = InvokeScriptCallArgumentGeneric<InvokeArgumentType.INTEGER, LONG>;
export type InvokeScriptCallUnionArgument<
LONG = Long
> = InvokeScriptCallArgumentGeneric<InvokeArgumentType.UNION, LONG> & {
    valueType: InvokeArgumentType.BINARY
             | InvokeArgumentType.BOOLEAN
             | InvokeArgumentType.INTEGER
             | InvokeArgumentType.STRING
};
export type InvokeScriptCallListArgument<
    LONG,
    ITEMS extends
        | InvokeScriptCallStringArgument
        | InvokeScriptCallBinaryArgument
        | InvokeScriptCallBooleanArgument
        | InvokeScriptCallIntegerArgument<LONG>
        | InvokeScriptCallUnionArgument<LONG>
> = InvokeScriptCallArgumentGeneric<'list', Array<ITEMS>>;
