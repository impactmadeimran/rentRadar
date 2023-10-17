import api from 'axios'

export default api

export const CediFormat = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
});