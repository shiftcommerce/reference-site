import { Component } from 'react'
import InputRange from 'react-input-range'

class RangeSlider extends Component {
  constructor (props) {
    super(props)
    this.state = { currentValues: { min: this.props.min, max: this.props.max } }
  }

  componentWillReceiveProps (sliderState) {
    if (sliderState.canRefine) {
      this.setState({
        currentValues: {
          min: sliderState.currentRefinement.min,
          max: sliderState.currentRefinement.max
        }
      })
    }
  }

  onChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState.min ||
      this.props.currentRefinement.max !== sliderState.max
    ) {
      this.setState({
        currentValues: { min: sliderState.min, max: sliderState.max }
      })
    }
  };

  refineSelection = sliderState => {
    this.props.refine({
      min: sliderState.min,
      max: sliderState.max
    })
  }

  render () {
    const { min, max, formatLabel } = this.props
    const { currentValues } = this.state

    return min !== max ? (
      <div className='ais-RangeSlider'>
        <InputRange
          minValue={min}
          maxValue={max}
          value={currentValues}
          formatLabel={formatLabel}
          onChange={this.onChange}
          onChangeComplete={this.refineSelection}
        />
      </div>
    ) : null
  }
}

export default RangeSlider
