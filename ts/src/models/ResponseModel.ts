export interface Response {
  status?: number;
  statusMessage?: string;
  body?: string;
  jsonBody?: Record<string, any>;
  base64Body?: string;
  headers?: Record<string, any>;
  transformers?: "response-template";
  proxyBaseUrl?: string;
  additionalProxyRequestHeaders?: Record<string, any>;
  transformerParameters?: Record<string, any>;
  fixedDelayMilliseconds?: number;
  delayDistribution?: DelayDistribution;
  chunkedDribbleDelay?: ChunkedDribbleDelay;
  fault?: "EMPTY_RESPONSE" | "MALFORMED_RESPONSE_CHUNK" | "RANDOM_DATA_THEN_CLOSE" | "CONNECTION_RESET_BY_PEER";
  bodyFileName?: string;
}

export class HandlebarHelper {
  capitalize = (input: string = "YOUR_VALUE") => `{{capitalize ${input}}}`;

  assign = (variableName: string = "VARIABLE_NAME", assignment: string = "VALUE_TO_BE_ASSIGNED") => `{{#assign '${variableName}'}}${assignment}{{/assign}}`;

  isOdd = (value: number = 0, variableName?: string) => {
    if (typeof variableName !== "undefined") {
      return `{{isOdd ${value} ${variableName}}}`;
    }
    return `{{isOdd ${value}}}`;
  };

  isEven = (value: number, variableName?: string) => {
    if (typeof variableName !== "undefined") {
      return `{{isEven ${value} ${variableName}}}`;
    }
    return `{{isEven ${value}}}`;
  };

  xPath = (source: string = "SOURCE", expression: string = "XPATH_EXPRESSION") => `{{xPath ${source} '${expression}'}}`;

  soapXPath = (source: string = "SOURCE", expression: string = "XPATH_EXPRESSION") => `{{soapXPath ${source} '${expression}'}}`;

  jsonPath = (source: string = "SOURCE", expression: string = "JSONPATH_EXPRESSION") => `{{jsonPath ${source} '${expression}'}}`;

  dateTime = (type: "current" | "parseDate" = "current", offset: string = "1 days", format: string | "unix" | "epoch" = "epoch", source?: string) => {
    switch (type) {
      case "current":
        let currentTemplate = "{{now";
        currentTemplate = currentTemplate + (typeof offset === "undefined" ? "" : ` offset='${offset}'`);
        currentTemplate = currentTemplate + (typeof format === "undefined" ? "" : ` format='${format}'`);
        return currentTemplate + "}}";
      case "parseDate":
        let dateTemplate = `{{date (parseDate ${source} `;
        dateTemplate = dateTemplate + (typeof offset === "undefined" ? "" : ` offset='${offset}'`);
        dateTemplate = dateTemplate + (typeof format === "undefined" ? "" : ` format='${format}'`);
        return dateTemplate + "}}";
      default:
        break;
    }
  };

  randomValue = (
    length: number = 10,
    type: "ALPHANUMERIC" | "ALPHABETIC" | "NUMERIC" | "ALPHANUMERIC_AND_SYMBOLS" | "UUID" = "ALPHANUMERIC",
    uppercase: boolean = false
  ) => {
    let template = `{{randomValue`;
    template = template + (typeof length === "undefined" ? "" : ` length=${length}`);
    template = template + (typeof type === "undefined" ? "" : ` type='${type}'`);
    template = template + (typeof uppercase === "undefined" ? "" : ` uppercase=${uppercase}`);
    return template + "}}";
  };

  trim = (source: string = "SOURCE") => `{{trim ${source}}}`;

  base64 = (source: string = "SOURCE", padding: boolean = false, decode: boolean = false) => {
    let template = `{{base64 ${source}`;
    template = template + (typeof padding === "undefined" ? "" : ` padding=${padding}`);
    template = template + (typeof decode === "undefined" ? "" : ` decode=${decode}`);
    return template + "}}";
  };

  urlEncode = (source: string = "SOURCE", decode: boolean = false) => {
    let template = `{{urlEncode ${source}`;
    template = template + (typeof decode === "undefined" ? "" : ` decode=${decode}`);
    return template + "}}";
  };

  regexExtract = (source: string = "SOURCE", regEx: string = "REGEX", groupName: string = "GROUP_NAME") => {
    let template = `{{regexExtract ${source} '${regEx}'`;
    template = template + (typeof groupName === "undefined" ? "" : ` '${groupName}'`);
    return template + "}}";
  };

  each = (source: string = "SOURCE") => `{{#each (jsonPath ${source} 'JSONPATH') as |node|}}{{node.ATTRIBUTE}}{{/each}}`;

  size = (source: string = "SOURCE") => `{{size ${source}}}`;

  hostname = () => "{{hostname}}";

  systemValue = (type: "ENVIRONMENT" | "PROPERTY" = "ENVIRONMENT", key: string = "KEY") => `{{systemValue type='${type}' key='${key}'}}`;
  // each(){}
  // pickRandom
}

interface DelayDistribution {
  type: "lognormal" | "uniform";
  median?: number;
  sigma?: number;
  upper?: number;
  lower?: number;
}

interface ChunkedDribbleDelay {
  numberOfChunks: number;
  totalDuration: number;
}
