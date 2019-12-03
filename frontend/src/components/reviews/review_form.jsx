import React from 'react';
import RatingStar from '../rating/star_rating_container';
import axios from 'axios';


class ReviewForm extends React.Component{
  constructor(props){
    super(props);
    // this.state = this.props.review;
    this.state = Object.assign({}, {imageUrls: [],imageFiles: [], loading: true}, this.props.review);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.starRateValueChange = this.starRateValueChange.bind(this);
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    // this.props.submitEvent(this.state);
    // debugger
    // console.log("imagefiles:  ", this.state.imageFiles);
    // const data = {
    //   rate: this.state.rate,
    //   comment: this.state.comment,
    //   images: this.state.imageFiles,
    //   businessId: '5de559e009a8d8d2bb44bca4'
    // }
    let formData = new FormData();
    formData.append('rate', this.state.rate);
    formData.append('comment', this.state.comment);

    let {imageFiles} = this.state;
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
          formData.append('file', imageFiles[i]);
      }
    }

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }

    axios.post("/api/businesses/5de559e009a8d8d2bb44bca4/review", {data: formData}, { 
      // receive two    parameter endpoint url ,form data
  })

    // axios({
    //   method: 'post',
    //   url: `/api/businesses/5de559e009a8d8d2bb44bca4/review`,
    //   data: formData,
    //   headers: {'content-type': `multipart/form-data; boundary=${formData._boundary}` }
    //   })
    //   .then(function (response) {
    //     debugger
    //       //handle success
    //       console.log(response);
    //   })
    //   .catch(function (response) {
    //     debugger
    //       //handle error
    //       console.log(response);
    //   });

    // axios.post(`/api/businesses/5de559e009a8d8d2bb44bca4/review`, formData)
    // .then((res)=> console.log(res))
    // .catch((err)=> console.log(err))


  }

  update(field){
    return e => this.setState({[field]: e.currentTarget.value});
  }

  starRateValueChange(newRate){
    this.setState({rate: newRate}, ()=> console.log(this.state))
  }

  uploadMultipleFiles(e) {
    e.preventDefault();
    let files = Array.from(e.target.files)
    let allowedExtension = ['jpeg', 'jpg', 'png'];
    for (let i = 0; i < files.length; i++) {
      if(!allowedExtension.includes(e.target.files[0].name.split('.').pop().toLowerCase())){
        window.showAlert("only jpeg, jpg and png are allowed.", 'alert-danger');
        return;
      }}
 
      for (let i = 0; i < files.length; i++){
          let fileReader = new FileReader();
          fileReader.onloadend = () => {
              this.setState({
                  imageFiles: [...this.state.imageFiles, files[i]],
                  imageUrls: [...this.state.imageUrls, fileReader.result]
              });
          };
          fileReader.readAsDataURL(files[i])
      }
};

  handleRemoveImage(url, file){
    let allUrls = this.state.imageUrls;  
    this.state.imageUrls.forEach((itr,i) => { 
      if (itr == url) {
        allUrls.splice(i, 1)
      }  
    });
  
    let allFiles = this.state.imageFiles;
    this.state.imageFiles.forEach((itr,i) => { 
      if (itr == file) {
        allFiles.splice(i, 1)
      }  
    });
    this.setState({
      imageFiles: [...allFiles],
      imageUrls: [...allUrls]
  });
    
  }

  update(field) {
    return (event) => {this.setState({[field]: event.target.value});}
  }

  render(){
    let placeHolder = 'Your review helps others learn about great local businesses.\n\n Please don’t review this business if you received a freebie for writing this review, or if you’re connected in any way to the owner or employees.'
    return(
    

      <form className="review-form" onSubmit={this.handleSubmit}>
        <ul className="form-wrapper">
        <h3 className="form-header">Business Name</h3>
        <li className="form-row">
          <div className="inputs-wrapper">
          <RatingStar onChange={(newRate)=>this.starRateValueChange(newRate)}/>
            <textarea className="comment-style" rows="10" value={this.state.comment} onChange={this.update('comment')}
                    placeholder={placeHolder}
            ></textarea>
          </div>
        </li>
        <li className="form-row">
          <h5 className="form-title-2">Attach Photos<span className="subtitle">optional</span></h5>
        </li>
        <li className="form-row">
          <input type="file" className="form-control-file" id='input_file'
              onChange={this.uploadMultipleFiles} multiple />
        </li>  
        <li className="form-row">
            <button className="signup-btn" type="submit">{this.props.formType}</button>
        </li>
        </ul>
      </form>

    );
  }
}

export default ReviewForm;