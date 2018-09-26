// Libraries
import { Component } from 'react'

class SizeSelector extends Component {
  constructor (props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }

  renderOptions (variants) {
    return (
      variants && variants.map((variant, idx) =>
        <option role='option' key={idx} value={variant.sku} aria-setsize={variants.length} aria-posinset={idx + 1} data-price={variant.price}>
          { variant.meta_attributes.size.value }
        </option>
      )
    )
  }

  renderLabel () {
    const { label, name, required } = this.props

    if (label) {
      return <>
        <b><label htmlFor={name} className='o-size-selector__label'>{label}{required && ' *'}</label></b>
      </>
    }
  }

  renderSelect () {
    const { name, variants, prompt, ...otherProps } = this.props

    return (
      <div className='o-size-selector'>
        <select name={name} {...otherProps}>

          <option role='option' value='' aria-setsize={variants.length} aria-posinset='0' >{prompt}</option>

          { this.renderOptions(variants) }

        </select>
      </div>
    )
  }

  render () {
    return <>
      { this.renderLabel() }
      { this.renderSelect() }
    </>
  }
}

export default SizeSelector
