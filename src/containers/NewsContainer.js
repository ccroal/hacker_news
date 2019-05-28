import React, {Component} from 'react';
import NewsListComponent from '../components/NewsListComponent';

class NewsContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      storyList:[],
      stories:[]
    }
    this.loadStories = this.loadStories.bind(this);
    this.makestoriesArray = this.makestoriesArray.bind(this);
    this.getStoryInfo = this.getStoryInfo.bind(this);

  }

  componentDidMount(){
    this.loadStories('https://hacker-news.firebaseio.com/v0/topstories.json')
  }


  loadStories(url) {
    fetch(url)
    .then((res) => {return res.json()})
    .then((data) => { return this.makestoriesArray(data)})
     .then((storyIdArray) => this.getStoryInfo(storyIdArray))

}


  makestoriesArray(data){
    const topStoriesID = data.splice(0,20);
    this.setState({storyList: topStoriesID})
    return topStoriesID;
  }

  getStoryInfo(stories){
    const requests = stories.map(storyId => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`))
    Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => this.setState({stories: data}))
    }



  render(){

    return(
      <div>
        <h2>Latest Stories</h2>
        <NewsListComponent stories={this.state.stories}/>
      </div>
    );
  }
}

export default NewsContainer;
