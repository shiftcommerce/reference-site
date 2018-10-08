// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import HalfCategoryGallery from '../components/pages/HalfCategoryGallery'
import HeroImage from '../components/pages/HeroImage'
import Loading from '../components/Loading'
import StaticPageError from '../components/StaticPageError'
import RelatedLinks from '../components/pages/RelatedLinks'
import ThirdCategoryGallery from '../components/pages/ThirdCategoryGallery'

// Actions
import { readPage } from '../actions/pageActions'

class Page extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    const { id } = query
    await reduxStore.dispatch(readPage(id))
    return {id: id}
  }

  componentHero (heroData) {
    return (
      <div className='c-page__hero'>
        {heroData.map((hero, index) => {
          return <HeroImage hero={hero} key={index} />
        })}
      </div>
    )
  }

  componentHalf (halfData) {
    return (
      <div className='c-page__half'>
        {halfData.map((half, index) => {
          return <HalfCategoryGallery half={half} key={index} />
        })}
      </div>
    )
  }

  componentThird (thirdData) {
    return (
      <div className='c-page__third'>
        {thirdData.map((third, index) => {
          return <ThirdCategoryGallery third={third} key={index} />
        })}
      </div>
    )
  }

  componentLinks (linkData) {
    return (
      <div className='c-page__links'>
        {linkData.map((links, index) => {
          return <RelatedLinks links={links} key={index} />
        })}
      </div>
    )
  }

  render () {
    const { page: { loading, error, template } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error) {
      return (
        <StaticPageError error={error} />
      )
    } else {
      const { components } = template.sections.slice(-1).pop()
      const getDataByReference = (data, reference) => data.filter(a => a.reference === reference)

      return (
        <div className='c-page'>
          {this.componentHero(getDataByReference(components, 'full_image__text_below'))}
          {this.componentHalf(getDataByReference(components, 'half__style1'))}
          {this.componentThird(getDataByReference(components, 'thirds_style1'))}
          {this.componentLinks(getDataByReference(components, 'related_links'))}
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  const { page } = state

  return { page }
}

export default connect(mapStateToProps)(Page)
