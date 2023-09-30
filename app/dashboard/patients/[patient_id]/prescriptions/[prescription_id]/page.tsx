const PrescriptionIdPage = (props: any) => {
  console.log('PrescriptionIdPage: ', props)
  return <div>{props.params['prescription_id']}</div>
}

export default PrescriptionIdPage
