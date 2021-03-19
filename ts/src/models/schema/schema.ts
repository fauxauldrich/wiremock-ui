export const WIREMOCK_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/Mapping",
  definitions: {
    Mapping: {
      type: "object",
      properties: {
        priority: {
          type: "number",
        },
        id: {
          type: "string",
        },
        uuid: {
          type: "string",
        },
        request: {
          $ref: "#/definitions/Request",
        },
        response: {
          $ref: "#/definitions/Response",
        },
      },
      required: ["request", "response"],
      additionalProperties: false,
    },
    Request: {
      type: "object",
      properties: {
        method: {
          type: "string",
        },
        url: {
          type: "string",
        },
        urlPattern: {
          type: "string",
        },
        urlPath: {
          type: "string",
        },
        urlPathPattern: {
          type: "string",
        },
        headers: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MatchingPattern",
          },
        },
        cookies: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MatchingPattern",
          },
        },
        bodyPatterns: {
          type: "array",
          items: {
            $ref: "#/definitions/MatchingPattern",
          },
        },
        queryParameters: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/MatchingPattern",
          },
        },
        basicAuthCredentials: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          required: ["username", "password"],
          additionalProperties: false,
        },
        multipartPatterns: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
    MatchingPattern: {
      type: "object",
      properties: {
        equalTo: {},
        contains: {},
        matches: {
          type: "string",
        },
        binaryEqualTo: {
          type: "string",
        },
        doesNotMatch: {
          type: "string",
        },
        equalToJson: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "object",
            },
          ],
        },
        matchesJsonPath: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "object",
              properties: {
                expression: {
                  type: "string",
                },
                contains: {},
                equalToJson: {
                  anyOf: [
                    {
                      type: "string",
                    },
                    {
                      type: "object",
                    },
                  ],
                },
              },
              additionalProperties: false,
            },
          ],
        },
        ignoreArrayOrder: {
          type: "boolean",
        },
        ignoreExtraElements: {
          type: "boolean",
        },
        caseInsensitive: {
          type: "boolean",
        },
        absent: {
          type: "boolean",
        },
        equalToXml: {
          type: "string",
        },
        enablePlaceholders: {
          type: "boolean",
        },
        placeholderOpeningDelimiterRegex: {
          type: "string",
        },
        placeholderClosingDelimiterRegex: {
          type: "string",
        },
        exemptedComparisons: {
          type: "string",
          enum: [
            "ELEMENT_TAG_NAME",
            "SCHEMA_LOCATION",
            "NO_NAMESPACE_SCHEMA_LOCATION",
            "NODE_TYPE",
            "NAMESPACE_URI",
            "TEXT_VALUE",
            "PROCESSING_INSTRUCTION_TARGET",
            "PROCESSING_INSTRUCTION_DATA",
            "ELEMENT_NUM_ATTRIBUTES",
            "ATTR_VALUE",
            "CHILD_NODELIST_LENGTH",
            "CHILD_LOOKUP",
            "ATTR_NAME_LOOKUP",
          ],
        },
        matchesXPath: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "object",
              properties: {
                expression: {
                  type: "string",
                },
                contains: {},
                equalToXml: {
                  type: "string",
                },
              },
              additionalProperties: false,
            },
          ],
        },
        xPathNamespaces: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
        },
      },
      additionalProperties: false,
    },
    Response: {
      type: "object",
      properties: {
        status: {
          type: "number",
        },
        statusMessage: {
          type: "string",
        },
        body: {
          type: "string",
        },
        jsonBody: {
          type: "object",
        },
        base64Body: {
          type: "string",
        },
        headers: {
          type: "object",
        },
        transformers: {
          type: "string",
          const: "response-template",
        },
        proxyBaseUrl: {
          type: "string",
        },
        additionalProxyRequestHeaders: {
          type: "object",
        },
        transformerParameters: {
          type: "object",
        },
        fixedDelayMilliseconds: {
          type: "number",
        },
        delayDistribution: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["lognormal", "uniform"],
            },
            median: {
              type: "number",
            },
            sigma: {
              type: "number",
            },
            upper: {
              type: "number",
            },
            lower: {
              type: "number",
            },
          },
          required: ["type"],
          additionalProperties: false,
        },
        chunkedDribbleDelay: {
          type: "object",
          properties: {
            numberOfChunks: {
              type: "number",
            },
            totalDuration: {
              type: "number",
            },
          },
          required: ["numberOfChunks", "totalDuration"],
          additionalProperties: false,
        },
        fault: {
          type: "string",
          enum: ["EMPTY_RESPONSE", "MALFORMED_RESPONSE_CHUNK", "RANDOM_DATA_THEN_CLOSE", "CONNECTION_RESET_BY_PEER"],
        },
        bodyFileName: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
  },
};
