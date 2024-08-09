import { toast } from 'react-toastify';

const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}

export { handleSuccess, handleError };