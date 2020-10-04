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

import getUid from '../../helpers/getUid'
import getCytoscape from '../../helpers/getCytoscape'

interface EnsureNodeParams {
  id: string;
  name: string;
  label: string;
  details: Object;
  parent?: cytoscape.CollectionReturnValue
}

function ensureNode(params: EnsureNodeParams): cytoscape.CollectionReturnValue[] {
  const cy: cytoscape.Core = getCytoscape();
  let node: cytoscape.CollectionReturnValue = cy.getElementById(params.id);
  if (node.length == 0) {
    node = cy.add({
      group: 'nodes',
      classes: 'composition',
      data: {
        id: params.id,
        name: params.name,
        label: params.label,
        cluster: {
            id: params.parent ? params.parent.data('cluster').host : getUid(),
            host: getUid(),
        },
        details: params.details
      },
    });
  }
  if (params.parent !== undefined) {
    let edge: cytoscape.CollectionReturnValue =
      cy.getElementById(`${params.parent.id()} -> ${node.id()}`);
    if (edge.length == 0) {
      edge = cy.add({
        group: 'edges',
        classes: 'composition',
        data: {
            id: `${params.parent.id()} -> ${node.id()}`,
            source: params.parent.id(),
            target: node.id(),
        },
      });
    }
    return [node, edge];
  }
  return [node];
}

export default ensureNode;