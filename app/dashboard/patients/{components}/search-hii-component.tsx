import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { searchHII } from '../../../../src/service/patient-service'
import BrButton from '../../../{components}/pm-button'
import { User } from '../../../{lib}/acl_types'
import FormPanelComponent from '../../../{components}/form-panel-component'
import { Action, Patient } from '../../{util}/patient_types'
import { ServerResponse } from '../../{util}/basic-utils'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
export function SearchHIIComponent({
  id_token,
  setPatients,
  user,
}: {
  id_token: string
  setPatients: any
  user: User
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Patient>()

  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const [conflicts, setConflicts] = useState<Patient[]>([])

  const onSubmit: SubmitHandler<Patient> = async (data: Patient) => {
    const response: ServerResponse = await searchHII(
      user.organization_id,
      id_token,
      data
    )

    if (response.statusCode == 404) {
      // no records found
      let patient: Patient = data

      // strip IHI
      patient.ihi_number = undefined
      setPatients([patient])
    } else if (response.statusCode == 200) {
      // records found
      const patient = response.data.search_result
      if (patient === null) {
        setPatients([])
      }

      setPatients([patient])
    } else {
      // error

      handleResponseAlerts(response)
    }
  }

  const handleResponseAlerts = (response: ServerResponse) => {
    const action: Action = response?.data.action
    const conflicting_patients = response?.data.conflicting_patients
    setAction(action)
    setConflicts(conflicting_patients)
  }

  return (
    <>
      <FormPanelComponent
        header={'Lookup Patient'}
        body={
          <Body
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            isSubmitting={isSubmitting}
          />
        }
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

function Body({
  handleSubmit,
  onSubmit,
  register,
  isSubmitting,
}: {
  handleSubmit: any
  onSubmit: any
  register: any
  isSubmitting: any
}) {
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <div className=" space-y-6 divide-y">
      <CoreDemographicsComponent register={register} />
      <NumbersComponent register={register} />
      {/* <AddressComponent register={register} /> */}
    </div>
    // </form>
  )
}

const CoreDemographicsComponent = ({ register }: { register: any }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-8 sm:col-span-2">
          <label htmlFor="family_name" className="br-label">
            Family Name
          </label>
          <input {...register('family_name')} className="br-input" />
        </div>

        <div className="col-span-8 sm:col-span-2">
          <label htmlFor="given_name" className="br-label">
            Given Name
          </label>
          <input {...register('given_name', {})} className="br-input" />
        </div>

        <div className="col-span-8 sm:col-span-2">
          <label htmlFor="date_of_birth" className="br-label">
            DOB
          </label>
          <input {...register('date_of_birth', {})} className="br-input" />
        </div>

        <div className="col-span-8 sm:col-span-1">
          <label htmlFor="sex" className="br-label">
            Gender
          </label>
          <input {...register('sex', {})} className="br-input" />
        </div>
      </div>
    </>
  )
}

function NumbersComponent({ register }: { register: any }) {
  return (
    <div className=" grid grid-cols-12 gap-6 pt-6  ">
      <div className="col-span-8 sm:col-span-2">
        <label htmlFor="medicare_card_number" className="br-label">
          Medicare Card #
        </label>
        <input
          {...register('medicare_card_number', {
            maxLength: {
              value: 150,
              message: 'Length too long',
            },
          })}
          className="br-input"
        />
      </div>

      <div className="col-span-8 sm:col-span-1">
        <label htmlFor="medicare_irn" className="br-label">
          IRN
        </label>
        <input {...register('medicare_irn')} className="br-input" />
      </div>

      <div className="col-span-8 sm:col-span-2">
        <label htmlFor="ihi_number" className="br-label">
          IHI #
        </label>
        <input
          {...register('ihi_number', {
            maxLength: {
              value: 16,
              message: 'Length too long',
            },
          })}
          className="br-input"
        />
      </div>

      <div className="col-span-8 sm:col-span-2">
        <label htmlFor="dva_file_number" className="br-label">
          DVA #
        </label>
        <input {...register('dva_file_number')} className="br-input" />
      </div>
    </div>
  )
}

function AddressComponent({ register }: { register: any }) {
  return (
    <>
      <div className="grid grid-cols-8 gap-6 pt-6 ">
        {' '}
        <div className="col-span-8 sm:col-span-2">
          <label htmlFor="city" className="br-label">
            Suburb
          </label>
          <input {...register('city', {})} className="br-input" />
        </div>
        <div className="col-span-6 sm:col-span-1">
          <label htmlFor="state" className="br-label">
            State
          </label>
          <input {...register('state', {})} className="br-input" />
        </div>
        <div className="col-span-8 sm:col-span-2 ">
          <label htmlFor="postal_code" className="br-label">
            ZIP / Postal code
          </label>
          <input {...register('zip', {})} className="br-input" />
        </div>
      </div>
    </>
  )
}
