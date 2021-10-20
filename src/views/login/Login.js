import React from "react";
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss'
import Particles from 'react-particles-js';
import axios from "axios";
export default function Login(props) {

    console.log(props);

    const onFinish = (values) => {
        axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
            console.log(res.data,'res')
            if(res.data.length === 0 ){
                message.error('用户名或密码不匹配')
            }else{
                localStorage.setItem('token', JSON.stringify(res.data[0]));
                props.history.push('/')
            }
        })
      };

	return (
		<div style={{ background: "rgba(35,39,65)", height: "100%",overflow: 'hidden' }}>
           <Particles height={document.documentElement.clientHeight}
           params={
            {
                "background": {
                  "color": {
                    "value": "#123035"
                  },
                  "position": "50% 50%",
                  "repeat": "no-repeat",
                  "size": "cover"
                },
                "fullScreen": {
                  "enable": true,
                  "zIndex": 1
                },
                "interactivity": {
                  "events": {
                    "onClick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "onHover": {
                      "enable": true,
                      "mode": "bubble",
                      "parallax": {
                        "force": 60
                      }
                    }
                  },
                  "modes": {
                    "bubble": {
                      "distance": 400,
                      "duration": 2,
                      "opacity": 1,
                      "size": 40
                    },
                    "grab": {
                      "distance": 400
                    }
                  }
                },
                "particles": {
                  "color": {
                    "value": "#ffffff"
                  },
                  "links": {
                    "color": {
                      "value": "#323031"
                    },
                    "distance": 150,
                    "opacity": 0.4
                  },
                  "move": {
                    "attract": {
                      "rotate": {
                        "x": 600,
                        "y": 1200
                      }
                    },
                    "enable": true,
                    "outModes": {
                      "default": "bounce",
                      "bottom": "bounce",
                      "left": "bounce",
                      "right": "bounce",
                      "top": "bounce"
                    },
                    "speed": 6
                  },
                  "number": {
                    "density": {
                      "enable": true
                    },
                    "value": 170
                  },
                  "opacity": {
                    "animation": {
                      "speed": 1,
                      "minimumValue": 0.1
                    }
                  },
                  "size": {
                    "value": 16,
                    "animation": {
                      "speed": 40,
                      "minimumValue": 0.1
                    }
                  },
                  "stroke": {
                    "color": {
                      "value": "#000000",
                      "animation": {
                        "h": {
                          "count": 0,
                          "enable": false,
                          "offset": 0,
                          "speed": 1,
                          "sync": true
                        },
                        "s": {
                          "count": 0,
                          "enable": false,
                          "offset": 0,
                          "speed": 1,
                          "sync": true
                        },
                        "l": {
                          "count": 0,
                          "enable": false,
                          "offset": 0,
                          "speed": 1,
                          "sync": true
                        }
                      }
                    }
                  }
                }
              }
           }/>
			<Form
				name="normal_login"
				className="login-form"
				onFinish={onFinish}
			>
                 <div className="loginTitle">全球新闻发布管理系统</div>
				<Form.Item
					name="username"
					rules={[{ required: true, message: "请输入用户名!" }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "请输入密码!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
