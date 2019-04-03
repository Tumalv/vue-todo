// 后处理css
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer()  //例如加浏览器前缀，自动处理
    ]
}