import React, { Component } from 'react';
import { TweetBody } from './components/tweet.js'
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      users:
      [ 
      ]
    }
    this.refreshpage = this.refreshpage.bind(this)
    this.userinfo = this.userinfo.bind(this)
  }

  componentWillMount() {
    this.userinfo()
  }

  userinfo() {
    fetch('https://randomuser.me/api/')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(info => {
      this.setState({
        users:[
          {
            name: info.results[0].name,
            image: info.results[0].picture.medium,
            tweet: info.results[0].email,
          },
          ...this.state.users,
        ]
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <PullToRefresh
      pullDownContent={<PullDownContent />}
      releaseContent={<ReleaseContent />}
      refreshContent={<RefreshContent />}
      pullDownThreshold={2}
      onRefresh={this.refreshpage}
      triggerHeight={50}
      backgroundColor='black'>
      <div className="main-body">
        {[...this.state.users].map((user, index) => {
          let name = `${user.name.first} ${user.name.last}`
          let handle = `@${user.name.first}${user.name.last}`
          let image = user.image
          let tweet = user.tweet
          console.log(image)
          return(
            <TweetBody 
              key={index}
              name={name}
              handle={handle}
              tweet={tweet}
              image={image} />
          )
        })}      
      </div>
      </PullToRefresh>
    );
  }
}

export default App;
