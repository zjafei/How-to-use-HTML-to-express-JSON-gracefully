/*
 * Created by Eric MA
 * Email: zjafei@gmail.com
 * Date: 2016/10/26
 * Time: 22:19
 */
var h2j = {
    regAttrName: function (str) {//匹配特定属性名称
        return /^data-([a-z]+\-)*[a-z]+$/.test(str);
    },
    toHump: function (str) {
        var r = /-(\w)/g;
        return str.replace(r, function (x) {
            return x.slice(1).toUpperCase();
        });
    },
    getKeyNameValue: function (str) {
        var re = /\n/g, lr = /(^\s*)|(\s*$)/g;
        var h = str.split('<')[0].replace(re, "").replace(lr, "");
        var e = str.split('>').pop().replace(re, "").replace(lr, "");
        return h + e;
    },
    getJson: function ($dom) {//获取html转变过来的json
        var o,
            myThis = this,
            $child = $dom.children();
        if ($dom[0].tagName.toUpperCase() === 'OL') {
            o = [];
            $child.each(function (i, e) {
                var $e = $(e);
                var value = $e.children();
                if (value.length === 1) {
                    o[i] = myThis.getJson(value);
                } else {
                    o[i] = $e.attr('data-value') || $e.text();//有 data-value 就忽略 text
                }
            });
        } else {
            o = {};
            var dom = $dom[0];
            for (var i = 0; i < dom.attributes.length; i++) {
                if (this.regAttrName(dom.attributes[i].name)) {
                    o[this.toHump(dom.attributes[i].name.replace('data-', ''))] = dom.attributes[i].value;
                }
            }
            var link = $dom.attr('href');
            if (link) {//遇到a标签
                o.link = link;
            }
            var src = $dom.attr('src');
            if (src) {//遇到有src属性的标签
                o[dom.tagName.toLowerCase()] = src;
            }

            $child.each(function (i, e) {
                var $e = $(e);
                var value = $e.children();
                if (value.length === 1) {
                    o[$e.attr('key-name')] = myThis.getJson(value);
                    return;
                }

                if (myThis.regAttrName(e.attributes[0].name)) {
                    o[myThis.toHump(e.attributes[0].name.replace('data-', ''))] = e.attributes[0].value;
                    return;
                }

                var keyName = $e.attr('key-name');
                if (keyName) {
                    o[keyName] = $e.text();
                }

            });
            var keyName = $dom.attr('key-name');
            if (keyName) {
                if ($child.length !== 0) {
                    o[keyName] = this.getKeyNameValue($dom.html());
                } else {
                    o[keyName] = $dom.text();
                }
            }
        }
        return o;
    }
};
