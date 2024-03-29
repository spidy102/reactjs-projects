class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlusOne = this.handlePlusOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const x = localStorage.getItem("count");
    if (!isNaN(parseInt(x))) {
      this.setState(() => {
        return {
          count: parseInt(x),
        };
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      const x = this.state.count;
      localStorage.setItem("count", x);
    }
  }
  handlePlusOne() {
    // alert("Plus one clicked");
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
      };
    });
  }
  handleMinusOne() {
    // alert("Minus one clicked");
    this.setState((prevState) => {
      return {
        count: prevState.count - 1,
      };
    });
  }
  handleReset() {
    // alert("Reset clicked");
    this.setState(() => {
      return {
        count: 0,
      };
    });
    // this.setState((prevState) => {
    //   return {
    //     count: prevState.count + 1,
    //   };
    // });
    // this.setState({//async calls..
    //   count: 0,
    // });
    // this.setState({
    //   count: this.state.count + 1,
    // });
  }
  render() {
    return (
      <div>
        <h1>Count:{this.state.count}</h1>
        <button onClick={this.handlePlusOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.querySelector(".app"));
// let count = 0;
// const addOne = () => {
//   count++;
//   renderCounter();
// };
// const minusOne = () => {
//   count--;
//   renderCounter();
// };
// const resetOne = () => {
//   count = 0;
//   renderCounter();
// };

// const renderCounter = () => {
//   const templateTwo = (
//     <div>
//       <h1>Count:{count}</h1>
//       <button onClick={addOne}>+1</button>
//       <button onClick={minusOne}>-1</button>
//       <button onClick={resetOne}>Reset</button>
//     </div>
//   );
//   ReactDOM.render(templateTwo, document.querySelector(".app"));
// };
// renderCounter();
