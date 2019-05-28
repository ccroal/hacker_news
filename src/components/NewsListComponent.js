import React from 'react';

const NewsListComponent = (props) => {

function displayStoryUrl(){
  const storyUrls = props.stories.map((story) => {
    return <li><a href={story.url} target="blank">{story.title}</a> </li>
  })
  return storyUrls
}

    return(
      <div className="news-list-component-div">
        <ul>{displayStoryUrl()}</ul>
      </div>
    )

}

export default NewsListComponent;
