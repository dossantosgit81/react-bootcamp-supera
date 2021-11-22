import React from "react";
import { useField } from "formik";

const FieldInput = ({...props }) => {
    const [inputProps , meta] = useField(props)

    return(
       <div>
           <input {...inputProps} {...props} />
       </div>
    )
}

export default FieldInput;