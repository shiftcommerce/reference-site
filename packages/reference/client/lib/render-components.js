// Components
import ComponentManifest from '../components/template-components/template-components-manifest'

export default function renderComponents (componentsData) {
  let components = []

  for (let index = 0; index < componentsData.length; index++) {
    let component = componentsData[index]
    let ComponentName = ComponentManifest[component.reference]
    if (ComponentName) {
      components.push(<ComponentName key={index} componentData={component} />)
    }
  }

  return (
    <>
      { components }
    </>
  )
}
