import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utility/createRule.js";
import type { Scope } from "@typescript-eslint/scope-manager";

export const noHandlerSuffix = createRule({
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "Suggests to use handleFn instead of fnHandler",
    },
    messages: {
      badHandleName:
        "You shouldn't use handler, please use the handle prefix instead ({{ fnWithGoodName }})",
    },
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    function generateUniqueName(base: string, scope: Scope): string {
      let candidate = base;
      let index = 2;

      const existingNames = new Set(scope.variables.map((v) => v.name));

      while (existingNames.has(candidate)) {
        candidate = `${base}${index++}`;
      }

      return candidate;
    }

    function checkName(node: TSESTree.Identifier, name?: string) {
      if (name?.toLowerCase().endsWith("handler")) {
        const base = name.slice(0, -7);
        const suggestedBase = `handle${base[0]?.toUpperCase() + base.slice(1)}`;

        const sourceCode = context.sourceCode;
        const scope = sourceCode.getScope
          ? sourceCode.getScope(node)
          : context.getScope();

        const uniqueName = generateUniqueName(suggestedBase, scope);
        const variable = scope.set.get(name);

        context.report({
          node,
          messageId: "badHandleName",
          data: {
            fnWithGoodName: uniqueName,
          },
          fix(fixer) {
            const fixes = [fixer.replaceText(node, uniqueName)];

            if (variable) {
              for (const ref of variable.references) {
                if (ref.identifier !== node) {
                  fixes.push(fixer.replaceText(ref.identifier, uniqueName));
                }
              }
            }

            return fixes;
          },
        });
      }
    }

    return {
      FunctionDeclaration(node) {
        if (node.id) {
          checkName(node.id, node.id?.name);
        }
      },
      ArrowFunctionExpression(node) {
        const parent = node.parent;
        if (
          parent?.type === "VariableDeclarator" &&
          parent.id.type === "Identifier"
        ) {
          checkName(parent.id, parent.id.name);
        }
      },
      FunctionExpression(node) {
        const parent = node.parent;
        if (node.id) {
          checkName(node.id, node.id.name);
        }

        if (
          parent?.type === "VariableDeclarator" &&
          parent.id.type === "Identifier"
        ) {
          checkName(parent.id, parent.id.name);
        }
      },
    };
  },
});
