import React from 'react';
import classes from './Input.module.scss';
import Aux from "./../../../hocs/Aux"
import Image from "./../../../Images/logoInput.png"
import Button from "./../Button/button"

const input = ( props ) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    console.log(props.value)
    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input //className = {classes.input}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
                placeholder = {props.placeholder}
                type = {props.inputType}
                />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                type = {props.inputType}
                value={props.value}
                onChange={props.changed}
                placeholder = {props.placeholder}/>;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    type = {props.inputType}
                    placeholder = {props.placeholder}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ( 'input-image' ):
            inputElement = 
            <Aux>
            <label for="file-input" className = {classes.ImageLabel}> 
                <img src={Image}/>
            </label>
            <input id="file-input" type="file" onChange = {props.changed} className = {classes.ImageInput}/>
            </Aux>
            var labelID;

            // $('label').click(function() {
            //     labelID = $(this).attr('for');
            //     $('#'+labelID).trigger('click');
            // });
            break;
        case("datalist"):
            inputElement = (
                <Aux>
                    <input
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    placeholder = {props.placeholder}
                    type = {props.inputType}
                    list = {props.datalist.id}
                    />
                    <datalist id = {props.datalist.id}>
                        {props.datalist.options.map(option => <option value = {option}/>)}
                    </datalist>
                </Aux>
            )
            break
        case("date"):
            inputElement = (<input 
                className={inputClasses.join(' ')}
                type = "text"
                value={props.value}
                onChange={props.changed}
                placeholder = {props.placeholder}
                onFocus={e => e.target.type = 'date'} 
                onBlur= {e => e.target.type='text'}
                />)
            break
        case("checkbox"):
        inputElement = (<Aux><input 
            className = {classes.Checkbox}
            value={props.value}
            onChange={props.changed}
            placeholder = {props.placeholder}
            type="checkbox"
            /><big><b>{props.valueText}</b></big></Aux>)
            break
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.validation}
                value={props.value}
                onChange={props.changed}
                placeholder = {props.placeholder}/>;
    }

    return (
        <div className={classes.Input}>
            {inputElement}
            <label className = {classes.Label}>{props.label}</label>
        </div>
    );
};

export default input;