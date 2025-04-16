import { IconType } from "react-icons"

type InputProps = {
    icon: IconType,
    placeholder: string,
    type: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Input({icon: Icon, placeholder, type, value, onChange}: InputProps) {
    return (
        <div className="border-b-2 border-white flex items-center p-2 lg:w-3/4 w-full">
            <Icon className="mr-2" color="white" size={24}/>
            <input 
                type={type}
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                className="outline-0 flex-1 text-white text-center lg:text-base text-sm base" 
            />
        </div>
    )
}