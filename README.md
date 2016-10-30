#如何优雅的用HTML来表示JSON
----
## 键值对的表示方法
> json

    title:"你好"

>html

1.值在标签内

	<div key-name="title">你好</div>
2.值作为标签属性的值

	<div data-title="你好"></div>
*具体用什么形式主要看值是否要被搜索引擎抓取*
		
## 对大部分键值对用什么标签来包裹不做规定
> json

    title:"你好"

> html

1.用 div 标签来包裹

	<div key-name="title">你好</div>

2.用 h1 标签来包裹

	<h1 key-name="title">你好</h1>

*具体用什么标签主要看值对seo的权重*

##几个特殊的键值对 link、img、video等一些有 src 属性的标签
### img 键值对表示图片
> 如：

    img:"/1.jpg"

>html

	<img src='/1.jpg' alt="图片名称"/>
		
### video 键值对表示图片
> json

    video:"/movie.ogg"

>html

	<video src="movie.ogg" controls="controls">
		您的浏览器不支持 video 标签。
	</video>
		
## 对象的表示
> json

    {
    	title:'新闻',
    	description:'新闻内容',
    	count:'58'
    }

>html

1.

	<div>
		<div key-name="title">新闻</div>
		<div key-name="description">新闻内容</div>
		<div key-name="count">58</div>
	</div>
2.

	<div>
		<div key-name="title">新闻</div>
		<div key-name="description">新闻内容</div>
		<div data-count="58"></div>
	</div>
3.

	<div data-count="58">
		<div key-name="title">新闻</div>
		<div key-name="description">新闻内容</div>
	</div>

**对象属相的数量 = 父级标签的属性数量 + 子级标签数量** 


##含有 link 属性的对象的表示
> json

    {
    	title:'新闻',
    	link:{
    		href:'/1.html'
    	},
    	description:'新闻内容',
    	count:'58'
    }

> html

1.

	<a href="/1.html">
		<div key-name="title">新闻</div>
		<div key-name="description">新闻内容</div>
		<div key-name="count">58</div>
	</a>
2.

	<a href="/1.html">
		<div key-name="title">新闻</div>
		<div key-name="description">新闻内容</div>
		<div data-count="58"></div>
	</a>
3.

	<a href="/1.html" data-count="58">
		<div key-name="title">新闻</div>
		<div key-name="description">新闻内容</div>
	</a>

**但是如果对象有了link属性，那么父级标签必须是 a 标签** 

## 数组的表示
> json

    [
    	'你好',
    	'谢谢',
    	'再见'
    ]

> html

1.

	<ol>
        <li>你好</li>
        <li>谢谢</li>
        <li>再见</li>
    </ol>

2.

	<ol>
        <li data-key-value="你好"></li>
        <li>谢谢</li>
        <li>再见</li>
    </ol>

**数组必须使用有序列表 ol 来表示** 

## 对象与数组的相互嵌套
### 对象的属性是一个数组
> json
 
    {
        name:'eric',
        age:20,
        interest:['lol','dota','basketball']
    }

> html

    <div>
        <div key-name="name">eric</div>
        <div key-name="age">20</div>
        <div key-name="interest">
        	<ol>
                <li>你好</li>
                <li>谢谢</li>
                <li>再见</li>
            </ol>
        </div>
    </div>
### 对象的属性是一个对象
> json

    {
        name:'eric',
        age:20,
        friend:{    
            name:'bob',
            age:20, 
        }
    }
> html

    <div>
        <div key-name="name">eric</div>
        <div key-name="age">20</div>
        <div key-name="interest">
        	<div>
                <div key-name="name">eric</div>
                <div key-name="age">20</div>
            </div>
        </div>
    </div>
### 数组的元素是个对象
> json

    [
        {    
            name:'eric',
            age:20, 
        },
        {    
            name:'bob',
            age:20, 
        }
    ]
> html

    <ol>
        <li>
        	<div>
                <div key-name="name">eric</div>
                <div key-name="age">20</div>
            </div>
        </li>
        <li>
        	<div data-name="eric" data-age=20></div>
        </li>
    </ol>
### 数组的元素是个数组
> json

    [
        [
            'lol',
            'dota'
        ],
        [
            'eric',
            'bob'
        ]
    ]
> html

    <ol>
        <li>
        	<ol>
                <li>lol</li>
                <li>dota</li>
            </ol>
        </li>
        <li>
        	<ol>
                <li>eric</li>
                <li>bob</li>
            </ol>
        </li>
    </ol>

## 数据模型的载入机制
*就是 jsonHtml > json > html的过程*

> json的机构大概应该是这样的

    {
           head:{
                model:{
                    
                },
                
           }
    }