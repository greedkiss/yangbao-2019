# install dependencies
npm install

# serve with hot reload at localhost:80
npm run dev

# build for production with minification
npm run build

# 后台权限表与标签树对应关系
会在util下的authorization.js文件里面注明，若以后需要粒度更小的权限判断，可参考此文件（本次修改只是对应了一张表和若干标签，比如说后台的权限表对应标签树里面的用户管理）

# 寻找有机
在node_modules里的line.js里我直接修改了配置的js文件,给canvasStyle对象添加了**top: '110px'**。 by liu