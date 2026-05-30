import * as React from 'react'

export interface CheckoutForm {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  province: string
  postalCode: string
  country: string
  phone: string
  cardNumber: string
  cardExpiry: string
  cardCVC: string
  cardName: string
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple-pay' | 'google-pay'
  id?: string
  last4?: string
  brand?: string
}

export interface CheckoutState {
  currentStep: 'shipping' | 'payment' | 'review' | 'processing' | 'complete'
  formData: CheckoutForm
  selectedShipping: ShippingOption | null
  selectedPayment: PaymentMethod | null
  isProcessing: boolean
  error: string | null
  orderId: string | null
}

export interface CheckoutActions {
  setStep: (step: CheckoutState['currentStep']) => void
  updateFormData: (data: Partial<CheckoutForm>) => void
  setShippingOption: (option: ShippingOption) => void
  setPaymentMethod: (method: PaymentMethod) => void
  submitOrder: () => Promise<void>
  resetCheckout: () => void
  validateStep: (step: CheckoutState['currentStep']) => boolean
}

const initialFormData: CheckoutForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
  phone: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',
  cardName: '',
}

export function useCheckout() {
  const [state, setState] = React.useState<CheckoutState>({
    currentStep: 'shipping',
    formData: initialFormData,
    selectedShipping: null,
    selectedPayment: null,
    isProcessing: false,
    error: null,
    orderId: null,
  })

  const setStep = React.useCallback((step: CheckoutState['currentStep']) => {
    setState((prev) => ({ ...prev, currentStep: step, error: null }))
  }, [])

  const updateFormData = React.useCallback((data: Partial<CheckoutForm>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...data },
      error: null,
    }))
  }, [])

  const setShippingOption = React.useCallback((option: ShippingOption) => {
    setState((prev) => ({
      ...prev,
      selectedShipping: option,
      error: null,
    }))
  }, [])

  const setPaymentMethod = React.useCallback((method: PaymentMethod) => {
    setState((prev) => ({
      ...prev,
      selectedPayment: method,
      error: null,
    }))
  }, [])

  const submitOrder = React.useCallback(async () => {
    setState((prev) => ({ ...prev, isProcessing: true, error: null }))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      setState((prev) => ({
        ...prev,
        isProcessing: false,
        currentStep: 'complete',
        orderId,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: 'Failed to process order. Please try again.',
      }))
    }
  }, [])

  const resetCheckout = React.useCallback(() => {
    setState({
      currentStep: 'shipping',
      formData: initialFormData,
      selectedShipping: null,
      selectedPayment: null,
      isProcessing: false,
      error: null,
      orderId: null,
    })
  }, [])

  const validateStep = React.useCallback((step: CheckoutState['currentStep']): boolean => {
    const { formData } = state

    switch (step) {
      case 'shipping':
        return !!(
          formData.email &&
          formData.firstName &&
          formData.lastName &&
          formData.address &&
          formData.city &&
          formData.province &&
          formData.postalCode &&
          formData.country &&
          formData.phone
        )
      case 'payment':
        return !!(
          state.selectedPayment &&
          (state.selectedPayment.type !== 'card' ||
            (formData.cardNumber && formData.cardExpiry && formData.cardCVC && formData.cardName))
        )
      case 'review':
        return !!(state.selectedShipping && state.selectedPayment)
      default:
        return true
    }
  }, [state])

  return {
    ...state,
    setStep,
    updateFormData,
    setShippingOption,
    setPaymentMethod,
    submitOrder,
    resetCheckout,
    validateStep,
  }
}