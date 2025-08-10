import { createRule } from "../utility/createRule.js";

export const noConsoleError = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow console.log in the codebase",
    },
    messages: {
      noConsole: "Avoid using console.error",
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "console" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "error"
        ) {
          context.report({
            node,
            messageId: "noConsole",
          });
        }
      },
    };
  },
});
