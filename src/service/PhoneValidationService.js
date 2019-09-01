import axios from 'axios'

const PHONE_VALIDATION_HOST = 'http://localhost:8080'
const PHONE_VALIDATION_PATH = '/api/phoneValidation'
const PHONE_VALIDATION_API = PHONE_VALIDATION_HOST + PHONE_VALIDATION_PATH



class PhoneValidationService {

    validate(phone) {
        return axios.get(`${PHONE_VALIDATION_API}/${phone}`);
    }
}

export default new PhoneValidationService()
