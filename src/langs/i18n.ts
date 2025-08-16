import { RESOURCES as resources } from './resources'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources,
	lng: 'enUS',
	fallbackLng: 'enUS',
	interpolation: {
		escapeValue: false,
		format: (value, format, lng) => {
			if (format === 'currency') {
				return new Intl.NumberFormat(lng, {
					style: 'currency',
					currency: setCurrency(lng),
				}).format(value)
			}
			return value
		},
	},
})

export default i18n

function setCurrency(lang?: string) {
	switch (lang) {
		case 'pt-BR':
			return 'BRL'
		case 'en-US':
			return 'USD'
		default:
			return 'USD'
	}
}
