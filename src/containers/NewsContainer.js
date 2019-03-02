import React, {Component} from 'react';
import NewsList from '../components/NewsList';

class NewsContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      storyList:[],
      stories:[]
    }
    this.loadStories = this.loadStories.bind(this);
    this.makestoriesArray = this.makestoriesArray.bind(this);
    this.getStory = this.getStory.bind(this);

  }

  componentDidMount(){
    this.loadStories('https://hacker-news.firebaseio.com/v0/topstories.json')

  }


  loadStories(url) {
    fetch(url)
    .then((res) => {return res.json()})
    .then((data) => { return this.makestoriesArray(data)})
    .then(storyId => this.getStory(storyId));

}


  makestoriesArray(){
    const topStoriesID = this.state.storyList.splice(19,20);
    return topStoriesID;
  }


  getStory(stories){
    const requests = stories.map(storyId => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`));
    Promise.all(requests)
      .then(responses => {
        for(let response of responses) {
        alert(`${response.url}: ${response.status}`);
      }
      return responses;
    })
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => this.setState({stories: data}))

}

  render(){

    return(
      <div>
        <h2>Latest Stories</h2>
        <NewsList stories={this.state.storyList}/>
      </div>
    );
  }
}

export default NewsContainer;
