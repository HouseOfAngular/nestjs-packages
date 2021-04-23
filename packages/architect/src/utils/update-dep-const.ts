
import { Tree, SchematicContext } from '@angular-devkit/schematics';
import { checkRuleExists } from './check-rule-exists';

export function updateDepConst(
    host: Tree,
    context: SchematicContext,
    update: (depConst: Array<object>) => void
) {
    let filePath = 'tslint.json';
    let rule = 'nx-enforce-module-boundaries';

    if (!host.exists('tslint.json')) {
        if (host.exists('.eslintrc.json')) {
            filePath = '.eslintrc.json';
            rule = '@nrwl/nx/enforce-module-boundaries';
        } else if (host.exists('.eslintrc')) {
            filePath = '.eslintrc';
            rule = '@nrwl/nx/enforce-module-boundaries';
        } else {
            context.logger.info(
                'Cannot add linting rules: linting config file does not exist'
            );
            return;
        }
    }

    const fileContent = host.read(filePath)
    if(!fileContent) {
        throw new Error('Cannot read ' + filePath)
    }
    const text = fileContent.toString();
    let rules = JSON.parse(text);

    if (rules['overrides']) {
        const overrides = rules['overrides'];
        rules = overrides.find((e: any) => e.rules && e.rules['@nrwl/nx/enforce-module-boundaries']);
    }

    if (!checkRuleExists(filePath, rule, rules, context)) return;

    const depConst = rules['rules'][rule][1]['depConstraints'] as Array<object>;
    update(depConst);

    const newText = JSON.stringify(rules, undefined, 2);
    host.overwrite(filePath, newText);
}
