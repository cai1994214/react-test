import React from 'react'
import { Button } from 'antd';
import axios from 'axios'
export default function Home() {

    const editInfo = () => {
        //json server 查询
        // axios.get('http://localhost:8000/posts?id=2').then(res => {
        //     console.log(res.data)
        // });


        //json server 新增
        // axios.post('http://localhost:8000/posts', {
        //     title: '新增的',
        //     author: 'xiaoming'
        // }).then(res => {
        //     console.log(res.data)
        // });

        // 修改 全部替换对象
        // axios.put('http://localhost:8000/posts/3', {
        //     title: '修改',
        // }).then(res => {
        //     console.log(res.data)
        // });

        //修改 只会修改指定的属性 局部更新
        // axios.patch('http://localhost:8000/posts/3', {
        //     title: '修改1',
        // }).then(res => {
        //     console.log(res.data)
        // });

        //删除 连带着表关联数据也删除
        // axios.delete('http://localhost:8000/posts/2').then(res => {
        //     console.log(res.data)
        // })

        // _embed 表关联 将post数据和comments数据 合并关联 向下关联
        // axios.get('http://localhost:8000/posts?_embed=comments').then(res => {
        //     console.log(res.data)
        // })

        //_expand 向上关联 注意是post不是posts 
        // axios.get('http://localhost:8000/comments?_expand=post').then(res => {
        //     console.log(res.data)
        // })
    }
    return (
        <div>
            <Button type="primary" onClick={editInfo}>Button</Button>
        </div>
    )
}
