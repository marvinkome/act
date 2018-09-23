const { Component } = importAct();

class LikeBtn extends Component {
  render() {
    return <button onClick={this.props.like}>{this.props.children}</button>;
  }
}

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
        <LikeBtn like={() => this.like()}>like me</LikeBtn>
      </div>
    );
  }
}
