import React from 'react'
import { useParams } from 'react-router-dom'
import WorkExperienceList from './WorkExperienceList'
import WorkExperiencePage from './WorkExperiencePage'

function WorkLayout() {
  const {type}=useParams()
  console.log(type, 'type')
  return (
    <>
    {type === 'list' && <WorkExperienceList/>}
    {(type === 'add' || type === 'details') && <WorkExperiencePage/>}
    </>
  )
}

export default WorkLayout
