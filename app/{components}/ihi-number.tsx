import { useEffect, useState } from 'react'
import { formatIhiNumber } from '../dashboard/{util}/basic-utils'

const IhiNumber = ({ ihi_number }: { ihi_number: string }) => {
  const [formattedNumber, setFormattedNumber] = useState('')

  useEffect(() => {
    setFormattedNumber(formatIhiNumber(ihi_number))
  }, [ihi_number])

  return (
    <div className="">
      <span className="block">{formattedNumber}</span>
    </div>
  )
}

export default IhiNumber
