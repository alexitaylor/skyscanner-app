export interface IDateModel {
  year: string;
  month: string;
  day: string;
}

export interface IPlace {
  CityId: string;
  CountryId: string;
  CountryName: string;
  PlaceId: number | string;
  PlaceName: string;
  RegionId: string;
  IataCode: string;
  Name: string;
}

export interface ILeg {
  CarrierIds: number[];
  OriginId: number;
  DestinationId: number;
  DepartureDate: string;
}

export interface IQuote {
  QuoteId: number;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: ILeg;
  InboundLeg: ILeg;
  QuoteDateTime: string;
}

export interface ICurrencies {
  Code: string;
  Symbol: string;
  ThousandsSeparator: string;
  DecimalSeparator: string;
  SymbolOnLeft: boolean;
  SpaceBetweenAmountAndSymbol: boolean;
  RoundingCoefficient: number;
  DecimalDigits: number;
}

export interface ICarriers {
  CarrierId: number;
  Name: string;
}

export interface IQuotesResult {
  Quotes: IQuote[];
  Currencies: ICurrencies[];
  Places: IPlace[];
  Carriers: ICarriers[];
}

export class QuotesResult implements IQuotesResult {
  constructor(
    public Quotes: IQuote[],
    public Currencies: ICurrencies[],
    public Places: IPlace[],
    public Carriers: ICarriers[]
  ) {}
}
