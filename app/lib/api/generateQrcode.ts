import APIClient, { GetParams } from './client'
import Endpoints from './endpoints'

const apiClient = new APIClient()

interface QrCodeParams {
  url?: string
  phone?: string
  email?: string
  address?: string
}

const generateQrcode = {
  getPng: (params: QrCodeParams) => {
    return apiClient.get(Endpoints.GenerateQrcode.pngType, params as GetParams)
  }
}

export default generateQrcode
