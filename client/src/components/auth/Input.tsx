import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {UseFormRegister} from 'react-hook-form'
import {FieldValues, FieldErrors} from 'react-hook-form'


interface inputProps{
    icon: IconDefinition
    inputLabel:string,
    placeholderText: string,
    inputType: string,
    register: UseFormRegister<FieldValues>,
    name: 'name' | 'surname' | 'email' | 'password',
    errors: FieldErrors<FieldValues>
}



function Input({icon,inputLabel,placeholderText,inputType, register, name, errors}:inputProps) {
    return <div className="input">
        <span className="input-label">{inputLabel}</span>
        <input {...register(name)} type={inputType} placeholder={`Type your ${placeholderText}`}/>
        {errors[name] && (
            <p className="input-error"
               style={{position: 'absolute', bottom: '-30px'}}>{`${errors[name]?.message}`}</p>
        )}
        <FontAwesomeIcon icon={icon}/>
        <span className="bottom-line"></span>
    </div>;
}

export default Input;