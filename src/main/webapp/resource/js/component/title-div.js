var Title ={
    template:'<div style="margin-top: 20px;height: 35px;line-height: 35px;padding-left: 1%;background: white;">\n' +
    '        <span class="layui-breadcrumb">\n' +
    '          <a v-for="(item,index) in items" href="">\n' +
    '              <label v-if="item.last"><cite>{{ item.key}}</cite></label>\n' +
    '              <label v-else>{{ item.key}}</label>\n' +
    '          </a>\n' +
    '        </span>\n' +
    '    </div>',
    props: {
        items: Array
    }
}