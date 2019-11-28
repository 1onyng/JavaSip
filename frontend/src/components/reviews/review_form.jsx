import React from 'react';

class ReviewForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.event;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.submitEvent(this.state);
  }
  update(field){
    return e => this.setState({[field]: e.currentTarget.value});
  }
  render(){
    return(
      <div>
        <h1>{this.props.formType}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.description} onChange={this.update('description')}/>
          <textarea value={this.state.date} onChange={this.update('comment')}/>
          <button type="submit">{this.props.formType}</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;