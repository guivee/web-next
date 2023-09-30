'use client'
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import DropdownComponent, {
  dropdownItemType as DropdownItemType,
} from '../../../{components}/dropdown-component'
import InputDropdownComponent, {
  InputdropdownItemType,
} from '../../../{components}/input-dropdown-component'
import InputReadonlyComponent from '../../../{components}/input-readonly-component'
import BrButton from '../../../{components}/pm-button'
import RadioComponent, {
  radioItemType,
} from '../../../{components}/radio-component'
import TextComponent from '../../../{components}/text-component'
import SearchBarMeds from '../../../{components}/searchbar-meds'
import { IMedicationType, Prescription } from '../../../{lib}/types'
import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'

const testItems: DropdownItemType[] = [
  { id: 1, display: 'Non Specified', value: 'Non Specified' },
  { id: 2, display: 'Blah Blah', value: 'Blah Blah' },
  { id: 3, display: 'Foo Bar', value: 'Foo Bar' },
]

const PrescriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Prescription>()

  const onSubmit: SubmitHandler<Prescription> = async (data: Prescription) => {
    console.log('SubmitHandler: data: ', data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto grid max-w-6xl grid-cols-8 justify-between gap-3 p-2 sm:gap-6 sm:gap-y-8">
          <div className=" col-span-8 my-5 border-b border-gray-300 text-xl font-semibold  text-gray-600 lg:col-span-8 ">
            Prescription Details
          </div>
          <div className="col-span-8 lg:col-span-4 ">
            <SearchDrug />
          </div>
          <div className="col-span-8 lg:col-span-2 ">
            <PrescribeAsBrand register={register} />
          </div>
          <div className="col-span-8 lg:col-span-2 ">
            <BrandSubstitution register={register} />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <ScriptType />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <PrescriptionType />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <Administration />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-4 ">
            <SearchIndication />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <MedicationReason />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-4 ">
            <DoseFrequency />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <Food />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2">
            <Route />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <Quantity />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <Repeats />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <RepeatsInterval />
          </div>
          <div className="rounded-mdlg:col-span-8 col-span-8 ">
            <OtherInstructions />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <AuthorityNumber />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <SupplyOriginalRepeats register={register} />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-2 ">
            <AuthorityUrgentSupply register={register} />
          </div>
          <div className="col-span-8 rounded-md lg:col-span-8 ">
            <PatientDetails />
          </div>
          <div className="col-span-8 mt-4 rounded-md  lg:col-span-2 lg:col-start-7 lg:col-end-9">
            <SubmitButtons />
          </div>
        </div>
      </form>
    </>
  )
}

export default PrescriptionForm

const SearchDrug = () => {
  // const onHitClick = (med: IMedicationType) => {
  const onChange = (med: any, med_type: any) => {
    console.log('SearchDrug: ', med)
    console.log('med_type: ', med_type)
  }
  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-500"
      >
        Quick search prescription
      </label>
      <SearchBarMeds onChange={onChange} />
    </div>
  )
}

const PrescribeAsBrand = ({ register }: { register: UseFormRegister<any> }) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Prescribe as Brand Name
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <CheckboxComponent name={'prescribe_brand_name'} register={register} />
      </div>
    </>
  )
}

const BrandSubstitution = ({
  register,
}: {
  register: UseFormRegister<any>
}) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Allow Brand Substitutions
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <CheckboxComponent
          name={'allow_brand_substitutions'}
          register={register}
        />
      </div>
    </>
  )
}

const ScriptType = () => {
  const scriptTypeList: radioItemType[] = [
    { id: '0', display: 'PBS/RPBS', value: 'pbs' },
    { id: '1', display: 'Private', value: 'private' },
  ]
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">Script Type</div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <RadioComponent itemList={scriptTypeList} name={'script_type'} />
      </div>
    </>
  )
}

const PrescriptionType = () => {
  const prescriptionTypeList: radioItemType[] = [
    { id: '0', display: 'Electronic', value: 'electronic' },
    { id: '1', display: 'Paper', value: 'paper' },
  ]
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Prescription Type
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <RadioComponent
          itemList={prescriptionTypeList}
          name={'prescription_type'}
        />
      </div>
    </>
  )
}

const Administration = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Administration
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <DropdownComponent dropdownItems={testItems} name={'administration'} />
      </div>
    </>
  )
}

const SearchIndication = () => {
  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-500"
      >
        Search Indications
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          placeholder="Search"
        />

        <div className="absolute inset-y-0 right-0 flex">
          <div className=" rounded-r-mdpx-2 flex items-center px-2 text-center ">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

const MedicationReason = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Medication Reason
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <DropdownComponent dropdownItems={testItems} name="medication_reason" />
      </div>
    </>
  )
}

const DoseFrequency = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Dose & Frequency
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <div>
          <div className="flex items-center justify-between  space-x-6 rounded-md border border-gray-300 bg-white ">
            <div className="relative rounded-md ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm"></span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                className="block w-full rounded-l-md border-0 border-gray-300 bg-transparent pl-7 pr-12 placeholder:italic placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                placeholder="eg. 1"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-r-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
                >
                  <option>Tablet</option>
                  <option>Foo</option>
                  <option>Bar</option>
                </select>
              </div>
            </div>
            <div className="relative rounded-md ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm"></span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full border-0 border-gray-300  bg-transparent pl-7 pr-12 placeholder:italic placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                placeholder="eg. 5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-r-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option>mg</option>
                  <option>Foo</option>
                  <option>Bar</option>
                </select>
              </div>
            </div>
            <div className="relative rounded-md ">
              <select
                id={`xxx-dropdown`}
                name={'xxx'}
                className="h-full rounded-r-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                defaultValue="Canada"
              >
                <option>morning</option>
                <option>Foo</option>
                <option>Bar</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Food = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">Food</div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <DropdownComponent dropdownItems={testItems} name="food" />
      </div>
    </>
  )
}

const Route = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">Route</div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <DropdownComponent dropdownItems={testItems} name="route" />
      </div>
    </>
  )
}

const Quantity = () => {
  const readonlyText = 'Pack (1x 120 Puffs)'
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">Quantity</div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <InputReadonlyComponent readonlyText={readonlyText} name="quantity" />
      </div>
    </>
  )
}

const Repeats = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">Repeats</div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <TextComponent type="number" name={'repeats'} />
      </div>
    </>
  )
}

const RepeatsInterval = () => {
  const repeatsItemsList: InputdropdownItemType[] = [
    { id: 0, display: 'Days', value: 'days' },
    { id: 1, display: 'Weeks', value: 'weeks' },
    { id: 2, display: 'Months', value: 'months' },
  ]
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Min. Repeat Interval
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <InputDropdownComponent
          itemList={repeatsItemsList}
          placeholder="eg. 1"
        />
      </div>
    </>
  )
}

const BrandSubstitutions = ({
  register,
}: {
  register: UseFormRegister<any>
}) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Allow Brand Substitutions
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <CheckboxComponent
          name={'allow_brand_substitutions'}
          register={register}
        />
      </div>
    </>
  )
}

const AuthorityNumber = () => {
  const auth_number_label = 'Warrant Number (VIC)'
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            {auth_number_label}
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <TextComponent name="authority_number" placeholder="" type="number" />
      </div>
    </>
  )
}

const SupplyOriginalRepeats = ({
  register,
}: {
  register: UseFormRegister<any>
}) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Dispense Repeats Together
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <CheckboxComponent
          name={'supply_original_repeats'}
          register={register}
        />
      </div>
    </>
  )
}

const AuthorityUrgentSupply = ({
  register,
}: {
  register: UseFormRegister<any>
}) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Authority for Urgent Supply
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <CheckboxComponent
          name={'authority_urgent_supply'}
          register={register}
        />
      </div>
    </>
  )
}

const OtherInstructions = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-500 ">
            Other Instructions
          </div>
          <InformationCircleIcon className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
        </div>
        <div className="w-full">
          <textarea
            id="other_instructions"
            name="other_instructions"
            rows={3}
            className="flex w-full  rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            defaultValue={''}
          />
        </div>
      </div>
    </>
  )
}

const CheckboxComponent = ({
  name,
  register,
}: {
  name: string
  register: UseFormRegister<any>
}) => {
  return (
    <input
      id={name}
      aria-describedby={`${name}-description`}
      {...register(name)}
      type="checkbox"
      className=" h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
    />
  )
}

const PatientDetails = () => {
  return (
    <div className="flex-row">
      <div className=" my-5 border-b border-gray-300 text-xl font-semibold  text-gray-600">
        Patient Details
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 flex-row sm:col-span-1">
          <div className="text-sm font-medium text-gray-500 ">Patient Name</div>
          <div className="font-medium text-gray-700">Kevin Dsouza</div>
        </div>
        <div className="col-span-3 flex-row sm:col-span-1">
          <div className="text-sm font-medium text-gray-500 ">Mobile</div>
          <TextComponent name="email" value="0431339973" />
        </div>
        <div className="col-span-3 flex-row sm:col-span-1">
          <div className="text-sm font-medium text-gray-500 ">
            Email (confirm with patient if correct)
          </div>
          <TextComponent name="email" value="kevin@parchment.health" />
        </div>
      </div>
    </div>
  )
}

const SubmitButtons = () => {
  return (
    <div className="flex">
      <BrButton name={'Create Prescription'} testIdPrefix={''} type="submit" />
    </div>
  )
}
