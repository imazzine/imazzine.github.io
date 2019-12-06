const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const graph_name = '_design';
const style_name = '_styles';
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
    let tmp = fullName.split(path.sep);
    tmp = tmp[tmp.length-1].split('.');
    tmp.pop();
    return tmp.join('-');
};

function getCategoryName(dir, for_edges) {
    let tmp = dir.split(
        graph_name +
        path.sep +
        (for_edges?edges_name:vertices_name) +
        path.sep
    );
    tmp = for_edges
        ? tmp[tmp.length-1].split(path.sep)[
            tmp[tmp.length-1].split(path.sep).length - 1]
        : tmp[tmp.length-1].split(path.sep);
    return for_edges
        ? tmp
        : tmp.join('-');
}

function getVerticeId(pth) {
    return getFileNameNoExt(getCategoryName(pth));
}

function getVertices() {
    const verts = [];
    const styles = [];
    getDirectories(path.resolve(__dirname, `../${graph_name}/${vertices_name}`))
        .forEach((dir) => {
            getFiles(dir).forEach((file) => {
                const id = getVerticeId(file);
                let v = {
                    classes: [getCategoryName(dir)],
                    data: yaml.parse(fs.readFileSync(file, 'utf8'))
                };
                v.data.id = getVerticeId(file);
                verts.push(v);
            });
            let stylesDir = path.resolve(
                __dirname,
                `../${style_name}/${vertices_name}/${
                    dir.split(path.sep)[dir.split(path.sep).length-1]
                }`
            );
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

function getEdges() {
    const edges = [];
    const styles = [];
    getDirectories(path.resolve(__dirname, `../${graph_name}/${edges_name}`))
        .forEach((dir) => {
            let source = getCategoryName(dir, true);
            getDirectories(dir).forEach((sub) => {
                let target = getCategoryName(sub, true);
                getFiles(sub).forEach((file) => {
                    let names = getFileNameNoExt(file).split('-');
                    let sourceFile = path.resolve(
                        __dirname,
                        `../${graph_name}/${vertices_name}/${source}/${names[0]}.yaml`
                    );
                    let targetFile = path.resolve(
                        __dirname,
                        `../${graph_name}/${vertices_name}/${target}/${names[1]}.yaml`
                    );
                    if (isFileExist(sourceFile) && isFileExist(targetFile)) {
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
                let stylesDir = path.resolve(
                    __dirname, `../${style_name}/${edges_name}/${source}/${target}`
                );
                if (isDirectoryExist(stylesDir)) {
                    getFiles(stylesDir).forEach((file) => {
                        let selector = `${source}-${target}`;
                        if (getFileNameNoExt(file) === 'defaults') {
                            selector = `edge.${selector}`;
                        } else if (getFileNameNoExt(file) === 'selected') {
                            selector = `edge.${selector}:selected`;
                        } else {
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
                            if (isFileExist(sourceFile) && isFileExist(targetFile)) {
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
fs.writeFileSync(
    path.resolve(__dirname, '../public/json/graph.json'),
    JSON.stringify(getVertices().vertices.concat(getEdges().edges), ' ', 2)
);
fs.writeFileSync(
    path.resolve(__dirname, '../public/json/styles.json'),
    JSON.stringify(getVertices().styles.concat(getEdges().styles), ' ', 2)
);