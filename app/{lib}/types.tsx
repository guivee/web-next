import { NextApiRequest, NextApiResponse } from 'next/types'

export type ProductCard = {
  productId: string
  isCustom: boolean
  productName: string
  category: string
  price: number
  sellerName: string
  sellerId: string
  username: string
  description: string
  sellerAvatar: string
  imageThumbnail: string
  shopName: string
  primaryFlavor: string[]
  secondaryFlavor: string[]
  event: string
  diet: string[]
  allergens: string[]
  isPrivate: boolean
  minQuantity: number
  maxQuantity: number
  ingredients: string[]
  product_details: ICake
}

export type IProduct = {
  pk: string
  sk: string
  product_id: string
  is_custom: boolean
  product_name: string
  category: string
  // price: number;
  seller_id: string
  username: string
  description: string
  images: string[]
  primary_flavor: string[]
  secondary_flavor: string[]
  event: string
  diet: string[]
  allergens: string[]
  is_private: boolean
  min_quantity: number
  max_quantity: number
  ingredients: string[]
  seller_details: {
    images: string[]
    full_name: string
    shop_name: string
  }
  product_details: ICake
}

export type ICake = {
  pricing: [
    {
      id: string
      size: string
      price: number
      layer?: number
      fondant?: number
      figurine?: number
      default: boolean
    }
  ]
  config: {
    accept_fondant: boolean
    accept_figurine: boolean
    min_layers: number
    max_layers: number
  }
  flavor: {}
}

export type IProductBody = {
  item: IProduct
}

export type ISubscription = {
  current_period_start: string
  current_period_end: string
  id: string
  status:
    | 'active'
    | 'trialing'
    | 'past_due'
    | 'canceled'
    | 'unpaid'
    | 'unsubscribed'
}

export enum SUBSCRIPTION_STATUS {
  ACTIVE = 'active',
  TRIALING = 'trialing',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
  UNSUBSCRIBED = 'unsubscribed',
}

export type IHeadMeta = {
  description: string
  image: string
  title: string
  path: string
}

export type IPaymentIntent = {
  order_id: string
  currency: 'USD' | 'AUD'
}

export enum CURRENCY {
  USD = 'USD',
  AUD = 'AUD',
}

export type IOrderSummary = {
  category?: string
  price: number
  quantity: number
  image: string
  productName: string
  primaryFlavor: string
  secondaryFlavor: string
  event?: string
  diet?: string
}

export type ICountry = 'US' | 'AUS'
export type IUserType = USER_TYPE.BUYER | USER_TYPE.SELLER
export enum USER_TYPE {
  BUYER = 'buyer',
  SELLER = 'seller',
}

export type TabNames =
  | 'General'
  | 'Account'
  | 'Users'
  | 'Organization'
  | 'Billing'

export type IAccountLinkParams = {
  stripe_account_id: string
  country: ICountry
}

export const FATHOM_DOMAINS = [
  'localhost:3000',
  'bakerue.net',
  'www.bakerue.net',
  'dev.bakerue.net',
  'bakerue.com',
  'www.bakerue.com',
]

export type ICallback = (
  functionName: string,
  req: NextApiRequest,
  res: NextApiResponse,
  user_id: string
) => void

export const FATHOM_EXCLUDED_DOMAINS = ['newrelic.com']

export const ALLOWED_COUNTRIES = ['AU']

export type IBrSelect = { display: string; value: any }

export type IimageUploadGrid = {
  currentImageList: string[]
  newImageList: string[]
  deleteImageList: string[]
}

export enum PAYMENT_ACCOUNT_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum MEDICATION_TYPE {
  GENERIC = 'GENERIC',
  BRANDED = 'BRANDED',
}

export type Prescription = {
  mpp_pt: string
  tpp_pt: string
  pk: string
  sk: string
  needs_authorization: boolean
  is_repeatable: boolean
  is_pbs: boolean
  medication_name: string
  medication_type: MEDICATION_TYPE
}

export type IMedicationType = MEDICATION_TYPE.GENERIC | MEDICATION_TYPE.BRANDED

export type Action = {
  notify: Notify
  update?: boolean
  create?: boolean
}

export type Notify = {
  value: boolean
  message: string
}
