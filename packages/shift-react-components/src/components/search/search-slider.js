// Libraries
import React, { Component } from 'react'
import InputRange from 'react-input-range'
import { connectRange } from 'react-instantsearch-dom'

class SearchSlider extends Component {
  render () {
    const { formatLabel, min, max } = this.props

    return min !== max ? (
      <>
        <div className='ais-RangeSlider'>
          <InputRange
            minValue={min}
            maxValue={max}
            value={{ min: this.props.currentRefinement.min, max: this.props.currentRefinement.max }}
            formatLabel={formatLabel}
            onChange={(sliderState) => { this.props.refine({ min: sliderState.min, max: sliderState.max }) }}
            onChangeComplete={this.refineSelection}
          />
        </div>
        <div className='c-range-slider'>
          <input type='number' className='c-range-slider__input' min={min} max={max} placeholder={min} value={this.props.currentRefinement.min || ''} onChange={event => this.props.refine({...this.propscurrentRefinement, min: event.currentTarget.value})} />
          <input type='number' className='c-range-slider__input' min={min} max={max} placeholder={max} value={this.props.currentRefinement.max || ''} onChange={event => this.props.refine({...this.propscurrentRefinement, max: event.currentTarget.value})} />
        </div>
      </>
    ) : null
  }
}

export default connectRange(SearchSlider)
