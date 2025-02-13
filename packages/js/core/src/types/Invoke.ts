import { ClientConfig, Uri } from ".";

/** Options required for an Wrapper invocation. */
export interface InvokeOptions<
  TUri extends Uri | string = string,
  TClientConfig extends ClientConfig = ClientConfig
> {
  /** The Wrapper's URI */
  uri: TUri;

  /** Method to be executed. */
  method: string;

  /**
   * Arguments for the method, structured as a map,
   * removing the chance of incorrectly ordering arguments.
   */
  args?: Record<string, unknown> | Uint8Array;

  /**
   * Override the client's config for all invokes within this invoke.
   */
  config?: Partial<TClientConfig>;

  /**
   * Invoke id used to track query context data set internally.
   */
  contextId?: string;
}

/**
 * Result of an Wrapper invocation.
 *
 * @template TData Type of the invoke result data.
 */
export interface InvokeResult<TData = unknown> {
  /**
   * Invoke result data. The type of this value is the return type
   * of the method. If undefined, it means something went wrong.
   * Errors should be populated with information as to what happened.
   * Null is used to represent an intentionally null result.
   */
  data?: TData;

  /** Errors encountered during the invocation. */
  error?: Error;
}

export interface InvokerOptions<
  TUri extends Uri | string = string,
  TClientConfig extends ClientConfig = ClientConfig
> extends InvokeOptions<TUri, TClientConfig> {
  encodeResult?: boolean;
}

export interface Invoker {
  invoke<TData = unknown, TUri extends Uri | string = string>(
    options: InvokerOptions<TUri>
  ): Promise<InvokeResult<TData>>;
}

export interface InvocableResult<TData = unknown> extends InvokeResult<TData> {
  encoded?: boolean;
}

export interface Invocable {
  invoke(
    options: InvokeOptions<Uri>,
    invoker: Invoker
  ): Promise<InvocableResult<unknown>>;
}
