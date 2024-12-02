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
            id: { type: "integer" },
            state: { type: "string", enum: ["PENDING", "IN-PROGRESS", "DONE"] },
            description: { type: "string" },
            assignedTo: { type: "string" },
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
      id: { type: "integer" },
      state: {
        type: "string",
        enum: ["PENDING", "IN-PROGRESS", "DONE"],
      },
      description: { type: "string" },
      assignedTo: { type: "string" },
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
            state: {
              type: "string",
              enum: ["PENDING", "IN-PROGRESS", "DONE"],
            },
            description: { type: "string" },
            assignedTo: { type: "string" },
          },
        },
      },
    },
  },
};

export const updateItemSchema = {
  body: {
    type: "object",
    required: ["state", "description"], // Ces champs sont requis dans le corps de la requête
    properties: {
      state: {
        type: "string",
        enum: ["PENDING", "IN-PROGRESS", "DONE"],
      },
      description: { type: "string" },
      assignedTo: { type: "string" },
    },
  },
  params: {
    type: "object",
    required: ["id", "itemId"], // Les paramètres `id` et `itemId` sont requis
    properties: {
      id: { type: "integer" },
      itemId: { type: "string" }, // Les IDs des items peuvent être des chaînes
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
            state: {
              type: "string",
              enum: ["PENDING", "IN-PROGRESS", "DONE"],
            },
            description: { type: "string" },
            assignedTo: { type: "string" },
          },
        },
      },
    },
  },
};

export const deleteItemSchema = {
  params: {
    type: "object",
    required: ["id", "itemId"], // Les paramètres `id` et `itemId` sont requis
    properties: {
      id: { type: "integer" },
      itemId: { type: "string" }, // Les IDs des items peuvent être des chaînes
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
