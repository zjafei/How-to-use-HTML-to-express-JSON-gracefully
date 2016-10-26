/*
 * Created by Eric MA
 * Email: zjafei@gmail.com
 * Date: 2016/10/26
 * Time: 22:19
 */
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

function h2j($dom) {
    var o,
        $child = $dom.children();
    if ($dom[0].tagName.toUpperCase() === 'OL') {
        o = [];
        $child.each(function (i, e) {
            var $e = $(e);
            var value = $e.children();
            if (value.length === 1) {
                o[i] = h2j(value);
            } else {
                o[i] = $e.attr('data-value') || $e.text();//有 data-value 就忽略 text
            }
        });
    } else {
        o = {};

        $child.each(function (i, e) {
            var $e = $(e);
            //todo 查找每一个 data-xxx 和 子元素的 key-name
        });
    }
    return o;
}
