/** @jsx createElement */
const { render, createElement, Component } = importAct();
const root = document.getElementById("root");

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: 0
    };
  }

  like() {
    this.setState({
      likes: this.state.likes + 1
    });
  }

  render() {
    const { name } = this.props;
    const { likes } = this.state;

    return (
      <div>
        <h1>Hello {name}</h1>
        <p>We like you {likes} times</p>
        <button onClick={() => this.like()}>like it</button>
      </div>
    );
  }
}

render(<Main name="Act" />, root);
