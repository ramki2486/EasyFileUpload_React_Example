/* eslint-disable no-loop-func */
import React from 'react';
import './App.css';


class App extends React.Component {
  state = {
    username: '',
    fileData: '',
    error: ''
  }

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  }


  Filevalidation = (fileData, type) => {
    switch (type) {
      case 'max':
        if (fileData.length > 2) {
          this.setState({
            error: 'At most 2 files only !'
          })
        }
        return true;
      case 'ext':
        const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        for (let x = 0; x < fileData.length; x++) {
          if (types.every(type => fileData[x].type !== type)) {
            this.setState({
              error: 'Only jpeg, jpg, png and gif are accepted !'
            });
          }
        }
        return true;
      case 'size':
        let size = 8388608;
        for (let x = 0; x < fileData.length; x++) {
          if (fileData[x].size > size) {
            this.setState({
              error: 'file size is too large maximum 8MB !'
            });
          }
        };
        return true;
      default:
        return true;
    }
  }

  handleFileUpload = e => {
    let fileData = e.target.files;
    console.log(fileData);
    if (this.Filevalidation(fileData, 'max') && this.Filevalidation(fileData, 'ext') && this.Filevalidation(fileData, 'size')) {
      this.setState({
        fileData: fileData
      });
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    const { error, fileData } = this.state;
    if (!error) {
      const data = new FormData();

      for (let x = 0; x < fileData.length; x++) {
        data.append('fileData', fileData[x]);
      }

    }
  }

  render() {
    const { error } = this.state;
    return (
      <React.Fragment>
        <div className="title">
          <h3>Easy Form Upload</h3>
        </div>
        <div className="App">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <label>Username:</label>
            <input type="text" placeholder="Enter your username" onChange={this.handleUsername} />
            <label>File:</label>
            <input type="file" name="fileData" multiple onChange={this.handleFileUpload} />
            {error && <div className="ValidationErr">{error}</div>}
            <input type="submit" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
