import { Long, Base64string, } from './common';

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
    'string',
    string
>;
export type InvokeScriptCallBinaryArgument = InvokeScriptCallArgumentGeneric<
    'binary',
    Base64string
>;
export type InvokeScriptCallBooleanArgument = InvokeScriptCallArgumentGeneric<
    'boolean',
    boolean
>;
export type InvokeScriptCallIntegerArgument<
    LONG = Long
> = InvokeScriptCallArgumentGeneric<'integer', LONG>;

export type InvokeScriptCallListArgument<
    LONG,
    ITEMS extends
        | InvokeScriptCallStringArgument
        | InvokeScriptCallBinaryArgument
        | InvokeScriptCallBooleanArgument
        | InvokeScriptCallIntegerArgument
> = InvokeScriptCallArgumentGeneric<'list', Array<ITEMS>>;
