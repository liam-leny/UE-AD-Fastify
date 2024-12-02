export const listResponseSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            state: { type: "string", enum: ["PENDING", "IN-PROGRESS", "DONE"] },
            description: { type: "string" },
          },
        },
      },
    },
  },
};

export const addListSchema = {
  body: {
    type: "object",
    required: ["id", "name"],
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
      },
    },
  },
};

export const updateListSchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
      },
    },
  },
};

export const addItemSchema = {
  body: {
    type: "object",
    required: ["id", "state", "description"],
    properties: {
      id: { type: "number" },
      state: {
        type: "string",
        enum: ["PENDING", "IN-PROGRESS", "DONE"],
      },
      description: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            state: {
              type: "string",
              enum: ["PENDING", "IN-PROGRESS", "DONE"],
            },
            description: { type: "string" },
          },
        },
      },
    },
  },
};
