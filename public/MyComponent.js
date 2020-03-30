import sizeMe from 'react-sizeme'

class MyComponent extends Component {
  render() {
    const { width, height } = this.props.size

    return (
      <div>
        My size is {width || -1}px x {height || -1}px
      </div>
    )
  }
}

export default sizeMe({ monitorHeight: true })(MyComponent)