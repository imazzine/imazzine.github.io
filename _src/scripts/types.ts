// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

import * as path from 'path';
import * as fs from 'fs';
import getEnvironment from './../helpers/getEnvironment';
import getFilesRecursively from './../helpers/getFilesRecursively';
import getCytoscape from './../helpers/getCytoscape';
import isClass from './types/isClass';
import isInterface from './types/isInterface';
import processConstantsFile from './types/processConstantsFile';
import processEnumsFile from './types/processEnumsFile';
import processInternalsFile from './types/processInternalsFile';
import processExportsFile from './types/processExportsFile';
import processDependenciesFile from './types/processDependenciesFile';
import processClassFile from './types/processClassFile';

const cy: cytoscape.Core = getCytoscape();
const env: NodeJS.ProcessEnv = getEnvironment();
const filePath: string = path.resolve(env.zz_root, `./public/graph/data.json`);

try {
  getFilesRecursively(env.zz_types).forEach((file: string) => {
    switch (file.split(env.zz_types + path.sep)[1].split(path.sep)[3]) {
      case 'constants':
        processConstantsFile(file);
        break;
      case 'enums':
        processEnumsFile(file);
        break;
      case 'internals':
        processInternalsFile(file);
        break;
      case 'exports':
        processExportsFile(file);
        break;
      case 'dependencies':
        processDependenciesFile(file);
        break;
      default:
        if (isClass(file)) {
          processClassFile(file);
        } else if (isInterface(file)) {
          console.log('interface');
        } else {
          console.log('object');
        }
        break;
    }
    // const doc: any = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    // doc.path = file.split(env.zz_types + path.sep)[1].split(path.sep);
  });
} catch (e) {
  console.error(e);
} finally {
  fs.writeFileSync(filePath, JSON.stringify(cy.json()['elements'], undefined, 2));
}
