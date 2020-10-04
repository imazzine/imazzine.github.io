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

/**
 * Returns all files from specified path (recurcively).
 */
function getFilesRecursively(dirName: string): Array<string> {
    let files: Array<string> = [];
    const list: Array<string> = fs.readdirSync(dirName);
    list.forEach((item: string) => {
        const fullpath: string = path.resolve(dirName, item);
        if (fs.existsSync(fullpath)
            && fs.lstatSync(fullpath).isDirectory()) {
            files = files.concat(getFilesRecursively(fullpath));
        } else if (fs.existsSync(fullpath)
            && fs.lstatSync(fullpath).isFile()) {
            files.push(fullpath);
        }
    });
    return files;
}

export default getFilesRecursively;
