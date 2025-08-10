import { createRule } from "../utility/createRule.js";

export const noConsoleLog = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow console.log in the codebase",
    },
    messages: {
      noConsole: "Avoid using console.log",
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
          node.callee.property.name === "log"
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
