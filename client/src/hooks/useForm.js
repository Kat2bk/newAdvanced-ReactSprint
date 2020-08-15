// write your custom hook here to control your checkout form
import {useLocalStorage} from "./useLocalStorage";

export const useForm = (key, initialValues) => {
    const [values, setValues] = useLocalStorage(key, initialValues);

    const handleChanges = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    return [values, handleChanges];
}