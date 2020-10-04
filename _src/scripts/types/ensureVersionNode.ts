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
import getEnvironment from '../../helpers/getEnvironment';
import ensurePackageNode from './ensurePackageNode';
import ensureNode from './ensureNode';

function ensureVersionNode(file: string): cytoscape.CollectionReturnValue[] {
  const env: NodeJS.ProcessEnv = getEnvironment();
  const [lang, pack, ver] = file.split(env.zz_types + path.sep)[1].split(path.sep);
  const [node, edge] = ensureNode({
    id: `${env.zz_scope}/types/${lang}/${pack}/${ver}`,
    name: ver,
    label: ver,
    details: {},
    parent: ensurePackageNode(file)[0]
  });
  node.addClass('composition__group');
  return [node, edge];
}
export default ensureVersionNode;
