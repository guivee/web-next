'use client'
import SearchBarMeds from '../{components}/searchbar-meds'
import { IMedicationType } from '../{lib}/types'

const Test = async () => {
  const handleHitClick = (hit: any, type: IMedicationType) => {
    console.log('hit from child', hit)
    console.log('Medication type', type)
  }
  return (
    <div className="h-full min-w-3/4">
      <SearchBarMeds onHitClick={handleHitClick} />
    </div>
  )
}

export default Test
