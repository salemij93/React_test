import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { S3Album } from 'aws-amplify-react';



//import logo from './logo.svg';
import './App.css';
// import $ from 'jquery'; 
// import bootstrap from 'bootstrap';

import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure({
    Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-2:659f7b58-0fe4-4b65-ab51-93a960b3eb1e', 
    // REQUIRED - Amazon Cognito Region    
        region: 'us-east-2', 
    // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_FmMTB9dJ6', 
    // OPTIONAL - Amazon Cognito App Client ID
        userPoolWebClientId: '2um51r52lpvqivcp0b4ukom725', // 26-char alphanumeric string 
    },
    API: {
        endpoints: [
            {
                name: "dataVizUsersAPI",
                endpoint: " https://56j2eqfgyh.execute-api.us-east-2.amazonaws.com/testNoMethods"
            },
            {
                name: "fileUploadGateway",
                endpoint: "https://fxu8pfd9v1.execute-api.us-east-2.amazonaws.com/dev",
                service: "lambda",
                region: "us-east-2"
            }
        ]
    },
    Storage: {
        bucket: 'joe-salemi-file-uploads', //REQUIRED -  Amazon S3 bucket
        region: 'us-east-2', //OPTIONAL -  Amazon service region
        identityPoolId: 'us-east-2:659f7b58-0fe4-4b65-ab51-93a960b3eb1e'
    }
});

Storage.configure({ level: 'private' });



class App extends Component {
constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
     event.preventDefault();
     document.getElementById("fileInputHidden").click();
     Auth.currentCredentials()
     .then(result => console.log(result.data.IdentityId))
     .catch(err => console.log(err));

    //  Storage.list('/', {level: 'private'})
    //  .then(result => console.log(result))
    // .catch(err => console.log(err));

  }
  handleChange(event) {
    var x = document.getElementById("fileInputHidden").value;
    var n = x.lastIndexOf("\\");
    console.log(n);
    if (x.length != 0.0) {
      var filename = x.substr(n+1, x.length);
    console.log(filename);
    document.getElementById("FileUploadbtn").innerHTML = 'Selected file: ' + filename;
    } else {
       document.getElementById("FileUploadbtn").innerHTML = " Upload File:"
    }
    
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.files[0].name}`
    );
    for (var i = 0; i < this.fileInput.files.length; i++) {
      var file = this.fileInput.files[i]
      Storage.put(file.name, file)
      .then (result => console.log(result))
      .catch(err => console.log(err));
      // let apiName = 'fileUploadGateway';
      // let path = '/fileUploadHandler';
      // let myInit = { // OPTIONAL
      //   body: 
      //     {
      //         name: file.name,
      //         type: file.type
      //       }, // replace this with attributes you need
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //     } 
      // }
      // console.log(myInit);
      // API.post(apiName, path, myInit).then(response => {
      //   console.log(response);
        
      // });
      

     
    }
    
 }

  render() {
    return ([
      <form onSubmit={this.handleSubmit}>
        <label>
          <button className="btn btn-primary" id="FileUploadbtn" type="button" onClick={this.handleClick}> Upload File:</button>
          <input type="file" id="fileInputHidden" ref={input => {this.fileInput = input;}} style={{display: "none"}} onChange={this.handleChange}/>
        </label>
        <br />
        <button className="btn btn-primary" type="submit"><i className="fas fa-cloud-upload-alt fa-lg" /> Submit</button>
      </form>,
      <S3Album level="private" path={'/'} />]
    );
  }
}

export default withAuthenticator(App,true);
