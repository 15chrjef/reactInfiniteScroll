import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import Spinner from 'react-spinkit';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: 0,
      isLoading: false,
      currentItems: [     
        'http://lorempixel.com/output/cats-q-c-640-480-9.jpg',
        'http://lorempixel.com/output/cats-q-c-640-480-10.jpg',
        'http://lorempixel.com/output/technics-q-c-640-480-10.jpg',
      ]
    }
    this.generateItem = this.generateItem.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
  }
  generateItem() {
    let { currentIndex } = this.state;
    var chooseCat = Math.floor(Math.random() * 2);
    var index = (currentIndex % 10) + 1;
    var newImage = (chooseCat) ?
      'http://lorempixel.com/output/cats-q-c-640-480-' + index + '.jpg':
      'http://lorempixel.com/output/technics-q-c-640-480-' + index + '.jpg';
    this.setState({ currentIndex: ++currentIndex })
    return newImage
  }
  loadMoreItems() {
    var itemsToAdd = 4;
    this.setState({ isLoading: true })
    var self = this;
    setTimeout(function() {
      let { currentItems } = this.state;
      for(var i = 0; i < itemsToAdd; i++) {
        currentItems.push(this.generateItem());
      }
      this.setState({
        currentItems: currentItems,
        isLoading: false
      })
    }.bind(self), 2000)
  }
  renderItems() {
    return this.state.currentItems.map((imageUrl, i) => {
      return (  
        <img 
          src={imageUrl}
          alt="Cats and Robots..."
          style={{ height: 480 }}
          key={i}
          className='infinite-scroll-example__list-item'
        />
      );
    })
  }
  renderWaypoint() {
    if(!this.state.isLoading) {
      return(
        <Waypoint
          onEnter={this.loadMoreItems}
        />
      )
    }
  }
  render() {
    return (
      <div style={styles.centeredContainer}>
        <p style={{fontSize: '40px', color: 'gray'}}>
          Items Loaded: {this.state.currentItems.length}
        </p>
        <div style={styles.centeredContainer}>
          {this.renderItems()}
          <div className='infinite-scroll-example__waypoint'>
            {this.renderWaypoint()}
          </div>
        </div>                 
        <Spinner 
          style={{padding: '30px'}}
          spinnerName="wandering-cubes"
        />
      </div>
    );
  }
}

const styles = {
  centeredContainer : {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center'
  }
}
export default App;
