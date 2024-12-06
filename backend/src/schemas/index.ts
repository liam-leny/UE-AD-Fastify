export const listResponseSchema = {
  tags: ["Lists"],
  summary: "Get all lists",
  description: "Fetch all available lists with their respective items.",
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
  tags: ["Lists"],
  summary: "Add a new list",
  description: "Create a new list with a unique ID and name.",
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
      description: "The newly created list.",
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
  tags: ["Lists"],
  summary: "Update a list",
  description: "Modify the name of an existing list using its ID.",
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
      description: "The updated list details.",
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
  tags: ["Items"],
  summary: "Add a new item",
  description: "Add a new item to a specific list.",
  body: {
    type: "object",
    required: ["id", "description"],
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
      description: "The newly created item.",
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
  tags: ["Items"],
  summary: "Update an item",
  description: "Update the details of an item within a list.",
  body: {
    type: "object",
    required: ["state", "description"],
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
    required: ["id", "itemId"],
    properties: {
      id: { type: "integer" },
      itemId: { type: "string" },
    },
  },
  response: {
    200: {
      description: "The updated item details.",
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
  tags: ["Items"],
  summary: "Delete an item",
  description: "Remove an item from a list by its ID.",
  params: {
    type: "object",
    required: ["id", "itemId"],
    properties: {
      id: { type: "integer" },
      itemId: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Confirmation of the deleted item.",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const markListAsDoneSchema = {
  tags: ["Lists"],
  summary: "Mark a list as done",
  description: "Set all items within a list to a 'DONE' state.",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  },
  response: {
    200: {
      description: "The list with all items marked as done.",
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
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
                  state: { type: "string", enum: ["DONE"] },
                  description: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};
