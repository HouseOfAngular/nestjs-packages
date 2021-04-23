import {strings} from '@angular-devkit/core';
import {
    apply,
    chain,
    externalSchematic,
    mergeWith,
    move, noop,
    Rule,
    SchematicContext,
    template,
    Tree, url
} from '@angular-devkit/schematics';
import {DomainOptions} from "./schema";
import {addDomainToLintingRules} from "../rules";

  export default function (options: DomainOptions): Rule {
    const libFolder = strings.dasherize(options.name);

    const templateSource = apply(url('./files'), [
      template({}),
      move(`libs/${libFolder}/domain/src/lib`),
    ]);

    const appFolderName = strings.dasherize(options.name);
    const appPath = `apps/${appFolderName}/src/app`;
    const appModulePath = `${appPath}/app.module.ts`;

    if (options.ngrx && !options.addApp) {
      throw new Error(
          `The 'ngrx' option may only be used when the 'addApp' option is used.`
      )
    }

    return chain([
      externalSchematic('@nrwl/nest', 'lib', {
        name: 'domain',
        directory: options.name,
        tags: `domain:${options.name},type:domain`,
        prefix: options.name,
        publishable: options.type === 'publishable',
        buildable: options.type === 'buildable',
      }),
      addDomainToLintingRules(options.name),
      mergeWith(templateSource),
    ]);
  }
