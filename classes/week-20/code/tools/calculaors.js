export async function calculator({ operation, a, b }) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both a and b must be numbers");
  }
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      throw new Error("Invalid operation");
  }
}

export const calculateTool = {
  type: "function",
  function: {
    name: "calculator",
    description:
      "Performs basic arithmetic operations. Usage: calculator({ operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number })",
    func: calculator,
    parameters: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["add", "subtract", "multiply", "divide"],
        },
        a: { type: "number" },
        b: { type: "number" },
      },
      required: ["operation", "a", "b"],
    },
  },
};
