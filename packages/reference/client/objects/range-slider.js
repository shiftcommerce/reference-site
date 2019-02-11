import { Component } from 'react'
import InputRange from 'react-input-range'

class RangeSlider extends Component {
  constructor (props) {
    super(props)
    this.state = { currentValues: { min: this.props.min, max: this.props.max } }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return nextProps.canRefine && prevState.canRefine
      ? { currentValues: { min: nextProps.min, max: nextProps.max } }
      : null
  }

  refinementUpdated = sliderState => (
    this.props.currentRefinement.min !== sliderState.min ||
    this.props.currentRefinement.max !== sliderState.max
  )

  onChange = sliderState => {
    if (this.refinementUpdated(sliderState)) {
      this.setState({
        currentValues: { min: sliderState.min, max: sliderState.max }
      })
    }
  }

  refineSelection = sliderState => {
    if (this.refinementUpdated(sliderState)) {
      this.props.refine({
        min: sliderState.min,
        max: sliderState.max
      })
    }
  }

  render () {
    const { formatLabel, min, max } = this.props
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
