import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const assetsOption = [
  {
    key: 'LUNA',
    label: 'LUNA',
    value: 'LUNA',
    image: { src: 'https://assets.terra.money/icon/60/Luna.png' ,
            width:'30px'}
  },
  {
    key: 'APOLLO',
    label: 'APOLLO',
    value: 'APOLLO',
    image: { src: 'https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png' ,
            width:'30px'}
  }
]

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder='Select Friend'
    fluid
    selection
    options={assetsOption}
  />
)

export default DropdownExampleSelection
