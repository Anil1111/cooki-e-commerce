import React from 'react'
import $ from 'jquery';

export default class ProductSlide extends React.Component {
    constructor(props) {
        super(props);
        // the containerRef of our items
        this.containerRef = React.createRef();
        // initialize our state
        this.state = {currSeek: 0, currItem: 0};
        // bind our event handlers
        this.SlideForward = this.SlideForward.bind(this);
        this.SlideBackward = this.SlideBackward.bind(this);
        this.ToggleLights = this.ToggleLights.bind(this);
        this.fadeInDescriptionText = this.fadeInDescriptionText.bind(this);
        // this.ToggleCaption = this.ToggleCaption.bind(this);
    }

    // I am aware that this thing is deprecated. But, I am out of ideas
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.products !== nextProps.products) {
            // the number of items in our collection
            this.itemCount = nextProps.products.length;
            // the middle item in the collection
            this.currItem = Math.floor(this.itemCount / 2);
            // gotta figure out how to get this thing dynamically
            // this is based on the width of each item including its padding/margins
            this.seekWidth = 444.06;
            // the maximum number of itemCount to the left of the collection is
            // always half of it regardless if it's odd or even
            this.maxSeek = this.seekWidth * Math.floor(this.itemCount / 2);
            // an even numbered collection will have an uneven division of itemCount
            // consider the current item in the count in case we have an even numbered collection
            this.minSeek = this.itemCount % 2 === 0 ? -this.maxSeek + this.seekWidth : -this.maxSeek;
            // the item we are currently viewing based on the collection
            this.currSeek = 0;
            // the product description component associated with the current item
            this.descr = undefined;
        }
    }

    SlideForward() {
        this.ToggleLights(this.currItem, this.currItem + 1 >= this.itemCount ?
            this.currItem : (this.currItem += 1));
        this.setState((currState) => {
            return {
                currSeek: (currState.currSeek - this.seekWidth) > this.minSeek ?
                    (currState.currSeek - this.seekWidth) : this.minSeek,
                currItem: this.currItem
            }
        }, () => {
            this.containerRef.current.setAttribute('style', `transform:translate3d(${this.state.currSeek}px, 0, 0)`);
            this.props.onItemChange(this.state.currItem);
        });
    };

    SlideBackward() {
        this.ToggleLights(this.currItem, this.currItem - 1 >= 0 ? (this.currItem -= 1) : 0);
        this.setState((currState) => {
            return {
                currSeek: currState.currSeek + this.seekWidth < this.maxSeek ?
                    (currState.currSeek += this.seekWidth) : this.maxSeek,
                currItem: this.currItem
            }
        }, () => {
            this.containerRef.current.setAttribute('style', `transform:translate3d(${this.state.currSeek}px, 0, 0)`);
            this.props.onItemChange(this.state.currItem);
        });
    };

    ToggleLights(oldPos, newPos) {
        // there is no way that I know of to grab dynamically created DOM elements before they are actually
        // put into the DOM. So, only execute that method call if the variable below is null
        this.itemCollection = !this.itemCollection ? document.querySelectorAll('.item') : this.itemCollection;
        if (newPos >= this.itemCount || newPos < 0 || !this.itemCollection) return;
        (this.itemCollection[oldPos]).classList.toggle("active");
        (this.itemCollection[newPos]).classList.toggle("active");
        this.fadeInDescriptionText();
        setTimeout(this.fadeInDescriptionText, 300);
    };

    fadeInDescriptionText() {
        document.querySelector('.product-desc').classList.toggle('active');
    }

    render() {
        let itemCssClass = this.itemCount % 2 === 0 ?
            'item item-shift d-flex justify-content-center align-itemCount-center flex-column' :
            'item d-flex justify-content-center align-itemCount-center flex-column';
        this.container = this.containerRef.current;
        return (
            <div className={'d-flex justify-content-center align-items-center'} id={'product-slide'}>
                <div className={'nav-arrow pos-left'} onClick={this.SlideBackward}>
                  <span className="wrap-20 arrow pos-left" id="arrow-backward">
                    <i className="fas fa-arrow-left"/>
                  </span>
                </div>
                <div id={'product-container'} className={'d-flex justify-content-center align-items-center p-5'}
                     ref={this.containerRef}>
                    {
                        this.props.products.map((item, index) => (
                            <div className={index === this.currItem ? `${itemCssClass} active` : itemCssClass}
                                 key={index}>
                                <img src={item.imageActual} alt={item.name}/>
                            </div>
                        ))
                    }
                </div>
                <div className="nav-arrow pos-right" id="arrow-forward-container" onClick={this.SlideForward}>
                  <span className="wrap-20 arrow pos-right" id="arrow-forward">
                    <i className="fas fa-arrow-right"/>
                  </span>
                </div>
            </div>
        );
    }
}