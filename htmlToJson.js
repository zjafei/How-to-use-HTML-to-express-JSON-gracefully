/*
 * Created by Eric MA
 * Email: zjafei@gmail.com
 * Date: 2016/10/26
 * Time: 22:19
 */
var dom = document.getElementById('t');

/*
 function deepCopy(p, c) {

 var c = c || {};

 for (var i in p) {

 if (typeof p[i] === 'object') {

 c[i] = (p[i].constructor === Array) ? [] : {};

 deepCopy(p[i], c[i]);

 } else {

 c[i] = p[i];

 }
 }

 return c;
 };*/

function h2j($dom, o) {
    if ($dom[0].tagName === 'ol') {
        o = [];
    } else {
        o = {};
    }
    return o;
}
