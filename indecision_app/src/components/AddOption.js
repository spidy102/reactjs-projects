import React from "react";

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  handleAddOption = (e) => {
    e.preventDefault();
    const option = e.target.elements.addoptions.value.trim();

    const error = this.props.addoption(option);

    this.setState(() => ({ error }));
    if (!error) e.target.elements.addoptions.value = "";
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input placeholder="Option" name="addoptions" type="text" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}