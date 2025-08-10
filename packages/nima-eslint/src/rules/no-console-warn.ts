import { createRule } from "../utility/createRule.js";

export const noConsoleWarn = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow console.log in the codebase",
    },
    messages: {
      noConsole: "Avoid using console.warn",
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
          node.callee.property.name === "warn"
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
