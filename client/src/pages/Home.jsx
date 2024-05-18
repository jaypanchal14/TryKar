import React from 'react'
import { CreateButton } from '../component/CreateButton'
import { JoinButton } from '../component/JoinButton'

export const Home = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex items-center justify-center flex-1">
        <CreateButton />
      </div>
      <div className="flex items-center justify-center flex-1">
        <JoinButton />
      </div>
    </div>
  )
}
