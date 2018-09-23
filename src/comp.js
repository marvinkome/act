import Act from "./act";

class LikeBtn extends Act.Component {
  render() {
    return <button onClick={this.props.like}>{this.props.children}</button>;
  }
}

export default class Main extends Act.Component {
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
        <p>I like you {likes} times</p>
        <LikeBtn like={() => this.like()}>like me</LikeBtn>
      </div>
    );
  }
}
