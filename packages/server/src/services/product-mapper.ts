import {inject, singleton} from 'tsyringe';
import {injectionTokens} from '../di/tokens.js';

type InternalProductReference = string;
type ExternalProductReference = string;

@singleton()
export class ProductMapper {
  private readonly map: Map<InternalProductReference, ExternalProductReference>;
  private readonly reversedMap: Map<
    ExternalProductReference,
    InternalProductReference
  >;

  constructor(
    @inject(injectionTokens.ProductMapJumboXGorillas)
    input: Record<InternalProductReference, ExternalProductReference>,
  ) {
    this.map = new Map(Object.entries(input));

    const reversedInput = Object.fromEntries(
      Object.entries(input).map(([k, v]) => [v, k]),
    );

    this.reversedMap = new Map(Object.entries(reversedInput));
  }

  async toInternal(
    ref: ExternalProductReference,
  ): Promise<InternalProductReference> {
    if (!this.reversedMap.has(ref)) {
      throw new Error(`Unable to map external product reference '${ref}'`);
    }

    return this.reversedMap.get(ref)!;
  }

  async toExternal(
    ref: InternalProductReference,
  ): Promise<ExternalProductReference> {
    if (!this.map.has(ref)) {
      throw new Error(`Unable to map internal product reference '${ref}'`);
    }

    return this.map.get(ref)!;
  }
}
