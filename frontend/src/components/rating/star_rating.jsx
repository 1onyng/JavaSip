import React from 'react';
import $ from 'jquery';
import emptyCup from './coffee-cup-empty.svg'; 
import fullCup from './coffee-cup-full.svg'; 
const uuidv1 = require('uuid/v1');


export default class StarRating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(newRate) {
    this.props.onChange(newRate);
  }

  componentDidMount(){
    const getInfoText = (onStar)=>{
      if(onStar === 0 ){
        return "select your rating"}
      if(onStar === 1 ){
        return "Eek! Methinks not."}
      if(onStar === 2 ){
        return "Meh. I've experienced better.";}
      if(onStar === 3 ){
        return "A-OK.";}
      if(onStar === 4 ){
        return "Yay! I'm a fan.";}
      if(onStar === 5 ){
        return "Woohoo! As good as it gets!";}
    }

    const reAssignHoverClass = (upTo, addSelect, mouseout)=>{
      let imagesList = $('.stars').children('.star');

      if(addSelect){
        imagesList.each((i, img) => {
          if(i > (upTo - 1)){ 
            $(img).removeClass('selected') 
          }
          else {
            $(img).addClass('selected')
          }
        });
      }

      imagesList.each((i, img) => {
        if(i > (upTo - 1)){ 
          $(img).removeClass('hover') 
        }
        else {
          $(img).addClass('hover')
        }
      });

      if(mouseout){
        imagesList.each((i, img) => {
          if($(img).hasClass('selected')){
            $(img).addClass('hover')
          }else{
            $(img).removeClass('hover')
          }
        });
      }
    }

    const mouseOverOrClick =(e)=>{
      let currImg = $(e.currentTarget);
      var currImgValue = parseInt(currImg.data('value'), 10);
      let currentRate = $('#rateContainer').attr('data-rate');
      if(e.type =='mouseover'){
        $(".star-info").text(getInfoText(currImgValue));
        reAssignHoverClass(currImgValue, false, false);
      }
      if(e.type == 'click'){
        $(".star-info").text(getInfoText(currImgValue));
        $('#rateContainer').attr('data-rate',currImgValue);
        reAssignHoverClass(currImgValue, true, false);
        this.onChange(currImgValue);
      }

      if(e.type == 'mouseout'){
        $(".star-info").text(getInfoText(currentRate));
        reAssignHoverClass(currImgValue, false, true);
      }
  }
    $('.stars .star').bind('mouseover click mouseout', mouseOverOrClick);
  }

  readOnlyRating() {
    let dimmed = 5 - this.props.rate;
    let activeStar = <img className='star' src={fullCup} />;
    let emptyStar = <img className='star' src={emptyCup} />;
    const items = []
    for (let i = 0; i < this.props.rate; i++) {
      items.push(<img key={uuidv1()} className='star' src={fullCup} />)
    }
    for (let i = 0; i < dimmed; i++) {
      items.push(<img key={uuidv1()} className='star' src={emptyCup} />)
    }
    return (
      <ul>
        {items}
      </ul>
    )
  }

  ratingStar(){
    return (
      <ul id="rateContainer" className="stars" data-rate="0">
        <img data-value="1" className="star" src={emptyCup}/>
        <img data-value="2" className="star" src={emptyCup}/>
        <img data-value="3" className="star" src={emptyCup}/>
        <img data-value="4" className="star" src={emptyCup}/>
        <img data-value="5" className="star" src={emptyCup}/>
        <span className="star-info">&nbsp;&nbsp;&nbsp;select your rating</span>
      </ul>
    )
  }
  render() {
    const rateComp = this.props.readOnly ? (this.readOnlyRating()):(this.ratingStar());
    return (rateComp)
  }
}