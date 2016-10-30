/*
 * Created by Eric MA
 * Email: zjafei@gmail.com
 * Date: 2016/10/26
 * Time: 22:19
 */
var h2j = {
    pageJson: {},
    modelHtml: {},
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    regAttrName: function (str) {//匹配特定属性名称
        return /^data-([a-z]+\-)*[a-z]+$/.test(str);
    },
    getModelName: function (str) {
        return this.toHump(this.trim(str));
    },
    toHump: function (str) {
        var r = /-(\w)/g;
        return str.replace(r, function (x) {
            return x.slice(1).toUpperCase();
        });
    },
    toHyphen: function (str) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    },
    getKeyNameValue: function (str) {
        var re = /\n/g;
        var h = this.trim(str.split('<')[0].replace(re, ""));
        var e = this.trim(str.split('>').pop().replace(re, ""));
        return h + e;
    },
    // getFunctionName:function(){
    //     return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
    // },
    createHtml: function (ary) {
        var myThis = this;
        $.each(ary, function (i, e) {
            var f = eval(e);
            if (typeof f === 'function') {
                if (typeof myThis.pageJson[e] === 'object') {
                    myThis.modelHtml[e] = f(myThis.pageJson[e]);
                } else {
                    console.log('the module ' + myThis.toHump(e) + ' does not exist!');
                }
            } else if ($.isArray(e)) {
                f = eval(e[0]);
                if (typeof f === 'function') {
                    var n = myThis.toHump(e[1]);
                    if (typeof myThis.pageJson[n] === 'object') {
                        myThis.modelHtml[n] = f(myThis.pageJson[n]);
                    } else {
                        console.log('the module ' + e[1] + ' does not exist!');
                    }
                } else {
                    console.log(e[0] + ' is not a function!');
                }
            } else {
                console.log('type of data must be array or string!');
            }
        });
    },
    rendering: function (ary, callback) {
        var cb = callback || function () {
            };
        this.createHtml(ary);
        cb(this.modelHtml);
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
    },
    processingModelDom: function () {
        var myThis = this,
            $dom = $('[model]');
        $dom.each(function (i, e) {
            var $e = $(e);
            var n = myThis.getModelName($e.attr('model'));
            if (n) {
                //var a = myThis.getModelName($e.attr('model'));
                myThis.pageJson[myThis.getModelName($e.attr('model'))] = myThis.getJson($e);
                $e.remove();
                $e = null;
                // console.log($e.text());
                //myThis.pageHtmlFrame[a] = $('<div id="' + n + '"></div>');
            }
        });
    }
};

h2j.processingModelDom();
