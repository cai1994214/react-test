import React, {Component} from 'react'

class Demo extends Component {

    state = {
      user: '',
      content: '',
      comments: [
        
      ]
    }
  
    changeVal = e => {
      const {name, value} = e.target;
      this.setState({
        [name]: value
      })
    }
    
    addComment() {
      let {comments, user, content} = this.state;
  
      if (user.trim() === "" || content.trim() === ""){
        alert("请输入名称或者内容!")
        return
      }
      const newComments = [
        {
        id: comments.length+1,
        name: user,
        content: content
        },
        ...comments
      ]
      this.setState(
        {
          comments: newComments,
          user: '',
          content: ''
        }
      )
      
    }
  
    renderList() {
      return this.state.comments.length === 0 ? (
        <div className="no-comment">暂无评论,快去写品论吧~</div>
      ) : 
      (
        <ul>
          {this.state.comments.length && this.state.comments.map((item,index) => {
            return (
            <li key={item.id}>
              <h3>评论人: {item.name}</h3>
              <p>评论内容: {item.content}</p>
            </li> 
            )
          })} 
        </ul>
      )
    }
  
    render() {
      const { user, content,} = this.state
      return (
        <div className="app">
          <div>
            <input type="text" className="user" name="user" value={user} onChange={this.changeVal} placeholder="请输入评论人"/>
            <br />
            <textarea className="content" name="content" value={content}  onChange={this.changeVal} placeholder="请输入评论内容" cols="30" rows="10"></textarea>
            <br />
            <button onClick={() => this.addComment()}>发表评论</button>
          </div>
          {
           this.renderList()
          }
        </div>
      )
    }
  }

  export default Demo