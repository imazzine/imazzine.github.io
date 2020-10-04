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

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import getEnvironment from '../../helpers/getEnvironment';
import ensureClassNode from './ensureClassNode';
import ensureNode from './ensureNode';

function processClassFile(file: string): cytoscape.CollectionReturnValue[] | undefined {
  const env: NodeJS.ProcessEnv = getEnvironment();
  const [lang, pack, ver, name, filename] = file.split(env.zz_types + path.sep)[1].split(path.sep);
  if (filename !== '__class.yml') {
    const propName: string = filename.split('.yml')[0];
    const propData: any = yaml.load(fs.readFileSync(file, 'utf8'));
    const [node, edge] = ensureNode({
      id: `${env.zz_scope}/types/${lang}/${pack}/${ver}/${name}/${propName}`,
      name: propName,
      label: propName,
      details: propData,
      parent: ensureClassNode(file)[0],
    });
    node.addClass('composition__file');
    return [node, edge];
  }
}
export default processClassFile;
