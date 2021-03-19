export interface Request {
  method?: string;
  url?: string;
  urlPattern?: string;
  urlPath?: string;
  urlPathPattern?: string;
  headers?: Record<string, MatchingPattern>;
  cookies?: Record<string, MatchingPattern>;
  bodyPatterns?: MatchingPattern[];
  queryParameters?: Record<string, MatchingPattern>;
  basicAuthCredentials?: BasicAuth;
  multipartPatterns?: string;
}

export interface MatchingPattern {
  equalTo?: any;
  contains?: any;
  matches?: string;
  binaryEqualTo?: string;
  doesNotMatch?: string;
  equalToJson?: string | Record<string, any>;
  matchesJsonPath?: string | MatchesJsonPath;
  ignoreArrayOrder?: boolean;
  ignoreExtraElements?: boolean;
  caseInsensitive?: boolean;
  absent?: boolean;
  equalToXml?: string;
  enablePlaceholders?: boolean;
  placeholderOpeningDelimiterRegex?: string;
  placeholderClosingDelimiterRegex?: string;
  exemptedComparisons?:
    | "ELEMENT_TAG_NAME"
    | "SCHEMA_LOCATION"
    | "NO_NAMESPACE_SCHEMA_LOCATION"
    | "NODE_TYPE"
    | "NAMESPACE_URI"
    | "TEXT_VALUE"
    | "PROCESSING_INSTRUCTION_TARGET"
    | "PROCESSING_INSTRUCTION_DATA"
    | "ELEMENT_NUM_ATTRIBUTES"
    | "ATTR_VALUE"
    | "CHILD_NODELIST_LENGTH"
    | "CHILD_LOOKUP"
    | "ATTR_NAME_LOOKUP";
  matchesXPath?: string | MatchesXPath;
  xPathNamespaces?: Record<string, string>;
}

interface MatchesJsonPath {
  expression?: string;
  contains?: any;
  equalToJson?: string | Record<string, any>;
}

interface MatchesXPath {
  expression?: string;
  contains?: any;
  equalToXml?: string;
}

interface BasicAuth {
  username: string;
  password: string;
}

export const REQUEST_PROP = {
  URL: "request.url",
  PATH: "request.path",
  METHOD: "request.method",
  HOST: "request.host",
  PORT: "request.port",
  SCHEME: "request.scheme",
  BASE_URL: "request.baseUrl",
  BODY: "request.body",
  PARAM_SEGMENT: (index: number) => `request.pathSegments.[${index}]`,
  QUERY: (key: string) => `request.query.${key}`,
  FIRST_QUERY: (key: string) => `request.query.${key}.first`,
  LAST_QUERY: (key: string) => `request.query.${key}.last`,
  QUERY_INDEXED: (key: string, index: number) => `request.query.${key}.[${index}]`,
  HEADER: (key: string) => `request.headers.[${key}]`,
  FIRST_HEADER: (key: string) => `request.headers.${key}.first`,
  LAST_HEADER: (key: string) => `request.headers.${key}.last`,
  HEADER_INDEXED: (key: string, index: number) => `request.headers.[${key}].[${index}]`,
  COOKIE: (key: string) => `request.cookies.${key}`,
  FIRST_COOKIE: (key: string) => `request.cookies.${key}.first`,
  LAST_COOKIE: (key: string) => `request.cookies.${key}.last`,
  COOKIE_INDEXED: (key: string, index: number) => `request.cookies.${key}.[${index}]`,
};
