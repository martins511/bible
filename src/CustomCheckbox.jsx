const CustomCheckbox = ({radioValue, handleChange, value}) => {
    return ( 
        <div>
        <input
          type="checkbox"
          value={radioValue}
          checked={value === radioValue}
          onChange={handleChange}
        />
        {radioValue}
      </div>
     );
}
 
export default CustomCheckbox;