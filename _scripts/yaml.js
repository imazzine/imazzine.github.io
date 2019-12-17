const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const graph_name = '_design';
const style_name = 'styles';
const edges_name = 'relations';
const vertices_name = 'components';
/**
 * Determine is specified directory exist or not.
 * @param {string} dirName
 * @return {boolean}
 */
function isDirectoryExist(dirName) {
    let exist;
    try {
        exist = fs.statSync(dirName).isDirectory();
    } catch(err) {
        exist = false;
    }
    return exist;
};

/**
 * Determine is specified file exist or not.
 * @param {string} fileName
 * @return {boolean}
 */
function isFileExist(fileName) {
    var exist;
    try {
        exist = fs.statSync(fileName).isFile();
    }catch(err){
        exist = false;
    }
    return exist;
}

/**
 * Get directories for specific path.
 * @param {string} pth
 * @return {Array.<string>}
 */
function getDirectories(pth) {
    const dirs = [];
    if(isDirectoryExist(pth)) {
        const list = fs.readdirSync(pth);
        list.forEach(function(item) {
            item = path.resolve(pth, `./${item}`);
            if(isDirectoryExist(item)) {
                dirs.push(item);
            }
        });
    }
    return dirs;
};

/**
 * Get directories for specific path.
 * @param {string} pth
 * @return {Array.<string>}
 */
function getFiles(pth) {
    const dirs = [];
    if(isDirectoryExist(pth)) {
        const list = fs.readdirSync(pth);
        list.forEach(function(item) {
            item = path.resolve(pth, `./${item}`);
            if(isFileExist(item)) {
                dirs.push(item);
            }
        });
    }
    return dirs;
};

/**
 * Return file name without ext.
 * @param {string} fullName
 * @return {string}
 */
function getFileNameNoExt(fullName) {
    const filename = path.basename(fullName);
    tmp = filename.split('.');
    tmp.pop();
    return tmp.join('.');
};

/**
 * Returns base item selector (class name).
 * @param {string} dir 
 * @param {boolean?} for_edges
 * @returns {string}
 */
function getCategoryName(dir, for_edges) {
    if (fs.lstatSync(dir).isFile()) {
        dir = path.dirname(dir);
    }
    if (!for_edges) {
        return dir.split(path.sep).pop();
    } else {
        const pieces = dir.split(path.sep);
        return `${pieces[pieces.length-2]}-${pieces[pieces.length-1]}`;
    }
}

/**
 * Returns vertice id by its file path.
 * @param {string} pth 
 * @returns {string}
 */
function getVerticeId(pth) {
    return `${getCategoryName(pth)}-${getFileNameNoExt(pth)}`;
}

/**
 * Returns object with graph vertices data/styles by graph path.
 * @param {string} graph_path
 * @returns {{vertices:Array, styles:Array}}
 */
function getVertices(graph_path) {
    const verts = [];
    const styles = [];
    getDirectories(path.resolve(graph_path, `./${vertices_name}`))
        .forEach((dir) => {
            getFiles(dir).forEach((file) => {
                let v = {
                    classes: [getCategoryName(dir)],
                    data: yaml.parse(fs.readFileSync(file, 'utf8'))
                };
                v.data.id = getVerticeId(file);
                verts.push(v);
            });
            let stylesDir = path.resolve(dir, `./${style_name}`);
            if (isDirectoryExist(stylesDir)) {
                getFiles(stylesDir).forEach((file) => {
                    let selector = getCategoryName(dir);
                    if (getFileNameNoExt(file) === 'defaults') {
                        selector = `node.${selector}`;
                    } else if (getFileNameNoExt(file) === 'selected') {
                        selector = `node.${selector}:selected`;
                    } else {
                        selector = `node#${
                            getCategoryName(dir)
                        }-${
                            getFileNameNoExt(file)
                        }.${
                            selector
                        }`;
                    }
                    styles.push({
                        selector: selector,
                        style: yaml.parse(fs.readFileSync(file, 'utf8')) || {}
                    });
                });
            }
        });
    return {
        vertices: verts,
        styles: styles
    };
}

/**
 * Returns object with graph edges data/styles by graph path.
 * @param {string} graph_path
 * @returns {{vertices:Array, styles:Array}}
 */
function getEdges(graph_path) {
    const edges = [];
    const styles = [];
    getDirectories(path.resolve(graph_path, `./${edges_name}`))
        .forEach((dir) => {
            let source = getCategoryName(dir);
            getDirectories(dir).forEach((sub) => {
                let target = getCategoryName(sub);
                getFiles(sub).forEach((file) => {
                    if (!~getFileNameNoExt(file).indexOf('-')
                        && getFileNameNoExt(file).split('-').length !== 2) {
                        throw new TypeError(`File name doesn't mucth to file name convention: ${file}`);
                    }
                    let names = getFileNameNoExt(file).split('-');
                    let sourceFile = path.resolve(graph_path, `./${vertices_name}/${source}/${names[0]}.yaml`);
                    let targetFile = path.resolve(graph_path, `./${vertices_name}/${target}/${names[1]}.yaml`);
                    if (!isFileExist(sourceFile) || !isFileExist(targetFile)) {
                        throw new TypeError(`Missed components for relation: ${file}`);
                    } else {
                        let id = `${getVerticeId(sourceFile)}_${getVerticeId(targetFile)}`;
                        let e = {
                            classes: [`${source}-${target}`],
                            data: yaml.parse(fs.readFileSync(file, 'utf8')) || {}
                        };
                        e.data.id = id;
                        e.data.source = getVerticeId(sourceFile);
                        e.data.target = getVerticeId(targetFile);
                        edges.push(e);
                    }
                });
                let stylesDir = path.resolve(sub, `./${style_name}`);
                if (isDirectoryExist(stylesDir)) {
                    getFiles(stylesDir).forEach((file) => {
                        let selector = `${source}-${target}`;
                        if (getFileNameNoExt(file) === 'defaults') {
                            selector = `edge.${selector}`;
                        } else if (getFileNameNoExt(file) === 'selected') {
                            selector = `edge.${selector}:selected`;
                        } else {
                            if (!~getFileNameNoExt(file).indexOf('-')
                                && getFileNameNoExt(file).split('-').length !== 2) {
                                throw new TypeError(`File name doesn't mucth to file name convention: ${file}`);
                            }
                            let id;
                            let names = getFileNameNoExt(file).split('-');
                            let sourceFile = path.resolve(
                                __dirname,
                                `../${graph_name}/${vertices_name}/${source}/${names[0]}.yaml`
                            );
                            let targetFile = path.resolve(
                                __dirname,
                                `../${graph_name}/${vertices_name}/${target}/${names[1]}.yaml`
                            );
                            if (!isFileExist(sourceFile) || !isFileExist(targetFile)) {
                                throw new TypeError(`Missed components for relation: ${file}`);
                            } else {
                                id = `${getVerticeId(sourceFile)}_${getVerticeId(targetFile)}`;
                            }
                            selector = `edge#${id}.${selector}`;
                        }
                        styles.push({
                            selector: selector,
                            style: yaml.parse(fs.readFileSync(file, 'utf8')) || {}
                        });
                    });
                }
            });
        });
    return {
        edges: edges,
        styles: styles
    };
}

getDirectories(path.resolve(__dirname, `../${graph_name}`)).forEach((graph) => {
    const name = graph.split(path.sep).pop();
    if (!isDirectoryExist(path.resolve(__dirname, `../public/design/${name}`))) {
        fs.mkdirSync(path.resolve(__dirname, `../public/design/${name}`));
    }
    fs.writeFileSync(
        path.resolve(__dirname, `../public/design/${name}/data.json`),
        JSON.stringify(getVertices(graph).vertices.concat(getEdges(graph).edges), ' ', 2)
    );
    fs.writeFileSync(
        path.resolve(__dirname, `../public/design/${name}/styles.json`),
        JSON.stringify(getVertices(graph).styles.concat(getEdges(graph).styles), ' ', 2)
    );
});
